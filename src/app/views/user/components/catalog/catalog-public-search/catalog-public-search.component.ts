import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbModal, NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionButton, NgbCollapse, NgbAccordionCollapse, NgbAccordionBody } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AdditionalEnums, EnumRxKey, Enums } from 'src/app/enums';
import { ApiResponseData, User } from 'src/app/models';
import { ConfirmDialogService, InputNumber, LaddaDirective } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { CatalogFeatureSearchDialogComponent } from '../_partials/catalog-feature-search-dialog/catalog-feature-search-dialog.component';
import moment from 'moment';
import { handleAddressState, isJsonString } from 'src/app/helpers';
import { CatalogGoogleMapViewComponent } from '../_partials/catalog-google-map-view/catalog-google-map-view.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatNativeDateModule } from '@angular/material/core';
import { ControlErrorsDirective, FormSubmitDirective, OrderPipe } from 'src/app/shared';
import { CatalogListComponent, GoogleLocationInputComponent } from 'src/app/standalone';
import { CatalogMoreFilterDialogComponent } from '../_dialogs/catalog-more-filter-dialog/catalog-more-filter-dialog.component';

@Component({
    selector: 'app-catalog-public-search',
    templateUrl: './catalog-public-search.component.html',
    styleUrls: ['./catalog-public-search.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule, FormSubmitDirective, NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionButton, NgbCollapse, NgbAccordionCollapse, NgbAccordionBody, NgSelectModule, ControlErrorsDirective, NgxIntlTelInputModule, FormsModule, MatSliderModule, MatNativeDateModule, MatDatepickerModule, InputNumber, LaddaDirective, CatalogListComponent, CatalogGoogleMapViewComponent, OrderPipe, GoogleLocationInputComponent]
})
export class CatalogPublicSearchComponent implements OnInit {
	seachObservable: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.search]);
	CatalogRxKey = EnumRxKey.Catalog;
	categories: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.categories]);
	tagsArray: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.tags]);
	tagsTypesArray: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog['tag-types']]);
	userObservable: Observable<User> = this.gs.store.select(state => state.auth.user);
	itemObservable: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.search]);
	form!: UntypedFormGroup;
	user: User | null = null;
	minDate: Date = new Date();
	
	Type_Slug: any = '';
	featuresArray: any[] = [];
	mainCateTypes: any[] = [];
	amenitiesTypesArray: any[] = [];
	cateTypesArray: any[] = [];
	category_id: any = '';
	property_purpose: any = null;
	Enums = Enums;
	saveLoading: Observable<boolean> = this.gs.store.select(StoreSelector.SearchLoading);
	params: any = { key: EnumRxKey.Catalog.search, moduleId: Enums.USER_CATALOG_MODULE_ID_JOBS, page: 0, size: 9 };
	categoriesArray: any[] = [];
	showDisplayLayout: any = true;
	q = '';


	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
		private confirmDialog: ConfirmDialogService,
		private modalService: NgbModal,
		private router: Router,
		private itemService: ItemService,
	) {
		this.form = this.gs.formBuilder.group({
			key: new UntypedFormControl(EnumRxKey.Catalog.search),
			moduleId: new UntypedFormControl(Enums.USER_CATALOG_MODULE_ID_JOBS),
			q: new UntypedFormControl(''),
			category_id: new UntypedFormControl(''),
			property_purpose: new UntypedFormControl(null),
			price: new UntypedFormControl(''),
			period: new UntypedFormControl(''),
			min_price: new UntypedFormControl(''),
			max_price: new UntypedFormControl(''),
			// Extra
			m2_gross_price: new UntypedFormControl(null),
			m2_net_price: new UntypedFormControl(null),
			number_of_floors: new UntypedFormControl(null),
			number_of_rooms: new UntypedFormControl(null),
			number_of_bathrooms: new UntypedFormControl(null),
			age_of_building: new UntypedFormControl(null),
			is_available_loan: new UntypedFormControl(null),
			is_swap: new UntypedFormControl(null),
			height: new UntypedFormControl(null),
			is_ac: new UntypedFormControl(null),
			is_furnished: new UntypedFormControl(null),
			status_of_use: new UntypedFormControl(null),
			number_of_apartments: new UntypedFormControl(null),
			occupancy_rate: new UntypedFormControl(null),
			number_of_elevators: new UntypedFormControl(null),
			property_open_area: new UntypedFormControl(null),
			property_indoor_area: new UntypedFormControl(null),
			number_of_pumps: new UntypedFormControl(null),
			sales: new UntypedFormControl(null),
			is_furniture: new UntypedFormControl(null),
			property_category: new UntypedFormControl(null),
			number_of_trees: new UntypedFormControl(null),
			amenities: this.gs.formBuilder.array([]),
			posted_at: new UntypedFormControl(''),
			q_location: new UntypedFormControl(''),
			q_location_country_code: new UntypedFormControl(null),
			photo_video: new UntypedFormControl(null),
			q_location_city: new UntypedFormControl(null),
			sort: new UntypedFormControl('-id'),
			status: new UntypedFormControl(Enums.USER_CATALOG_STATUS_ACTIVE),
			is_publish: new UntypedFormControl(Enums.USER_CATALOG_IS_PUBLISH_PUBLISH),
			page: 0,
			size: 9
		})
		this.tagsTypesArray.subscribe(data => {
			if(data === null) {
				setTimeout(() => {
					this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { key: EnumRxKey.Catalog['tag-types'], size: 500 }, key: EnumRxKey.Catalog['tag-types'] }));
				}, 6000);
			}
			if (data) {
				this.mainCateTypes = data;
				this.amenitiesTypesArray = this.mainCateTypes?.map(p => { return { id: p.id, name: p.name, slug: p.slug, children: [] } });
				this.cateTypesArray = this.mainCateTypes?.map(p => { return { id: p.id, name: p.name, slug: p.slug, children: [] } });
			}
		});
		
	}

	get amenities() {
		return this.form.get('amenities') as UntypedFormArray;
	}

	addNewFieldAmenities(item?: any) {
		return this.gs.formBuilder.group({
			tag_id: new UntypedFormControl(item.id),
			type: new UntypedFormControl(item.type),
			name: new UntypedFormControl(item.name),
			description: new UntypedFormControl(item?.description ?? ''),
		});
	}

	ngOnInit(): void {
		this.userObservable.subscribe(user => this.user = new User(user));
		this.loadActiveRoute();
		this.categories.subscribe(data => {
			if (data) {
				this.categoriesArray = data?.filter((val: any) => val.moduleId === 'property').map((filteredObj: any) => filteredObj);
				if (data) {
					this.Type_Slug = this.categoriesArray.find(val => val.id === +this.category_id)?.slug;
				}
			}
		});
		this.tagsArray.subscribe(data => {
			(data === null) && this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { key: EnumRxKey.Catalog.tags, size: 500 }, key: EnumRxKey.Catalog.tags }));
			let cateItem = this.categoriesArray.find(val => val.slug === AdditionalEnums.CatalogTypeSlug.VILLAS);
			if (data) {
				this.convertTree(data, cateItem?.id ?? 2);
			}
		});
		
	}

	convertTree(items: any[], cate_id?: any) {
		let cate_types: any[] = this.cateTypesArray;
		let filtered = items?.filter(p => {
			let category = isJsonString(p.category) ? JSON.parse(p.category, (k, v) => { return (typeof v === "object" || isNaN(v)) ? v : parseInt(v, 10); }) : p.category?.split(",")?.map(Number);
			return Array.isArray(category) ? category?.includes(cate_id) : [category]?.includes(cate_id);
		});
		filtered.forEach(el => {
			let type = isJsonString(el.type) ? JSON.parse(el.type, (k, v) => { return (typeof v === "object" || isNaN(v)) ? v : parseInt(v, 10); }) : el.type?.split(",")?.map(Number);
			cate_types.forEach(val => {
				if (Array.isArray(type) ? type?.includes(val.id) : [type]?.includes(val.id)) {
					let index = cate_types.findIndex(v => v.id === val.id);
					cate_types[index].children?.push(el);
				}
			});
		});
		this.featuresArray = cate_types;
		//console.log('datadata', this.cateTypesArray);
	}

	loadActiveRoute() {
		this.activeRoute.queryParamMap.subscribe(params => {
			let amenitieParams: any = params.get('amenities') ?? [];
			let amenitiesIds: any = (amenitieParams.length > 0) ? amenitieParams?.split(',') : [];
			this.category_id = params.get('category_id') ?? '';
			let show_map = params.get('show_map') ?? 1;
			//console.log('show_map', params.get('max_price') || 99999)
			this.showDisplayLayout = (+show_map === 1) ? true : false;
			let paramsAny: any = params;
			let min_price: any = params.get('min_price') || null;
			let max_price: any = params.get('max_price') || null;
			let number_of_floors = params.get('number_of_floors');
			let number_of_rooms = params.get('number_of_rooms');
			let number_of_bathrooms = params.get('number_of_bathrooms');
			let age_of_building = params.get('age_of_building');
			//this.highValue = max_price;
			this.q = params.get('q') ?? '';
			this.form.patchValue({
				q: params.get('q') ?? '',
				category_id: params.get('category_id') ?? '',
				property_purpose: params.get('property_purpose') ?? null,
				price: params.get('price') ?? '',
				min_price: min_price,
				max_price: max_price,
				m2_gross_price: params.get('m2_gross_price') ?? null,
				m2_net_price: params.get('m2_net_price') ?? null,
				number_of_floors: number_of_floors ? number_of_floors.split(",").map(Number) : null,
				number_of_rooms: number_of_rooms ? number_of_rooms.split(",").map(Number) :  null,
				number_of_bathrooms: number_of_bathrooms ? number_of_bathrooms.split(",").map(Number) :  null,
				age_of_building: age_of_building ? age_of_building.split(",").map(Number) : null,
				is_available_loan: paramsAny.get('is_available_loan') ? +paramsAny.get('is_available_loan') : null,
				is_swap: paramsAny.get('is_swap') ? +paramsAny.get('is_swap') : null,
				height: params.get('height') ?? null,
				is_ac: paramsAny.get('is_ac') ? +paramsAny.get('is_ac') : null,
				is_furnished: paramsAny.get('is_furnished') ? +paramsAny.get('is_furnished') : null,
				status_of_use: paramsAny.get('status_of_use') ? +paramsAny.get('status_of_use') : null,
				number_of_apartments: params.get('number_of_apartments') ?? null,
				occupancy_rate: params.get('occupancy_rate') ?? null,
				number_of_elevators: params.get('number_of_elevators') ?? null,
				property_open_area: params.get('property_open_area') ?? null,
				property_indoor_area: params.get('property_indoor_area') ?? null,
				number_of_pumps: params.get('number_of_pumps') ?? null,
				sales: params.get('sales') ?? null,
				is_furniture: paramsAny.get('is_furniture') ? +paramsAny.get('is_furniture') : null,
				property_category: params.get('property_category') ?? null,
				number_of_trees: params.get('number_of_trees') ?? null,
				posted_at: params.get('posted_at') ?? null,
				q_location: params.get('q_location') ?? null,
				q_location_country_code: params.get('q_location_country_code') ?? null,
				q_location_city: params.get('q_location_city') ?? null,
				status: params.get('status') ?? Enums.USER_CATALOG_STATUS_ACTIVE,
				is_publish: params.get('is_publish') ?? Enums.USER_CATALOG_IS_PUBLISH_PUBLISH,
			});

			let amenities: UntypedFormArray = this.amenities as UntypedFormArray;
			this.tagsArray.subscribe(tags => {
				if (tags && amenitiesIds?.length > 0) {
					this.amenities.clear();
					amenitiesIds?.forEach((el: any) => {
						let item = tags?.find((val: any) => val.id === + el);
						amenities.push(this.addNewFieldAmenities(item));
					});
				}
			});
			//let posted_at = this.form.value?.posted_at;
			let params2 = { ...this.form.value };
			params2['amenities'] = String(params.get('amenities') ?? []);
			params2['number_of_floors'] = String(params2.number_of_floors ?? []);
			params2['number_of_rooms'] = String(params2.number_of_rooms ?? []);
			params2['number_of_bathrooms'] = String(params2.number_of_bathrooms ?? []);
			params2['age_of_building'] = String(params2.age_of_building ?? []);

			let action = StoreAction.CatalogParams({ method: "GET", params: null, params2: params2, key: EnumRxKey.Catalog.search });
			//let action = StoreAction.CatalogParams({ method: "GET", params: null, params2: null, key: EnumRxKey.Catalog.search });
			this.gs.store.dispatch(action);
		});


	}

	handleType(value: any) {
		//const { value } = event.target;
		let category = this.categoriesArray.find(val => val.slug === value);
		//console.log('value', value);
		this.Type_Slug = value;
		this.form.patchValue({
			category_id: category?.id,
			m2_gross_price: null,
			m2_net_price: null,
			number_of_floors: null,
			number_of_rooms: null,
			number_of_bathrooms: null,
			age_of_building: null,
			is_available_loan: null,
			is_swap: null,
			height: null,
			is_ac: null,
			is_furnished: null,
			status_of_use: null,
			number_of_apartments: null,
			occupancy_rate: null,
			number_of_elevators: null,
			property_open_area: null,
			property_indoor_area: null,
			number_of_pumps: null,
			sales: null,
			is_furniture: null,
			property_category: null,
			number_of_trees: null,
			amenities: [],
			posted_at: '',
			q_location_country_code: null,
			q_location_city: null,
			sort: '-id',
			page: 0,
			size: 10
		});
		let formValue = this.form.value;
		let params = { key: EnumRxKey.Catalog.search, moduleId: Enums.USER_CATALOG_MODULE_ID_JOBS, page: 0, size: 9, category_id: category?.id, property_purpose: formValue?.property_purpose, min_price: formValue.min_price, max_price: formValue.max_price };
		this.router.navigate(['/search/listing'], { queryParams: this.gs.removeBlankObject(params) });
		this.tagsArray.subscribe(data => {
			if (data) {
				this.cateTypesArray = this.mainCateTypes?.map(p => { return { id: p.id, name: p.name, slug: p.slug, children: [] } });
				//this.amenities.reset();
				this.convertTree(data, category?.id ?? 2);
			}
		});

	}

	showMoreFilters() {
		const modalRef = this.modalService.open(CatalogMoreFilterDialogComponent, {
			windowClass: 'center',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true,
			size: 'lg',
		});
		modalRef.componentInstance.form = this.form;
		modalRef.componentInstance.Type_Slug = this.Type_Slug;
		modalRef.result.then((result) => {
			if (!result) return;
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	handleAddressChange(address: any) {
		let state = handleAddressState(address);
		this.form.patchValue({
			q_location: state.location
		})
	}

	reset() {
		this.Type_Slug = null;
		this.gs.router('/search/listing');
	}

	onSubmit(form: UntypedFormGroup) {
		let params = { ...this.form.value };
		let amenities = this.form.value.amenities?.map((val: any) => { return val.tag_id });
		let posted_at = this.form.value.posted_at;
		params['amenities'] = String(amenities);
		params['posted_at'] = posted_at ? moment(posted_at).format('YYYY-MM-DD') : '';
		this.router.navigate(['/search/listing'], { queryParams: this.gs.removeBlankObject(params), queryParamsHandling: 'merge' });
	}


	saveSearch() {
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
		let formValue = { ...this.form.value };
		if(!formValue.category_id) {
			this.confirmDialog.confirm({
				header: this.gs.translate('Warning'),
				icon: `<img src="${this.gs.imgUrl}/danger-two.svg" alt="" />`,
				message: this.gs.translate('Please select Type option to save the property'),
				rejectVisible: false,
				acceptVisible: true,
				acceptLabel: 'Okay'
			}, () => {
				console.log('Yes clicked')
			}, () => console.log('No clicked'));
			return;
		}
		let amenities = this.form.value.amenities?.map((val: any) => { return val.tag_id });
		formValue['amenities'] = String(amenities);
		let params = {
			q_param: JSON.stringify(this.gs.removeBlankObject(formValue)),
			url: '/search/listing',
			params: `${this.gs.find(this.categoriesArray, +this.category_id, 'id')?.name ?? ''}`
		};
		this.itemService.search("POST", { form: params }).subscribe(response => {
			this.confirmDialog.confirm({
				header: this.gs.translate('Save Search'),
				message: this.gs.translate('You have successfully saved your search criteria'),
				rejectVisible: false,
				acceptLabel: 'View Save Search'
			}, () => {
				this.gs.router('/saved-searches');
			}, () => console.log('No clicked'));
		});
	}

	SelectFeatures() {
		const modalRef = this.modalService.open(CatalogFeatureSearchDialogComponent, {
			windowClass: 'center',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true,
			size: 'lg',
		});
		//modalRef.componentInstance.update = this.update;
		modalRef.componentInstance.form = this.form;
		modalRef.componentInstance.featuresArray = this.featuresArray;
		modalRef.result.then((result) => {
			if (!result) return;
			//console.log('result', result);
			const checkBox: UntypedFormArray = this.amenities as UntypedFormArray;
			let originalArray: any = result;
			this.amenities.clear();
			originalArray.forEach((el: any) => {
				let index = this.amenities?.controls.findIndex((val: any) => val.value?.tag_id === el.tag_id);
				let group = this.gs.formBuilder.group({
					tag_id: new UntypedFormControl(el.tag_id),
					type: new UntypedFormControl(el.type),
					name: new UntypedFormControl(el.name),
					description: new UntypedFormControl(el.description),
				});
				checkBox.push(group);
			});
		}, (reason) => {
			console.log('reason', reason);
		});
	}

}
