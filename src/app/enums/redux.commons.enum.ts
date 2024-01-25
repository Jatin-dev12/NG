

export namespace EnumRxKey {

	export enum ArrayOrder {
		asc = 'Ascending',
		desc = 'Descending',
	}
	
    export enum Auth {
		login = 'login',
		verify2factor = 'verify-2-factor',
		resend2factor = 'resend-2-factor',
		otpLogin = 'otp-login',
		register = 'register',
		resendVerification = 'resend-verification',
		emailVerification = 'email-verification',
		otpVerification = 'otp-verification',
		resetPassword = 'reset-password',
		forgotPassword = 'forgot-password',
		checkTrigger = 'check-trigger',
		checkEmail = 'check-email',
		checkSms = 'check-sms',
		otpRequest = 'otp-request',
		isEmailExists = 'is-email-exists',
		reactivation = "reactivation",
	}

	export enum Catalog {
		listing = "listing",
		rented = "rented",
		reference = "reference",
		search = "search",
		view = "view",	
		categories = "categories",
		reviews = "reviews",
		wishlist = "wishlist",
		fields = "fields",
		// Extra
		duplicate = 'duplicate',
		cart = 'cart',
		coupon = "coupon",
		couponApply = "coupon-apply",
		brand = "brand",
		option = "option",
		attributes = "attributes",
		optionItem = "option-item",
		recipients = "recipients",
		comments = "comments",
		likes = "likes",
		export = "export",
		import = "import",
		giftCertificate = "gift-certificate",
		giftCertificateApply = "gift-certificate-apply",
		services = "services",
		related = "related",
		sameUser = "sameUser",
		tags = "tags",
		"tag-types" = "tag-types",
		"invite-manager" = "invite-manager",
        'invite-tenant' = 'invite-tenant',
        'invite-owner' = 'invite-owner',
        requests = 'requests',
        invitation = 'invitation',
	}

    /*
        user-catalog/index?key=invitation&relation=manager&status=[1,2,3,4]
        user-catalog/index?key=invitation&relation=tenant&status=[1,2,3,4]
        user-catalog/index?key=invitation&relation=owner&status=[1,2,3,4]
        user-catalog/index?key=requests&relation=manager&status=[1,2,3,4]
        user-catalog/index?key=requests&relation=tenant&status=[1,2,3,4]
        user-catalog/index?key=requests&relation=owner&status=[1,2,3,4]
    */

	export enum Order {
		listing = "listing",
		past = "past",
		cancelled = "cancelled",
		disputed = "disputed",
		completed = "completed",
		pending = "pending",
		declined = "declined",
		view = "view",
		milestone = "milestone",
		comments = "comments",
		reviews = "reviews",
		likes = "likes",
		meeting = "meeting",
		join = "join",
		shared = "shared",
		booking = "booking",
	}

	export enum Course {
		listing = "listing",
		courses = "courses",
		video = "video",
		view = "view",
	}

	export enum Search {
		listing = "listing",
		courses = "courses",
		video = "video",
		view = "view",
	}

	export enum Staff {
		listing = "listing",
		setting = "setting",
		activities = "activities",
		dashboard = "dashboard",
		view = "view",
	}

	export enum Contact {
		listing = "listing",
		message = "message",
		view = "view",
	}

	export enum Reference {
		listing = "listing",
		view = "view",
	}

	export enum Request {
		listing = "listing",
		received = "received",
		issued = "issued",
		view = "view",
	}

	export enum Ads {
		listing = "listing",
		view = "view",
	}

	export enum Default {
		"mailer-manager" = "mailer-manager",
		upload = "upload",
		timezone = "timezone",
		countries = "countries",
		states = "states",
		cities = "cities",
		currency = "currency",
		config = "config",
		contact = "contact",
		newsletter = "newsletter",
		sections = "sections",
		fields = "fields",
		tags = "tags",
		modules = "modules",
		funded = "funded",
		service = "service",
		response = "response",
		fileResize = "file-resize",
		settings = "settings",
		message = "message",
		view = "view",
		//faqs = "faqs",
	}

	export enum Item {
		support = "support",
		categories = "categories",
		comments = "comments",
		reactions = "reactions",
		pages = "pages",
		faqs = "faqs",
		blog = "blog",
		testimonials = "testimonials",
		view = "view",
	}

	export enum User {
		changePassword = "change-password",
		changeEmail = "change-email",
		changePhone = "change-phone",
		deactivate = "deactivate",
		resubmitVerificatio = "resubmit-verificatio",
		tags = "tags",
		credit = "credit",
		education = "education",
		experience = "experience",
		award = "award",
		favorite = "favorite",
		verifyLocation = "verify-location",
		location = "location",
		search = "search",
		'search-managers' = "search-managers",
		'search-owners' = "search-owners",
		stripeCards = "stripe-cards",
		cards = "cards",
		transaction = "transaction",
		logout = "logout",
		stripeMembership = "stripe-membership",
		fields = "fields",
		view = "view",
		availability = "availability",
		weekAvailability = "week-availability",
		weekItemAvailability = "week-item-availability",
		unavailability = "unavailability",
		coupon = "coupon",
		settings = "settings",
		message = "message",

		// Extra Key
		report = "report",
		membership = "membership",
		//dashboard = "dashboard",
		//profile = "profile",
		//verification = "verification",
		//avatar = "avatar",
		//banner = "banner",
		//load_profile = "load_profile",
		//'booking', 'booked', 'availability-booked', 'unavailability', 'appointments', 'is-available'
		//'week-availability', 'week-item-availability', 'availability'
	}

	export enum GuestCart {
		list = 'list',
		add = 'add',
		update = 'update',
		remove = 'remove',
		removeAll = 'removeAll',
		increment = 'increment',
		decrement = 'decrement',
	}

	export enum Trriger {
		ProfileNameDialog = 'ProfileNameDialog', // user registration opt dialog close key
		ProfileScreenNameDialog = 'ProfileScreenNameDialog',
		ProfileAvatarDialog = 'ProfileAvatarDialog',
		ProfileReviewsDialog = 'ProfileReviewsDialog',
		ProfileEmailDialog = 'ProfileEmailDialog',
		ProfileMobileNumberDialog = 'ProfileMobileNumberDialog',
		ProfilePasswordDialog = 'ProfilePasswordDialog',
		Profile2StepVerificationDialog = 'Profile2StepVerificationDialog',
		ProfileDeactivateDialog = 'ProfileDeactivateDialog',
		ProfilePrivacyDialog = 'ProfilePrivacyDialog',
		ProfileSpecialitiesDialog = 'ProfileSpecialitiesDialog',
		ProfileAboutDialog = 'ProfileAboutDialog',
		ProfileLocationDialog = 'ProfileLocationDialog',
	}
}