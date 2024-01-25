import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { EnumRxKey, Enums } from "src/app/enums";
import { Notifications } from "src/app/models";


/**
  Auth Action
 */
export const AuthParams = createAction(
    '[AUTH_PARAMS] Auth Params',
    props<{ params: any; params2: any, url?: any }>()
);
export const OauthParams = createAction(
    '[OAUTH_PARAMS] Oauth Params',
    props<{ params: any; params2: any }>()
);
export const LoginSuccess = createAction(
    '[AUTH_SUCCESS] Auth Success',
    props<{ user: any; redirect?: boolean, url?: string }>()
);

/**
    Default Action
*/

export const DefaultParams = createAction(
    '[DEFAULT_PARAMS] Default Params',
    props<{method: string, params?: any, params2?: any, key?: string, url?: any, msg?: any}>()
);

export const DefaultMoreParams = createAction(
    '[DEFAULT_MORE_PARAMS] Default More Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string }>()
);

export const DefaultList = createAction(
    `[DEFAULT_LIST] Default List`,
    props<{ data: any, key?: string }>()
);

export const DefaultAdd = createAction(
    `[DEFAULT_ADD] Default Add`,
    props<{ item: any, key?: string, sort?: string }>()
);

export const DefaultReset = createAction(
    `[DEFAULT_ADD] Default Add`,
    props<{ item: any, key?: string }>()
);

export const DefaultUpdate = createAction(
    `[DEFAULT_UPDATE] Default Update`,
    props<{ item: any, key?: string }>()
);

export const DefaultDelete = createAction(
    `[DEFAULT_DELETE] Default Delete`,
    props<{ item: any, key?: string }>()
);

export const DefaultMore = createAction(
    `[DEFAULT_MORE] Default More`,
    props<{ item: any, key?: string }>()
);

/*export let DefaultParams: any = {};
Object.keys(EnumRxKey.Default).forEach(key => {
    DefaultParams[key] = createAction(
        `[DEFAULT_${key.toUpperCase()}_PARAMS] Default ${key} Params`,
        props<{ method: string, params?: any, params2?: any, key?: string }>()
    );
});
export let Default: any = {};
Object.keys(EnumRxKey.Default).forEach(key => {
    Default[key] = createAction(
        `[DEFAULT_${key.toUpperCase()}] Default ${key}`,
        props<{ data: any, key?: string }>()
    );
});
export const DefaultUpdate = createAction(
    `[DEFAULT_UPDATE] Default Update`,
    props<{ item: any, key?: string }>()
);

export const DefaultMoreParams: any = {};
Object.keys(EnumRxKey.Default).forEach(key => {
    DefaultMoreParams[key] = createAction(
        `[DEFAULT_MORE_${key.toUpperCase()}_PARAMS] Default More ${key} Params`,
        props<{ method: string, params?: any, params2?: any, key?: string }>()
    );
});

export const DefaultMore = createAction(
    `[DEFAULT_MORE] Default More`,
    props<{ item: any, key?: string }>()
);*/

/**
    Item Action
*/

export const ItemParams = createAction(
    '[ITEM_PARAMS] Item Params',
    props<{method: string, params?: any, params2?: any, key?: string, url?: string}>()
);

export const ItemMoreParams = createAction(
    '[ITEM_MORE_PARAMS] Item More Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string }>()
);

export const ItemList = createAction(
    `[ITEM_LIST] Item List`,
    props<{ data: any, key?: string }>()
);

export const ItemAdd = createAction(
    `[ITEM_ADD] Item Add`,
    props<{ item: any, key?: string, sort?: string }>()
);

export const ItemUpdate = createAction(
    `[ITEM_UPDATE] Item Update`,
    props<{ item: any, key?: string }>()
);

export const ItemDelete = createAction(
    `[ITEM_DELETE] Item Delete`,
    props<{ item: any, key?: string }>()
);

export const ItemMore = createAction(
    `[ITEM_MORE] Item More`,
    props<{ item: any, key?: string }>()
);

/**
    Notification Action
*/
export const NotificationParams = createAction(
    '[NOTIFICATION_PARAMS] Notification Params',
    props<{ method: string, params?: any; params2?: any, key?: any, item?: any }>()
);

export const NotificationList = createAction(
    '[NOTIFICATION_LIST] Notification List',
    props<{ data: any, key?: string, update: Update<Notifications> }>()
);

