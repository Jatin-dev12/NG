import { Enums } from "./commons.enum";

export namespace AdditionalEnums {

	export enum CatalogTypeSlug {
		APARTMENT = 'apartments',
		VILLAS = 'villas',
		HOUSES = 'houses',
		RESIDENTIAL_BUILDINGS = 'residential-buildings',
		COMMERCIAL_BUILDINGS = 'commercial-buildings',
		OFFICES = 'offices',
		SHOWROOMS = 'showrooms',
		WAREHOUSES = 'warehouses',
		GASOLINE_STATIONS = 'gasoline-stations',
		SHOPS = 'shops',
		RESTAURANT_CAFE = 'restaurant-cafe',
		WORKSHOPS = 'workshops',
		SPORTS_CENTERS = 'sports-centers',
		HEALTH_BEAUTY_EVENT_CENTERS = 'health-beauty-event-centers',
		LANDS = 'lands',
		FARMS = 'farms',
	}


	export const USER_CATALOG_ROLE_MANAGER = 'manager';
    export const USER_CATALOG_ROLE_TENANT = 'tenant';
    export const USER_CATALOG_ROLE_VENDOR = 'vendor';
    export const USER_CATALOG_ROLE_OWNER = 'owner';

	export const USER_CATALOG_REFERENCE_TYPE_CONTRACT = 'contract';
	export const USER_CATALOG_REFERENCE_TYPE_AGREEMENT = 'agreement';

    export enum CatalogPropertyRole {
        USER_CATALOG_ROLE_MANAGER = 'Managers',
        USER_CATALOG_ROLE_TENANT = 'Tenants',
        USER_CATALOG_ROLE_VENDOR = 'Vendors',
        USER_CATALOG_ROLE_OWNER = 'Owner',
	};

	export const CATALOG_USER_REF_REQUEST_TYPE_MANAGEMENT = 'management';
	export const CATALOG_USER_REF_REQUEST_TYPE_MANAGEMENT_ONLY = 'management-only';
	export const CATALOG_USER_REF_REQUEST_TYPE_COLLECTION = 'collection';
	export const CATALOG_USER_REF_REQUEST_TYPE_OTHERS = 'others';
	export const CATALOG_USER_REF_REQUEST_TYPE_LETTING_ONLY = 'letting-only';

	export enum CatalogRefRequestType {
		CATALOG_USER_REF_REQUEST_TYPE_MANAGEMENT = 'Letting & Management',
		//CATALOG_USER_REF_REQUEST_TYPE_MANAGEMENT_ONLY = 'Management Only',
		CATALOG_USER_REF_REQUEST_TYPE_COLLECTION = 'Letting & Collection',
		CATALOG_USER_REF_REQUEST_TYPE_LETTING_ONLY = 'Letting Only',
		CATALOG_USER_REF_REQUEST_TYPE_OTHERS = 'Others',
	};

	export const CatalogRefRequestTypeArray = [
		{ key: CATALOG_USER_REF_REQUEST_TYPE_MANAGEMENT, value: CatalogRefRequestType.CATALOG_USER_REF_REQUEST_TYPE_MANAGEMENT },
		//{ key: CATALOG_USER_REF_REQUEST_TYPE_MANAGEMENT_ONLY, value: CatalogRefRequestType.CATALOG_USER_REF_REQUEST_TYPE_MANAGEMENT_ONLY },
		{ key: CATALOG_USER_REF_REQUEST_TYPE_COLLECTION, value: CatalogRefRequestType.CATALOG_USER_REF_REQUEST_TYPE_COLLECTION },
		{ key: CATALOG_USER_REF_REQUEST_TYPE_LETTING_ONLY, value: CatalogRefRequestType.CATALOG_USER_REF_REQUEST_TYPE_LETTING_ONLY },
		{ key: CATALOG_USER_REF_REQUEST_TYPE_OTHERS, value: CatalogRefRequestType.CATALOG_USER_REF_REQUEST_TYPE_OTHERS },
	]

