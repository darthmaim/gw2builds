import apiClient from 'gw2api-client';
import fs from 'fs';
import gulp from 'gulp';
import keyBy from 'lodash/keyBy';
import { weaponIs2Handed } from '../src/utils/gw2';

function buildAttributes() {
    const api = apiClient();
    const file = './assets/gear.json';

    const foundItemstats = {};

    console.log('loading items');
    return api.items().all().then(items => {
        console.log('loading itemstats');

        return Promise.all([
            api.language('de').itemstats().all(), api.language('en').itemstats().all(),
            api.language('es').itemstats().all(), api.language('fr').itemstats().all()
        ]).then(itemstats => {
            itemstats = itemstats.map(x => keyBy(x, 'id'));
            itemstats.de = itemstats[0];
            itemstats.en = itemstats[1];
            itemstats.es = itemstats[2];
            itemstats.fr = itemstats[3];

            console.log('parsing items');

            items.forEach(item => {
                if(
                    ['Weapon', 'Armor', 'Back', 'Trinket'].indexOf(item.type ) !== -1 &&
                    ['Ascended', 'Exotic'].indexOf(item.rarity) !== -1 &&
                    item.level === 80 && item.details.infix_upgrade && item.details.infix_upgrade.id &&
                    item.details.infix_upgrade.attributes.length > 0
                ) {
                    const attributeSetId = item.details.infix_upgrade && item.details.infix_upgrade.id;
                    const attributeSet = attributeSetId && itemstats.en[attributeSetId] || 'UNKNOWN';
                    const type = item.type === 'Weapon'
                        ? (weaponIs2Handed(item.details.type) ? '2Handed' : '1Handed')
                        : item.details.type;
                    const key = item.rarity + item.type + type + attributeSet.name;

                    if(foundItemstats[key] === undefined && attributeSet.name !== "") {
                        foundItemstats[key] = {
                            item, attributeSet
                        };
                        console.log(`${attributeSet.id}\t${attributeSet.name}\t${item.details.type}\t${item.details.infix_upgrade.attributes.map(a => a.attribute + ': ' + a.modifier).join('\t')}`);
                    }
                }
            });

            const nice = {};

            Object.values(foundItemstats).forEach(({item, attributeSet}) => {
                const type = item.type === 'Weapon'
                    ? (weaponIs2Handed(item.details.type) ? '2Handed' : '1Handed')
                    : item.details.type;

                nice[item.type] = nice[item.type] || {};

                nice[item.type][type] = nice[item.type][type] || {};
                const collection = nice[item.type][type];

                collection[item.rarity] = collection[item.rarity] || [];

                const attributes = {};
                item.details.infix_upgrade.attributes.forEach(({attribute, modifier}) => {
                    attributes[attribute] = modifier
                });

                collection[item.rarity].push({
                    id: attributeSet.id,
                    names: {
                        de: itemstats.de[attributeSet.id].name,
                        en: itemstats.en[attributeSet.id].name,
                        es: itemstats.es[attributeSet.id].name,
                        fr: itemstats.fr[attributeSet.id].name
                    },
                    attributes: attributes
                });
            });

            fs.writeFileSync(file, JSON.stringify(nice));
        })
    }).catch(error => {
        console.error(error);
    });
}

gulp.task('gw2b:gear', callback => {
    buildAttributes().then(callback);
});
