import { createReducer, on } from '@ngrx/store';
import { EnumRxKey, Enums } from 'src/app/enums';
import { StoreAction } from '../actions';
import { reduxAddArray, reduxIDelete, reduxListingAdd, reduxListingUpdate, reduxMatchPagination, removeDuplicates } from 'src/app/helpers';

export interface State {
    loading: boolean,
    moreLoading: boolean,
    [key: string]: any;
    error: any
}

let newState: any = {
    loading: false, 
    moreLoading: false, 
    error: '', 
};

let DefaultKey = EnumRxKey.Default;

Object.keys(DefaultKey).forEach(key => {
    newState[key] = null;
    newState[`${key}Loading`] = false;
});

let loadingState: any = {};
Object.keys(DefaultKey).forEach(key => loadingState[`${key}Loading`] = false);

export const initialState: State = newState

export const STATE_NAME = 'default';

const _defaultReducer = createReducer(
    initialState,
    on(StoreAction.DefaultParams, (state, action) => {
        //console.log('action', action)
        return { ...state, loading: true, [`${action.key}Loading`]: true };
    }),
    on(StoreAction.DefaultMoreParams, (state, action) => {
        return { ...state, loading: false, moreLoading: true, [`${action.key}Loading`]: true };
    }),

    on(StoreAction.DefaultList, (state, action) => {
        let listingKey: any = action.key;
        let data = action.data;
        return {...state, ...loadingState, [listingKey]: data, loading: false };
    }),

    on(StoreAction.DefaultAdd, (state, action) => {
        let listingKey: any = action.key;
        let addCourse = reduxMatchPagination(state[listingKey], reduxListingAdd(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: addCourse, loading: false };
    }),

    on(StoreAction.DefaultReset, (state, action) => {
        let listingKey: any = action.key;
        //let addCourse = reduxMatchPagination(state[listingKey], reduxListingAdd(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: null, loading: false };
    }),

    on(StoreAction.DefaultUpdate, (state, action) => {
        let listingKey: any = action.key;
        let updateCourse = reduxMatchPagination(state[listingKey], reduxListingUpdate(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: updateCourse, loading: false };
    }),

    on(StoreAction.DefaultDelete, (state, action) => {
        let listingKey: any = action.key;
        let deleteCourse = reduxMatchPagination(state[listingKey], reduxIDelete(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: deleteCourse, loading: false };
    }),

    on(StoreAction.DefaultMore, (state, action) => {
        let listingKey: any = action.key;
        let moreCourse = reduxMatchPagination(state[listingKey], reduxAddArray(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: moreCourse, loading: false, moreLoading: false, };
    }),

    /*on(StoreAction.DefaultUpdate, (state, action) => {
        let listingKey: any = action.key;
        let items = state[listingKey]?.items ?? [];
        const index = items?.findIndex((f: any) => f.key === action.item.key);
        let pagination = action?.item?.pagination ? action?.item?.pagination : state[listingKey]?.pagination;
        let moreDefault = { pagination: pagination, items: [...items?.slice(0, index), action.item, ...items?.slice(index + 1)] };
        return { ...state, [listingKey]: moreDefault, loading: false, [`${action.key}Loading`]: false };
    }),
    on(StoreAction.DefaultMore, (state, action) => {
        let listingKey: any = action.key;
        let moreCourse = { pagination: state[listingKey].pagination, items: removeDuplicates(reduxAddArray(state[listingKey]?.items, action), 'id') };
        return {...state, ...loadingState, [listingKey]: moreCourse, loading: false, moreLoading: false, };
    }),*/

    on(StoreAction.Failure, (state, action) => {
        return { ...state, error: action.error, loading: false, [`${EnumRxKey.Default}Loading`]: false }
    })
);

export function Reducer(state: any, action: any) {
    return _defaultReducer(state, action);
}
