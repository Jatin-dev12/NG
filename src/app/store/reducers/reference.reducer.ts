
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

let ReferenceKey: any = EnumRxKey.Reference;

let newState: any = {
    loading: false, 
    moreLoading: false, 
    error: '', 
};

Object.keys(ReferenceKey).forEach(key => {
    newState[key] = null;
    newState[`${key}Loading`] = false;
});

let loadingState: any = {};
Object.keys(ReferenceKey).forEach(key => loadingState[`${key}Loading`] = false);

export const initialState: State = newState;

export const STATE_NAME = 'reference';

const _ReferenceReducer = createReducer(
    initialState,
    on(StoreAction.ReferenceParams, (state, action) => {
        return { ...state, loading: true, [`${action.key}Loading`]: true };
    }),
    on(StoreAction.ReferenceMoreParams, (state, action) => {
        return { ...state, loading: false, moreLoading: true };
    }),

    on(StoreAction.ReferenceList, (state, action) => {
        let listingKey: any = action.key;
        let data = action.data;
        return {...state, ...loadingState, [listingKey]: data, loading: false };
    }),

    on(StoreAction.ReferenceAdd, (state, action) => {
        let listingKey: any = action.key;
        let addReference = reduxMatchPagination(state[listingKey], reduxListingAdd(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: addReference, loading: false };
    }),

    on(StoreAction.ReferenceUpdate, (state, action) => {
        let listingKey: any = action.key;
        let updateReference = reduxMatchPagination(state[listingKey], reduxListingUpdate(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: updateReference, loading: false };
    }),

    on(StoreAction.ReferenceDelete, (state, action) => {
        let listingKey: any = action.key;
        let deleteReference = reduxMatchPagination(state[listingKey], reduxIDelete(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: deleteReference, loading: false };
    }),

    on(StoreAction.ReferenceMore, (state, action) => {
        let listingKey: any = action.key;
        let moreReference = reduxMatchPagination(state[listingKey], reduxAddArray(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: moreReference, loading: false, moreLoading: false, };
    }),

    on(StoreAction.Failure, (state, action) => {
        let newState = { ...state, ...loadingState, error: action.error, loading: false, moreLoading: false };
        return newState;
    })
);

export function Reducer(state: any, action: any) {
    return _ReferenceReducer(state, action);
}