import { createReducer, on } from '@ngrx/store';
import { StoreAction } from '../actions';

export interface State {
    files: any;
    progress: any;
    loading: boolean;
    error: any;
}

export const initialState: State = {
    files: {
        image: [],
        video: [],
        docs: []
    },
    loading: false,
    progress: 0,
    error: ''
};

export const STATE_NAME = 'upload';

const _sharedReducer = createReducer(
    initialState,
    on(StoreAction.UploadParams, (state, action) => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(StoreAction.UploadRespond, (state, action) => {
        return {
            ...state,
            files: action.files,
            loading: false,
            progress: 0
        };
    }),
    on(StoreAction.UploadProgress, (state, action) => {
        return {
            ...state,
            files: {},
            loading: false,
        };
    }),
    on(StoreAction.UploadClear, (state, action) => {
        return {
            ...state,
            files: {},
            loading: false,
        };
    }),
    on(StoreAction.Failure, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false,
        };
    })
);

export function Reducer(state: any, action: any) {
    return _sharedReducer(state, action);
}
