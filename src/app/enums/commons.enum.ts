export namespace Enums {

    // Role
    export const ROLE_ADMIN = 'Admin';
    export const ROLE_SYSTEM = 'System';
    export const ROLE_USER = 'User';
    export const ROLE_PROVIDER = 'Owner';
    export const ROLE_OWNER = 'Owner';
    export const ROLE_MANAGERS = 'Managers';
    export const ROLE_VENDORS = 'Vendors';
    export const ROLE_STAFF = 'Staff';
    export const ROLE_GUEST = 'Guest';
    export const ROLE_GENERAL = 'General';

    export enum Role {
        ROLE_ADMIN = 'Admin',
        ROLE_SYSTEM = 'System',
        ROLE_USER = 'User',
        ROLE_OWNER = 'Owner',
        ROLE_MANAGERS = 'Managers',
        ROLE_VENDORS = 'Vendors',
        ROLE_STAFF = 'Staff',
        ROLE_GUEST = 'Guest',
        ROLE_GENERAL = 'General',
    }

    export const RoleArray = [
        //{ role: ROLE_GENERAL, name: ROLE_GENERAL },
        { role: ROLE_GUEST, name: ROLE_GUEST },
        { role: ROLE_MANAGERS, name: ROLE_MANAGERS },
        { role: ROLE_OWNER, name: ROLE_OWNER },
        //{ role: ROLE_STAFF, name: ROLE_STAFF },
        { role: ROLE_USER, name: 'Tenant' }, 

        { role: ROLE_VENDORS, name: ROLE_VENDORS },
    ]

    // Settings

    export const STATUS_ACTIVE = 1;
    export const STATUS_DEACTIVE = 0;

    export enum enumStatus {
        STATUS_ACTIVE = 'Yes',
        STATUS_DEACTIVE = 'No',
    };

    export const CORE_CMS_ITEM_MODULE_ID_PAGE = 'page';
    export const CORE_CMS_ITEM_MODULE_ID_BLOG = 'blog';
    export const CORE_CMS_ITEM_MODULE_ID_FAQ = 'jobs';
    export const CORE_CMS_ITEM_MODULE_ID_TOPIC = 'topic';
    export const CORE_CMS_ITEM_MODULE_ID_EVENT = 'event';

    export enum CmsType {
        CORE_CMS_ITEM_MODULE_ID_PAGE = 'Page',
        CORE_CMS_ITEM_MODULE_ID_BLOG = 'Blog',
        CORE_CMS_ITEM_MODULE_ID_FAQ = 'Faq',
        CORE_CMS_ITEM_MODULE_ID_TOPIC = 'Topic',
        CORE_CMS_ITEM_MODULE_ID_EVENT = 'Events',
    };

    export const CORE_CMS_ITEM_RESTRICTED_YES = 1;
    export const CORE_CMS_ITEM_RESTRICTED_NO = 2;

    export enum CoreCmsItemRestricted {
        CORE_CMS_ITEM_RESTRICTED_YES = 'Yes',
        CORE_CMS_ITEM_RESTRICTED_NO = 'No'
    };

    export const CORE_CMS_ITEM_STATUS_YES = 1;
    export const CORE_CMS_ITEM_STATUS_NO = 0;

    export enum CoreCmsItemStatus {
        CORE_CMS_ITEM_STATUS_YES = 'Yes',
        CORE_CMS_ITEM_STATUS_NO = 'No'
    };

    export const CORE_CMS_KEYWORD_STATUS_YES = 1;
    export const CORE_CMS_KEYWORD_STATUS_NO = 0;

    export enum CoreCmsKeywordStatus {
        CORE_CMS_KEYWORD_STATUS_YES = 'Yes',
        CORE_CMS_KEYWORD_STATUS_NO = 'No'
    };

    export const CORE_CMS_LAYOUT_STATUS_YES = 1;
    export const CORE_CMS_LAYOUT_STATUS_NO = 0;

    export enum CoreCmsLayoutStatus {
        CORE_CMS_LAYOUT_STATUS_YES = 'Yes',
        CORE_CMS_LAYOUT_STATUS_NO = 'No'
    };

    export const CORE_CONFIG_IS_ENCRYPTED_YES = 1;
    export const CORE_CONFIG_IS_ENCRYPTED_NO = 0;
    export enum CoreConfigIsEncrypted {
        CORE_CONFIG_IS_ENCRYPTED_YES = 'Yes',
        CORE_CONFIG_IS_ENCRYPTED_NO = 'No'
    };

    export const CORE_CONFIG_STATUS_YES = 1;
    export const CORE_CONFIG_STATUS_NO = 0;
    export enum CoreConfigStatus {
        CORE_CONFIG_STATUS_YES = 'Yes',
        CORE_CONFIG_STATUS_NO = 'No'
    };


    export const CORE_COUNTRIES_STATUS_YES = 1;
    export const CORE_COUNTRIES_STATUS_NO = 0;
    export enum CoreCountriesStatus {
        CORE_COUNTRIES_STATUS_YES = 'Yes',
        CORE_COUNTRIES_STATUS_NO = 'No'
    };

    export const CORE_CRON_ACTIVE_YES = 1;
    export const CORE_CRON_ACTIVE_NO = 0;

    export enum CoreCronActive {
        CORE_CRON_ACTIVE_YES = 'Yes',
        CORE_CRON_ACTIVE_NO = 'No'
    };

    export const CORE_FIELD_STATUS_YES = 1;
    export const CORE_FIELD_STATUS_NO = 0;
    export enum CoreFieldStatus {
        CORE_FIELD_STATUS_YES = 'Yes',
        CORE_FIELD_STATUS_NO = 'No'
    };

    export const CORE_FIELD_SECTION_STATUS_YES = 1;
    export const CORE_FIELD_SECTION_STATUS_NO = 0;
    export enum CoreFieldSectionStatus {
        CORE_FIELD_SECTION_STATUS_YES = 'Yes',
        CORE_FIELD_SECTION_STATUS_NO = 'No'
    };

    export const CORE_FORUM_CATEGORY_STATUS_YES = 1;
    export const CORE_FORUM_CATEGORY_STATUS_NO = 0;
    export enum CoreForumCategoryStatus {
        CORE_FORUM_CATEGORY_STATUS_YES = 'Yes',
        CORE_FORUM_CATEGORY_STATUS_NO = 'No'
    };

    export const CORE_FORUM_ITEM_STATUS_YES = 1;
    export const CORE_FORUM_ITEM_STATUS_NO = 0;
    export enum CoreForumItemStatus {
        CORE_FORUM_ITEM_STATUS_YES = 'Yes',
        CORE_FORUM_ITEM_STATUS_NO = 'No'
    };

    export const CORE_MAIL_STATUS_YES = 1;
    export const CORE_MAIL_STATUS_NO = 0;

    export enum CoreMailStatus {
        CORE_MAIL_STATUS_YES = 'Yes',
        CORE_MAIL_STATUS_NO = 'No'
    };


    export const CORE_MAIL_TEMPLATE_TYPE_TEXT = 'text';
    export const CORE_MAIL_TEMPLATE_TYPE_HTML = 'html';
    export const CORE_MAIL_TEMPLATE_TYPE_BOTH = 'Both';

    export enum CoreMailTemplateType {
        CORE_MAIL_TEMPLATE_TYPE_TEXT = 'Text',
        CORE_MAIL_TEMPLATE_TYPE_HTML = 'Html',
        CORE_MAIL_TEMPLATE_TYPE_BOTH = 'Both',
    };

    export const CORE_MAIL_TEMPLATE_IS_CC_YES = '1';
    export const CORE_MAIL_TEMPLATE_IS_CC_NO = '0';

    export enum CoreMailTemplateIsCc {
        CORE_MAIL_TEMPLATE_IS_CC_YES = 'Yes',
        CORE_MAIL_TEMPLATE_IS_CC_NO = 'No',
    };

    const CORE_MAIL_TEMPLATE_PATH_LAYOUTS = 'layouts';

    export const CORE_MEDIA_MIME_TYPE_IMAGE = 'image';
    export const CORE_MEDIA_MIME_TYPE_VIDEO = 'video';

    export enum CoreMediaMimeType {
        CORE_MEDIA_MIME_TYPE_IMAGE = 'image',
        CORE_MEDIA_MIME_TYPE_VIDEO = 'video',
    };

    export const CORE_MEDIA_STATUS_YES = 1;
    export const CORE_MEDIA_STATUS_NO = 0;
    export enum CoreMediaStatus {
        CORE_MEDIA_STATUS_YES = 'Yes',
        CORE_MEDIA_STATUS_NO = 'No',
    };

    export const CORE_MEDIA_ITEM_PRIVACY_YES = 1;
    export const CORE_MEDIA_ITEM_PRIVACY_NO = 0;
    export enum CoreMediaItemPrivacy {
        CORE_MEDIA_ITEM_PRIVACY_YES = 'Yes',
        CORE_MEDIA_ITEM_PRIVACY_NO = 'No',
    };
    export const CORE_MEDIA_ITEM_STATUS_YES = 1;
    export const CORE_MEDIA_ITEM_STATUS_NO = 0;
    export enum CoreMediaItemStatus {
        CORE_MEDIA_ITEM_STATUS_YES = 'Yes',
        CORE_MEDIA_ITEM_STATUS_NO = 'No',
    };

    export const CORE_MODULE_STATUS_YES = 1;
    export const CORE_MODULE_STATUS_NO = 0;

    export enum CoreModuleStatus {
        CORE_MODULE_STATUS_YES = 'Yes',
        CORE_MODULE_STATUS_NO = 'No',
    };


    export const CORE_NOTIFICATION_STATUS_ACTIVATED = 'Active';
    export const CORE_NOTIFICATION_STATUS_DEACTIVATED = 'De-Active';
    export const CORE_NOTIFICATION_STATUS_READ = 'Read';
    export const CORE_NOTIFICATION_STATUS_UNREAD = 'UnRead';
    export const CORE_NOTIFICATION_STATUS_DELETED = 'Deleted';
    export const CORE_NOTIFICATION_STATUS_SPAN = 'Span';
    export const CORE_NOTIFICATION_STATUS_ARCHIVED = 'Archived';

    export enum CoreNotificationStatus {
        CORE_NOTIFICATION_STATUS_ACTIVATED = 'Active',
        CORE_NOTIFICATION_STATUS_DEACTIVATED = 'De-Active',
        CORE_NOTIFICATION_STATUS_READ = 'Read',
        CORE_NOTIFICATION_STATUS_UNREAD = 'UnRead',
        CORE_NOTIFICATION_STATUS_DELETED = 'Deleted',
        CORE_NOTIFICATION_STATUS_SPAN = 'Span',
        CORE_NOTIFICATION_STATUS_ARCHIVED = 'Archived',
    };

    export const CORE_NOTIFICATION_ACTION_TYPE_SUCCESS = 'success';
    export const CORE_NOTIFICATION_ACTION_TYPE_NOTIFY = 'notify';
    export const CORE_NOTIFICATION_ACTION_TYPE_WARNING = 'warning';
    export const CORE_NOTIFICATION_ACTION_TYPE_ALERT = 'alert';
    export const CORE_NOTIFICATION_ACTION_TYPE_ERROR = 'error';
    export enum CoreNotificationActionType {
        CORE_NOTIFICATION_ACTION_TYPE_SUCCESS = 'Success',
        CORE_NOTIFICATION_ACTION_TYPE_NOTIFY = 'Notify',
        CORE_NOTIFICATION_ACTION_TYPE_WARNING = 'Warning',
        CORE_NOTIFICATION_ACTION_TYPE_ALERT = 'Alert',
        CORE_NOTIFICATION_ACTION_TYPE_ERROR = 'Error',
    };


    export const CORE_NOTIFICATION_ACTION_IS_ADMIN_YES = 1;
    export const CORE_NOTIFICATION_ACTION_IS_ADMIN_NO = 0;
    export enum CoreNotificationActionIsAdmin {
        CORE_NOTIFICATION_ACTION_IS_ADMIN_YES = 'Yes',
        CORE_NOTIFICATION_ACTION_IS_ADMIN_NO = 'No',
    };

    export const CORE_NOTIFICATION_ACTION_IS_MAIL_YES = 1;
    export const CORE_NOTIFICATION_ACTION_IS_MAIL_NO = 0;
    export enum CoreNotificationActionIsMail {
        CORE_NOTIFICATION_ACTION_IS_MAIL_YES = 'Yes',
        CORE_NOTIFICATION_ACTION_IS_MAIL_NO = 'No',
    };

    export const CORE_NOTIFICATION_ACTION_IS_SETTING_DISABLE = 'Null';
    export const CORE_NOTIFICATION_ACTION_IS_SETTING_USER = 1;
    export const CORE_NOTIFICATION_ACTION_IS_SETTING_ADMIN = 2;

    export enum CoreNotificationActionIsSetting {
        CORE_NOTIFICATION_ACTION_IS_SETTING_DISABLE = 'Disabled',
        CORE_NOTIFICATION_ACTION_IS_SETTING_USER = 'Only User',
        CORE_NOTIFICATION_ACTION_IS_SETTING_ADMIN = 'Only Admin',

    };

    export const CORE_NOTIFICATION_ACTION_IS_FCM_YES = 1;
    export const CORE_NOTIFICATION_ACTION_IS_FCM_NO = 0;
    export enum CoreNotificationActionIsFcm {
        CORE_NOTIFICATION_ACTION_IS_FCM_YES = 'Yes',
        CORE_NOTIFICATION_ACTION_IS_FCM_NO = 'No',
    };
    export const CORE_NOTIFICATION_ACTION_IS_TRIGGER_YES = 1;
    export const CORE_NOTIFICATION_ACTION_IS_TRIGGER_NO = 0;
    export enum CoreNotificationActionIsTrigger {
        CORE_NOTIFICATION_ACTION_IS_TRIGGER_YES = 'Yes',
        CORE_NOTIFICATION_ACTION_IS_TRIGGER_NO = 'No',
    };
    export const CORE_NOTIFICATION_ACTION_IS_MESSAGE_YES = 1;
    export const CORE_NOTIFICATION_ACTION_IS_MESSAGE_NO = 0;
    export enum CoreNotificationActionIsMessage {
        CORE_NOTIFICATION_ACTION_IS_MESSAGE_YES = 'Yes',
        CORE_NOTIFICATION_ACTION_IS_MESSAGE_NO = 'No',
    };
    export const CORE_NOTIFICATION_ACTION_IS_SMS_YES = 1;
    export const CORE_NOTIFICATION_ACTION_IS_SMS_NO = 0;
    export enum CoreNotificationActionIsSms {
        CORE_NOTIFICATION_ACTION_IS_SMS_YES = 'Yes',
        CORE_NOTIFICATION_ACTION_IS_SMS_NO = 'No',
    };

    export const CORE_NOTIFICATION_ACTION_IS_RECEIVER_ALL = 0;
    export const CORE_NOTIFICATION_ACTION_IS_RECEIVER_ONLY_SENDER = 1;
    export const CORE_NOTIFICATION_ACTION_IS_RECEIVER_ONLY_RECEIVER = 2;
    export const CORE_NOTIFICATION_ACTION_IS_RECEIVER_NO_ANY = 'null';

    export enum CoreNotificationActionIsReceiver {
        CORE_NOTIFICATION_ACTION_IS_RECEIVER_ALL = 'Yes',
        CORE_NOTIFICATION_ACTION_IS_RECEIVER_ONLY_SENDER = 'No',
        CORE_NOTIFICATION_ACTION_IS_RECEIVER_ONLY_RECEIVER = 'No',
        CORE_NOTIFICATION_ACTION_IS_RECEIVER_NO_ANY = 'No',
    };


    export const CORE_NOTIFICATION_ACTION_STATUS_YES = 1;
    export const CORE_NOTIFICATION_ACTION_STATUS_NO = 0;
    export enum CoreNotificationActionStatus {
        CORE_NOTIFICATION_ACTION_STATUS_YES = 'Yes',
        CORE_NOTIFICATION_ACTION_STATUS_NO = 'No',
    };

    export const CORE_NOTIFICATION_RECIPIENTS_STATUS_READ = 'Read';
    export const CORE_NOTIFICATION_RECIPIENTS_STATUS_UNREAD = 'UnRead';
    export const CORE_NOTIFICATION_RECIPIENTS_STATUS_DELETED = 'Deleted';
    export const CORE_NOTIFICATION_RECIPIENTS_STATUS_SPAN = 'Span';
    export const CORE_NOTIFICATION_RECIPIENTS_STATUS_ARCHIVED = 'Archived';

    export enum CoreNotificationRecipientsStatus {
        CORE_NOTIFICATION_RECIPIENTS_STATUS_READ = 'Read',
        CORE_NOTIFICATION_RECIPIENTS_STATUS_UNREAD = 'UnRead',
        CORE_NOTIFICATION_RECIPIENTS_STATUS_DELETED = 'Deleted',
        CORE_NOTIFICATION_RECIPIENTS_STATUS_SPAN = 'Span',
        CORE_NOTIFICATION_RECIPIENTS_STATUS_ARCHIVED = 'Archived',
    };

    export const CORE_NOTIFICATION_USER_SETTING_STATUS_IS_ADMIN = 'admin';
    export const CORE_NOTIFICATION_USER_SETTING_STATUS_IS_NOTIFY = 'notify';
    export const CORE_NOTIFICATION_USER_SETTING_STATUS_IS_MAIL = 'mail';
    export const CORE_NOTIFICATION_USER_SETTING_STATUS_IS_FCM = 'fcm';
    export const CORE_NOTIFICATION_USER_SETTING_STATUS_IS_TRIGGER = 'trigger';
    export const CORE_NOTIFICATION_USER_SETTING_STATUS_IS_MESSAGE = 'message';
    export const CORE_NOTIFICATION_USER_SETTING_STATUS_IS_SMS = 'sms';
    export const CORE_NOTIFICATION_USER_SETTING_STATUS_YES = 'yes';
    export const CORE_NOTIFICATION_USER_SETTING_STATUS_NO = 'no';

    export const CoreNotificationUserSettingStatus = [
        { key: CORE_NOTIFICATION_USER_SETTING_STATUS_IS_ADMIN, value: 'Only Admin' },
        { key: CORE_NOTIFICATION_USER_SETTING_STATUS_IS_NOTIFY, value: 'Only Notify' },
        { key: CORE_NOTIFICATION_USER_SETTING_STATUS_IS_MAIL, value: 'Only Mail' },
        { key: CORE_NOTIFICATION_USER_SETTING_STATUS_IS_FCM, value: 'Is Fcm' },
        { key: CORE_NOTIFICATION_USER_SETTING_STATUS_IS_TRIGGER, value: 'Only Trigger' },
        { key: CORE_NOTIFICATION_USER_SETTING_STATUS_IS_MESSAGE, value: 'Only Message' },
        { key: CORE_NOTIFICATION_USER_SETTING_STATUS_IS_SMS, value: 'Only Sms' },
        { key: CORE_NOTIFICATION_USER_SETTING_STATUS_YES, value: 'Yes' },
        { key: CORE_NOTIFICATION_USER_SETTING_STATUS_NO, value: 'No' },
    ];

    /* Core Plan */

    export const CORE_PLAN_TRAIL_PLAN = 1;
    export const CORE_PLAN_FREE_PLAN = 1;

    export const CORE_PLAN_GATEWAY_NONE = 'none';
    export const CORE_PLAN_GATEWAY_PAYPAL = 'paypal';
    export const CORE_PLAN_GATEWAY_BRAINTREE = 'braintree';
    export const CORE_PLAN_GATEWAY_STRIPE = 'stripe';


    export enum CorePlanGateway {
        CORE_PLAN_GATEWAY_NONE = 'none',
        CORE_PLAN_GATEWAY_PAYPAL = 'paypal',
        CORE_PLAN_GATEWAY_BRAINTREE = 'braintree',
        CORE_PLAN_GATEWAY_STRIPE = 'stripe',
    };

    export const CORE_PLAN_PLAN_TYPE_FIXED = 'FIXED';
    export const CORE_PLAN_PLAN_TYPE_INFINITE = 'INFINITE';
    export const CORE_PLAN_PLAN_TYPE_NONE = 'None';

    export enum CorePlanPlanType {
        CORE_PLAN_PLAN_TYPE_FIXED = 'Fixed',
        CORE_PLAN_PLAN_TYPE_INFINITE = 'In-Finite',
        CORE_PLAN_PLAN_TYPE_NONE = 'None',
    };

    export const CORE_PLAN_PAYMENT_TYPE_TRIAL = 'TRIAL';
    export const CORE_PLAN_PAYMENT_TYPE_REGULAR = 'REGULAR';

    export enum CorePlanPaymentType {
        CORE_PLAN_PAYMENT_TYPE_TRIAL = 'TRIAL',
        CORE_PLAN_PAYMENT_TYPE_REGULAR = 'REGULAR',
    };

    export const CORE_PLAN_FREQUENCY_DAY = 'Day';
    export const CORE_PLAN_FREQUENCY_WEEK = 'Week';
    export const CORE_PLAN_FREQUENCY_MONTH = 'Month';
    export const CORE_PLAN_FREQUENCY_YEAR = 'Year';

    export enum CorePlanFrequency {
        CORE_PLAN_FREQUENCY_DAY = 'Day',
        CORE_PLAN_FREQUENCY_WEEK = 'Week',
        CORE_PLAN_FREQUENCY_MONTH = 'Month',
        CORE_PLAN_FREQUENCY_YEAR = 'Year',
    };

    export const CORE_PLAN_FREQUENCY_INTERVAL = '';
    export const CORE_PLAN_CYCLES = '';

    export const CORE_PLAN_STATUS_ACTIVE = 1;
    export const CORE_PLAN_STATUS_INACTIVE = 0;
    export const CORE_PLAN_STATUS_CREATED = 2;
    export const CORE_PLAN_STATUS_DELETED = 3;

    export enum CorePlanStatus {
        CORE_PLAN_STATUS_ACTIVE = 'Active',
        CORE_PLAN_STATUS_DELETED = 'Deleted',
        CORE_PLAN_STATUS_INACTIVE = 'InActive',
        CORE_PLAN_STATUS_CREATED = 'Created',
    };

    export const CORE_SEO_STATUS_YES = 1;
    export const CORE_SEO_STATUS_NO = 0;

    export enum CoreSeoStatus {
        CORE_SEO_STATUS_YES = 'Yes',
        CORE_SEO_STATUS_NO = 'No',
    };

    export const CORE_STATES_STATUS_YES = 1;
    export const CORE_STATES_STATUS_NO = 0;
    export enum CoreStatesStatus {
        CORE_STATES_STATUS_YES = 'Yes',
        CORE_STATES_STATUS_NO = 'No',
    };

    export const CORE_SUPPORT_IS_SYSTEM_YES = 1;
    export const CORE_SUPPORT_IS_SYSTEM_NO = 0;

    export enum CoreSupportIsSystem {
        CORE_SUPPORT_IS_SYSTEM_YES = 'Yes',
        CORE_SUPPORT_IS_SYSTEM_NO = 'No',
    };

    export const CORE_SUPPORT_STATUS_READ = 'Read';
    export const CORE_SUPPORT_STATUS_UNREAD = 'UnRead';
    export const CORE_SUPPORT_STATUS_DELETED = 'Deleted';
    export const CORE_SUPPORT_STATUS_SPAN = 'Span';
    export const CORE_SUPPORT_STATUS_ARCHIVED = 'Archived';
    export const CORE_SUPPORT_STATUS_OPEN = 'Open';
    export const CORE_SUPPORT_STATUS_CLOSED = 'Closed';

    export enum CoreSupportStatus {
        CORE_SUPPORT_STATUS_READ = 'Read',
        CORE_SUPPORT_STATUS_UNREAD = 'UnRead',
        CORE_SUPPORT_STATUS_DELETED = 'Deleted',
        CORE_SUPPORT_STATUS_SPAN = 'Span',
        CORE_SUPPORT_STATUS_ARCHIVED = 'Archived',
        CORE_SUPPORT_STATUS_OPEN = 'Open',
        CORE_SUPPORT_STATUS_CLOSED = 'Closed',
    };

    export const CORE_SUPPORT_GROUP_RECIPIENTS_STATUS_YES = 1;
    export const CORE_SUPPORT_GROUP_RECIPIENTS_STATUS_NO = 0;
    export enum CoreSupportGroupRecipientsStatus {
        CORE_SUPPORT_GROUP_RECIPIENTS_STATUS_YES = 'Yes',
        CORE_SUPPORT_GROUP_RECIPIENTS_STATUS_NO = 'No',
    };

    export const CORE_SUPPORT_INFO_STATUS_OPEN = 'open';
    export const CORE_SUPPORT_INFO_STATUS_CLOSED = 'closed';
    export enum CoreSupportInfoStatus {
        CORE_SUPPORT_INFO_STATUS_OPEN = 'open',
        CORE_SUPPORT_INFO_STATUS_CLOSED = 'closed',
    };

    export const CORE_SUPPORT_ITEM_STATUS_OPEN = 'open';
    export const CORE_SUPPORT_ITEM_STATUS_CLOSED = 'closed';
    export enum CoreSupportItemStatus {
        CORE_SUPPORT_ITEM_STATUS_OPEN = 'open',
        CORE_SUPPORT_ITEM_STATUS_CLOSED = 'closed',
    };

    export const CORE_SUPPORT_RECIPIENTS_STATUS_YES = 1;
    export const CORE_SUPPORT_RECIPIENTS_STATUS_NO = 0;
    export enum CoreSupportRecipientsStatus {
        CORE_SUPPORT_RECIPIENTS_STATUS_YES = 'Yes',
        CORE_SUPPORT_RECIPIENTS_STATUS_NO = 'No',
    };

    export const CORE_TAGS_STATUS_YES = 1;
    export const CORE_TAGS_STATUS_NO = 0;
    export enum CoreTagsStatus {
        CORE_TAGS_STATUS_YES = 'Yes',
        CORE_TAGS_STATUS_NO = 'No',
    };

    export const USER_STATUS_DELETED = 0;
    export const USER_STATUS_INACTIVE = 9;
    export const USER_STATUS_ACTIVE = 10;

    export enum UserStatus {
        USER_STATUS_DELETED = 'Deleted',
        USER_STATUS_INACTIVE = 'In-Active (Banned)',
        USER_STATUS_ACTIVE = 'Active',
    };


    export const USER_AVAILABILITY_STATUS_YES = 1;
    export const USER_AVAILABILITY_STATUS_NO = 0;
    export enum UserAvailabilityStatus {
        USER_AVAILABILITY_STATUS_YES = 'Yes',
        USER_AVAILABILITY_STATUS_NO = 'No',
    };

    export const USER_AWARD_STATUS_YES = 1;
    export const USER_AWARD_STATUS_NO = 0;
    export enum UserAwardStatus {
        USER_AWARD_STATUS_YES = 'Yes',
        USER_AWARD_STATUS_NO = 'No',
    };


    /* -- Catalog -- */
    export const USER_CATALOG_MODULE_ID_PRODUCTS = 'products';
    export const USER_CATALOG_MODULE_ID_SERVICES = 'services';
    export const USER_CATALOG_MODULE_ID_BOOKS = 'books';
    export const USER_CATALOG_MODULE_ID_JOBS = 'job';
    export const USER_CATALOG_MODULE_ID_AUCTION = 'auction';
    export const USER_CATALOG_MODULE_ID_TOPIC = 'topic';
    export const USER_CATALOG_MODULE_ID_QUESTION = 'question';
    export const USER_CATALOG_MODULE_ID_EVENT = 'event';
    export const USER_CATALOG_MODULE_ID_PROPERTY = 'property';
    export const USER_CATALOG_MODULE_ID_COURSE = 'course';
    export const USER_CATALOG_MODULE_ID_VIDEO = 'video';


    export enum UserCatalogModuleId {
        USER_CATALOG_MODULE_ID_PRODUCTS = 'Products',
        USER_CATALOG_MODULE_ID_SERVICES = 'Services',
        USER_CATALOG_MODULE_ID_BOOKS = 'Books',
        USER_CATALOG_MODULE_ID_JOBS = 'Job',
        USER_CATALOG_MODULE_ID_AUCTION = 'Auctions',
        USER_CATALOG_MODULE_ID_TOPIC = 'Topics',
        USER_CATALOG_MODULE_ID_QUESTION = 'Questions',
        USER_CATALOG_MODULE_ID_EVENT = 'Events',
        USER_CATALOG_MODULE_ID_PROPERTY = 'Properties',
        USER_CATALOG_MODULE_ID_COURSE = 'Courses',
        USER_CATALOG_MODULE_ID_VIDEO = 'Videos',
    };

    export const USER_CATALOG_IS_SUBTRACT_YES = 1;
    export const USER_CATALOG_IS_SUBTRACT_NO = 2;

    export enum CatalogIsSubtract {
        USER_CATALOG_IS_SUBTRACT_YES = 'Yes',
        USER_CATALOG_IS_SUBTRACT_NO = 'No',
    };

    export const USER_CATALOG_LENGTH_UNIT_MM = 1;
    export const USER_CATALOG_LENGTH_UNIT_CM = 2;
    export const USER_CATALOG_LENGTH_UNIT_IN = 3;

    export enum CatalogLengthUnit {
        USER_CATALOG_LENGTH_UNIT_MM = 'mm',
        USER_CATALOG_LENGTH_UNIT_CM = 'cm',
        USER_CATALOG_LENGTH_UNIT_IN = 'in',
    };

    export const USER_CATALOG_WEIGHT_UNIT_G = 1;
    export const USER_CATALOG_WEIGHT_UNIT_KG = 2;
    export const USER_CATALOG_WEIGHT_UNIT_LB = 3;
    export const USER_CATALOG_WEIGHT_UNIT_OZ = 4;

    export enum CatalogWeightUnit {
        USER_CATALOG_WEIGHT_UNIT_G = 'g',
        USER_CATALOG_WEIGHT_UNIT_KG = 'kg',
        USER_CATALOG_WEIGHT_UNIT_LB = 'lb',
        USER_CATALOG_WEIGHT_UNIT_OZ = 'oz',
    };

    export const USER_CATALOG_RECIPIENTS_STATUS_NONE = 0;
    export const USER_CATALOG_RECIPIENTS_STATUS_PENDING = 1;
    export const USER_CATALOG_RECIPIENTS_STATUS_CONFIRMED = 2;
    export const USER_CATALOG_RECIPIENTS_STATUS_DECLINED = 3;
    export const USER_CATALOG_REFERENCE_STATUS_PROPOSE = 4;
    export const USER_CATALOG_REFERENCE_STATUS_TERMINATE = 5;

    export enum CatalogRecipientsStatus {
        USER_CATALOG_RECIPIENTS_STATUS_PENDING = 'Pending',
        USER_CATALOG_RECIPIENTS_STATUS_CONFIRMED = 'Confirmed',
        USER_CATALOG_RECIPIENTS_STATUS_DECLINED = 'Declined',
        USER_CATALOG_REFERENCE_STATUS_PROPOSE = 'Propose',
        USER_CATALOG_REFERENCE_STATUS_TERMINATE = 'Propose',
    };

    export const USER_CATALOG_PROPERTY_PURPOSE_RENT = 'rent';
    export const USER_CATALOG_PROPERTY_PURPOSE_SALE = 'sale';

    export enum UserCatalogPropertyPurpose {
        USER_CATALOG_PROPERTY_PURPOSE_RENT = 'rent',
        USER_CATALOG_PROPERTY_PURPOSE_SALE = 'sale',
    };

    export const USER_CATALOG_PROPERTY_CLASSIFICATION_RESIDENTIAL = 'residential';
    export const USER_CATALOG_PROPERTY_CLASSIFICATION_COMMERCIALS = 'commercials';

    export enum UserCatalogPropertyClassification {
        USER_CATALOG_PROPERTY_CLASSIFICATION_RESIDENTIAL = 'Residential',
        USER_CATALOG_PROPERTY_CLASSIFICATION_COMMERCIALS = 'Commercials',
    };

    export const USER_CATALOG_PRICE_TYPE_FIXED = 'fixed';
    export const USER_CATALOG_PRICE_TYPE_PERCENTAGE = 'percentage';
    export const USER_CATALOG_PRICE_TYPE_NONE = 'none';

    export enum UserCatalogPriceType {
        USER_CATALOG_PRICE_TYPE_FIXED = 'fixed',
        USER_CATALOG_PRICE_TYPE_PERCENTAGE = 'percentage',
        USER_CATALOG_PRICE_TYPE_NONE = 'none',
    };

    /* '1 - In stock, 2 - pre stock, 3 - out of stock, 4 - 2-3 Days', */
    export const USER_CATALOG_IN_STOCK_IN_STOCK = 1;
    export const USER_CATALOG_IN_STOCK_PRE_STOCK = 2;
    export const USER_CATALOG_IN_STOCK_OUT_OF_STOCK = 3;
    export const USER_CATALOG_IN_STOCK_2_3_DAYS = 4;

    export enum UserCatalogInStock {
        USER_CATALOG_IN_STOCK_IN_STOCK = 'In Stock',
        USER_CATALOG_IN_STOCK_PRE_STOCK = 'Pre Order',
        USER_CATALOG_IN_STOCK_OUT_OF_STOCK = 'Out of stock',
        USER_CATALOG_IN_STOCK_2_3_DAYS = '2-3 Days',
    };

    export const USER_CATALOG_IS_AVAILABLE_LOAN_YES = 1;
    export const USER_CATALOG_IS_AVAILABLE_LOAN_NO = 0;

    export enum UserCatalogIsAvailableLoan {
        USER_CATALOG_IS_AVAILABLE_LOAN_YES = 'Yes',
        USER_CATALOG_IS_AVAILABLE_LOAN_NO = 'No',

    };

    export const USER_CATALOG_IS_AVAILABLE_YES = 1;
    export const USER_CATALOG_IS_AVAILABLE_NO = 0;

    export enum UserCatalogIsAvailable {
        USER_CATALOG_IS_AVAILABLE_YES = 'Yes',
        USER_CATALOG_IS_AVAILABLE_NO = 'No',
    };

    export const USER_CATALOG_IS_FEATURED_YES = 1;
    export const USER_CATALOG_IS_FEATURED_NO = 0;

    export enum UserCatalogIsFeatured {
        USER_CATALOG_IS_FEATURED_YES = 'Yes',
        USER_CATALOG_IS_FEATURED_NO = 'No',
    };

    export const USER_CATALOG_IS_SWAP_YES = 1;
    export const USER_CATALOG_IS_SWAP_NO = 0;

    export enum UserCatalogIsSwap {
        USER_CATALOG_IS_SWAP_YES = 'Yes',
        USER_CATALOG_IS_SWAP_NO = 'No',
    };

    export const USER_CATALOG_IS_PUBLISH_PUBLISH = 1;
    export const USER_CATALOG_IS_PUBLISH_DRAFT = 0;

    export enum CatalogPublishStatus {
        USER_CATALOG_IS_PUBLISH_PUBLISH = 'Publish',
        USER_CATALOG_IS_PUBLISH_DRAFT = 'Draft',
    };

    /* '1 - export, 0 - private', */
    export const USER_CATALOG_IS_export_export = 1;
    export const USER_CATALOG_IS_export_PRIVATE = 0;

    export enum UserCatalogIsexport {
        USER_CATALOG_IS_export_export = 'export',
        USER_CATALOG_IS_export_PRIVATE = 'Private',
    };

    export const USER_CATALOG_IS_ACCEPTED_YES = 1;
    export const USER_CATALOG_IS_ACCEPTED_NO = 0;

    export enum UserCatalogIsAccepted {
        USER_CATALOG_IS_ACCEPTED_YES = 'Yes',
        USER_CATALOG_IS_ACCEPTED_NO = 'No',
    };

    export const USER_CATALOG_IS_CLOSED_YES = 1;
    export const USER_CATALOG_IS_CLOSED_NO = 0;

    export enum UserCatalogIsClosed {
        USER_CATALOG_IS_CLOSED_YES = 'Yes',
        USER_CATALOG_IS_CLOSED_NO = 'No',
    };

    export const USER_CATALOG_IS_VERIFIED_YES = 1;
    export const USER_CATALOG_IS_VERIFIED_NO = 0;
    export const USER_CATALOG_IS_VERIFIED_PENDING = 2;

    export enum UserCatalogIsVerified {
        USER_CATALOG_IS_VERIFIED_YES = 'Yes',
        USER_CATALOG_IS_VERIFIED_NO = 'No',
        USER_CATALOG_IS_VERIFIED_PENDING = 'PENDING',
    };

    export const USER_CATALOG_IS_FURNISHED_YES = 1;
    export const USER_CATALOG_IS_FURNISHED_NO = 0;

    export enum UserCatalogIsFurnished {
        USER_CATALOG_IS_FURNISHED_YES = 'Yes',
        USER_CATALOG_IS_FURNISHED_NO = 'No',

    };
    export const USER_CATALOG_IS_FURNITURE_YES = 1;
    export const USER_CATALOG_IS_FURNITURE_NO = 0;

    export enum UserCatalogIsFurniture {
        USER_CATALOG_IS_FURNITURE_YES = 'Yes',
        USER_CATALOG_IS_FURNITURE_NO = 'No',
    };

    export const USER_CATALOG_IS_AC_YES = 1;
    export const USER_CATALOG_IS_AC_NO = 0;

    export enum UserCatalogIsAc {
        USER_CATALOG_IS_AC_YES = 'Yes',
        USER_CATALOG_IS_AC_NO = 'No',
    };

    export const USER_CATALOG_STATUS_OF_USE_YES = 1;
    export const USER_CATALOG_STATUS_OF_USE_NO = 0;

    export enum UserCatalogStatusOfUse {
        USER_CATALOG_STATUS_OF_USE_YES = 'Yes',
        USER_CATALOG_STATUS_OF_USE_NO = 'No',
    };


    export const USER_CATALOG_STATUS_DEACTIVE = 0;
    export const USER_CATALOG_STATUS_ACTIVE = 1;
    export const USER_CATALOG_STATUS_COMPLETED = 2;
    export const USER_CATALOG_STATUS_SUBMITTED = 3;
    export const USER_CATALOG_STATUS_APPROVED = 4;
    export const USER_CATALOG_STATUS_CANCELLED = 5;

    export enum UserCatalogStatus {
        USER_CATALOG_STATUS_DEACTIVE = 'De-Active',
        USER_CATALOG_STATUS_ACTIVE = 'Active',
        USER_CATALOG_STATUS_COMPLETED = 'Completed',
        USER_CATALOG_STATUS_SUBMITTED = 'Submitted',
        USER_CATALOG_STATUS_APPROVED = 'Approved',
        USER_CATALOG_STATUS_CANCELLED = 'Cancelled',
    };

    /* 1 - Top & right, 2 - inner, 3 - featured */
    export const USER_CATALOG_ADS_TYPE_TOP = 1;
    export const USER_CATALOG_ADS_TYPE_INNER = 2;
    export const USER_CATALOG_ADS_TYPE_FEATURE = 3;

    //const USER_CATALOG_ADS_TYPE_TOP1 = 1;

    export enum UserCatalogAdsType2 {
        USER_CATALOG_ADS_TYPE_TOP,
        USER_CATALOG_ADS_TYPE_INNER,
        USER_CATALOG_ADS_TYPE_FEATURE
    }

    export enum UserCatalogAdsType {
        USER_CATALOG_ADS_TYPE_TOP = 'Top & right',
        USER_CATALOG_ADS_TYPE_INNER = 'Inner',
        USER_CATALOG_ADS_TYPE_FEATURE = 'Featured',

    };

    export const USER_CATALOG_ADS_IS_FEATURED_YES = 1;
    export const USER_CATALOG_ADS_IS_FEATURED_NO = 0;

    export enum UserCatalogAdsIsFeatured {
        USER_CATALOG_ADS_IS_FEATURED_YES = 'Yes',
        USER_CATALOG_ADS_IS_FEATURED_NO = 'No',
    };

    export const USER_CATALOG_ADS_AVAILABILITY_BOOKED_ADS_TYPE_TOP = 1;
    export const USER_CATALOG_ADS_AVAILABILITY_BOOKED_ADS_TYPE_INNER = 2;
    export const USER_CATALOG_ADS_AVAILABILITY_BOOKED_ADS_TYPE_FEATURE = 3;

    export enum UserCatalogAdsAvailabilityBookedAdsType {
        USER_CATALOG_ADS_AVAILABILITY_BOOKED_ADS_TYPE_TOP = 'Top & right',
        USER_CATALOG_ADS_AVAILABILITY_BOOKED_ADS_TYPE_INNER = 'Inner',
        USER_CATALOG_ADS_AVAILABILITY_BOOKED_ADS_TYPE_FEATURE = 'Featured',
    };

    export const USER_CATALOG_ADS_ITEM_TYPE_TOP = 1;
    export const USER_CATALOG_ADS_ITEM_TYPE_INNER = 2;
    export const USER_CATALOG_ADS_ITEM_TYPE_FEATURE = 3;

    export enum UserCatalogAdsItemType {
        USER_CATALOG_ADS_ITEM_TYPE_TOP = 'Top & right',
        USER_CATALOG_ADS_ITEM_TYPE_INNER = 'Inner',
        USER_CATALOG_ADS_ITEM_TYPE_FEATURE = 'Featured',
    };


    export const USER_CATALOG_AMENITIES_STATUS_YES = 1;
    export const USER_CATALOG_AMENITIES_STATUS_NO = 0;

    export enum UserCatalogAmenitiesStatus {
        USER_CATALOG_AMENITIES_STATUS_YES = 'Yes',
        USER_CATALOG_AMENITIES_STATUS_NO = 'No',
    };

    export const USER_CATALOG_CART_STATUS_YES = 1;
    export const USER_CATALOG_CART_STATUS_NO = 0;

    export enum UserCatalogCartStatus {
        USER_CATALOG_CART_STATUS_YES = 'Yes',
        USER_CATALOG_CART_STATUS_NO = 'No',
    };


    export const USER_CATALOG_ORDERS_STATUS_NONE = 0;
    export const USER_CATALOG_ORDERS_STATUS_PENDING = 1;
    export const USER_CATALOG_ORDERS_STATUS_PROCESSING = 2;
    export const USER_CATALOG_ORDERS_STATUS_SHIPPED = 3;
    export const USER_CATALOG_ORDERS_STATUS_DENIED = 4;
    export const USER_CATALOG_ORDERS_STATUS_CANCELLED = 5;
    export const USER_CATALOG_ORDERS_STATUS_FAILED = 6;
    export const USER_CATALOG_ORDERS_STATUS_REFUNDED = 7;
    export const USER_CATALOG_ORDERS_STATUS_REVERSED = 8;
    export const USER_CATALOG_ORDERS_STATUS_VOIDED = 9;
    export const USER_CATALOG_ORDERS_STATUS_EXPIRED = 10;
    export const USER_CATALOG_ORDERS_STATUS_ACCEPTED = 11;
    export const USER_CATALOG_ORDERS_STATUS_ACCEPTED_AND_CLOSED = 12;
    export const USER_CATALOG_ORDERS_STATUS_DECLINED = 13;
    export const USER_CATALOG_ORDERS_STATUS_MARK_AS_COMPLETE = 14;
    export const USER_CATALOG_ORDERS_STATUS_NOT_COMPLETE = 15;
    export const USER_CATALOG_ORDERS_STATUS_DISPUTE = 16;
    export const USER_CATALOG_ORDERS_STATUS_DISPUTE_PROCESSING = 17;
    export const USER_CATALOG_ORDERS_STATUS_DISPUTE_INVESTIGATION = 18;
    export const USER_CATALOG_ORDERS_STATUS_DISPUTE_CANCELED = 19;
    export const USER_CATALOG_ORDERS_STATUS_DISPUTE_RESOLVED = 20;
    export const USER_CATALOG_ORDERS_STATUS_COMPLETE = 21;
    export const USER_CATALOG_ORDERS_STATUS_OFFERS = 23;
    export const USER_CATALOG_ORDERS_STATUS_COUNTER_OFFERS = 24;
    export const USER_CATALOG_ORDERS_STATUS_PAYMENT_CONFIRM = 25;
    export const USER_CATALOG_ORDERS_STATUS_PAYMENT_TRANSFER = 26;
    export const USER_CATALOG_ORDERS_STATUS_RETURN = 27;
    export const USER_CATALOG_ORDERS_STATUS_PICKUP = 28;
    export const USER_CATALOG_ORDERS_STATUS_DELIVERY = 29;
    export const USER_CATALOG_ORDERS_STATUS_DELIVERED = 30;
    export const USER_CATALOG_ORDERS_STATUS_REQUEST = 31;
    export const USER_CATALOG_ORDERS_STATUS_APPLY = 32;
    export const USER_CATALOG_ORDERS_STATUS_SUBMITTED = 33;
    export const USER_CATALOG_ORDERS_STATUS_CONFIRM = 34;
    export const USER_CATALOG_ORDERS_STATUS_RENEWAL = 35;

    export enum UserCatalogOrdersStatus {
        USER_CATALOG_ORDERS_STATUS_NONE = 'None',
        USER_CATALOG_ORDERS_STATUS_PENDING = 'Pending',
        USER_CATALOG_ORDERS_STATUS_PROCESSING = 'Processing',
        USER_CATALOG_ORDERS_STATUS_SHIPPED = 'Shipped',
        USER_CATALOG_ORDERS_STATUS_DENIED = 'Denied',
        USER_CATALOG_ORDERS_STATUS_CANCELLED = 'Cancelled',
        USER_CATALOG_ORDERS_STATUS_FAILED = 'Failed',
        USER_CATALOG_ORDERS_STATUS_REFUNDED = 'Refunded',
        USER_CATALOG_ORDERS_STATUS_REVERSED = 'Reversed',
        USER_CATALOG_ORDERS_STATUS_VOIDED = 'Voided',
        USER_CATALOG_ORDERS_STATUS_EXPIRED = 'Expired',
        USER_CATALOG_ORDERS_STATUS_ACCEPTED = 'Accepted',
        USER_CATALOG_ORDERS_STATUS_ACCEPTED_AND_CLOSED = 'Accepted And Closed',
        USER_CATALOG_ORDERS_STATUS_DECLINED = 'Declined',
        USER_CATALOG_ORDERS_STATUS_MARK_AS_COMPLETE = 'Mark As Complete',
        USER_CATALOG_ORDERS_STATUS_NOT_COMPLETE = 'Not Complete',
        USER_CATALOG_ORDERS_STATUS_DISPUTE = 'Dispute',
        USER_CATALOG_ORDERS_STATUS_DISPUTE_PROCESSING = 'Dispute Processing',
        USER_CATALOG_ORDERS_STATUS_DISPUTE_INVESTIGATION = 'Dispute Investigation',
        USER_CATALOG_ORDERS_STATUS_DISPUTE_CANCELED = 'Dispute Canceled',
        USER_CATALOG_ORDERS_STATUS_DISPUTE_RESOLVED = 'Dispute Resolved',
        USER_CATALOG_ORDERS_STATUS_COMPLETE = 'Complete',
        USER_CATALOG_ORDERS_STATUS_OFFERS = 'Offers',
        USER_CATALOG_ORDERS_STATUS_COUNTER_OFFERS = 'Counter Offers',
        USER_CATALOG_ORDERS_STATUS_PAYMENT_CONFIRM = 'Payment Confirm',
        USER_CATALOG_ORDERS_STATUS_PAYMENT_TRANSFER = 'Payment Transfer',
        USER_CATALOG_ORDERS_STATUS_RETURN = 'Return/Refund',
        USER_CATALOG_ORDERS_STATUS_PICKUP = 'Pick Up',
        USER_CATALOG_ORDERS_STATUS_DELIVERY = 'Delivery',
        USER_CATALOG_ORDERS_STATUS_DELIVERED = 'Delivered',
        USER_CATALOG_ORDERS_STATUS_REQUEST = 'Request',
        USER_CATALOG_ORDERS_STATUS_APPLY = 'Apply',
        USER_CATALOG_ORDERS_STATUS_SUBMITTED = 'Submitted',
        USER_CATALOG_ORDERS_STATUS_CONFIRM = 'Confirm & Paid',
        USER_CATALOG_ORDERS_STATUS_RENEWAL = 'Renewal',
    };

    export const USER_CATALOG_ORDERS_IS_DISPUTE_PENDING = 1;
    export const USER_CATALOG_ORDERS_IS_DISPUTE_RESOLVED = 0;

    export enum DisputeStatus {
        USER_CATALOG_ORDERS_IS_DISPUTE_PENDING = 'Pending',
        USER_CATALOG_ORDERS_IS_DISPUTE_RESOLVED = 'Resolved',
    };

    export const USER_CATALOG_ORDERS_ITEM_REASON_NONE = 0;
    export const USER_CATALOG_ORDERS_ITEM_REASON_DEAD = 1;
    export const USER_CATALOG_ORDERS_ITEM_REASON_RECEIVED = 2;
    export const USER_CATALOG_ORDERS_ITEM_REASON_ERROR = 3;
    export const USER_CATALOG_ORDERS_ITEM_REASON_FAULTY = 4;
    export const USER_CATALOG_ORDERS_ITEM_REASON_OTHER = 5;

    export enum OrderItemReason {
        USER_CATALOG_ORDERS_ITEM_REASON_NONE = 'None',
        USER_CATALOG_ORDERS_ITEM_REASON_DEAD = 'Dead On Arrival',
        USER_CATALOG_ORDERS_ITEM_REASON_RECEIVED = 'Received Wrong Item',
        USER_CATALOG_ORDERS_ITEM_REASON_ERROR = 'Order Error',
        USER_CATALOG_ORDERS_ITEM_REASON_FAULTY = 'Faulty, please supply details on comment',
        USER_CATALOG_ORDERS_ITEM_REASON_OTHER = 'Other, please supply details on comment',
    };

    export const IS_OPENED_YES = 1;
    export const IS_OPENED_NO = 0;

    export enum OrderItemOpened {
        IS_OPENED_NO = 'No',
        IS_OPENED_YES = 'Yes',
    };

    export const USER_CATALOG_ORDERS_ITEM_ACTION_ACTION_NONE = 0;
    export const USER_CATALOG_ORDERS_ITEM_ACTION_ACTION_RETURN = 1;
    export const USER_CATALOG_ORDERS_ITEM_ACTION_ACTION_ISSUED = 2;
    export const USER_CATALOG_ORDERS_ITEM_ACTION_ACTION_REPLACEMENT = 3;
    export const USER_CATALOG_ORDERS_ITEM_ACTION_ACTION_REFUNDED = 4;

    export enum OrderItemAction {
        USER_CATALOG_ORDERS_ITEM_ACTION_ACTION_NONE = 'None',
        USER_CATALOG_ORDERS_ITEM_ACTION_ACTION_RETURN = 'Return \ Replace',
        USER_CATALOG_ORDERS_ITEM_ACTION_ACTION_REFUNDED = 'Refunded',
        USER_CATALOG_ORDERS_ITEM_ACTION_ACTION_ISSUED = 'Credit Issued',
        USER_CATALOG_ORDERS_ITEM_ACTION_ACTION_REPLACEMENT = 'Replacement Sent',
    };

    /*export const USER_CATALOG_ORDERS_ITEM_STATUS_NONE = 0;
    export const USER_CATALOG_ORDERS_ITEM_STATUS_ACTIVE = 1;
    export const USER_CATALOG_ORDERS_ITEM_STATUS_PENDING = 2;
    export const USER_CATALOG_ORDERS_ITEM_STATUS_COMPLETE = 3;
    export const USER_CATALOG_ORDERS_ITEM_STATUS_AWAITING_PRODUCTS = 4;
    export const USER_CATALOG_ORDERS_ITEM_STATUS_START = 5;
    export const USER_CATALOG_ORDERS_ITEM_STATUS_STOP = 6;*/

    export const USER_CATALOG_ORDERS_ITEM_STATUS_NONE = 0;
    export const USER_CATALOG_ORDERS_ITEM_STATUS_PENDING = 1;
    export const USER_CATALOG_ORDERS_ITEM_STATUS_ACCEPT = 2;
    export const USER_CATALOG_ORDERS_ITEM_STATUS_DECLINE = 3;

    export enum OrderItemStatus {
        USER_CATALOG_ORDERS_ITEM_STATUS_NONE = 'None',
        USER_CATALOG_ORDERS_ITEM_STATUS_ACTIVE = 'Active',
        USER_CATALOG_ORDERS_ITEM_STATUS_PENDING = 'Pending',
        USER_CATALOG_ORDERS_ITEM_STATUS_COMPLETE = 'Complete',
        USER_CATALOG_ORDERS_ITEM_STATUS_AWAITING_PRODUCTS = 'Awaiting Products',
        USER_CATALOG_ORDERS_ITEM_STATUS_START = 'Start',
        USER_CATALOG_ORDERS_ITEM_STATUS_STOP = 'Stop',
    };

    export const USER_CATALOG_ORDERS_MODULE_ID_ORDERS = 'orders';
    export const USER_CATALOG_ORDERS_MODULE_ID_BOOKING = 'booking';
    export const USER_CATALOG_ORDERS_MODULE_ID_BOOKINGS = 'bookings';
    export const USER_CATALOG_ORDERS_MODULE_ID_PRODUCTS = 'products';
    export const USER_CATALOG_ORDERS_MODULE_ID_SERVICES = 'services';
    export const USER_CATALOG_ORDERS_MODULE_ID_AUCTION = 'auction';
    export const USER_CATALOG_ORDERS_MODULE_ID_JOBS = 'jobs';
    export const USER_CATALOG_ORDERS_MODULE_ID_TOPIC = 'topic';
    export const USER_CATALOG_ORDERS_MODULE_ID_QUESTION = 'question';
    export const USER_CATALOG_ORDERS_MODULE_ID_EVENT = 'event';
    export const USER_CATALOG_ORDERS_MODULE_ID_PROPERTY = 'property';
    export const USER_CATALOG_ORDERS_MODULE_ID_AGREEMENT = 'agreement';

    export enum UserCatalogOrdersModuleId {
        USER_CATALOG_ORDERS_MODULE_ID_ORDERS = 'Products',
        USER_CATALOG_ORDERS_MODULE_ID_BOOKING = 'Services',
        USER_CATALOG_ORDERS_MODULE_ID_BOOKINGS = 'Auction',
        USER_CATALOG_ORDERS_MODULE_ID_PRODUCTS = 'Jobs',
        USER_CATALOG_ORDERS_MODULE_ID_SERVICES = 'Topic',
        USER_CATALOG_ORDERS_MODULE_ID_AUCTION = 'Questions',
        USER_CATALOG_ORDERS_MODULE_ID_JOBS = 'Event',
        USER_CATALOG_ORDERS_MODULE_ID_TOPIC = 'Property',
        USER_CATALOG_ORDERS_MODULE_ID_QUESTION = 'Agreement',
        USER_CATALOG_ORDERS_MODULE_ID_EVENT = 'event',
        USER_CATALOG_ORDERS_MODULE_ID_PROPERTY = 'property',
        USER_CATALOG_ORDERS_MODULE_ID_AGREEMENT = 'agreement',
    };


    export enum OrderClosedBooking {
        USER_CATALOG_ORDERS_STATUS_ACCEPTED_AND_CLOSED,
        USER_CATALOG_ORDERS_STATUS_COMPLETE,
        USER_CATALOG_ORDERS_STATUS_CANCELLED
    };

    export enum OrderCancelled {
        USER_CATALOG_ORDERS_STATUS_DISPUTE,
        USER_CATALOG_ORDERS_STATUS_COMPLETE,
        USER_CATALOG_ORDERS_STATUS_CANCELLED,
        USER_CATALOG_ORDERS_STATUS_DISPUTE_CANCELED
    };


    /*
     * 0 - not active, 1 - Active, 2 - off
     *
     * */
    export const USER_CATALOG_ORDERS_MILESTONE_IS_ACTIVE_NOT_ACTIVE = 0;
    export const USER_CATALOG_ORDERS_MILESTONE_IS_ACTIVE_ACTIVE = 1;
    export const USER_CATALOG_ORDERS_MILESTONE_IS_ACTIVE_OFF = 2;

    export enum UserCatalogOrdersMilestoneIsActive {
        USER_CATALOG_ORDERS_MILESTONE_IS_ACTIVE_NOT_ACTIVE = 'Not Active',
        USER_CATALOG_ORDERS_MILESTONE_IS_ACTIVE_ACTIVE = 'Active',
        USER_CATALOG_ORDERS_MILESTONE_IS_ACTIVE_OFF = 'Off',
    };


    export const USER_CATALOG_ORDERS_MILESTONE_STATUS_PENDING = 0;
    export const USER_CATALOG_ORDERS_MILESTONE_STATUS_NEW = 1;
    export const USER_CATALOG_ORDERS_MILESTONE_STATUS_SUBMISSION = 2;
    export const USER_CATALOG_ORDERS_MILESTONE_STATUS_ACCEPTED = 3;
    export const USER_CATALOG_ORDERS_MILESTONE_STATUS_DECLINED = 4;
    export const USER_CATALOG_ORDERS_MILESTONE_STATUS_PAYMENT = 5;

    export enum UserCatalogOrdersMilestoneStatus {
        USER_CATALOG_ORDERS_MILESTONE_STATUS_PENDING = 'pending',
        USER_CATALOG_ORDERS_MILESTONE_STATUS_NEW = 'new',
        USER_CATALOG_ORDERS_MILESTONE_STATUS_SUBMISSION = 'submission',
        USER_CATALOG_ORDERS_MILESTONE_STATUS_ACCEPTED = 'accept',
        USER_CATALOG_ORDERS_MILESTONE_STATUS_DECLINED = 'declined',
        USER_CATALOG_ORDERS_MILESTONE_STATUS_PAYMENT = 'payment',
    };

    export const USER_CATALOG_ORDERS_MILESTONE_IS_PAID_UNPAID = 0;
    export const USER_CATALOG_ORDERS_MILESTONE_IS_PAID_PAID = 1;

    export enum UserCatalogOrdersMilestoneIsPaid {
        USER_CATALOG_ORDERS_MILESTONE_IS_PAID_UNPAID = 'UnPaid',
        USER_CATALOG_ORDERS_MILESTONE_IS_PAID_PAID = 'Paid',
    };

    export const USER_CATALOG_ORDERS_ITEM_ZOOM_STATUS_NONE = 0;
    export const USER_CATALOG_ORDERS_ITEM_ZOOM_STATUS_CREATE = 1;
    export const USER_CATALOG_ORDERS_ITEM_ZOOM_STATUS_START = 2;
    export const USER_CATALOG_ORDERS_ITEM_ZOOM_STATUS_RETRIEVE = 2;
    export const USER_CATALOG_ORDERS_ITEM_ZOOM_STATUS_STOP = 3;

    export enum OrderItemZoomStatus {
        'none' = USER_CATALOG_ORDERS_ITEM_ZOOM_STATUS_NONE,
        'create' = USER_CATALOG_ORDERS_ITEM_ZOOM_STATUS_CREATE,
        'start' = USER_CATALOG_ORDERS_ITEM_ZOOM_STATUS_START,
        'retrieve' = USER_CATALOG_ORDERS_ITEM_ZOOM_STATUS_RETRIEVE,
        'stop' = USER_CATALOG_ORDERS_ITEM_ZOOM_STATUS_STOP,
    };

    /**
     * Profile.
     */
    export const USER_PROFILE_STATUS_ACTIVE = 10;
    export const USER_PROFILE_STATUS_UNVERIFIED = 0;
    export const USER_PROFILE_STATUS_PENDING = 1;
    export const USER_PROFILE_STATUS_VERIFIED = 2;
    export const USER_PROFILE_STATUS_INSUFFICIENT = 3;
    export const USER_PROFILE_STATUS_SUBMITTED_FOR_VERIFY = 4;


    export enum UserProfileStatus {
        USER_PROFILE_STATUS_ACTIVE = 'Active',
        USER_PROFILE_STATUS_UNVERIFIED = 'Not Verified',
        USER_PROFILE_STATUS_PENDING = 'Pending',
        USER_PROFILE_STATUS_VERIFIED = 'Verified',
        USER_PROFILE_STATUS_INSUFFICIENT = 'Insufficient',
        USER_PROFILE_STATUS_SUBMITTED_FOR_VERIFY = 'Submitted for verify',
    };

    export const USER_PROFILE_GENDER_MALE = 'Male';
    export const USER_PROFILE_GENDER_FEMALE = 'Female';
    export const USER_PROFILE_GENDER_NONE = 'None';

    export enum UserProfileGender {
        USER_PROFILE_GENDER_MALE = 'Male',
        USER_PROFILE_GENDER_FEMALE = 'Female',
        USER_PROFILE_GENDER_NONE = 'None',
    };

    export const USER_PROFILE_IS_MANAGER_YES = 1;
    export const USER_PROFILE_IS_MANAGER_NO = 0;

    export enum UserProfileIsManager {
        USER_PROFILE_IS_MANAGER_YES = 'Yes',
        USER_PROFILE_IS_MANAGER_NO = 'No',
    };

    export const USER_PROFILE_IS_VENDOR_YES = 1;
    export const USER_PROFILE_IS_VENDOR_NO = 0;

    export enum UserProfileIsVendor {
        USER_PROFILE_IS_VENDOR_YES = 'Yes',
        USER_PROFILE_IS_VENDOR_NO = 'No',
    };

    export const USER_PROFILE_IS_STAFF_YES = 1;
    export const USER_PROFILE_IS_STAFF_NO = 0;
    export enum UserProfileIsStaff {
        USER_PROFILE_IS_STAFF_YES = 'Yes',
        USER_PROFILE_IS_STAFF_NO = 'No',
    };

    export const USER_PROFILE_IS_AVAILABILITY_YES = 1;
    export const USER_PROFILE_IS_AVAILABILITY_NO = 0;

    export enum UserProfileIsAvailability {
        USER_PROFILE_IS_AVAILABILITY_YES = 'Yes',
        USER_PROFILE_IS_AVAILABILITY_NO = 'No',
    };

    /*
     * 0 - Unverified, 1 - PENDING,  2 - VERIFIED,  3 - INSUFFICIENT, 4 - SUBMIT_FOR_VERIFIED
     * */
    export const USER_PROFILE_IS_VERIFIED_UNVERIFIED = 1;
    export const USER_PROFILE_IS_VERIFIED_PENDING = 2;
    export const USER_PROFILE_IS_VERIFIED_VERIFIED = 3;
    export const USER_PROFILE_IS_VERIFIED_INSUFFICIENT = 4;
    export const USER_PROFILE_IS_VERIFIED_SUBMIT_FOR_VERIFIED = 5;

    export enum UserProfileIsVerified {
        USER_PROFILE_IS_VERIFIED_UNVERIFIED = 'Unverified',
        USER_PROFILE_IS_VERIFIED_PENDING = 'Pending',
        USER_PROFILE_IS_VERIFIED_VERIFIED = 'Verified',
        USER_PROFILE_IS_VERIFIED_INSUFFICIENT = 'Insufficient',
        USER_PROFILE_IS_VERIFIED_SUBMIT_FOR_VERIFIED = 'Submitted',
    };

    /*
     * 0 - None 1 - Request, 2 - Approved
     * */
    export const USER_PROFILE_IS_FEATURED_NONE = 0;
    export const USER_PROFILE_IS_FEATURED_REQUEST = 1;
    export const USER_PROFILE_IS_FEATURED_APPROVED = 2;

    export enum UserProfileIsFeatured {
        USER_PROFILE_IS_FEATURED_NONE = 'None',
        USER_PROFILE_IS_FEATURED_REQUEST = 'Request',
        USER_PROFILE_IS_FEATURED_APPROVED = 'Approved',
    };

    export const USER_PROFILE_IS_DISABLED_YES = 1;
    export const USER_PROFILE_IS_DISABLED_NO = 0;
    export enum UserProfileIsDisabled {
        USER_PROFILE_IS_DISABLED_YES = 'Yes',
        USER_PROFILE_IS_DISABLED_NO = 'No',
    };

    export const USER_PROFILE_IS_ONLINE_YES = 1;
    export const USER_PROFILE_IS_ONLINE_NO = 0;

    export enum UserProfileIsOnline {
        USER_PROFILE_IS_ONLINE_YES = 'Yes',
        USER_PROFILE_IS_ONLINE_NO = 'No',
    };

    export const USER_PROFILE_IS_PROMOTIONAL_YES = 1;
    export const USER_PROFILE_IS_PROMOTIONAL_NO = 0;
    export enum UserProfileIsPromotional {
        USER_PROFILE_IS_PROMOTIONAL_YES = 'Yes',
        USER_PROFILE_IS_PROMOTIONAL_NO = 'No',
    };

    export const USER_MESSAGE_STATUS_READ = 'Read';
    export const USER_MESSAGE_STATUS_UNREAD = 'UnRead';
    export const USER_MESSAGE_STATUS_DELETED = 'Deleted';
    export const USER_MESSAGE_STATUS_SPAN = 'Span';
    export const USER_MESSAGE_STATUS_ARCHIVED = 'Archived';
    export const USER_MESSAGE_STATUS_OPEN = 'Open';
    export const USER_MESSAGE_STATUS_CLOSED = 'Closed';

    export enum MessageStatus {
        USER_MESSAGE_STATUS_READ = 'Read',
        USER_MESSAGE_STATUS_UNREAD = 'UnRead',
        USER_MESSAGE_STATUS_DELETED = 'Deleted',
        USER_MESSAGE_STATUS_SPAN = 'Span',
        USER_MESSAGE_STATUS_ARCHIVED = 'Archived',
        USER_MESSAGE_STATUS_OPEN = 'Open',
        USER_MESSAGE_STATUS_CLOSED = 'Closed',
    };

    export const USER_COMMENT_STATUS_YES = 1;
    export const USER_COMMENT_STATUS_NO = 0;
    export enum UserCommentStatus {
        USER_COMMENT_STATUS_YES = 'Yes',
        USER_COMMENT_STATUS_NO = 'No',
    };

    export const USER_CATALOG_COUPON_STATUS_YES = 1;
    export const USER_CATALOG_COUPON_STATUS_NO = 0;
    export enum UserCatalogCouponStatus {
        USER_CATALOG_COUPON_STATUS_YES = 'Yes',
        USER_CATALOG_COUPON_STATUS_NO = 'No',
    };


    export const USER_CATALOG_ORDERS_MODULE_ID_AGREEMENT_STATUS_RENTED = 'rented';
    export const USER_CATALOG_ORDERS_MODULE_ID_AGREEMENT_STATUS_NOT_RENTED = 'not-rented';
    export const USER_CATALOG_ORDERS_MODULE_ID_AGREEMENT_STATUS_MANAGED = 'managed';
    export const USER_CATALOG_ORDERS_MODULE_ID_AGREEMENT_STATUS_NOT_MANAGED = 'not-managed';

    export enum $enumUserCatalogOrdersModuleIdAgreementStatus {
        USER_CATALOG_ORDERS_MODULE_ID_AGREEMENT_STATUS_RENTED = 'Rented',
        USER_CATALOG_ORDERS_MODULE_ID_AGREEMENT_STATUS_NOT_RENTED = 'Not Rented',
        USER_CATALOG_ORDERS_MODULE_ID_AGREEMENT_STATUS_MANAGED = 'Managed',
        USER_CATALOG_ORDERS_MODULE_ID_AGREEMENT_STATUS_NOT_MANAGED = 'Not Managed',
    };


    export const USER_CATALOG_ORDERS_REFERENCE_STATUS_NONE = 0;
    export const USER_CATALOG_ORDERS_REFERENCE_STATUS_PENDING = 1;
    export const USER_CATALOG_ORDERS_REFERENCE_STATUS_CONFIRMED = 2;
    export const USER_CATALOG_ORDERS_REFERENCE_STATUS_DECLINE = 3;
    export const USER_CATALOG_ORDERS_REFERENCE_STATUS_PROPOSE = 4;
    export const USER_CATALOG_ORDERS_REFERENCE_STATUS_TERMINATE = 4;

    export enum enumUserCatalogOrdersRecipientsStatus {
        USER_CATALOG_ORDERS_REFERENCE_STATUS_NONE = 'none',
        USER_CATALOG_ORDERS_REFERENCE_STATUS_PENDING = 'pending',
        USER_CATALOG_ORDERS_REFERENCE_STATUS_CONFIRMED = 'accept',
        USER_CATALOG_ORDERS_REFERENCE_STATUS_DECLINE = 'Decline',
        USER_CATALOG_ORDERS_REFERENCE_STATUS_PROPOSE = 'Propose',
        USER_CATALOG_ORDERS_REFERENCE_STATUS_TERMINATE = 'Terminate',
    };


    export const USER_PROFILE_CONTACT_STATUS_NONE = 0;
    export const USER_PROFILE_CONTACT_STATUS_PENDING = 1;
    export const USER_PROFILE_CONTACT_STATUS_ACCEPT = 2;
    export const USER_PROFILE_CONTACT_STATUS_DECLINED = 3;
    export const USER_PROFILE_CONTACT_STATUS_VISITED = 4;
    export const USER_PROFILE_CONTACT_STATUS_RESUBMITTED = 5;

    /*export const enumUserProfileContactStatus = [
        self::USER_PROFILE_CONTACT_STATUS_NONE => 'None',
        self::USER_PROFILE_CONTACT_STATUS_PENDING => 'Pending',
        self::USER_PROFILE_CONTACT_STATUS_ACCEPT => 'Accept',
        self::USER_PROFILE_CONTACT_STATUS_DECLINED => 'Declined',
    ];*/


    export const USER_CATALOG_PRICE_TYPE_DAILY      = "Daily";
	export const USER_CATALOG_PRICE_TYPE_WEEKLY     = "Weekly";
	export const USER_CATALOG_PRICE_TYPE_MONTHLY    = "Monthly";
	export const USER_CATALOG_PRICE_TYPE_BIANNUALLY = "Bi-Annually";
	export const USER_CATALOG_PRICE_TYPE_ANNUALLY   = "Annually";
    

}