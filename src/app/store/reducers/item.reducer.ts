import { createReducer, on } from '@ngrx/store';
import { EnumRxKey, Enums } from 'src/app/enums';
import { reduxAddArray, reduxIDelete, reduxListingAdd, reduxListingUpdate, reduxMatchPagination } from 'src/app/helpers';
import { StoreAction } from '../actions';

export interface State {
    loading: boolean,
    moreLoading: boolean,
    [key: string]: any;
    error: any
};

let itemKey: any = EnumRxKey.Item;

let newState: any = {
    loading: false, 
    moreLoading: false, 
    error: '', 
};

Object.keys(itemKey).forEach(key => {
    newState[key] = null;
    newState[`${key}Loading`] = false;
});

export const initialState: State = newState;

export const STATE_NAME = 'item';

const _itemReducer = createReducer(
    initialState,
    on(StoreAction.ItemParams, (state, action) => {
        return { ...state, loading: true, [`${action.key}Loading`]: true };
    }),

    on(StoreAction.ItemMoreParams, (state, action) => {
        return { ...state, loading: false, moreLoading: true };
    }),

    on(StoreAction.ItemList, (state, action) => {
        return {...state, [`${action.key}`]: action.data, loading: false, [`${action.key}Loading`]: false };
    }),

    on(StoreAction.ItemAdd, (state, action) => {
        let listingKey: any = action.key;
        let addItem = reduxMatchPagination(state[listingKey], reduxListingAdd(state[listingKey], action, listingKey));
        return {...state, [listingKey]: addItem, loading: false, [`${listingKey}Loading`]: false };
    }),

    on(StoreAction.ItemUpdate, (state, action) => {
        let listingKey: any = action.key;
        let updateItem = reduxMatchPagination(state[listingKey], reduxListingUpdate(state[listingKey], action, listingKey));
        return {...state, [listingKey]: updateItem, loading: false, [`${listingKey}Loading`]: false };
    }),

    on(StoreAction.ItemDelete, (state, action) => {
        let listingKey: any = action.key;
        let deleteItem = reduxMatchPagination(state[listingKey], reduxIDelete(state[listingKey]?.items, action));
        return {...state, [listingKey]: deleteItem, loading: false, [`${listingKey}Loading`]: false };
    }),

    on(StoreAction.ItemMore, (state, action) => {
        let listingKey: any = action.key;
        let moreItem = reduxMatchPagination(state[listingKey], reduxAddArray(state[listingKey]?.items, action));
        return {...state, [listingKey]: moreItem, loading: false, moreLoading: false};
    }),

    on(StoreAction.Failure, (state, action) => {
        return {...state, error: action.error, loading: false, [`${EnumRxKey.Item}Loading`]: false };
    })
);

export function Reducer(state: any, action: any) {
    return _itemReducer(state, action);
}
