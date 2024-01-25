import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from '.';
import { ApiResponse, User } from '../models';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getItem } from '../helpers';

@Injectable({
	providedIn: 'root'
})
export class ItemService {
	userObservable: Observable<User> = this.stores.select(state => state.auth.user);
	user: User | null = null;
	socket: any;
	loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());
	authenticationState = this.loggedIn.asObservable();
	isLogged: boolean = this.isAuthenticated();

	constructor(
		private http: HttpService,
		private stores: Store<any>,
	) {
		this.userObservable.subscribe(data => {
			this.user = new User(data);
		});
	}

	getAuthorizationToken() {
		const token: any = getItem('token');
		return (token !== null) ? JSON.parse(token) : null;
	}

	isAuthenticated() { return this.getAuthorizationToken(); }

	isTokenExpired() { return !this.getAuthorizationToken(); }

	get userRole() {
		const user = getItem('user');
		return (user !== null) ? JSON.parse(user).role : null;
	}

	/*
		Authentication Service Key base Action: 
		Api => auth, oauth
	*/
	// key => 'login' 'verify-2-factor' 'register' 'resend-verification' 'email-verification' 'otp-verification' 'reset-password' 'forgot-password' 'check-trigger' 'check-email' 'check-sms' 'is-email-exists'
	auth(params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request("POST", `authentication/index`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}
	
	oauth(params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request("POST", `authentication/index`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => {
				return response;
			}));
	}

	/*
		Item Service Key Base Action
		Api => index, forum
	*/
	// key => comments, reactions, categories
	// Extra => Pages, Blog, Testimonials, Slider
	item(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		let action = this.isLogged ? `item/index` : `item/index`;
		return this.http.request(method, action, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}
	// key => categories
	forum(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, `item/forum`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	/*
		Default actions 
		Api => 'index', 'upload', 'sections', 'fields', 'file-resize', 'notifications', 'settings', 'support', 'message', 'contact', 'timezone', 'countries', 'states', 'modules', 'newsletter', 'config',
		Public Api => 'public-upload'
	*/
	
	default(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, `default/index`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	/*sections(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, `default/sections`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	fields(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, `default/fields`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	fileResize(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, `default/file-resize`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	tags(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		const action = this.isLogged ? 'tags' : 'public-tags';
		return this.http.request(method, `default/${action}`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	notification(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, `default/notifications`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	settings(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, `default/settings`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	support(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, `default/support`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	message(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, `default/message`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	contact(params: any = null): Observable<ApiResponse> {
		return this.http.request('POST', `default/contact`, { body: params })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	timeZone(params2: any = null): Observable<ApiResponse> {
		return this.http.request('GET', `default/timeZone`, { body: null, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	countries(params2: any = null): Observable<ApiResponse> {
		return this.http.request('GET', `default/countries`, { body: null, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	states(params2: any = null): Observable<ApiResponse> {
		return this.http.request('GET', `default/states`, { body: null, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	cities(params2: any = null): Observable<ApiResponse> {
		return this.http.request('GET', `default/cities`, { body: null, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	modules(params2: any = null): Observable<ApiResponse> {
		return this.http.request('GET', `default/modules`, { body: null, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	newsletter(params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request('POST', `default/newsletter`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	config(params: any = null): Observable<ApiResponse> {
		return this.http.request('GET', `default/index?key=config`, { body: params })
			.pipe(map((response: ApiResponse) => { return response; }));
	}*/

	basicUpload(files: FileList, extensions = 'mix_supported_file_extensions'): Observable<ApiResponse> {
		const formData: FormData = new FormData();
		Array.from(files).forEach(f => formData.append('file', f));
		const action = `${this.isLogged ? 'index' : 'index'}?key=upload`;
		return this.http.post(`default/${action}`, formData).pipe(
			map((response: ApiResponse) => { return response; }));
	}

	uploadAndProgress(files: FileList, extensions = 'mix_supported_file_extensions'): Observable<any> {
		const formData: any = new FormData();
		Array.from(files).forEach(f => formData.append('file', f));
		const action = `${this.isLogged ? 'index' : 'index'}?key=upload`;
		return this.http.post(`default/${action}`, formData, { reportProgress: true, observe: 'events' }).pipe(
			map((response: any) => { return response; }));
	}

	calcProgressPercent(event: any) {
		return Math.round(100 * event.loaded / event.total);
	}

	/*
		User Service Key Base Action	
		Api => 'index', 'dashboard', 'availability', 'stripe', 'membership', 'zipcode', tags
		Public Api => 'public-index', 'public-availability', 'public-membership', 'public-zipcode', "public-tags",
	*/
	// Key => change-password, change-email, resubmit-verificatio, credit, education, experience, award, favorite, verify-location, location, search, stripe-cards, transaction, logout, stripe-membership
	profile(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		let action = this.isLogged ? `user/index` : `user/index`;
		return this.http.request(method, action, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}
	// Key => categories, comments, reviews, likes, wishlist, wishlist-update-tags, wishlist-tags, brand, appointments, recipients, option, attributes, fields, option-item, export, import, cart
	catalog(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		let action = this.isLogged ? `catalog/index` : `catalog/index`;
		return this.http.request(method, action, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	tagTypes(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		let action = `catalog/tag-types`;
		return this.http.request(method, action, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	categories(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		let action = `catalog/categories`;
		return this.http.request(method, action, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	cart(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, `catalog/cart`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}
	// Key => comments, reviews, milestone, likes, meeting, join, shared, dispute
	orders(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		let action = this.isLogged ? `orders/index` : `orders/index`;
		return this.http.request(method, action, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	//purchased-courses
	video(method = "GET", params: any = null, params2: any = null): Observable<ApiResponse> {
		let action = this.isLogged ? `user-catalog/video` : `user-catalog/video`;
		return this.http.request(method, action, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}



	emailExists(email: string, role = null): Observable<boolean> {
		let params = { Username: email, is_data: true } ;
		let params2 = (role === null) ? { key: 'is-email-exists' } : { key: 'is-user-email-exists', role: role } ;
		//let params2 = { key: 'is-email-exists' };
		return this.http.emailCheck("POST", 'authentication/index', { body: params, params: params2 })
			.pipe(map((response: boolean) => { return true; }), catchError(async (e) => false));
	}

	uniqueEmailValidator(role: any = null): AsyncValidatorFn {
		return (control: AbstractControl): Observable<ValidationErrors | null> => {
			//console.log('role', role)
			return this.emailExists(control.value, role).pipe(
				map((exists) => {
					//console.log('exists', exists)
					if(role) {
						return (exists ? { emailExistWithRole: true } : null);
					} else {
						return (exists ? { emailExists: true } : null);
					}
				}),
				catchError(async (e) => {
					console.log('e', e)
					return null
				})
			);
		};
	}

	emailNotExistsValidator(): AsyncValidatorFn {
		return (control: AbstractControl): Observable<ValidationErrors | null> => {
			return this.emailExists(control.value).pipe(
				map((exists) => {
					//console.log('exists', exists)
					return (exists ? null : { emailNotExists: true });
				}),
				catchError(async () => null)
			);
		};
	}
	

	//Extra Api
	ndis(method = "POST", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, 'user/ndis', { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}
	// execute
	execute(method = "POST", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, 'default/execute', { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	search(method = "POST", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, 'search/index', { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	contact(method = "POST", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, `contact/index`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	userContact(method = "POST", params: any = null, params2: any = null): Observable<ApiResponse> { /* apply, request, confirmed, reject */
		return this.http.request(method, `user/contact`, { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	reference(method = "POST", params: any = null, params2: any = null): Observable<ApiResponse> { 
		// apply, request, confirmed, reject
		// invitation, agreement, contract
		return this.http.request(method, 'reference/index', { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	request(method = "POST", params: any = null, params2: any = null): Observable<ApiResponse> { 
		// apply, request, confirmed, reject
		// bill, issue
		return this.http.request(method, 'request/index', { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	/*invitation(method = "POST", params: any = null, params2: any = null): Observable<ApiResponse> { 
		return this.http.request(method, 'orders/invitation', { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	agreement(method = "POST", params: any = null, params2: any = null): Observable<ApiResponse> { 
		return this.http.request(method, 'orders/agreement', { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	contract(method = "POST", params: any = null, params2: any = null): Observable<ApiResponse> { 
		return this.http.request(method, 'orders/contract', { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}*/

	/*request(method = "POST", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, 'orders/request', { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	bill(method = "POST", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, 'orders/bill', { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}*/

	ads(method = "POST", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, 'orders/ads', { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

	staff(method = "POST", params: any = null, params2: any = null): Observable<ApiResponse> {
		return this.http.request(method, 'staff/index', { body: params, params: params2 })
			.pipe(map((response: ApiResponse) => { return response; }));
	}

}
