// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

var domain_name = "amlakserv.com";
var url_schema = "https";
var site_name = "Amlakserv";
var encryption_key = "qkwjdiw675";
var encryption_method = "AES-256-CBC";
var decrypt_key = "qkwjdiw675";
var staging = "dev.";
//var staging = "";
var apiRoot = "feapi";

export const environment = {
	production: true,
	siteName: `${site_name}`,
	apiUrl: `https://${apiRoot}.${staging}${domain_name}/`,
	//apiUrl: `http://localhost:8000/`,
	tokenName: 'token',
	hostName: `${url_schema}://${staging}${domain_name}`,
	uploadPath: `${url_schema}://uploads.${domain_name}/`,
	whitelistedDomains: [`${apiRoot}.${staging}${domain_name}`],
	imgUrl: `${url_schema}://uploads.${domain_name}/storage`,
	googleCaptcha: "6Lcx1l4aAAAAAM_O2v2P_9icGlTNaCjbwbV7VMpS",
	STRIPE_PUBLIC_KEY: 'pk_test_51Km0WgHPaO6fVsrdc1wEzTqUfaMJUmcb5NYvH9zNcMqTQ55dzIzmUJPILXsOmzPBtDXvnkTByOyOgofVL1hmXFHQ00HwTaK8OD',
	STRIPE_PRIVATE_KEY: 'sk_test_51Km0WgHPaO6fVsrd9lFglxYjHMcevFI1evWWxmqrcQYRdm6gMZAPWApgyP91cHXhJViYugI4q2dwA3bjjl7NvbEA00f17MWyUs',
	STRIPE_CLIENT_ID: 'ca_LXJqVxqD46lG1CqUnmOX6yPLiKVeBn8T',
	STRIPE_REDIRECT_URI: `${url_schema}://${staging}${domain_name}/expert/profile/payment`,
	DECRYPT_KEY: decrypt_key,
	FACEBOOK_APP_ID: '269958931490245',
	FACEBOOK_APP_TOKEN: 'af173c967b26a81650f6a0333bc922b3',
	GOOGLE_APP_ID: '195866360124-g92db4ugvshgbjhuk7rvnjmeq9iv0m05.apps.googleusercontent.com',
	GOOGLE_APP_TOKEN: 'Q8TBE79Oli9LncyXQd8IucF2',
	GOOGLE_MAP_KEY: 'AIzaSyAYAeL5Th6kHbY2AfRhlXtwBqxkZQTbfww',

	PAYSTACK_PUBLIC_KEY: 'pk_live_718a2aea129166997e55bb709cccb4529f3d8bee',
	// Test Key => pk_test_26d46b4993958b0693d8107b227e6f2d43a2b5b6
	// Live Key => pk_live_718a2aea129166997e55bb709cccb4529f3d8bee
	PAYSTACK_PRIVATE_KEY: 'sk_live_e611ea2981a9ece36ead2cc5802816f8bbd93daf',
	// Test Key => sk_test_c654cea029f21a302646c3e7801cfaa456ac02a1
	// Live Key => sk_live_e611ea2981a9ece36ead2cc5802816f8bbd93daf
	//https://uploads.amlakserv.com/storage
	WEB_SOCKET_URL: `wss://${apiRoot}.${staging}${domain_name}/ws`,
	WEB_SOCKET_CHAT_URL: `wss://${apiRoot}.${staging}${domain_name}/user/message-save`,
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
