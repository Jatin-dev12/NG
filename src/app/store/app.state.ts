import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { AuthReducer, DefaultReducer, ItemReducer, UploadReducer, UserReducer, CatalogReducer, OrderReducer, NotificationReducer, SearchReducer, StaffReducer, ContactReducer, ReferenceReducer, RequestReducer, AdsReducer } from "./reducers";

export interface AppState {
    [AuthReducer.STATE_NAME]: AuthReducer.State;
    [DefaultReducer.STATE_NAME]: DefaultReducer.State;
    [ItemReducer.STATE_NAME]: ItemReducer.State;
    [UploadReducer.STATE_NAME]: UploadReducer.State;
    [UserReducer.STATE_NAME]: UserReducer.State;
    [CatalogReducer.STATE_NAME]: CatalogReducer.State;
    [OrderReducer.STATE_NAME]: OrderReducer.State;
    [NotificationReducer.STATE_NAME]: NotificationReducer.State;
    [SearchReducer.STATE_NAME]: SearchReducer.State;
    [StaffReducer.STATE_NAME]: StaffReducer.State;
    [ContactReducer.STATE_NAME]: ContactReducer.State;
    [ReferenceReducer.STATE_NAME]: ReferenceReducer.State;
    [RequestReducer.STATE_NAME]: RequestReducer.State;
    [AdsReducer.STATE_NAME]: AdsReducer.State;
    router: RouterReducerState;
}

export const appReducer = {
    [AuthReducer.STATE_NAME]: AuthReducer.Reducer,
    [DefaultReducer.STATE_NAME]: DefaultReducer.Reducer,
    [ItemReducer.STATE_NAME]: ItemReducer.Reducer,
    [UploadReducer.STATE_NAME]: UploadReducer.Reducer,
    [UserReducer.STATE_NAME]: UserReducer.Reducer,
    [CatalogReducer.STATE_NAME]: CatalogReducer.Reducer,
    [OrderReducer.STATE_NAME]: OrderReducer.Reducer,
    [NotificationReducer.STATE_NAME]: NotificationReducer.Reducer,
    [SearchReducer.STATE_NAME]: SearchReducer.Reducer,
    [StaffReducer.STATE_NAME]: StaffReducer.Reducer,
    [ContactReducer.STATE_NAME]: ContactReducer.Reducer,
    [ReferenceReducer.STATE_NAME]: ReferenceReducer.Reducer,
    [RequestReducer.STATE_NAME]: RequestReducer.Reducer,
    [AdsReducer.STATE_NAME]: AdsReducer.Reducer,
    router: routerReducer,
};
