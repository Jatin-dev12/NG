
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

let StaffKey: any = EnumRxKey.Staff;

let newState: any = {
    loading: false, 
    moreLoading: false, 
    error: '', 
};

Object.keys(StaffKey).forEach(key => {
    newState[key] = null;
    newState[`${key}Loading`] = false;
});

let loadingState: any = {};
Object.keys(StaffKey).forEach(key => loadingState[`${key}Loading`] = false);

export const initialState: State = newState;

export const STATE_NAME = 'staff';

const _staffReducer = createReducer(
    initialState,
    on(StoreAction.StaffParams, (state, action) => {
        return { ...state, loading: true, [`${action.key}Loading`]: true };
    }),
    on(StoreAction.StaffMoreParams, (state, action) => {
        return { ...state, loading: false, moreLoading: true };
    }),

    on(StoreAction.StaffList, (state, action) => {
        let listingKey: any = action.key;
        let data = action.data;
        return {...state, ...loadingState, [listingKey]: data, loading: false };
    }),

    on(StoreAction.StaffAdd, (state, action) => {
        let listingKey: any = action.key;
        let addStaff = reduxMatchPagination(state[listingKey], reduxListingAdd(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: addStaff, loading: false };
    }),

    on(StoreAction.StaffUpdate, (state, action) => {
        let listingKey: any = action.key;
        let updateStaff = reduxMatchPagination(state[listingKey], reduxListingUpdate(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: updateStaff, loading: false };
    }),

    on(StoreAction.StaffDelete, (state, action) => {
        let listingKey: any = action.key;
        let deleteStaff = reduxMatchPagination(state[listingKey], reduxIDelete(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: deleteStaff, loading: false };
    }),

    on(StoreAction.StaffMore, (state, action) => {
        let listingKey: any = action.key;
        let moreStaff = reduxMatchPagination(state[listingKey], reduxAddArray(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: moreStaff, loading: false, moreLoading: false, };
    }),

    on(StoreAction.Failure, (state, action) => {
        let newState = { ...state, ...loadingState, error: action.error, loading: false, moreLoading: false };
        return newState;
    })
);

export function Reducer(state: any, action: any) {
    return _staffReducer(state, action);
}