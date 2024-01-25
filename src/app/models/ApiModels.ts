import { Enums } from "../enums";
import { categoryListToTree, momentDate } from "../helpers";



export interface Deserializable {
	deserialize(input: any): this;
}

export class Base implements Deserializable {
	[x: string]: any;
	deserialize(input: any) {
		Object.assign(this, input);
		return this;
	}

	add() {

	}

	update(id: number) {

	}

	delete(id: number) {

	}

	find(id: number) {

	}

	findAll(condition: any) {

	}

	moment(date: any, formate: any = 'DD/MM/YYYY') {
		return momentDate(date, formate);
	}

	parse(item: any) {
		return JSON.parse(item);
	}

	stringify(item: any) {
		return JSON.stringify(item);
	}

}

export class ApiResponse extends Base {
	mode!: number;
	code!: number;
	message!: string;
	status!: number;
	data?: ApiResponseData | any;
	token?: any;
	error?: any;
	statusText?: any;
	constructor(input: { mode: number; code: number; data: any; message: string; status: number, token: any, error: any, statusText: any }) {
		super();
		this.deserialize(input);
	}
}

export class ApiResponseData extends Base {
	model!: any;
	items!: any;
	pagination!: Pagination;
	total!: number;
	page!: number;
	size!: number;
	total_pages!: number;
	max_page!: number;
	visible!: number;
	last!: boolean;
	fist!: boolean;
	error!: boolean;
	error_message!: string;
	constructor(input: ApiResponseData | undefined | null) {
		super();
		this.deserialize(input);
	}
}

export class Pagination extends Base {

	pageCount!: number;
	page!: number;
	totalCount!: number;
	pageSize!: number;

	constructor(input: Pagination) {
		super();
		this.deserialize(input);
	}
}

export class Config extends Base {
	data!: object;
}


export class Countries extends Base {
	id!: number;
	name!: string;
	code!: string;
	phone_code!: string;
	currency_name!: string;
	currency_code!: string;

	constructor(input: Countries) {
		super();
		this.deserialize(input);
	}
}

export class States extends Base {
	id!: number;
	name!: string;
	code!: string;
	country_code!: string;
	status!: number;

	constructor(input: States) {
		super();
		this.deserialize(input);
	}
}

export class Document extends Base {
	id!: string;
	doc!: string;

	constructor(input: Document) {
		super();
		this.deserialize(input);
	}
}

export class Media extends Base {
	image!: Photo[];
	docs!: Photo[];
	video!: Photo[];

	constructor(input: Media) {
		super();
		this.deserialize(input);
	}
}


export class Files extends Base {
	id!: number;
	base_url!: string;
	delete_url!: string;
	filename!: string;
	mimetype!: string;
	name!: string;
	path!: string;
	size!: string;
	type!: string;
	url!: string;

	constructor(input: Files) {
		super();
		this.deserialize(input);
	}
}

export class FieldModel extends Base {

	constructor(input: any) {
		// Prints a wrong value in ES5; throws exception in ES6
		super();
		this.deserialize(input);
	}

}

export class Notifications extends Base {
	message_id!: number;
	item_type!: string;
	action_id!: number;
	action!: string;
	item_id!: number;
	sender_id!: number;
	avatar!: Photo;
	notification!: string;
	text!: string;
	textJson!: any;
	ip!: string;
	url!: string;
	status!: string;
	seen!: boolean;
	created_at!: number;
	sender_url!: any;
	receiver_url!: any;
	id!: number;
	constructor(input: Notifications) {
		super();
		this.deserialize(input);
		//return this.id = this.message_id
	}
	//get id() { return this.message_id };
}


export class Category extends Base {
	id!: number;
	parent_id?: any;
	name?: string;
	media_id?: any;
	slug!: string;
	description!: string;
	sort_order?: number;
	created_at!: number;
	updated_at!: number;
	short_description!: string;
	banner!: string;
	thumb!: string;
	parent!: string;
	options: any;
	children!: Category[];
	prev!: boolean;
	next!: boolean;
	fieldModel!: any[];

