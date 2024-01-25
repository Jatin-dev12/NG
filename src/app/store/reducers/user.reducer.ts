import { createReducer, on } from '@ngrx/store';
import { EnumRxKey, Enums } from 'src/app/enums';
import { reduxAddArray, reduxIDelete, reduxListingAdd, reduxListingUpdate, reduxMatchPagination } from 'src/app/helpers';
import { StoreAction } from '../actions';

export interface State {
    loading: boolean;
    moreLoading: boolean;
    [key: string]: any;
    error: any;
}

let userKey: any = EnumRxKey.User;

let newState: any = {
    loading: false,
    moreLoading: false,
    error: ''
};

Object.keys(userKey).forEach((key, value) => {
    newState[key] = null;
    newState[`${key}Loading`] = false;
});

let loadingState: any = { };
Object.keys(userKey).forEach(key => loadingState[`${key}Loading`] = false);

export const initialState: State = newState;

export const STATE_NAME = 'user';

const _userReducer = createReducer(
    initialState,
    on(StoreAction.UserParams, (state, action) => {
        return { ...state, loading: true, [`${action.key}Loading`]: true };
    }),
    on(StoreAction.UserList, (state, action) => {
        let listingKey: any = action.key;
        return {...state, ...loadingState, [listingKey]: action.data, loading: false };
    }),

    on(StoreAction.UserAdd, (state, action) => {
        let listingKey: any = action.key;
        let addCatalog = reduxMatchPagination(state[listingKey], reduxListingAdd(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: addCatalog, loading: false };
    }),

    on(StoreAction.UserUpdate, (state, action) => {
        let listingKey: any = action.key;
        let updateCatalog = reduxMatchPagination(state[listingKey], reduxListingUpdate(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: updateCatalog, loading: false };
    }),

    on(StoreAction.UserDelete, (state, action) => {
        let listingKey: any = action.key;
        let deleteCatalog = reduxMatchPagination(state[listingKey], reduxIDelete(state[listingKey]?.items, action));
        deleteCatalog['total'] = deleteCatalog.total - 1;
        return {...state, ...loadingState, [listingKey]: deleteCatalog, loading: false };
    }),

    on(StoreAction.UserMore, (state, action) => {
        let listingKey: any = action.key;
        let moreCatalog = reduxMatchPagination(state[listingKey], reduxAddArray(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: moreCatalog, loading: false , moreLoading: false};
    }),

    on(StoreAction.Failure, (state, action) => {
        return { ...state, ...loadingState, error: action.error, loading: false, moreLoading: false };
    }),
);

export function Reducer(state: any, action: any) {
    return _userReducer(state, action);
}