
import { createReducer, on } from "@ngrx/store";
import { EnumRxKey, Enums } from "src/app/enums";
import { reduxAddArray, reduxIDelete, reduxListingAdd, reduxListingUpdate, reduxMatchPagination } from "src/app/helpers";
import { StoreAction } from "src/app/store/actions";

export interface State {
    loading: boolean,
    moreLoading: boolean,
    [key: string]: any;
    error: any
}

let AdsKey: any = EnumRxKey.Ads;

let newState: any = {
    loading: false, 
    moreLoading: false, 
    error: '', 
};

Object.keys(AdsKey).forEach(key => {
    newState[key] = null;
    newState[`${key}Loading`] = false;
});

let loadingState: any = {};
Object.keys(AdsKey).forEach(key => loadingState[`${key}Loading`] = false);

export const initialState: State = newState;

export const STATE_NAME = 'ads';

const _AdsReducer = createReducer(
    initialState,
    on(StoreAction.AdsParams, (state, action) => {
        return { ...state, loading: true, [`${action.key}Loading`]: true };
    }),
    on(StoreAction.AdsMoreParams, (state, action) => {
        return { ...state, loading: false, moreLoading: true };
    }),

    on(StoreAction.AdsList, (state, action) => {
        let listingKey: any = action.key;
        let data = action.data;
        return {...state, ...loadingState, [listingKey]: data, loading: false };
    }),

    on(StoreAction.AdsAdd, (state, action) => {
        let listingKey: any = action.key;
        let addAds = reduxMatchPagination(state[listingKey], reduxListingAdd(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: addAds, loading: false };
    }),

    on(StoreAction.AdsUpdate, (state, action) => {
        let listingKey: any = action.key;
        let updateAds = reduxMatchPagination(state[listingKey], reduxListingUpdate(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: updateAds, loading: false };
    }),

    on(StoreAction.AdsDelete, (state, action) => {
        let listingKey: any = action.key;
        let deleteAds = reduxMatchPagination(state[listingKey], reduxIDelete(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: deleteAds, loading: false };
    }),

    on(StoreAction.AdsMore, (state, action) => {
        let listingKey: any = action.key;
        let moreAds = reduxMatchPagination(state[listingKey], reduxAddArray(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: moreAds, loading: false, moreLoading: false, };
    }),

    on(StoreAction.Failure, (state, action) => {
        let newState = { ...state, ...loadingState, error: action.error, loading: false, moreLoading: false };
        return newState;
    })
);

export function Reducer(state: any, action: any) {
    return _AdsReducer(state, action);
}