	constructor(input: Category) {
		// Prints a wrong value in ES5; throws exception in ES6
		super();
		this.deserialize(input);
	}
}

export class Photo extends Base {
	id!: number;
	guid!: any;
	filename!: string;
	filesize!: string;
	path!: string;
	mimetype!: string;
	type!: string;
	thumb!: string;
	banner!: string;
	videoUrl!: string;
	status!: string;
	created_at!: string;
	updated_at!: string;

	constructor(input: Photo) {
		super();
		this.deserialize(input);
	}
}

export class User extends Base {
	id!: number;
	location!: Location;
	username!: string;
	email!: string;
	status!: number;
	last_login!: number;
	created_at!: number;
	updated_at!: number;
	role!: string;
	name!: string;
	about?: any;
	gender!: string;
	since?: string;
	avatar?: string;
	banner?: string;
	isVerified!: boolean;
	is_favorite!: boolean;
	title!: string | any;
	count_rating!: number;
	rating_avg!: number;
	is_verified!: any;
	is_owner!: number;
	is_manager!: number;
	is_staff!: number;
	is_vendor!: number;
	message_id!: any;
	in_contact!: any;
	contact_id!: any;
	tags!: any;
	badge!: any;
	is_instructor!: any;

	number_of_properties: any = 0;
	number_of_contacts: any = 0;
	number_of_received_proposal: any = 0;
	number_of_received_proposal_pending: any = 0;
	number_of_received_proposal_history: any = 0;
	number_of_send_proposal: any = 0;
	number_of_send_proposal_pending: any = 0;
	number_of_send_proposal_history: any = 0;
	number_of_requests: any = 0;
	number_of_issued_requests: any = 0;
	number_of_received_requests: any = 0;
	number_of_bills: any = 0;
	number_of_bills_issued: any = 0;
	number_of_bills_issued_pending: any = 0;
	number_of_bills_issued_history: any = 0;
	number_of_bills_received: any = 0;
	number_of_unread_message_contacts: any = 0;

	userProfile!: UserProfile;

	constructor(input: User) {
		super();
		this.deserialize(input);
	}

	get isUser() {
		return (this.role == Enums.Role.ROLE_USER);
	}
}

export class Favorites extends Base {
	id!: number;
	user_id!: number;
	updated_at!: number;
	created_at!: number;
	moduleId!: number;
	favorite_id!: number;
	favorites!: User;

	constructor(input: Favorites) {
		super();
		this.deserialize(input);
	}
}

export class Tag extends Base {
	id!: number;
	name!: string;
	sort_order!: number;
	created_at!: number;
	updated_at!: number;

	constructor(input: Tag) {
		super();
		this.deserialize(input);
	}
}

export class UserProfile extends Base {
	user_id!: number;
	parent_id?: any;
	plan_id?: any;
	avatar_id?: any;
	banner_id?: any;
	zoom_id?: any;
	business_type?: string;
	business_name?: any;
	license_type?: any;
	license_number?: any;
	designation?: any;
	strip_account_number?: any;
	title?: any;
	name!: string;
	first_name!: string;
	last_name!: string;
	location_id?: any;
	gender!: string;
	date_of_birth?: any;
	year_of_birth?: any;
	skin_type?: any;
	skin_trouble?: any;
	is_child?: any;
	mobile?: any;
	telephone?: any;
	about?: any;
	min_budget?: any;
	max_budget?: any;
	hear_about?: any;
	balance_credit?: any;
	exchange_policy?: any;
	return_policy?: any;
	refund_policy?: any;
	website?: any;
	timezone?: any;
	token!: string;
	otp?: any;
	is_availability!: number;
	is_verified!: number;
	is_featured!: number;
	is_ndis!: boolean;
	is_disabled!: number;
	is_answerer!: number;
	ip_address?: any;
	is_online?: any;
	count_rating!: number;
	avg_rating!: string;
	notifications!: number;
	messages!: number;
	transaction_id?: any;
	avatar?: any;
	location?: Location;
	categories!: any[];
	num_of_wishlist!: string;
	media!: any[];
	is_notified!: number;
	order_placed!: string;
	order_delivered!: number;
	upcoming_events!: number;
	joined_events!: number;
	past_events!: number;
	fieldModel!: any;
	tags!: any;
	userProfileNdis!: userProfileNdis;
	total_sales!: number;
	num_of_orders!: number;
	num_of_orders_completed!: number;
	visiting_request!: number;
	num_of_orders_total!: number;
	instructor_num_of_orders!: number;
	instructor_total_sales!: number;
	is_manager: number = 0;
	is_staff: number = 0;
	is_vendor: number = 0;
	constructor(input: UserProfile) {
		super();
		this.deserialize(input);
	}
}

