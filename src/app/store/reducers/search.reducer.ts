import { createReducer, on } from "@ngrx/store";
import { EnumRxKey } from "src/app/enums";
import { reduxAddArray, reduxIDelete, reduxListingAdd, reduxListingUpdate, reduxMatchPagination } from "src/app/helpers";
import { StoreAction } from "src/app/store/actions";

export interface State {
    loading: boolean,
    moreLoading: boolean,
    [key: string]: any;
    error: any
}

let searchKey: any = EnumRxKey.Search;

let newState: any = {
    loading: false, 
    moreLoading: false, 
    error: '', 
};

Object.keys(searchKey).forEach(key => {
    newState[key] = null;
    newState[`${key}Loading`] = false;
});

let loadingState: any = {};
Object.keys(searchKey).forEach(key => loadingState[`${key}Loading`] = false);

export const initialState: State = newState;

export const STATE_NAME = 'search';

const _searchReducer = createReducer(
    initialState,
    on(StoreAction.SearchParams, (state, action) => {
        return { ...state, loading: true, [`${action.key}Loading`]: true };
    }),
    on(StoreAction.SearchMoreParams, (state, action) => {
        return { ...state, loading: false, moreLoading: true };
    }),

    on(StoreAction.SearchList, (state, action) => {
        let listingKey: any = action.key;
        let data = action.data;
        return {...state, ...loadingState, [listingKey]: data, loading: false };
    }),

    on(StoreAction.SearchAdd, (state, action) => {
        let listingKey: any = action.key;
        let addSearch: any = reduxMatchPagination(state[listingKey], reduxListingAdd(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: addSearch, loading: false };
    }),

    on(StoreAction.SearchUpdate, (state, action) => {
        let listingKey: any = action.key;
        let updateSearch = reduxMatchPagination(state[listingKey], reduxListingUpdate(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: updateSearch, loading: false };
    }),

    on(StoreAction.SearchDelete, (state, action) => {
        let listingKey: any = action.key;
        let deleteSearch = reduxMatchPagination(state[listingKey], reduxIDelete(state[listingKey]?.items, action));
        //let deleteSearch = { pagination: state[listingKey].pagination, items: reduxIDelete(state[listingKey]?.items, action)};
        return {...state, ...loadingState, [listingKey]: deleteSearch, loading: false };
    }),

    on(StoreAction.SearchMore, (state, action) => {
        let listingKey: any = action.key;
        let moreSearch = reduxMatchPagination(state[listingKey], reduxAddArray(state[listingKey]?.items, action));
        //let moreSearch = { pagination: state[listingKey].pagination, items: reduxAddArray(state[listingKey]?.items, action)};
        return {...state, ...loadingState, [listingKey]: moreSearch, loading: false, moreLoading: false, };
    }),

    on(StoreAction.Failure, (state, action) => {
        let newState = { ...state, ...loadingState, error: action.error, loading: false, moreLoading: false };
        return newState;
    })
);

export function Reducer(state: any, action: any) {
    return _searchReducer(state, action);
}