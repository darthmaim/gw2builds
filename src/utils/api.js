import apiClient from 'gw2api-client';
import cacheMemory from 'gw2api-client/build/cache/memory';
// import extendApiClient from 'gw2api-extension';
// import extendApiData from 'gw2be-api-extension-data';

export const api = apiClient().cacheStorage(cacheMemory());
