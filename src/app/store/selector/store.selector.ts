import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnumRxKey, Enums } from 'src/app/enums';
import { DefaultReducer, ItemReducer, AuthReducer, UploadReducer, UserReducer, CatalogReducer, OrderReducer, NotificationReducer, GuestCartReducer, CourseReducer, SearchReducer, StaffReducer, ContactReducer, ReferenceReducer, RequestReducer, AdsReducer } from '../reducers';
import { notificationAdapter } from '../reducers/notification.reducer';


const defaultState = createFeatureSelector<DefaultReducer.State>(DefaultReducer.STATE_NAME);
const itemState = createFeatureSelector<ItemReducer.State>(ItemReducer.STATE_NAME);
const authState = createFeatureSelector<AuthReducer.State>(AuthReducer.STATE_NAME);
const uploadState = createFeatureSelector<UploadReducer.State>(UploadReducer.STATE_NAME);
const userState = createFeatureSelector<UserReducer.State>(UserReducer.STATE_NAME);
const catalogState = createFeatureSelector<CatalogReducer.State>(CatalogReducer.STATE_NAME);
const orderState = createFeatureSelector<OrderReducer.State>(OrderReducer.STATE_NAME);
const notificationState = createFeatureSelector<NotificationReducer.State>(NotificationReducer.STATE_NAME);
const guestCartState = createFeatureSelector<GuestCartReducer.State>(GuestCartReducer.STATE_NAME);
const courseState = createFeatureSelector<CourseReducer.State>(CourseReducer.STATE_NAME);
const searchState = createFeatureSelector<SearchReducer.State>(SearchReducer.STATE_NAME);
const staffState = createFeatureSelector<StaffReducer.State>(StaffReducer.STATE_NAME);
const ContactState = createFeatureSelector<ContactReducer.State>(ContactReducer.STATE_NAME);
const ReferenceState = createFeatureSelector<ReferenceReducer.State>(ReferenceReducer.STATE_NAME);
const RequestState = createFeatureSelector<RequestReducer.State>(RequestReducer.STATE_NAME);
const AdsState = createFeatureSelector<AdsReducer.State>(AdsReducer.STATE_NAME);

export const user = createSelector(authState, (state) => { return state.user; });
export const AuthLoading = createSelector(authState, (state) => { return state.loading; });

/**
    Default Selector
*/
export const DefaultLoading = createSelector(defaultState, state => state.loading);
export const DefaultLoadingKey: any = {};
export const DefaultSelectors: any = {};
Object.keys(EnumRxKey.Default).forEach(key => {
    DefaultSelectors[key] = createSelector(defaultState, (state) => { return state[key]; });
    DefaultLoadingKey[`${key}Loading`] = createSelector(defaultState, state => state[`${key}Loading`]);
});

/**
    Item Selector
*/
export const ItemMoreLoading = createSelector(itemState, state => state.moreLoading);
export const ItemSelectors: any = {};
export const ItemLoadingKey: any = {};
Object.keys(EnumRxKey.Item).forEach(key => {
    ItemSelectors[key] = createSelector(itemState, state => state[key]);
    ItemLoadingKey[`${key}Loading`] = createSelector(itemState, state => state[`${key}Loading`]);
});

/**
    Upload Selector
*/
export const UploadLoading = createSelector(uploadState, (state) => { return state.loading; });
export const UploadFiles = createSelector(uploadState, (state) => { return state.files; });
export const UploadProgress = createSelector(uploadState, (state) => { return state.progress; });

/**
    User Selector
*/
export const ProfileLoading = createSelector(userState, state => state.loading);
export const UserLoading = createSelector(userState, state => state.loading);
export const UserMoreLoading = createSelector(userState, state => state.moreLoading);
export const UserSelectors: any = {};
export const UserLoadingKey: any = {};
Object.keys(EnumRxKey.User).forEach(key => {
    UserSelectors[key] = createSelector(userState, state => state[key]);
    UserLoadingKey[`${key}Loading`] = createSelector(userState, state => state[`${key}Loading`]);
});

/**
    Catalog Selector
*/
export const CatalogLoading = createSelector(catalogState, state => state.loading);
export const CatalogMoreLoading = createSelector(catalogState, state => state.moreLoading);
export const CatalogSelectors: any = {};
export const CatalogLoadingKey: any = {};
Object.keys(EnumRxKey.Catalog).forEach(key => {
    CatalogSelectors[key] = createSelector(catalogState, state => state[key]);
    CatalogLoadingKey[`${key}Loading`] = createSelector(catalogState, state => state[`${key}Loading`]);
});