export class userProfileNdis extends Base {
	created_at!: number;
	email_invoice!: string;
	email_invoice_cc!: string;
	end_date!: number;
	media!: Media;
	ndis_categories!: any;
	ndis_number!: string;
	plan!: string;
	ref_number!: string;
	start_date!: number;
	updated_at!: number;
	user_id!: number;
	constructor(input: userProfileNdis) {
		super();
		this.deserialize(input);
	}
}

export class Experience extends Base {
	id!: number;
	user_id!: number;
	industry_name!: string;
	institute!: string;
	contact_email!: string;
	from!: number;
	to!: number;
	is_present: any;
	title!: string;
	description!: string;
	location!: string;
	latitude!: string;
	longitude!: string;
	status!: string;
	created_at!: number;
	updated_at!: number;

	constructor(input: Experience) {
		super();
		this.deserialize(input);
	}
}

export class Education extends Base {
	id!: number;
	user_id!: number;
	industry_name!: string;
	institute!: string;
	contact_email!: string;
	from!: number;
	to!: number;
	is_present: any;
	title!: string;
	description!: string;
	location!: string;
	latitude!: string;
	longitude!: string;
	status!: string;
	created_at!: number;
	updated_at!: number;

	constructor(input: Education) {
		super();
		this.deserialize(input);
	}
}

export class Catalog extends Base {
	is_wishlist!: boolean;
	count_wishlist!: string;
	count_comments!: string;
	location?: Location;
	fieldModel!: any;
	id!: number;
	parent_id?: any;
	type!: string;
	moduleId!: string;
	user_type!: string;
	user_id!: number;
	no_guest!: number;
	category_id!: number;
	sub_category_id?: any;
	organization!: string;
	cover_id?: any;
	brand_id?: any;
	brand!: Brand;
	sku?: any;
	quantity?: any;
	minimum?: any;
	maximum?: any;
	notify_minimum?: any;
	download_type?: any;
	download_link?: any;
	title!: string;
	description!: string;
	specification!: string;
	price_type!: string;
	price!: string;
	reserve_price!: string;
	discount_price!: string;
	increase_price!: string;
	dated?: any;
	approx_time?: any;
	deadline?: any;
	weight?: any;
	length?: any;
	height?: any;
	width?: any;
	length_unit!: string;
	weight_unit!: string;
	is_subtract?: any;
	tax_id?: any;
	in_stock?: any;
	location_id?: any;
	orders?: any;
	order?: Order;
	agreement?: Order;
	bookings?: any;
	ratings!: any;
	avg_rating!: any;
	current_location!: string;
	offers?: any;
	is_public!: number;
	is_publish!: number;
	visibility!: any;
	is_featured!: number;
	is_available!: number;
	featured_price?: any;
	start_time?: any;
	end_time?: any;
	featured_start_time?: any;
	featured_end_time?: any;
	auction_start_time?: any;
	auction_end_time?: any;
	points?: any;
	status!: number;
	order_by?: any;
	viewed!: number;
	order_id?: any;
	is_closed?: any;
	is_direct?: any;
	created_at!: any;
	updated_at!: number;
	category!: Category;
	cover?: Photo | null;
	video_id?: any;
	video?: Photo | null;
	wishlist!: boolean;
	user!: User;
	tags!: Tag[];
	userCatalogOptions!: CatalogOptions[];
	userCatalogPrice!: CatalogPrices[];
	userCatalogHistories!: CatalogHistories[];
	userCatalogAttribute!: CatalogAttributes[];
	userCatalogTopics!: UserTopics[];
	userCatalogAmenities!: UserAmenities[];
	userCatalogRecipients!: UserCatalogRecipients[];
	media!: Media;
	feedbackReview!: FeedbackReview[];
	breadcrumb!: any[];
	catalog_course_achievement!: any;
	catalog_is_suggestion!: any;
	catalog_course_format!: any;
	lessons!: any;
	duration!: any;
	owner!: User;
	owner_id!: any;
	owner_email!: any;
	owner_name!: any;
	owner_phone!: any;