	export const USER_CATALOG_ORDER_PAYMENT_TERMS_WEEKLY = 'weekly';
	export const USER_CATALOG_ORDER_PAYMENT_TERMS_MONTHLY = 'monthly';
	export const USER_CATALOG_ORDER_PAYMENT_TERMS_QUARTERLY = 'quarterly';
	export const USER_CATALOG_ORDER_PAYMENT_TERMS_SEMIANNUAL = 'semi-annual';
	export const USER_CATALOG_ORDER_PAYMENT_TERMS_ANNUAL = 'annual';

	export enum UserCatalogOrderPaymentTerms {
		USER_CATALOG_ORDER_PAYMENT_TERMS_WEEKLY = 'Weekly',
		USER_CATALOG_ORDER_PAYMENT_TERMS_MONTHLY = 'Monthly',
		USER_CATALOG_ORDER_PAYMENT_TERMS_QUARTERLY = 'Quarterly',
		USER_CATALOG_ORDER_PAYMENT_TERMS_SEMIANNUAL = 'Semi-Annual',
		USER_CATALOG_ORDER_PAYMENT_TERMS_ANNUAL = 'Annual',
	};

	export const UserCatalogOrderPaymentTermsArray = [
		{ key: USER_CATALOG_ORDER_PAYMENT_TERMS_WEEKLY, value: UserCatalogOrderPaymentTerms.USER_CATALOG_ORDER_PAYMENT_TERMS_WEEKLY },
		{ key: USER_CATALOG_ORDER_PAYMENT_TERMS_MONTHLY, value: UserCatalogOrderPaymentTerms.USER_CATALOG_ORDER_PAYMENT_TERMS_MONTHLY },
		{ key: USER_CATALOG_ORDER_PAYMENT_TERMS_QUARTERLY, value: UserCatalogOrderPaymentTerms.USER_CATALOG_ORDER_PAYMENT_TERMS_QUARTERLY },
		{ key: USER_CATALOG_ORDER_PAYMENT_TERMS_SEMIANNUAL, value: UserCatalogOrderPaymentTerms.USER_CATALOG_ORDER_PAYMENT_TERMS_SEMIANNUAL },
		{ key: USER_CATALOG_ORDER_PAYMENT_TERMS_ANNUAL, value: UserCatalogOrderPaymentTerms.USER_CATALOG_ORDER_PAYMENT_TERMS_ANNUAL },
	];

	export const CATALOG_USER_REQUEST_ISSUES_REPAIR_AND_MAINTENANCE = 'repair-maintenance';
	export const CATALOG_USER_REQUEST_ISSUES_SUPPLY_OF_MATERIALS = 'supply-materials';
	export const CATALOG_USER_REQUEST_ISSUES_CLEANING = 'cleaning';
	export const CATALOG_USER_REQUEST_ISSUES_HOUSEKEEPING = 'housekeeping';
	export const CATALOG_USER_REQUEST_ISSUES_INSPECTION = 'inspection';
	export const CATALOG_USER_REQUEST_ISSUES_INSURANCE = 'insurance';
	export const CATALOG_USER_REQUEST_ISSUES_OTHERS = 'others';

	export enum CatalogIssuesType {
		CATALOG_USER_REQUEST_ISSUES_REPAIR_AND_MAINTENANCE = 'Repair & Maintenance',
		CATALOG_USER_REQUEST_ISSUES_SUPPLY_OF_MATERIALS = 'Supply of Materials',
		CATALOG_USER_REQUEST_ISSUES_CLEANING = 'Cleaning',
		CATALOG_USER_REQUEST_ISSUES_HOUSEKEEPING = 'Housekeeping',
		CATALOG_USER_REQUEST_ISSUES_INSPECTION = 'Inspection',
		CATALOG_USER_REQUEST_ISSUES_INSURANCE = 'Insurance',
		CATALOG_USER_REQUEST_ISSUES_OTHERS = 'Others',
	};

