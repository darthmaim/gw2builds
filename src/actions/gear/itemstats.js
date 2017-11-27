import { createApiAction } from '../utils';

export const FETCH_AVAILABLE_ITEMSTATS = 'FETCH_AVAILABLE_ITEMSTATS';

/** Action to set a selected itemstat id for a piece of armor. Params: { itemstats } */
export const fetchAvailableItemstats = createApiAction(FETCH_AVAILABLE_ITEMSTATS,
    ({selectedLanguage}) => fetch('/api/itemstats?lang=' + selectedLanguage).then((r) => r.json())
);

export default {
    FETCH_AVAILABLE_ITEMSTATS,

    fetchAvailableItemstats
};