	m2_gross_price!: any;
	m2_net_price!: any;
	number_of_floors!: any;
	number_of_rooms!: any;
	number_of_bathrooms!: any;
	age_of_building!: any;
	is_available_loan!: any;
	is_swap!: any;
	is_ac!: any;
	is_furnished!: any;
	status_of_use!: any;
	number_of_apartments!: any;
	occupancy_rate!: any;
	number_of_elevators!: any;
	property_open_area!: any;
	property_indoor_area!: any;
	number_of_pumps!: any;
	sales!: any;
	is_furniture!: any;
	property_category!: any;
	number_of_trees!: any;
	currency_code!: any;
	is_rented!: any;
	property_purpose!: any;
	fixed!: any;
	property_classification!: any;
	is_agreement: any;
	is_contract: any;

	constructor(input: Catalog) {
		super();
		this.deserialize(input);
	}

	get prices() {
		return this.userCatalogPrice;
	}

	is_owner(user_id: any) {
		return (this.user_id === user_id);
	}

	get depositAmount() {
		let price: any = 0;
		if (this.price_type === 'fixed') {
			price = this.reserve_price;
		} else {
			price = +this.price * +this.reserve_price / 100;
		}
		return price;
	}

}


export class Brand extends Base {
	created_at!: number;
	description!: string;
	id!: number;
	image_id!: number | null;
	name!: string;
	updated_at!: number;
	user_id!: number;

	constructor(input: Brand) {
		super();
		this.deserialize(input);
	}
}

export class FeedbackReview extends Base {
	count!: number;
	feedback!: number;
	rating!: number;

	constructor(input: FeedbackReview) {
		super();
		this.deserialize(input);
	}
}

export class CatalogOptions extends Base {
	id!: number;
	catalog_id!: number;
	field_id!: number;
	name!: string;
	price!: string;
	value!: string;
	quantity!: number;
	field!: any;

	constructor(input: CatalogOptions) {
		super();
		this.deserialize(input);
	}
}

export class CatalogPrices extends Base {
	id!: number;
	item_id!: number;
	title!: string;
	name!: string;
	link: any;
	price: any;
	quantity: any;
	type: any;
	created_at!: number;
	updated_at!: number;
	constructor(input: CatalogPrices) {
		super();
		this.deserialize(input);
	}
}

export class CatalogHistories extends Base {

	constructor(input: CatalogHistories) {
		super();
		this.deserialize(input);
	}
}

export class UserTopics extends Base {
	catalog_id!: number;
	cover!: Photo;
	cover_id!: any;
	created_at!: number;
	description!: any;
	id!: number;
	link!: any;
	name!: any;
	pdf!: any;
	pdf_id!: number;
	updated_at!: number;
	video!: Photo;
	video_id!: number;
	video_duration!: any;
	parent_id!: any;
	suggestion!: string;
	children!: UserTopics[];
	constructor(input: UserTopics) {
		super();
		this.deserialize(input);
	}
}

export class UserAmenities extends Base {
	catalog_id!: number;
	created_at!: number;
	description: any;
	id!: number;
	status!: number;
	title: any;
	updated_at!: number;
	constructor(input: UserAmenities) {
		super();
		this.deserialize(input);
	}
}

