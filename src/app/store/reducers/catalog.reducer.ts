import { createReducer, on } from '@ngrx/store';
import { EnumRxKey, Enums } from 'src/app/enums';
import { reduxAddArray, reduxIDelete, reduxListingAdd, reduxListingUpdate, reduxMatchPagination } from 'src/app/helpers';
import { StoreAction } from 'src/app/store/actions';

export interface State {
    loading: boolean,
    moreLoading: boolean,
    [key: string]: any;
    error: any
}

let catalogKey: any = EnumRxKey.Catalog;

let newState: any = {
    loading: false, 
    moreLoading: false, 
    error: '', 
};

Object.keys(catalogKey).forEach(key => {
    newState[key] = null;
    newState[`${key}Loading`] = false;
});

let loadingState: any = {};
Object.keys(catalogKey).forEach(key => loadingState[`${key}Loading`] = false);

export const initialState: State = newState;

export const STATE_NAME = 'catalog';

const _catalogReducer = createReducer(
    initialState,
    on(StoreAction.CatalogParams, (state, action) => {
        return { ...state, loading: true, [`${action.key}Loading`]: true };
    }),
    on(StoreAction.CatalogMoreParams, (state, action) => {
        return { ...state, loading: false, moreLoading: true };
    }),

    on(StoreAction.CatalogList, (state, action) => {
        return {...state, ...loadingState, [`${action.key}`]: action.data, loading: false };
    }),

    on(StoreAction.CatalogAdd, (state, action) => {
        let listingKey: any = action.key;
        let addCatalog = reduxMatchPagination(state[listingKey], reduxListingAdd(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: addCatalog, loading: false };
    }),

    on(StoreAction.CatalogUpdate, (state, action) => {
        let listingKey: any = action.key;
        let updateCatalog = (listingKey === EnumRxKey.Catalog.view) ? reduxListingUpdate(state[listingKey], action, listingKey) : reduxMatchPagination(state[listingKey], reduxListingUpdate(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: updateCatalog, loading: false };
    }),

    on(StoreAction.CatalogDelete, (state, action) => {
        let listingKey: any = action.key;
        let deleteCatalog = reduxMatchPagination(state[listingKey], reduxIDelete(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: deleteCatalog, loading: false };
    }),

    on(StoreAction.CatalogMore, (state, action) => {
        let listingKey: any = action.key;
        let moreCatalog = reduxMatchPagination(state[listingKey], reduxAddArray(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: moreCatalog, loading: false, moreLoading: false};
    }),

    on(StoreAction.Failure, (state, action) => {
        return {...state, ...loadingState, error: action.error, loading: false, [`${EnumRxKey.Catalog}Loading`]: false };
    })
);

export function Reducer(state: any, action: any) {
    return _catalogReducer(state, action);
}