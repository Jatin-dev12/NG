import { createReducer, on } from "@ngrx/store";
import { EnumRxKey } from "src/app/enums";
import { StoreAction } from "src/app/store/actions";

const cart = null;
const cartData = (cart !== null) ? JSON.parse(cart) : [];

export interface State {
    cart: any,
    loading: boolean,
    error: any
}

let newState: any = {
    cart: cartData,
    loading: false, 
    error: '', 
};


export const initialState: State = newState;

export const STATE_NAME = 'guestCart';

const _guestCartReducer = createReducer(
    initialState,
    on(StoreAction.GuestCartParams, (state, action) => {
        return { ...state, loading: true };
    }),

    on(StoreAction.GuestCartList, (state, action) => {
        let data = action.data;
        return {...state, cart: data, loading: false };
    }),

    on(StoreAction.GuestCartAdd, (state, action) => {
        return {...state, cart: [action.item, ...state.cart], loading: false };
    }),

    on(StoreAction.GuestCartUpdate, (state, action) => {
        const index = state.cart.findIndex((f: any) => f.id === action.item.id);
        return {...state, cart: [...state.cart.slice(0, index), action.item, ...state.cart.slice(index + 1)], loading: false }
    }),

    on(StoreAction.GuestCartDelete, (state, action) => {
        let deleteCart = (action.key === EnumRxKey.GuestCart.remove) ? [...state.cart.filter( (val: any) => val.id !== action.item.id )] : [];
        return {...state, cart: deleteCart, loading: false };
    }),

    on(StoreAction.Failure, (state, action) => {
        let newState = { ...state, error: action.error, loading: false, moreLoading: false };
        return newState;
    })
);

export function Reducer(state: any, action: any) {
    return _guestCartReducer(state, action);
}