
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

let ContactKey: any = EnumRxKey.Contact;

let newState: any = {
    loading: false, 
    moreLoading: false, 
    error: '', 
};

Object.keys(ContactKey).forEach(key => {
    newState[key] = null;
    newState[`${key}Loading`] = false;
});

let loadingState: any = {};
Object.keys(ContactKey).forEach(key => loadingState[`${key}Loading`] = false);

export const initialState: State = newState;

export const STATE_NAME = 'contact';

const _ContactReducer = createReducer(
    initialState,
    on(StoreAction.ContactParams, (state, action) => {
        return { ...state, loading: true, [`${action.key}Loading`]: true };
    }),
    on(StoreAction.ContactMoreParams, (state, action) => {
        return { ...state, loading: false, moreLoading: true };
    }),

    on(StoreAction.ContactList, (state, action) => {
        let listingKey: any = action.key;
        let data = action.data;
        return {...state, ...loadingState, [listingKey]: data, loading: false };
    }),

    on(StoreAction.ContactAdd, (state, action) => {
        let listingKey: any = action.key;
        let addContact = reduxMatchPagination(state[listingKey], reduxListingAdd(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: addContact, loading: false };
    }),

    on(StoreAction.ContactUpdate, (state, action) => {
        let listingKey: any = action.key;
        let updateContact = reduxMatchPagination(state[listingKey], reduxListingUpdate(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: updateContact, loading: false };
    }),

    on(StoreAction.ContactDelete, (state, action) => {
        let listingKey: any = action.key;
        let deleteContact = reduxMatchPagination(state[listingKey], reduxIDelete(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: deleteContact, loading: false };
    }),

    on(StoreAction.ContactMore, (state, action) => {
        let listingKey: any = action.key;
        let moreContact = reduxMatchPagination(state[listingKey], reduxAddArray(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: moreContact, loading: false, moreLoading: false, };
    }),

    on(StoreAction.Failure, (state, action) => {
        let newState = { ...state, ...loadingState, error: action.error, loading: false, moreLoading: false };
        return newState;
    })
);

export function Reducer(state: any, action: any) {
    return _ContactReducer(state, action);
}