/**
    Order Selector
*/
export const OrderMoreLoading = createSelector(orderState, state => state.moreLoading);
export const OrderLoading = createSelector(orderState, state => state.loading);
export const OrderSelectors: any = {};
export const OrderLoadingKey: any = {};
Object.keys(EnumRxKey.Order).forEach(key => {
    OrderSelectors[key] = createSelector(orderState, state => state[key]);
    OrderLoadingKey[`${key}Loading`] = createSelector(orderState, state => state[`${key}Loading`]);
});

/**
    Notification Selector
*/
export const selectAll = notificationAdapter.getSelectors();
export const NotificationLoading = createSelector(notificationState, state => state.loaded);
export const NotificationPagination = createSelector(notificationState, state => state.pagination);
export const Notifications = createSelector(notificationState, selectAll.selectAll);

/**
    Guest Cart
*/
export const GuestCartLoading = createSelector(guestCartState, state => state.loading);
export const GuestCartList = createSelector(guestCartState, state => state.cart);

/**
    Course Selector
*/
export const CourseMoreLoading = createSelector(courseState, state => state.moreLoading);
export const CourseLoading = createSelector(courseState, state => state.loading);
export const CourseSelectors: any = {};
export const CourseLoadingKey: any = {};
Object.keys(EnumRxKey.Course).forEach(key => {
    CourseSelectors[key] = createSelector(courseState, state => state[key]);
    CourseLoadingKey[`${key}Loading`] = createSelector(courseState, state => state[`${key}Loading`]);
});

/**
    Search Selector
*/
export const SearchMoreLoading = createSelector(searchState, state => state.moreLoading);
export const SearchLoading = createSelector(searchState, state => state.loading);
export const SearchSelectors: any = {};
export const SearchLoadingKey: any = {};
Object.keys(EnumRxKey.Search).forEach(key => {
    SearchSelectors[key] = createSelector(searchState, state => state[key]);
    SearchLoadingKey[`${key}Loading`] = createSelector(searchState, state => state[`${key}Loading`]);
});


/**
    staff Selector
*/
export const StaffMoreLoading = createSelector(staffState, state => state.moreLoading);
export const StaffLoading = createSelector(staffState, state => state.loading);
export const StaffSelectors: any = {};
export const StaffLoadingKey: any = {};
Object.keys(EnumRxKey.Staff).forEach(key => {
    StaffSelectors[key] = createSelector(staffState, state => state[key]);
    StaffLoadingKey[`${key}Loading`] = createSelector(staffState, state => state[`${key}Loading`]);
});

/**
    User Contact Selector
*/
export const ContactMoreLoading = createSelector(ContactState, state => state.moreLoading);
export const ContactLoading = createSelector(ContactState, state => state.loading);
export const ContactSelectors: any = {};
export const ContactLoadingKey: any = {};
Object.keys(EnumRxKey.Contact).forEach(key => {
    ContactSelectors[key] = createSelector(ContactState, state => state[key]);
    ContactLoadingKey[`${key}Loading`] = createSelector(ContactState, state => state[`${key}Loading`]);
});

/**
    User Reference Selector
*/
export const ReferenceMoreLoading = createSelector(ReferenceState, state => state.moreLoading);
export const ReferenceLoading = createSelector(ReferenceState, state => state.loading);
export const ReferenceSelectors: any = {};
export const ReferenceLoadingKey: any = {};
Object.keys(EnumRxKey.Reference).forEach(key => {
    ReferenceSelectors[key] = createSelector(ReferenceState, state => state[key]);
    ReferenceLoadingKey[`${key}Loading`] = createSelector(ReferenceState, state => state[`${key}Loading`]);
});

/**
    User Request Selector
*/
export const RequestMoreLoading = createSelector(RequestState, state => state.moreLoading);
export const RequestLoading = createSelector(RequestState, state => state.loading);
export const RequestSelectors: any = {};
export const RequestLoadingKey: any = {};
Object.keys(EnumRxKey.Request).forEach(key => {
    RequestSelectors[key] = createSelector(RequestState, state => state[key]);
    RequestLoadingKey[`${key}Loading`] = createSelector(RequestState, state => state[`${key}Loading`]);
});

/**
    User Ads Selector
*/
export const AdsMoreLoading = createSelector(AdsState, state => state.moreLoading);
export const AdsLoading = createSelector(AdsState, state => state.loading);
export const AdsSelectors: any = {};
export const AdsLoadingKey: any = {};
Object.keys(EnumRxKey.Ads).forEach(key => {
    AdsSelectors[key] = createSelector(AdsState, state => state[key]);
    AdsLoadingKey[`${key}Loading`] = createSelector(AdsState, state => state[`${key}Loading`]);
});