export class UserCatalogOrdersReferences extends Base {
	commission!: any;
	country_code!: "IN"
	phone_code!: "IN"
	created_at!: number;
	deposit_amount!: any;
	doc_id!: number;
	doc: any;
	email!: any;
	end_time!: any;
	gender!: any;
	id!: number;
	location!: any;
	name!: any;
	order_id!: number;
	payment_terms!: any;
	permitted_occupier!: any;
	relation!: any;
	start_time!: any;
	status!: number;
	telephone!: any;
	terms!: any;
	total_amount!: any;
	type!: any;
	contract_type!: any;
	amount!: any;
	updated_at!: number;
	user_id!: number;
	constructor(input: UserCatalogOrdersReferences) {
		super();
		this.deserialize(input);
	}
}

export class UserCatalogRecipients extends Base {
	action_by!: number;
	actionBy!: User;
	catalog_id!: number;
	catalog!: Catalog;
	created_at!: number;
	doc_id: any;
	country_code: any;
	doc: any;
	email: any;
	id!: number;
	location: any;
	message: any;
	message_id: any;
	name: any;
	relation: any;
	priority: any;
	status: any;
	subject: any;
	telephone: any;
	title: any;
	updated_at!: number;
	user_id: any;
	staff_id: any;
	user!: User;
	staff!: User;
	constructor(input: UserCatalogRecipients) {
		super();
		this.deserialize(input);
	}
}

export class CatalogAttributes extends Base {
	field_id!: number;
	user_id!: number;
	section_id!: number;
	moduleId!: string;
	field!: string;
	type!: string;
	name!: string;
	label!: string;
	hint!: string;
	value!: string;
	selected!: string;
	class!: string;
	parameters!: string;
	validations!: string;
	order_by!: string;
	status!: number;
	created_at!: number;
	updated_at!: number;
	options!: AttributesOptions[]

	constructor(input: CatalogAttributes) {
		super();
		this.deserialize(input);
	}
}

export class AttributesOptions extends Base {
	option_id!: number;
	user_id!: number;
	field_id!: number;
	option_code!: string;
	option_value!: string;
	sort_order!: string

	constructor(input: AttributesOptions) {
		super();
		this.deserialize(input);
	}
}

export class Wishlist extends Base {
	user_id!: number;
	item_id!: number;
	created_at!: number;
	updated_at!: number;
	item: Catalog | undefined;

	constructor(input: Wishlist) {
		super();
		this.deserialize(input);
	}
}


export class UserCatalogOrdersHistory extends Base {
	id!: number;
	order_id!: number;
	action_by!: number;
	comment!: string;
	price?: any;
	status!: number;
	created_at!: number;
	updated_at!: number;

	constructor(input: UserCatalogOrdersHistory) {
		super();
		this.deserialize(input);
	}
}

export class UserCatalogOrdersRecipient extends Base {
	order_id!: number;
	recipient_id!: number;
	price!: number;
	status!: number;
	media!: any[];
	total!: string;

	constructor(input: UserCatalogOrdersRecipient) {
		super();
		this.deserialize(input);
	}
}


export class UserCatalogOrdersItem extends Base {
	id!: number;
	order_id!: number;
	item_id!: number;
	catalog_id!: number;
	catalog_user_id!: number;
	catalog!: Catalog;
	short_link?: any;
	descriptive_link?: any;
	location_id?: any;
	quantity!: number;
	price?: any;
	slot?: any;
	extra!: any;
	options?: any;
	start_time!: number;
	end_time?: any;
	comment?: any;
	is_opened!: number;
	action_by!: number;
	action!: number;
	reason!: number;
	status!: number;
	transaction_id?: any;
	created_at!: number;
	updated_at!: number;
	user!: User;
	actionBy!: User;
	review!: any;
	from_location_id!: number;
	to_location_id!: number;
	current_topic_id!: number;
	toLocation!: Location;
	fromLocation!: Location;
	userCatalogOrdersItemHistories!: UserCatalogOrdersHistory[];
	userCatalogOrdersItemTopics!: UserTopics[];
	constructor(input: UserCatalogOrdersItem) {
		super();
		this.deserialize(input);
	}
}