/**
    Upload Action
*/
export const UploadParams = createAction(
    '[UPLOAD_PARAMS] Params',
    props<{ params?: any, upload?: any, key?: string | 'upload' }>()
);

export const UploadRespond = createAction(
    '[UPLOAD_RESPONSE] Response',
    props<{ files: any }>()
);

export const UploadProgress = createAction(
    '[UPLOAD_PROGRESS] Progress',
    props<{ progress: any }>()
);

export const UploadDelete = createAction(
    'UPLOAD_DELETE Delete',
    props<{ item: any }>()
);

export const UploadClear = createAction(
    '[UPLOAD_CLEAR] Clear',
    props<{ item: any }>()
);

/**
    User Action
*/
export const ProfileParams = createAction(
    '[USER_PROFILE_PARAMS] User Profile Params',
    props<{method: string, params?: any, params2?: any, key?: string, url?: string }>()
);

export const UserParams = createAction(
    '[USER_PARAMS] User Params',
    props<{method: string, params?: any, params2?: any, key?: string, url?: any, sort?: any, msg?: any}>()
);

export const UserMoreParams = createAction(
    '[USER_MORE_PARAMS] User More Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string }>()
);

export const UserList = createAction(
    `[USER_PROFILE_LIST] User Profile List`,
    props<{ data: any, key?: string }>()
);

export const UserAdd = createAction(
    `[USER_PROFILE_ADD] User Profile Add`,
    props<{ item: any, key?: string, sort?: string }>()
);

export const UserUpdate = createAction(
    `[USER_PROFILE_UPDATE] User Profile Update`,
    props<{ item: any, key?: string }>()
);

export const UserDelete = createAction(
    `[USER_PROFILE_DELETE] User Profile Delete`,
    props<{ item: any, key?: string }>()
);

export const UserMore = createAction(
    `[USER_PROFILE_MORE] User Profile More`,
    props<{ item: any, key?: string }>()
);

/**
    Catalog Action
*/
export const CatalogParams = createAction(
    '[CATALOG_PARAMS] Catalog Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string, url?: any, msg?: any }>()
);

export const TagTypesParams = createAction(
    '[CATALOG_TAG_TYPES_PARAMS] Catalog tag types Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string, url?: any, msg?: any }>()
);

export const CategoriesParams = createAction(
    '[CATEGORIES_PARAMS] CATEGORIES Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string, url?: any, msg?: any }>()
);

export const CatalogMoreParams = createAction(
    '[CATALOG_MORE_PARAMS] Catalog More Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string }>()
);

export const CatalogList = createAction(
    `[CATALOG_COMMONLIST] Catalog Common List`,
    props<{ data: any, key?: string }>()
);

export const CatalogAdd = createAction(
    `[CATALOG_COMMONADD] Catalog Common Add`,
    props<{ item: any, key?: string, sort?: string }>()
);

export const CatalogUpdate = createAction(
    `[CATALOG_COMMONUPDATE] Catalog Common Update`,
    props<{ item: any, key?: string }>()
);

export const CatalogDelete = createAction(
    `[CATALOG_COMMONDELETE] Catalog Common Delete`,
    props<{ item: any, key?: string }>()
);

export const CatalogMore = createAction(
    `[CATALOG_COMMONMORE] Catalog Common More`,
    props<{ item: any, key?: string }>()
);

/**
    Order Action
*/

export const OrderParams = createAction(
    '[ORDER_PARAMS] Order Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string, url?: string }>()
);

export const OrderMoreParams = createAction(
    '[ORDER_MORE_PARAMS] Order Params',
    props<{ params: any, params2: any, key?: string }>()
);

export const MilestoneParams = createAction(
    '[MILESTONE_PARAMS] Milestone Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string, url?: string }>()
);

export const OrderList = createAction(
    `[ORDER_LIST] Order List`,
    props<{ data: any, key?: string }>()
);

export const OrderAdd = createAction(
    `[ORDER_ADD] Order Add`,
    props<{ item: any, key?: string, sort?: string }>()
);

export const OrderUpdate = createAction(
    `[ORDER_UPDATE] Order Update`,
    props<{ item: any, key?: string }>()
);

export const OrderDelete = createAction(
    `[ORDER_DELETE] Order Delete`,
    props<{ item: any, key?: string }>()
);

export const OrderMore = createAction(
    `[ORDER_MORE] Order More`,
    props<{ item: any, key?: string }>()
);

