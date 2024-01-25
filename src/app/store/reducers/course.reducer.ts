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

let couseKey: any = EnumRxKey.Course;

let newState: any = {
    loading: false, 
    moreLoading: false, 
    error: '', 
};

Object.keys(couseKey).forEach(key => {
    newState[key] = null;
    newState[`${key}Loading`] = false;
});

let loadingState: any = {};
Object.keys(couseKey).forEach(key => loadingState[`${key}Loading`] = false);

export const initialState: State = newState;

export const STATE_NAME = 'course';

const _courseReducer = createReducer(
    initialState,
    on(StoreAction.CourseParams, (state, action) => {
        return { ...state, loading: true, [`${action.key}Loading`]: true };
    }),
    on(StoreAction.CourseMoreParams, (state, action) => {
        return { ...state, loading: false, moreLoading: true };
    }),

    on(StoreAction.CourseList, (state, action) => {
        let listingKey: any = action.key;
        let data = action.data;
        return {...state, ...loadingState, [listingKey]: data, loading: false };
    }),

    on(StoreAction.CourseAdd, (state, action) => {
        let listingKey: any = action.key;
        let addCourse = reduxMatchPagination(state[listingKey], reduxListingAdd(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: addCourse, loading: false };
    }),

    on(StoreAction.CourseUpdate, (state, action) => {
        let listingKey: any = action.key;
        let updateCourse = reduxMatchPagination(state[listingKey], reduxListingUpdate(state[listingKey], action, listingKey));
        return {...state, ...loadingState, [listingKey]: updateCourse, loading: false };
    }),

    on(StoreAction.CourseDelete, (state, action) => {
        let listingKey: any = action.key;
        let deleteCourse = reduxMatchPagination(state[listingKey], reduxIDelete(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: deleteCourse, loading: false };
    }),

    on(StoreAction.CourseMore, (state, action) => {
        let listingKey: any = action.key;
        let moreCourse = reduxMatchPagination(state[listingKey], reduxAddArray(state[listingKey]?.items, action));
        return {...state, ...loadingState, [listingKey]: moreCourse, loading: false, moreLoading: false, };
    }),

    on(StoreAction.Failure, (state, action) => {
        let newState = { ...state, ...loadingState, error: action.error, loading: false, moreLoading: false };
        return newState;
    })
);

export function Reducer(state: any, action: any) {
    return _courseReducer(state, action);
}