export class Order extends Base {
	actionBy!: User;
	transaction?: any;
	coupon?: any;
	location?: any;
	user!: User;
	manager!: User;
	owner!: User;
	userCatalogOrdersHistories!: UserCatalogOrdersHistory[];
	userCatalogOrdersRecipients!: UserCatalogOrdersRecipient[];
	userCatalogOrdersItems!: UserCatalogOrdersItem[];
	userCatalogOrdersMilestones!: Milestone[];
	userCatalogOrdersReferences!: UserCatalogOrdersReferences[];
	recipients!: UserProfile[];
	recipientIds!: number[];
	media!: any[];
	id!: number;
	user_id!: number;
	action_by!: number;
	provider_id!: number;
	no_recipients!: number;
	type!: string;
	total!: number;
	deposited_amount!: number;
	deposited_percentage!: number;
	deposited_type!: number;
	commission?: any;
	shipping_price?: any;
	tax_rates?: any;
	coupon_id?: any;
	gift_id?: any;
	location_id?: any;
	slot?: any;
	start_time!: number;
	end_time?: any;
	title!: string;
	comment!: string;
	any_questions?: any;
	status!: number;
	is_public!: number;
	ip_address?: any;
	message_key?: any;
	transaction_id?: any;
	created_at!: number;
	updated_at!: number;
	price_type!: number;
	terms: any;
	doc_id: any;
	tenant: any;
	constructor(input: Order) {
		super();
		this.deserialize(input);
	}

}

export class Milestone extends Base {
	action_by!: number;
	budget!: string;
	created_at!: number;
	dated!: any;
	description!: string;
	duration!: string;
	extra!: any;
	id!: number;
	is_paid!: number;
	is_active!: number;
	order_id!: string;
	status!: number;
	title!: string;
	total!: string;
	notes!: string;
	media!: Media;
	transaction_id!: string;
	updated_at!: number;

	constructor(input: Milestone) {
		super();
		this.deserialize(input);
	}
}

export class Location extends Base {
	id!: number;
	user_id!: number;
	name!: string;
	email!: string;
	phone_number!: string;
	telephone!: string;
	apt_number!: string;
	address_line_1!: string;
	address_line_2!: string;
	city!: string;
	location!: any;
	latitude!: string;
	longitude!: string;
	state_code!: string;
	map_url!: any;
	postal_code!: string;
	zip5!: string;
	zip4!: string;
	country_code!: string;
	created_at!: number;
	updated_at!: number;
	is_primary!: number
	status!: number;

	constructor(input: Location) {
		super();
		this.deserialize(input);
	}
}

export class Availability extends Base {
	id!: number;
	user_id!: number;
	item_id!: number;
	week_day!: string;
	week_days!: string;
	start_time!: any;
	end_time!: any;
	status!: number;
	created_at!: any;
	updated_at!: any;
	user!: User;
	blank_id!: number;

	constructor(input: Availability) {
		super();
		this.deserialize(input);
	}
}

export class UnAvailability extends Base {
	id!: number;
	user_id!: number;
	catalog_id!: number;
	order_id!: number;
	start_time!: any;
	end_time!: any;
	slot!: any;
	created_at!: any;
	updated_at!: any;
	user!: User;

	constructor(input: UnAvailability) {
		super();
		this.deserialize(input);
	}
}

export class Award extends Base {
	id!: number;
	user_id!: number;
	institute!: any;
	title!: string;
	description!: string;
	file_id!: number;
	dated!: number;
	status!: any;
	created_at!: any;
	updated_at!: any;
	location!: any;
	file!: Files;
	certification: any;

	constructor(input: Award) {
		super();
		this.deserialize(input);
	}
}

export class Cards extends Base {
	id!: number;
	source!: any;
	email!: string;
	card_number!: string;
	is_primary!: any;
	status!: any;
	description!: string;
	file_id!: number;
	dated!: number;
	created_at!: any;
	updated_at!: any;
	location!: any;
	card!: any;

	constructor(input: Cards) {
		super();
		this.deserialize(input);
	}
}

export class Membership extends Base {
	id!: number;
	gateway!: any;
	source_plan!: any;
	name!: any;
	description!: any;
	plan_type!: any;
	payment_type!: any;
	frequency!: any;
	frequency_interval!: any;
	cycles!: any;
	amount!: string;
	status!: number;
	created_at!: number;
	updated_at!: number;

