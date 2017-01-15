import merge from 'lodash/merge';
import union from 'lodash/union';

// TODO: Support advanced customized endpoints through functions instead of objects only?

export function modifyIds(endpointResult) {
    const customIds = Object.keys(this.customData);
    return union(endpointResult, customIds).sort();
}

export function modifyGet(endpointResult) {
    // TODO: Insert items that are added manually (aka items that do not exist on the API but are added by us)
    const id = endpointResult.id;
    const customData = this.customData[id];
    let result = endpointResult;
    if (customData) {
        merge(endpointResult, customData);
    }
    return result;
}

export function modifyMany(endpointResult) {
    // TODO: Insert items that are added manually (aka items that do not exist on the API but are added by us)
    let result = endpointResult;
    for (let i = 0; i < result.length; i++) {
        result[i] = modifyGet.call(this, result[i]);
    }
    return result;
}

export function modifyPage(endpointResult) {
    // TODO: Insert items that are added manually (aka items that do not exist on the API but are added by us)
    return modifyMany.call(this, endpointResult);
}

export function modifyAll(endpointResult) {
    // TODO: Insert items that are added manually (aka items that do not exist on the API but are added by us)
    return modifyMany.call(this, endpointResult);
}

export default { modifyIds, modifyGet, modifyMany, modifyPage, modifyAll };
