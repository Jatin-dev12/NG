import { createReducer, on } from '@ngrx/store';
import { EnumRxKey } from 'src/app/enums';
import { User } from 'src/app/models';
import { StoreAction } from '../actions';

const user = null;
const authentication = (user !== null) ? JSON.parse(user) : null;

export interface State {
	user: User | null;
	loading: boolean;
    [key: string]: any;
	error: any
}

let authKey: any = EnumRxKey.Auth;

let newState: any = {
    user: authentication ? authentication : null,
    loading: false, 
    error: '', 
};

Object.keys(authKey).forEach(key => {
    newState[`${key}Loading`] = false;
});

export const initialState: State = newState;

export const STATE_NAME = 'auth';

const _authReducer = createReducer(
	initialState,
	on(StoreAction.AuthParams, StoreAction.NdisParams, StoreAction.ProfileParams, (state, action) => {
		let key = action.params2?.key
		return { ...state, loading: true, [`${key}Loading`]: true }
	}),
	on(StoreAction.LoginSuccess, (state, action) => {
		return { ...state, user: action.user, loading: false };
	}),
	on(StoreAction.Failure, (state, action) => {
		return { ...state, loading: false, error: action.error }
	}),
)

export function Reducer(state: any, action: any) {
	return _authReducer(state, action);
}