	constructor(input: Membership) {
		super();
		this.deserialize(input);
	}
}

export class Item extends Base {
	id!: number;
	category_id!: string;
	category_name!: string;
	restricted!: string;
	external_url!: string;
	status!: string;
	slug!: string;
	title!: string;
	content!: string;
	location!: string;
	image_full!: string;
	view_count!: string;
	created_at!: number;
	updated_at!: number;
	reactions!: string;
	image!: Photo;
	media!: Photo[];
	imageUrl!: Photo;
	linkPreview!: string;
	cover_image!: Photo;
	product_price!: string;
	commentCount!: string;
	reactionCount!: string;
	likeCount!: string;
	sector_icon!: Photo;
	sector_image!: Photo;
	blog_image!: Photo;
	articles_image!: Photo;
	news_image!: Photo;
	events_image!: Photo;
	leadership_image!: Photo;
	testimonials_image!: Photo;
	educational_image!: Photo[];
	research_image!: Photo[];
	testimonial_position!: string;
	team_position!: string;
	stories_image!: Photo;
	stories_raised!: string;
	stories_min_invest!: string;

	constructor(input: Item) {
		super();
		this.deserialize(input);
	}
}

export class Transactions extends Base {
	admin_fee!: number;
	commission_rate!: string;
	created_at!: number;
	credit!: string;
	email!: string;
	receipt!: string;
	response_data!: any;
	stripe_fee!: any;
	total_amount!: any;
	transactionID!: any;
	transfer_amount!: number;
	id!: any;
	user!: string;
	provider!: string;
	job_title!: string;
	item_id!: string;
	event_name!: string;
	event_title!: string;

	constructor(input: Transactions) {
		super();
		this.deserialize(input);
	}
}

export class Coupon extends Base {
	id!: number;
	user_id!: number;
	catalog_id!: number;
	name!: string;
	coupon_code!: string;
	type!: string;
	discount!: string;
	start_date!: number;
	end_date!: number;
	uses_total!: string;
	uses_per_user!: string;
	status!: number;
	created_at!: number;
	updated_at!: number;

	constructor(input: Coupon) {
		super();
		this.deserialize(input);
	}
}

export class Cart extends Base {
	id!: number;
	user_id!: number;
	user!: User;
	catalog_id!: number;
	item!: Catalog;
	options!: any;
	type!: string;
	price!: number;
	quantity!: number;
	session_id!: any;
	status!: number;
	created_at!: number;
	updated_at!: number;

	constructor(input: Cart) {
		super();
		this.deserialize(input);
	}

	get option() {
		let item = (this.options !== null) ? this.parse(this.options) : [];
		return item[0];
	}
}

export class Request extends Base {
	id!: number;
	order_id!: number;
	parent_id!: any;
	catalog_id!: number;
	category_id!: number;
	agreement_id!: any;
	identifier!: any;
	relation!: string;
	type!: string;
	type_of_request!: string;
	user_id!: number;
	receiver_id!: number;
	receiver!: User;
	assign_by!: any;
	assign_to!: any;
	location_id!: number;
	attachment_id!: any;
	description!: string;
	quantity!: any;
	currency_code!: any;
	tax_rates!: any;
	amount!: any;
	total_amount!: any;
	options!: any;
	start_time!: any;
	end_time!: any;
	due_date!: any;
	comment!: any;
	is_opened!: number;
	action!: any;
	reason!: any;
	paid_by!: any;
	paid_to!: any;
	action_by!: number;
	status!: number;
	message_id!: any;
	transaction_id!: any;
	created_at!: number;
	updated_at!: number;
	user!: User;
	catalog!: Catalog;
	review!: any;
	location!: any;
	contact!: any;
	userCatalogOrdersItemHistories!: CatalogHistories[];
	userCatalogOrdersItemTopics!: any[];
	attachment!: any;
	media!: Media;
	constructor(input: Request) {
		super();
		this.deserialize(input);
	}
}

/*
 - user
 - userprofile
 - catalog
 - order
 - item (cms)
 */
