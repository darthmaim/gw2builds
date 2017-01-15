import { modifyIds, modifyGet, modifyMany, modifyPage, modifyAll } from './modifier';

export default superclass => class extends superclass {
    constructor(client, customData, ...args) {
        super(client, ...args);
        this.customData = customData;
    }

    ids() {
        const superResult = super.ids();
        return this.customData ? superResult.then(ids => modifyIds.call(this, ids)) : superResult;
    }

    get(id) {
        const superResult = super.get(id);
        return this.customData ? superResult.then(obj => modifyGet.call(this, obj)) : superResult;
    }

    many(ids) {
        const superResult = super.many(ids);
        return this.customData ? superResult.then(list => modifyMany.call(this, list)) : superResult;
    }

    page(page, size) {
        const superResult = super.page(page, size);
        return this.customData ? superResult.then(list => modifyPage.call(this, list)) : superResult;
    }

    all() {
        const superResult = super.all();
        return this.customData ? superResult.then(list => modifyAll.call(this, list)) : superResult;
    }
};
