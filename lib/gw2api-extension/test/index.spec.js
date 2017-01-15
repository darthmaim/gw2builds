/* eslint-env node, mocha */
import { expect } from 'chai';
import fetchMock from 'lets-fetch/mock';
import apiClient from 'gw2api-client';
import extendApi from '../src';

fetchMock.enableMocking(true);

function createApi(customData) {
    const api = extendApi(apiClient(), customData);
    api.fetch = fetchMock;
    return api;
}

describe('API extender', () => {
    it('fails when data is null or undefined', () => {
        expect(createApi).to.throw(TypeError);
    });

    it('has API endpoint functions', () => {
        const api = createApi({});
        [
            'account', 'achievements', 'backstory', 'build', 'characters', 'colors', 'commerce', 'continents',
            'currencies', 'emblem', 'events', 'files', 'finishers', 'guild', 'items', 'itemstats', 'legends', 'maps',
            'masteries', 'materials', 'minis', 'outfits', 'pets', 'professions', 'pvp', 'quaggans', 'recipes', 'skills',
            'skins', 'specializations', 'stories', 'titles', 'tokeninfo', 'traits', 'worlds', 'wvw'
        ].forEach(endpoint => {
            expect(api[endpoint]).to.be.a('function', endpoint);
            expect(api[endpoint]()).to.be.an('object', endpoint);
        });
    });

    it('extends ids()', () => {
        const api = createApi({
            professions: {
                Dragonslayer: {
                    id: 'Dragonslayer'
                }
            }
        });
        fetchMock.addResponse(['Warrior', 'Guardian']);

        return api.professions().ids().then(response => {
            expect(response).to.have.deep.members(['Warrior', 'Guardian', 'Dragonslayer']);
        });
    });

    it('extends ids() without custom data', () => {
        const api = createApi({});
        fetchMock.addResponse(['Warrior', 'Guardian']);

        return api.professions().ids().then(response => {
            expect(response).to.have.deep.members(['Warrior', 'Guardian']);
        });
    });

    it('extends ids() without adding duplicates', () => {
        const api = createApi({
            professions: {
                Warrior: {
                    id: 'Warrior'
                }
            }
        });
        fetchMock.addResponse(['Warrior', 'Guardian']);

        return api.professions().ids().then(response => {
            expect(response).to.have.deep.members(['Warrior', 'Guardian']);
        });
    });

    it('extends ids() with new custom items', () => {
        const api = createApi({
            professions: {
                Dragonslayer: {
                    id: 'Dragonslayer'
                }
            }
        });
        fetchMock.addResponse([]);

        return api.professions().ids().then(response => {
            expect(response).to.deep.equal(['Dragonslayer']);
        });
    });

    it('extends get()', () => {
        const api = createApi({
            professions: {
                Elementalist: {
                    customKey: 'customValue'
                }
            }
        });
        fetchMock.addResponse({
            id: 'Elementalist'
        });

        return api.professions().get('Elementalist').then(response => {
            expect(response).to.deep.equal({ id: 'Elementalist', customKey: 'customValue' });
        });
    });

    it('extends get() without custom data', () => {
        const api = createApi({});
        fetchMock.addResponse({
            id: 'Elementalist'
        });

        return api.professions().get('Elementalist').then(response => {
            expect(response).to.deep.equal({ id: 'Elementalist' });
        });
    });

    it('extends get() with empty custom data', () => {
        const api = createApi({
            professions: {
                Elementalist: undefined
            }
        });
        fetchMock.addResponse({
            id: 'Elementalist'
        });

        return api.professions().get('Elementalist').then(response => {
            expect(response).to.deep.equal({ id: 'Elementalist' });
        });
    });

    xit('extends get() with new custom items', () => {
        // Enable this test once this is implemented
        const api = createApi({
            professions: {
                Dragonslayer: {
                    id: 'Dragonslayer'
                }
            }
        });
        fetchMock.addResponse({});

        return api.professions().get('Dragonslayer').then(response => {
            expect(response).to.deep.equal({ id: 'Dragonslayer' });
        });
    });

    it('extends many()', () => {
        const api = createApi({
            professions: {
                Elementalist: {
                    customKey: 'customValue'
                },
                Warrior: {
                    customKey2: 'customValue2'
                }
            }
        });
        fetchMock.addResponse([
            { id: 'Elementalist' },
            { id: 'Warrior' }
        ]);

        return api.professions().many(['Elementalist', 'Warrior']).then(response => {
            expect(response).to.deep.equal([
                { id: 'Elementalist', customKey: 'customValue' },
                { id: 'Warrior', customKey2: 'customValue2' }
            ]);
        });
    });

    it('extends many() without custom data', () => {
        const api = createApi({});
        fetchMock.addResponse([
            { id: 'Elementalist' },
            { id: 'Warrior' }
        ]);

        return api.professions().many(['Elementalist']).then(response => {
            expect(response).to.deep.equal([
                { id: 'Elementalist' },
                { id: 'Warrior' }
            ]);
        });
    });

    it('extends many() with empty custom data', () => {
        const api = createApi({
            professions: {
                Elementalist: undefined,
                Warrior: undefined
            }
        });
        fetchMock.addResponse([
            { id: 'Elementalist' },
            { id: 'Warrior' }
        ]);

        return api.professions().many(['Elementalist']).then(response => {
            expect(response).to.deep.equal([
                { id: 'Elementalist' },
                { id: 'Warrior' }
            ]);
        });
    });

    xit('extends many() with new custom items', () => {
        // Enable this test once this is implemented
        const api = createApi({
            professions: {
                Elementalist: {
                    customKey: 'customValue'
                },
                Warrior: {
                    customKey2: 'customValue2'
                },
                Dragonslayer: {
                    id: 'Dragonslayer',
                    customKey3: 'customValue3'
                }
            }
        });
        fetchMock.addResponse([
            { id: 'Elementalist' },
            { id: 'Warrior' }
        ]);

        return api.professions().many(['Elementalist', 'Warrior', 'Dragonslayer']).then(response => {
            expect(response).to.deep.equal([
                { id: 'Elementalist', customKey: 'customValue' },
                { id: 'Warrior', customKey2: 'customValue2' },
                { id: 'Dragonslayer', customKey3: 'customValue3' }
            ]);
        });
    });

    it('extends page()', () => {
        const api = createApi({
            professions: {
                Elementalist: {
                    customKey: 'customValue'
                },
                Warrior: {
                    customKey2: 'customValue2'
                }
            }
        });
        fetchMock.addResponse([
            { id: 'Elementalist' },
            { id: 'Warrior' }
        ]);

        return api.professions().page(0).then(response => {
            expect(response).to.deep.equal([
                { id: 'Elementalist', customKey: 'customValue' },
                { id: 'Warrior', customKey2: 'customValue2' }
            ]);
        });
    });

    it('extends page() without custom data', () => {
        const api = createApi({});
        fetchMock.addResponse([
            { id: 'Elementalist' },
            { id: 'Warrior' }
        ]);

        return api.professions().page(0).then(response => {
            expect(response).to.deep.equal([
                { id: 'Elementalist' },
                { id: 'Warrior' }
            ]);
        });
    });

    it('extends page() with empty custom data', () => {
        const api = createApi({
            professions: {
                Elementalist: undefined,
                Warrior: undefined
            }
        });
        fetchMock.addResponse([
            { id: 'Elementalist' },
            { id: 'Warrior' }
        ]);

        return api.professions().page(0).then(response => {
            expect(response).to.deep.equal([
                { id: 'Elementalist' },
                { id: 'Warrior' }
            ]);
        });
    });

    xit('extends page() with new custom items', () => {
        // Enable this test once this is implemented
        const api = createApi({
            professions: {
                Elementalist: {
                    customKey: 'customValue'
                },
                Warrior: {
                    customKey2: 'customValue2'
                },
                Dragonslayer: {
                    id: 'Dragonslayer',
                    customKey3: 'customValue3'
                }
            }
        });
        fetchMock.addResponse([
            { id: 'Elementalist' },
            { id: 'Warrior' }
        ]);

        return api.professions().page(0).then(response => {
            expect(response).to.deep.equal([
                { id: 'Elementalist', customKey: 'customValue' },
                { id: 'Warrior', customKey2: 'customValue2' },
                { id: 'Dragonslayer', customKey3: 'customValue3' }
            ]);
        });
    });

    it('extends all()', () => {
        const api = createApi({
            professions: {
                Elementalist: {
                    customKey: 'customValue'
                },
                Warrior: {
                    customKey2: 'customValue2'
                }
            }
        });
        fetchMock.addResponse([
            { id: 'Elementalist' },
            { id: 'Warrior' }
        ]);

        return api.professions().all().then(response => {
            expect(response).to.deep.equal([
                { id: 'Elementalist', customKey: 'customValue' },
                { id: 'Warrior', customKey2: 'customValue2' }
            ]);
        });
    });

    it('extends all() without custom data', () => {
        const api = createApi({});
        fetchMock.addResponse([
            { id: 'Elementalist' },
            { id: 'Warrior' }
        ]);

        return api.professions().all().then(response => {
            expect(response).to.deep.equal([
                { id: 'Elementalist' },
                { id: 'Warrior' }
            ]);
        });
    });

    it('extends all() with empty custom data', () => {
        const api = createApi({
            professions: {
                Elementalist: undefined,
                Warrior: undefined
            }
        });
        fetchMock.addResponse([
            { id: 'Elementalist' },
            { id: 'Warrior' }
        ]);

        return api.professions().all().then(response => {
            expect(response).to.deep.equal([
                { id: 'Elementalist' },
                { id: 'Warrior' }
            ]);
        });
    });

    xit('extends all() with new custom items', () => {
        // Enable this test once this is implemented
        const api = createApi({
            professions: {
                Elementalist: {
                    customKey: 'customValue'
                },
                Warrior: {
                    customKey2: 'customValue2'
                },
                Dragonslayer: {
                    id: 'Dragonslayer',
                    customKey3: 'customValue3'
                }
            }
        });
        fetchMock.addResponse([
            { id: 'Elementalist' },
            { id: 'Warrior' }
        ]);

        return api.professions().all().then(response => {
            expect(response).to.deep.equal([
                { id: 'Elementalist', customKey: 'customValue' },
                { id: 'Warrior', customKey2: 'customValue2' },
                { id: 'Dragonslayer', customKey3: 'customValue3' }
            ]);
        });
    });
});
