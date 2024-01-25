import { createReducer, on } from "@ngrx/store";
import { EnumRxKey, Enums } from "src/app/enums";
import { reduxAddArray, reduxIDelete, reduxListingAdd, reduxListingUpdate, reduxMatchPagination } from "src/app/helpers";
import { StoreAction } from "src/app/store/actions";

export interface State {
    loading: boolean,
    moreLoading: boolean,
    milestoneLoading: boolean,
    [key: string]: any;
    error: any
}

let orderKey: any = EnumRxKey.Order;

let newState: any = {
    loading: false, 
    moreLoading: false, 
    error: '', 
};

Object.keys(orderKey).forEach(key => {
    newState[key] = null;
    newState[`${key}Loading`] = false;
});

let loadingState: any = {};
Object.keys(orderKey).forEach(key => loadingState[`${key}Loading`] = false);

export const initialState: State = newState;

export const STATE_NAME = 'order';

const _orderReducer = createReducer(
    initialState,
    on(StoreAction.OrderParams, (state, action) => {
        return { ...state, loading: true, [`${action.key}Loading`]: true };
    }),
    on(StoreAction.MilestoneParams, (state, action) => {
        return { ...state, loading: true };
    }),
    on(StoreAction.OrderMoreParams, (state, action) => {
        return { ...state, loading: false, moreLoading: true };
    }),

    on(StoreAction.OrderList, (state, action) => {
        let listingKey: any = action.key;
        let data = action.data;
        return {...state, ...loadingState, [listingKey]: data, loading: false };
    }),

    on(StoreAction.OrderAdd, (state, action) => {
        let listingKey: any = action.key;
        let addOrder = reduxMatchPagination(state[listingKey], reduxListingAdd(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: addOrder, loading: false };
    }),

    on(StoreAction.OrderUpdate, (state, action) => {
        let listingKey: any = action.key;
        let updateOrder = reduxMatchPagination(state[listingKey], reduxListingUpdate(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: updateOrder, loading: false };
    }),

    on(StoreAction.OrderDelete, (state, action) => {
        let listingKey: any = action.key;
        let deleteOrder = reduxMatchPagination(state[listingKey], reduxIDelete(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: deleteOrder, loading: false };
    }),

    on(StoreAction.OrderMore, (state, action) => {
        let listingKey: any = action.key;
        let moreOrder = reduxMatchPagination(state[listingKey], reduxAddArray(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: moreOrder, loading: false, moreLoading: false, };
    }),

    on(StoreAction.Failure, (state, action) => {
        let newState = { ...state, ...loadingState, error: action.error, loading: false, moreLoading: false };
        return newState;
    })
);

export function Reducer(state: any, action: any) {
    return _orderReducer(state, action);
}