	export const TypeOfIssuesArray = [
		{ key: CATALOG_USER_REQUEST_ISSUES_REPAIR_AND_MAINTENANCE, value: CatalogIssuesType.CATALOG_USER_REQUEST_ISSUES_REPAIR_AND_MAINTENANCE },
		{ key: CATALOG_USER_REQUEST_ISSUES_SUPPLY_OF_MATERIALS, value: CatalogIssuesType.CATALOG_USER_REQUEST_ISSUES_SUPPLY_OF_MATERIALS },
		{ key: CATALOG_USER_REQUEST_ISSUES_CLEANING, value: CatalogIssuesType.CATALOG_USER_REQUEST_ISSUES_CLEANING },
		{ key: CATALOG_USER_REQUEST_ISSUES_HOUSEKEEPING, value: CatalogIssuesType.CATALOG_USER_REQUEST_ISSUES_HOUSEKEEPING },
		{ key: CATALOG_USER_REQUEST_ISSUES_INSPECTION, value: CatalogIssuesType.CATALOG_USER_REQUEST_ISSUES_INSPECTION },
		{ key: CATALOG_USER_REQUEST_ISSUES_INSURANCE, value: CatalogIssuesType.CATALOG_USER_REQUEST_ISSUES_INSURANCE },
		{ key: CATALOG_USER_REQUEST_ISSUES_OTHERS, value: CatalogIssuesType.CATALOG_USER_REQUEST_ISSUES_OTHERS },
	]

	// Currency Code

	export const CurrenciesArray = [
		{ key: 'USD', value: "United States" },
		{ key: 'GBP', value: "United Kingdom" },
		{ key: 'EUR', value: "France" },
		{ key: 'SAR', value: "Saudi Arabia" },
		{ key: 'AED', value: "United Arab Emirates" },
		{ key: 'EGP', value: "Egypt" },
	]

	// Catalog Form 

	export const CatalogFormFloors = [
		{ key: 1, value: "1" },
		{ key: 2, value: "2" },
		{ key: 3, value: "3" },
		{ key: 4, value: "4" },
		{ key: 5, value: "5" },
		{ key: 6, value: "6" },
		{ key: 7, value: "7" },
	]

	export const CatalogFormRooms = [
		{ key: 1, value: "1" },
		{ key: 2, value: "2" },
		{ key: 3, value: "3" },
		{ key: 4, value: "4" },
		{ key: 5, value: "5" },
		{ key: 6, value: "6" },
		{ key: 7, value: "7" },
	]

	export const CatalogFormBathrooms = [
		{ key: 1, value: "1" },
		{ key: 2, value: "2" },
		{ key: 3, value: "3" },
		{ key: 4, value: "4" },
		{ key: 5, value: "5" },
		{ key: 6, value: "6" },
		{ key: 7, value: "7" },
	]

	export const CatalogFormAgeOfBuilding = [
		{ key: 1, value: "less than 5" },
		{ key: 5-10, value: "5-10" },
		{ key: 11-15, value: "11-15" },
		{ key: 16-20, value: "16-20" },
		{ key: 21-25, value: "21-25" },
		{ key: 26-30, value: "26-30" },
		{ key: 31-35, value: "31-35" },
		{ key: 36-40, value: "36-40" },
		{ key: 41-45, value: "41-45" },
		{ key: 46-50, value: "46-50" },
	]

	export const CatalogFormApartments = [
		{ key: 1, value: "1" },
		{ key: 2, value: "2" },
		{ key: 3, value: "3" },
		{ key: 4, value: "4" },
		{ key: 5, value: "5" },
		{ key: 6, value: "6" },
		{ key: 7, value: "7" },
	]

	export const CatalogFormDailySales = [
		{ key: 1, value: "1" },
		{ key: 2, value: "2" },
		{ key: 3, value: "3" },
		{ key: 4, value: "4" },
		{ key: 5, value: "5" },
		{ key: 6, value: "6" },
		{ key: 7, value: "7" },
	]

	export const CatalogFormFurnished = [
		{ key: 1, value: "Fully furnished" },
		{ key: 2, value: "Semi furnished" },
		{ key: 3, value: "Not furnished" },
	]

	export const CatalogFormPrices = [
		{ type: Enums.USER_CATALOG_PRICE_TYPE_DAILY, name: "Daily", price: '' },
		{ type: Enums.USER_CATALOG_PRICE_TYPE_WEEKLY, name: "Weekly", price: '' },
		{ type: Enums.USER_CATALOG_PRICE_TYPE_MONTHLY, name: "Monthly", price: '' },
		{ type: Enums.USER_CATALOG_PRICE_TYPE_BIANNUALLY, name: "Bi-Annually", price: '' },
		{ type: Enums.USER_CATALOG_PRICE_TYPE_ANNUALLY, name: "Annually", price: '' },
	]

}
