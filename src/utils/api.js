import apiClient from 'gw2api-client';
import cacheMemory from 'gw2api-client/src/cache/memory';

export const api = apiClient().cacheStorage(cacheMemory());