// Guest Cart
export const GuestCartParams = createAction(
    '[GUEST_CART_PARAMS] Guest Cart Params',
    props<{ params: any, params2: any, key?: string | 'list' }>()
);

export const GuestCartList = createAction(
    `[GUEST_CART_LIST] Guest Cart List`,
    props<{ data: any, key?: string }>()
);

export const GuestCartAdd = createAction(
    `[GUEST_CART_ADD] Guest Cart Add`,
    props<{ item: any, key?: string, sort?: string }>()
);

export const GuestCartUpdate = createAction(
    `[GUEST_CART_UPDATE] Guest Cart Update`,
    props<{ item: any, key?: string }>()
);

export const GuestCartDelete = createAction(
    `[GUEST_CART_DELETE] Guest Cart Delete`,
    props<{ item: any, key?: string }>()
);

/**
    Course Action
*/

export const CourseParams = createAction(
    '[COURSE_PARAMS] Course Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string, url?: string }>()
);

export const CourseMoreParams = createAction(
    '[COURSE_MORE_PARAMS] Course Params',
    props<{ params: any, params2: any, key?: string }>()
);

export const CourseList = createAction(
    `[COURSE_LIST] Course List`,
    props<{ data: any, key?: string }>()
);

export const CourseAdd = createAction(
    `[COURSE_ADD] Course Add`,
    props<{ item: any, key?: string, sort?: string }>()
);

export const CourseUpdate = createAction(
    `[COURSE_UPDATE] Course Update`,
    props<{ item: any, key?: string }>()
);

export const CourseDelete = createAction(
    `[COURSE_DELETE] Course Delete`,
    props<{ item: any, key?: string }>()
);

export const CourseMore = createAction(
    `[COURSE_MORE] Course More`,
    props<{ item: any, key?: string }>()
);

/**
    Search Action
*/

export const SearchParams = createAction(
    '[SEARCH_PARAMS] Search Params',
    props<{ method: string | 'GET', params: any, params2?: any, key?: string, url?: any, sort?: any, msg?: any }>()
);

export const SearchMoreParams = createAction(
    '[SEARCH_MORE_PARAMS] Search Params',
    props<{ params: any, params2: any, key?: string }>()
);

export const SearchList = createAction(
    `[SEARCH_LIST] Search List`,
    props<{ data: any, key?: string }>()
);

export const SearchAdd = createAction(
    `[SEARCH_ADD] Search Add`,
    props<{ item: any, key?: string, sort?: string }>()
);

export const SearchUpdate = createAction(
    `[SEARCH_UPDATE] Search Update`,
    props<{ item: any, key?: string }>()
);

export const SearchDelete = createAction(
    `[SEARCH_DELETE] Search Delete`,
    props<{ item: any, key?: string }>()
);

export const SearchMore = createAction(
    `[SEARCH_MORE] Search More`,
    props<{ item: any, key?: string }>()
);

/**
    User Contact Action
*/
export const ContactParams = createAction(
    '[CONTACT_PARAMS] User Contact Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string, url?: string, sort?: any, msg?: any }>()
);

export const ContactMoreParams = createAction(
    '[CONTACT_MORE_PARAMS] User Contact Params',
    props<{ params: any, params2: any, key?: string }>()
);

export const ContactList = createAction(
    `[CONTACT_LIST] User Contact List`,
    props<{ data: any, key?: string }>()
);

export const ContactAdd = createAction(
    `[CONTACT_ADD] User Contact Add`,
    props<{ item: any, key?: string, sort?: string }>()
);

export const ContactUpdate = createAction(
    `[CONTACT_UPDATE] User Contact Update`,
    props<{ item: any, key?: string }>()
);

export const ContactDelete = createAction(
    `[CONTACT_DELETE] User Contact Delete`,
    props<{ item: any, key?: string }>()
);

export const ContactMore = createAction(
    `[CONTACT_MORE] User Contact More`,
    props<{ item: any, key?: string }>()
);

/**
    User Reference Action
*/
export const ReferenceParams = createAction(
    '[REFERENCE_PARAMS] User Reference Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string, url?: string, sort?: any, msg?: any }>()
);

export const ReferenceMoreParams = createAction(
    '[REFERENCE_MORE_PARAMS] User Reference Params',
    props<{ params: any, params2: any, key?: string }>()
);

