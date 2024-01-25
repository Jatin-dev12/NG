import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, Subject, debounce, debounceTime } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { ApiResponseData } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { SearchManagersListingItemComponent } from '../search-managers-listing-item/search-managers-listing-item.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormSubmitDirective, PaginationComponent } from 'src/app/shared';
import { GoogleLocationInputComponent } from 'src/app/standalone';
import { handleAddressState } from 'src/app/helpers';

@Component({
	selector: 'app-search-managers-listing',
	templateUrl: './search-managers-listing.component.html',
	styleUrls: ['./search-managers-listing.component.scss'],
	standalone: true,
	imports: [ReactiveFormsModule, FormsModule, FormSubmitDirective, NgSelectModule, NgxSkeletonLoaderModule, SearchManagersListingItemComponent, PaginationComponent, AsyncPipe, RouterLink, GoogleLocationInputComponent]
})
export class SearchManagersListingComponent implements OnInit {
	users: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.UserSelectors[EnumRxKey.User.search]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.UserLoadingKey[`${EnumRxKey.User.search}Loading`]);
	countriesObservable: Observable<any> = this.gs.store.select(StoreSelector.DefaultSelectors[EnumRxKey.Default.countries]);
	stateObservable: Observable<any> = this.gs.store.select(StoreSelector.DefaultSelectors[EnumRxKey.Default.states]);
	citiesObservable: Observable<any> = this.gs.store.select(StoreSelector.DefaultSelectors[EnumRxKey.Default.cities]);
	citiesLoading: Observable<boolean> = this.gs.store.select(StoreSelector.DefaultLoadingKey[`${EnumRxKey.Default.cities}Loading`]);
	q: string = '';
	q_location: any = '';
	q_location_country_code: any = '';
	q_location_state_code: any = '';
	q_location_city: any = '';
	q_location_zip5: string = '';
	q_location_zip4: string = '';
	sort: string = '';
	page: any = 1;
	params: any = { key: EnumRxKey.User.search, roles: Enums.Role.ROLE_MANAGERS, page: 0, size: 10 };

	modelChanged: Subject<string> = new Subject<string>();
	state_code = '';
	city_page = 0;
	citieInput$ = new Subject<string | null | any>();
	show_clear: boolean = false;

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
		private router: Router,
		private confirmDialog: ConfirmDialogService,
		private itemService: ItemService,
	) {
		//this.gs.trrigerAction('search-manager-load-country');
		//console.log('dfdsf', this.activeRoute.snapshot.queryParams);
		/*let q_location_country_code = this.activeRoute.snapshot.queryParams['q_location_country_code'];
		let q_location_state_code = this.activeRoute.snapshot.queryParams['q_location_state_code'];
		if(q_location_country_code) {
			this.loadState(q_location_country_code);
		}
		if(q_location_state_code) {
			this.loadCity(q_location_state_code);
		}*/
	}

	ngOnInit(): void {
		this.loadActiveRoute();
		/* this.countriesObservable.subscribe(data => {
			if (data === null) {
				this.gs.store.dispatch(StoreAction.DefaultParams({ method: "GET", params: null, params2: { key: EnumRxKey.Default.countries, size: 500 }, key: EnumRxKey.Default.countries }));
			}
		});
		*/
		//this.loadState('IN');
		/*this.gs.trrigerAction$.subscribe(data => {
			if (data === 'search-manager-load-country') {
				if (this.q_location_country_code) this.loadState(this.q_location_country_code);
				if (this.q_location_state_code) this.loadCity(this.q_location_state_code);
			}
		});*/
		/*
		this.citieInput$.pipe(debounceTime(600)).subscribe((newTerm) => {
			if(newTerm && !this.q_location_state_code) {
				this.confirmDialog.confirm({
					message: 'Please select country and state',
					rejectVisible: false,
					acceptLabel: 'Okay'
				}, () => console.log('Yes'), () => console.log('No'))
				return
			}
			newTerm && this.loadCity(this.q_location_state_code, newTerm);
		});
		*/
	}

	loadActiveRoute() {
		this.activeRoute.queryParamMap.subscribe(params => {
			let q = params.get('q') ?? '';
			let q_location = params.get('q_location') ?? null;
			let q_location_country_code = params.get('q_location_country_code') ?? null;
			let q_location_state_code = params.get('q_location_state_code') ?? null;
			let q_location_city = params.get('q_location_city') ?? null;
			let sort = params.get('sort') ?? '-id';
			let page = params.get('page') ?? 0;
			this.q = q;
			this.q_location = q_location;
			this.q_location_country_code = q_location_country_code;
			this.q_location_state_code = q_location_state_code;
			this.q_location_city = q_location_city;
			this.sort = sort;
			this.page = page;
			this.state_code = params.get('q_location_state_code') || '';
			this.params = Object.assign({}, this.params, { q: q, q_location: q_location, sort: sort, page: page });
			let action = StoreAction.UserParams({ method: "GET", params: null, params2: this.params, key: EnumRxKey.User.search });
			this.gs.store.dispatch(action);
		});
	}

	loadState(country_code: any) {
		this.gs.store.dispatch(StoreAction.DefaultParams({ method: "GET", params: null, params2: { country_iso2: country_code, key: EnumRxKey.Default.states, size: 1000 }, key: EnumRxKey.Default.states }));
	}

	onScroll(event: any) {
		//console.log('event', event)
	}

	onScrollToEnd() {
		//console.log('end Event', this.city_page);
		this.city_page += 1;
		this.gs.store.dispatch(StoreAction.DefaultMoreParams({ method: "GET", params: null, params2: { state_code: this.state_code, page: this.city_page, key: EnumRxKey.Default.cities, size: 100 }, key: EnumRxKey.Default.cities }));
	}

	loadCity(state_code: any, q = '') {
		this.gs.store.dispatch(StoreAction.DefaultParams({ method: "GET", params: null, params2: { state_code: state_code, q: q, key: EnumRxKey.Default.cities, page: 0, size: 20 }, key: EnumRxKey.Default.cities }));
	}

	handleCountries(event: any) {
		if (event) {
			this.q_location_country_code = event?.iso2;
			this.loadState(event?.iso2);
			this.q_location_state_code = null;
			this.q_location_city = null;
		} else {
			this.q_location_country_code = null;
			this.q_location_state_code = null;
			this.q_location_city = null;
			this.gs.store.dispatch(StoreAction.DefaultAdd({ item: null, key: EnumRxKey.Default.cities }));
			this.gs.store.dispatch(StoreAction.DefaultAdd({ item: null, key: EnumRxKey.Default.states }));
		}
		this.search();
	}

	handleState(event: any) {
		this.state_code = event?.state_code || '';
		if (event) {
			this.q_location_state_code = event?.state_code;
			this.loadCity(event?.state_code);
		} else {
			this.q_location_state_code = null;
			this.q_location_city = null;
			this.gs.store.dispatch(StoreAction.DefaultAdd({ item: null, key: EnumRxKey.Default.cities }));
		}
		this.search();
	}

	handleCity(event: any) {
		this.q_location_city = event ? event.name : null;
		this.search();
	}

	handleAddressChange(address: any) {
		let state = handleAddressState(address);
		console.log('address', address, state);
		this.q_location = state.location;
	}

	search() {
		if (this.q?.length > 0) {
			this.show_clear = true;
		}
		this.router.navigate(['/property-managers/listing'], { queryParams: { q: this.q, q_location: this.q_location, sort: this.sort, page: this.page }, queryParamsHandling: 'merge' });
	}

	handlePagination(event: any) {
		this.page = event;
		this.router.navigate(['/property-managers/listing'], { queryParams: { page: event - 1 }, queryParamsHandling: 'merge' });
	}


	/*saveSearch() {
		if (!this.gs.identity) {
			this.confirmDialog.confirm({
				header: this.gs.translate('Login to Save Search'),
				message: this.gs.translate('Please login to save your search criteria. Click here to login '),
				rejectVisible: false,
				acceptVisible: false,
			}, () => {
				console.log('Yes clicked')
			}, () => console.log('No clicked'));
			return
		}
		//console.log('this.translate', this.gs.translate('Save Search'))
		let formValue: any = {};
		formValue['q'] = this.q;
		formValue['q_location_country_code'] = this.q_location_country_code;
		formValue['q_location_state_code'] = this.q_location_state_code;
		formValue['q_location_city'] = this.q_location_city;
		formValue['sort'] = this.sort;
		formValue['page'] = this.page;
		let params = {
			q_param: JSON.stringify(this.gs.removeBlankObject(formValue)),
			url: '/property-managers/listing',
			params: ``
		};
		this.itemService.search("POST", params).subscribe(response => {
			this.confirmDialog.confirm({
				header: this.gs.translate('Save Search'),
				message: this.gs.translate('You have successfully saved your search criteria'),
				rejectVisible: false,
				acceptLabel: 'View Save Search'
			}, () => {
				this.gs.router('/saved-searches');
			}, () => console.log('No clicked'));
		})
	}
	*/

}