export const ReferenceList = createAction(
    `[REFERENCE_LIST] User Reference List`,
    props<{ data: any, key?: string }>()
);

export const ReferenceAdd = createAction(
    `[REFERENCE_ADD] User Reference Add`,
    props<{ item: any, key?: string, sort?: string }>()
);

export const ReferenceUpdate = createAction(
    `[REFERENCE_UPDATE] User Reference Update`,
    props<{ item: any, key?: string }>()
);

export const ReferenceDelete = createAction(
    `[REFERENCE_DELETE] User Reference Delete`,
    props<{ item: any, key?: string }>()
);

export const ReferenceMore = createAction(
    `[REFERENCE_MORE] User Reference More`,
    props<{ item: any, key?: string }>()
);


/**
    User Request Action
*/
export const RequestParams = createAction(
    '[REQUEST_PARAMS] User Request Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string, url?: string, sort?: any, msg?: any }>()
);

export const RequestMoreParams = createAction(
    '[REQUEST_MORE_PARAMS] User Request Params',
    props<{ params: any, params2: any, key?: string }>()
);

export const RequestList = createAction(
    `[REQUEST_LIST] User Request List`,
    props<{ data: any, key?: string }>()
);

export const RequestAdd = createAction(
    `[REQUEST_ADD] User Request Add`,
    props<{ item: any, key?: string, sort?: string }>()
);

export const RequestUpdate = createAction(
    `[REQUEST_UPDATE] User Request Update`,
    props<{ item: any, key?: string }>()
);

export const RequestDelete = createAction(
    `[REQUEST_DELETE] User Request Delete`,
    props<{ item: any, key?: string }>()
);

export const RequestMore = createAction(
    `[REQUEST_MORE] User Request More`,
    props<{ item: any, key?: string }>()
);


/**
    User Ads Action
*/
export const AdsParams = createAction(
    '[ADS_PARAMS] User Ads Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string, url?: string, sort?: any, msg?: any }>()
);

export const AdsMoreParams = createAction(
    '[ADS_MORE_PARAMS] User Ads Params',
    props<{ params: any, params2: any, key?: string }>()
);

export const AdsList = createAction(
    `[ADS_LIST] User Ads List`,
    props<{ data: any, key?: string }>()
);

export const AdsAdd = createAction(
    `[ADS_ADD] User Ads Add`,
    props<{ item: any, key?: string, sort?: string }>()
);

export const AdsUpdate = createAction(
    `[ADS_UPDATE] User Ads Update`,
    props<{ item: any, key?: string }>()
);

export const AdsDelete = createAction(
    `[ADS_DELETE] User Ads Delete`,
    props<{ item: any, key?: string }>()
);

export const AdsMore = createAction(
    `[ADS_MORE] User Ads More`,
    props<{ item: any, key?: string }>()
);


/**
    User Staff Action
*/
export const StaffParams = createAction(
    '[STAFF_PARAMS] User Staff Params',
    props<{ method: string | 'GET', params: any, params2: any, key?: string, url?: any, sort?: any, msg?: any }>()
);

export const StaffMoreParams = createAction(
    '[STAFF_MORE_PARAMS] User Staff Params',
    props<{ params: any, params2: any, key?: string }>()
);

export const StaffList = createAction(
    `[STAFF_LIST] User Staff List`,
    props<{ data: any, key?: string }>()
);

export const StaffAdd = createAction(
    `[STAFF_ADD] User Staff Add`,
    props<{ item: any, key?: string, sort?: string }>()
);

export const StaffUpdate = createAction(
    `[STAFF_UPDATE] User Staff Update`,
    props<{ item: any, key?: string }>()
);

export const StaffDelete = createAction(
    `[STAFF_DELETE] User Staff Delete`,
    props<{ item: any, key?: string }>()
);

export const StaffMore = createAction(
    `[STAFF_MORE] User Staff More`,
    props<{ item: any, key?: string }>()
);


// Extra Actions
export const NdisParams = createAction(
    `[NDIS_PARAMS] Ndis Params`,
    props<{ method: string, params?: any, params2?: any, key?: string }>()
);

export const SupportParams = createAction(
    '[SUPPORT_PARAMS] Support Params',
    props<{method: string, params?: any, params2?: any, key?: string, url?: string}>()
);

export const Failure = createAction(
    '[DEFAULT_FAILURE] Default failed',
    props<{ error: any }>()
);