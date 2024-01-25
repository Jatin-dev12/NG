import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModal, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Enums, AdditionalEnums, EnumRxKey } from 'src/app/enums';
import { fileManupulate, handleAddressState, isJsonString } from 'src/app/helpers';
import { ApiResponseData, Catalog } from 'src/app/models';
import { ConfirmDialogService, InputNumber, LaddaDirective } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { CatalogFeatureDialogComponent } from '../_partials/catalog-feature-dialog/catalog-feature-dialog.component';
import { AddLocationDialogComponent } from '../_dialogs/add-location-dialog/add-location-dialog.component';
import { CatalogFeaturesViewComponent } from '../_partials/catalog-features-view/catalog-features-view.component';
import { CatalogGeneralDetailsComponent } from '../_partials/catalog-general-details/catalog-general-details.component';
import { CatalogViewSliderComponent } from '../_partials/catalog-view-slider/catalog-view-slider.component';
import { CurrencyPipe, JsonPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ControlErrorContainerDirective, ControlErrorsDirective, FileDragDropUploaderComponent, FormSubmitDirective, OrderPipe, SearchPipe } from 'src/app/shared';
import { GoogleLocationInputComponent, GoogleMapViewComponent } from 'src/app/standalone';

@Component({
    selector: 'app-catalog-form',
    templateUrl: './catalog-form.component.html',
    styleUrls: ['./catalog-form.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, FormSubmitDirective, ControlErrorContainerDirective, ControlErrorsDirective, NgxIntlTelInputModule, NgSelectModule, FormsModule, GoogleLocationInputComponent, NgClass, FileDragDropUploaderComponent, NgTemplateOutlet, InputNumber, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem, LaddaDirective, CatalogViewSliderComponent, CatalogGeneralDetailsComponent, CatalogFeaturesViewComponent, GoogleMapViewComponent, SearchPipe, OrderPipe, JsonPipe, CurrencyPipe]
})
export class CatalogFormComponent implements OnInit {
	@Input() update: Catalog | null = null; // Input property to receive Catalog update data
	itemObservable: Observable<Catalog | null> = this.gs.store.select(StoreSelector.CatalogSelectors.view); // Observable to watch Catalog view changes
	categories: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.categories]); // Observable to watch Catalog categories changes
	catalogFields: Observable<ApiResponseData | null> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.fields]); // Observable to watch Catalog fields changes
	tagsArray: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.tags]); // Observable to watch Catalog tags changes
	tagsTypesArray: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog['tag-types']]); // Observable to watch Catalog tag types changes
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogLoading); // Observable to watch Catalog loading state
	form!: UntypedFormGroup; // Form group for the Catalog form
	submitted = false; // Flag to indicate if the form has been submitted
	savePostLoading = false; // Flag to indicate if the post is being saved
	categoriesArray: any[] = []; // Array to hold categories data
	categoriesArrayList: any[] = []; // Array to hold categories list data
	featuresArray: any[] = []; // Array to hold features data
	AdditionalEnums = AdditionalEnums; // Additional Enums for the Catalog form
	Type_Slug: any = null; // Variable to hold the type slug
	configs: any = null; // Variable to hold the config data

	showPreview: boolean = false; // Flag to indicate if the preview should be shown
	tenantTabDisabled: boolean = true; // Flag to indicate if the tenant tab should be disabled
	featuredActive: boolean = false; // Flag to indicate if the featured is active

	UploadImages: any = { image: [], video: [], docs: [] }; // Object to hold uploaded images data
	UploadPropertyVideo: any = { image: [], video: [], docs: [] }; // Object to hold uploaded property video data
	UploadPropertyCover: any = { image: [], video: [], docs: [] }; // Object to hold uploaded property cover data

	get f() { return this.form.controls; }; // Getter for form controls

	activeId: any = 1; // Variable to hold the active ID

	mainCateTypes: any[] = []; // Array to hold main category types data
	amenitiesTypesArray: any[] = []; // Array to hold amenities types data
	cateTypesArray: any[] = []; // Array to hold category types data

	Enums = Enums; // Enums for the Catalog form
	currency_code: any = 'USD'; // Variable to hold the currency code

	amenitiesArray: any = null; // Variable to hold amenities data```



	/**
	 * Constructor for the CatalogFormComponent class.
	 * @param gs - GlobalService instance.
	 * @param modalService - NgbModal instance.
	 * @param confirmDialog - ConfirmDialogService instance.
	 * @param itemService - ItemService instance.
	 * @param cdr - ChangeDetectorRef instance.
	 */
	constructor(
		public gs: GlobalService,
		private modalService: NgbModal,
		private confirmDialog: ConfirmDialogService,
		private itemService: ItemService,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute
	) {
		// Subscribe to the tagsTypesArray observable.
		this.tagsTypesArray.subscribe(data => {
			// If data is null, dispatch a CatalogParams action.
			(data === null) && this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { key: EnumRxKey.Catalog['tag-types'], size: 500 }, key: EnumRxKey.Catalog['tag-types'] }));
			// If data is not null, map the items to the mainCateTypes, amenitiesTypesArray, and cateTypesArray.
			if (data) {
				this.mainCateTypes = data;
				this.amenitiesTypesArray = this.mainCateTypes.map(p => { return { id: p.id, name: p.name, slug: p.slug, children: [] } });
				this.cateTypesArray = this.mainCateTypes.map(p => { return { id: p.id, name: p.name, slug: p.slug, children: [] } });
			}
		});
	}

	ngOnInit(): void {
		// Clear any existing error messages
		this.gs.clearErrorMessages();
		
		// Validate the form
		this.formValidation();

		this.gs.trrigerAction$.subscribe(data => {
			if(data === 'showPropertyPreview') {
				this.showPreview = true;
			}
		})
		
		// Subscribe to the itemObservable
		this.itemObservable.subscribe(data => {
			// If data exists
			if (data) {
				// Update the form fields
				this.update = data;
				if(this.is_property_disabled) {
					this.showPreview = true;
				}
				this.updateFormField();				
			}
		})
		
		// Subscribe to the tagsArray
		this.tagsArray.subscribe(data => {
			// If data is null, dispatch a CatalogParams action
			(data === null) && this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { key: EnumRxKey.Catalog.tags, size: 500 }, key: EnumRxKey.Catalog.tags }));
			
			// Find the category item with the slug 'VILLAS'
			let cateItem = this.categoriesArray.find(val => val.slug === AdditionalEnums.CatalogTypeSlug.VILLAS);
			
			// If data exists, convert the tree
			if (data) {
				//this.convertTree(data, cateItem?.id ?? 2);
			}
		});
		
		// Subscribe to the categories
		this.categories.subscribe(data => {
			// If data exists, filter and map the categories
			if (data) {
				this.categoriesArray = data?.filter((val: any) => val.moduleId === 'property').map((filteredObj: any) => filteredObj);
			}
		});
		
	}

	// Getter for owner information
	get ownerInfo() {
		return this.update?.agreement?.userCatalogOrdersReferences.find(val => val.relation === AdditionalEnums.USER_CATALOG_ROLE_OWNER) ?? null;
	}

	get isPurposeDisabled() {
		let is_show = false;
		if(this.gs.is_owner) {
			is_show = this.update?.agreement?.tenant ? true : false;
		}
		if(this.gs.is_manager) {
			is_show = (this.update?.agreement?.owner || this.update?.agreement?.tenant) ? true : false;
		}
		return is_show;
	}

	get isPropertyRent() {
		return (this.form.value?.property_purpose === Enums.USER_CATALOG_PROPERTY_PURPOSE_RENT);
	}

	// Handler for purpose change event
	handlePurpose(event: any, value: any) {
		//const { value } = event.target;
		//console.log('value', value, event.target.value);
		if(value === Enums.USER_CATALOG_PROPERTY_PURPOSE_SALE) {
			this.prices.clear();
			this.form.get('price')?.addValidators(Validators.required);
			this.form.get('prices')?.clearValidators();
		} else {
			this.form.get('prices')?.addValidators(Validators.required);
			this.form.get('price')?.clearValidators();
		}
		this.form.controls['price'].updateValueAndValidity();
		this.form.controls['prices'].updateValueAndValidity();
	}

	get handlePricesValue() {
		let values: any[] = [];
		this.prices.controls.forEach(element => {
			if(element.value.name) values.push(`${element.value.name} - ${element.value.price ?? ''}`);
		});
		return values.join(', ');;
	}

	handlePricesAddRemove(event: any, item: any) {
		const { value, checked } = event.target;
		//console.log('value, checked', value, checked);
		const pricesArray: UntypedFormArray = this.prices as UntypedFormArray;
		if(checked) {
			pricesArray.push(this.addNewFieldPrices(item))
		} else {
			let index = this.prices.controls.findIndex(val => val.value.type === item.type);
			pricesArray.removeAt(index);
		}
	}

	handlePricesIndex(item: any) {
		let index = this.prices.controls.findIndex(val => val.value.type === item.type);
		return index;
	}

	handlePricesChecked(item: any) {
		let index = this.prices.controls.find(val => val.value.type === item.type);
		return index ? true : false;
	}

	// Method to update form fields
	updateFormField() {
		//this.showPreview = false;
		this.UploadImages =  this.update?.media && this.gs.mediaFiles(this.update?.media, 'image');
		this.UploadPropertyVideo = this.update?.media && this.gs.mediaFiles(this.update?.media, 'video');
		if (this.update?.cover_id) this.UploadPropertyCover = this.gs.getFilesList(this.update?.cover);
		this.Type_Slug = this.update?.category?.slug;
		//this.convertTree(data, cateItem?.id ?? 2);
		this.tagsArray.subscribe(tagsArray => {
			// Find the category item with the slug 'VILLAS'
			let cateItem = this.categoriesArray.find(val => val.slug === this.Type_Slug);
			// If data exists, convert the tree
			if (tagsArray) {
				this.convertTree(tagsArray, cateItem?.id);
			}
		});
		this.form.patchValue({
			moduleId: this.update?.moduleId || Enums.USER_CATALOG_MODULE_ID_JOBS,
			parent_id: this.update?.parent_id,
			property_purpose: this.update?.property_purpose,
			title: this.update?.title,
			description: this.update?.description,
			specification: this.update?.specification,
			cover_id: this.update?.cover_id,
			video_id: fileManupulate(this.UploadPropertyVideo),
			category_id: this.update?.category_id,
			sub_category_id: this.update?.sub_category_id || 0,
			price_type: this.update?.fixed || 'fixed',
			//owner_id: this.update?.owner_id,
			property_classification: this.update?.property_classification,
			// custom fields
			price: this.update?.price,
			currency_code: this.update?.currency_code,
			m2_gross_price: this.update?.m2_gross_price,
			m2_net_price: this.update?.m2_net_price,
			number_of_floors: this.update?.number_of_floors || null,
			number_of_rooms: this.update?.number_of_rooms || null,
			number_of_bathrooms: this.update?.number_of_bathrooms || null,
			age_of_building: this.update?.age_of_building || null,
			is_available_loan: this.update?.is_available_loan || null,
			is_swap: this.update?.is_swap || null,
			height: this.update?.height || null,
			is_ac: this.update?.is_ac || null,
			is_furnished: this.update?.is_furnished || null,
			status_of_use: this.update?.status_of_use || null,
			number_of_apartments: this.update?.number_of_apartments || null,
			occupancy_rate: this.update?.occupancy_rate || null,
			number_of_elevators: this.update?.number_of_elevators || null,
			property_open_area: +this.update?.property_open_area || null,
			property_indoor_area: this.update?.property_indoor_area,
			number_of_pumps: this.update?.number_of_pumps || null,
			sales: +this.update?.sales || null,
			is_furniture: this.update?.is_furniture || null,
			property_category: +this.update?.property_category || null,
			number_of_trees: this.update?.number_of_trees || null,
			// End
			files: fileManupulate(this.UploadImages),
			is_publish: this.update?.is_publish,
			visibility: this.update?.visibility,
			is_featured: this.update?.is_featured,
			status: this.update?.status,
		});
		this.form.get('location')?.patchValue({
			location: this.update?.location?.location,
			phone_number: this.update?.location?.phone_number,
			apt_number: this.update?.location?.apt_number,
			address_line_1: this.update?.location?.address_line_1,
			address_line_2: this.update?.location?.address_line_2,
			latitude: this.update?.location?.latitude,
			longitude: this.update?.location?.longitude,
			city: this.update?.location?.city,
			country_code: this.update?.location?.country_code,
			state_code: this.update?.location?.state_code,
			zip5: this.update?.location?.state_code,
			map_url: this.update?.location?.map_url,
		});

		// Update amenities
		let userCatalogAmenities = this.update?.userCatalogAmenities ?? [];
		this.amenities.reset();
		userCatalogAmenities.forEach(el => {
			this.amenities.push(this.addNewFieldAmenities(el));
		});

		let userCatalogPrice = this.update?.userCatalogPrice ?? [];
		this.prices.reset();
		//console.log('userCatalogPrices', userCatalogPrice)
		userCatalogPrice.forEach(el => {
			this.prices.push(this.addNewFieldPrices(el));
		});

		this._amenities_to_array();
	}

	/**
	 * This getter function returns an array of all file and video IDs.
	 */
	get allFileIds() {
		let ids: any[] = [];
		let files_id: any[] = this.form.value.files ?? [];
		let videos_id: any[] = this.form.value.video_id ?? [];
		files_id?.forEach(el => ids.push(el));
		videos_id?.forEach(el => ids.push(el));
		return ids;
	}

	/**
	 * This function adds a new field for amenities.
	 * @param item - The item to add.
	 */
	addNewFieldAmenities(item?: any) {
		return this.gs.formBuilder.group({
			tag_id: new UntypedFormControl(item.tag_id),
			type: new UntypedFormControl(item.type),
			name: new UntypedFormControl(item.name),
			description: new UntypedFormControl(item?.description ?? ''),
		});
	}

	/**
	 * This function converts a tree structure.
	 * @param items - The items to convert.
	 * @param cate_id - The category ID.
	 */
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
	}

	/**
	 * This function validates the form fields.
	 */
	formValidation() {
		this.form = this.gs.formBuilder.group({
			moduleId: new UntypedFormControl(Enums.USER_CATALOG_MODULE_ID_JOBS),
			parent_id: new UntypedFormControl(null),
			property_purpose: new UntypedFormControl(Enums.USER_CATALOG_PROPERTY_PURPOSE_SALE, [Validators.required]), // Sale | Rent
			title: new UntypedFormControl('', [Validators.required]),
			description: new UntypedFormControl('', [Validators.required, Validators.maxLength(this.gs.maxLength)]),
			specification: new UntypedFormControl(''),
			cover_id: new UntypedFormControl('', [Validators.required]),
			video_id: new UntypedFormControl(null),
			category_id: new UntypedFormControl('', [Validators.required]),
			sub_category_id: new UntypedFormControl(0),
			price_type: new UntypedFormControl('fixed'),
			property_classification: new UntypedFormControl(null, [Validators.required]),
			price: new UntypedFormControl(null, [Validators.required]),
			currency_code: new UntypedFormControl('USD', [Validators.required]),
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
			property_indoor_area: new UntypedFormControl(""),
			number_of_pumps: new UntypedFormControl(null),
			sales: new UntypedFormControl(""),
			is_furniture: new UntypedFormControl(null),
			property_category: new UntypedFormControl(""),
			number_of_trees: new UntypedFormControl(null),
			location: this.gs.formBuilder.group({
				location: new UntypedFormControl('', [Validators.required]),
				phone_number: new UntypedFormControl(''),
				apt_number: new UntypedFormControl(''),
				address_line_1: new UntypedFormControl(''),
				address_line_2: new UntypedFormControl(''),
				latitude: new UntypedFormControl(''),
				longitude: new UntypedFormControl(''),
				city: new UntypedFormControl(''),
				country_code: new UntypedFormControl(''),
				state_code: new UntypedFormControl(''),
				zip5: new UntypedFormControl(''),
				map_url: new UntypedFormControl(''),
			}),
			amenities: this.gs.formBuilder.array([]),
			files: new UntypedFormControl([]),
			is_publish: new UntypedFormControl(Enums.USER_CATALOG_IS_PUBLISH_DRAFT),
			is_featured: new UntypedFormControl(Enums.USER_CATALOG_IS_FEATURED_NO),
			status: new UntypedFormControl(Enums.USER_CATALOG_STATUS_DEACTIVE),
			prices: this.gs.formBuilder.array([]),
		});
	}

	/**
	 * This method handles the field event and sets the value of the form field.
	 * @param event - The event object.
	 * @param name - The name of the form field.
	 */
	handleField(event: any, name: string) {
		this.form.get(name)?.setValue(+event);
	}

	/**
	 * This method checks if the form field is valid.
	 * @param index - The index of the form field.
	 * @param field - The name of the form field.
	 * @param module - The name of the module.
	 * @returns An object containing the validity status of the form field.
	 */
	isValid(index: any, field = 'price', module = 'fieldModel') {
		const myForm = (<UntypedFormArray>this.form.get(module)).at(index);
		return {
			valid: myForm.get(field)?.valid,
			error: myForm.get(field)?.errors,
			dirty: myForm.get(field)?.dirty,
			invalid: myForm.get(field)?.invalid,
			touched: myForm.get(field)?.touched,
		};
	}

	/**
	 * This getter returns the amenities form array.
	 * @returns The amenities form array.
	 */
	get amenities() {
		return this.form.get('amenities') as UntypedFormArray;
	}

	/**
	 * This getter returns the prices form array.
	 * @returns The prices form array.
	 */
	get prices() {
		return this.form.get('prices') as UntypedFormArray;
	}

	addNewFieldPrices(item: any) {
		return this.gs.formBuilder.group({
			name: new UntypedFormControl(item.name),
			type: new UntypedFormControl(item.type),
			price: new UntypedFormControl(item.price ? item.price : null, [Validators.required]),
		});
	}

	get is_property_disabled() {
		let is_show = false;
		if(this.gs.is_owner) {
			is_show = this.update?.is_agreement;
		}
		if(this.gs.is_manager) {
			is_show = this.update?.is_agreement || this.update?.is_contract;
		}
		return is_show;
	}

	/**
	 * This method opens the AddLocationDialogComponent modal and handles its result.
	 */
	addLocation() {
		const modalRef = this.modalService.open(AddLocationDialogComponent, {
			windowClass: 'center',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true,
			size: 'sm',
		});
		modalRef.componentInstance.update = this.update;
		modalRef.componentInstance.form = this.form;
		modalRef.result.then((result) => {
			if (!result) return;
			console.log('result', result)
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	/**
	 * This method handles the address change event and updates the form fields.
	 * @param address - The address object.
	 */
	handleAddressChange(address: any) {
		let state = handleAddressState(address);
		console.log('address', address, state)
		this.form.get('location')?.patchValue({
			location: state.location,
			country_code: state.country_code,
			city: state.city,
			state_code: state.state_code,
			zip5: state.postal_code,
			latitude: state.latitude,
			longitude: state.longitude,
			map_url: address.url
		});
	}

	/**
	 * This method opens the CatalogFeatureDialogComponent modal and handles its result.
	 * It also updates the amenities form array based on the result.
	 */
	selectFeatures() {
		/*this.tagsArray.subscribe(data => {
			if (data) {
				this.cateTypesArray = this.mainCateTypes.map(p => { return { id: p.id, name: p.name, slug: p.slug, children: [] } });
				this.amenities.reset();
				this.convertTree(data, this.form.value.category_id ?? null);
			}
		});*/
		this.featuredActive = true;
		const modalRef = this.modalService.open(CatalogFeatureDialogComponent, {
			windowClass: 'center',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true,
			size: 'lg',
		});
		modalRef.componentInstance.update = this.update;
		modalRef.componentInstance.form = this.form;
		modalRef.componentInstance.featuresArray = this.featuresArray;
		modalRef.result.then((result) => {
			this.featuredActive = false;
			if (!result) return;
			const checkBox: UntypedFormArray = this.amenities as UntypedFormArray;
			let originalArray: any = result;
			this.amenities.clear();
			originalArray.forEach((el: any) => {
				let group = this.gs.formBuilder.group({
					tag_id: new UntypedFormControl(el.tag_id),
					type: new UntypedFormControl(el.type),
					name: new UntypedFormControl(el.name),
					description: new UntypedFormControl(el.description),
				});
				checkBox.push(group);
			});
			this._amenities_to_array();
		}, (reason) => {
			this.featuredActive = false;
			console.log('reason', reason);
		});
	}

	handleClassification(event: any) {
		//console.log('handleClassification', event)
		this.form.patchValue({
			category_id: null,
		});
		this.Type_Slug = null;
		this.tagsArray.subscribe(data => {
			if (data) {
				this.cateTypesArray = this.mainCateTypes.map(p => { return { id: p.id, name: p.name, slug: p.slug, children: [] } });
				this.amenities.reset();
				this.convertTree(data, null);
			}
		});
	}

	/**
	 * This method handles the type selection and updates the form and amenities accordingly.
	 * @param value - The selected type.
	 */
	handleType(value: any) {
		this.amenitiesArray = null;
		let category = this.categoriesArray.find(val => val.slug === value);
		this.Type_Slug = value;
		this.form.patchValue({
			category_id: category?.id,
		});
		this.tagsArray.subscribe(data => {
			if (data) {
				this.cateTypesArray = this.mainCateTypes.map(p => { return { id: p.id, name: p.name, slug: p.slug, children: [] } });
				this.amenities.reset();
				this.convertTree(data, category?.id ?? 2);
			}
		});

		// Resetting form fields
		this.form.patchValue({
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
			property_indoor_area: "",
			number_of_pumps: null,
			sales: "",
			is_furniture: null,
			property_category: "",
			number_of_trees: null,
		});

	}

	/**
	 * This method checks if there are any features to show.
	 * @param items - The items to check.
	 * @returns - Returns true if there are features to show, false otherwise.
	 */
	showMoreFeatures(items: any[]) {
		let show: boolean = false;
		items.forEach(element => {
			if (element.name || element.description) show = true;
		});
		return show;
	}

	/**
	 * This method is triggered when the form is submitted for preview.
	 * It validates the form, makes a POST request to the catalog, and updates the view.
	 * @param form - The form to be submitted.
	 */
	onSubmitPreview(form: UntypedFormGroup) {
		console.log('dfgdfgdf', form.value);
		this.submitted = true;
		// Validate the form
		if (!this.form.valid) {
			this.gs.validateAllFormFields(this.form);
			this.submitted = false;
			return;
		}
		// Prepare the parameters for the POST request
		let params2 = (this.update?.id === null) ? { moduleId: Enums.USER_CATALOG_MODULE_ID_JOBS } : { moduleId: Enums.USER_CATALOG_MODULE_ID_JOBS, primary_id: this.update?.id };
		// Make the POST request to the catalog
		this.itemService.catalog("POST", this._form_field(), params2).subscribe(response => {
			this.submitted = false;
			// Update the catalog view
			// Navigate to the updated property
			this.gs.router(`/properties/add/update/${response.data?.id}`);
			this.gs.store.dispatch(StoreAction.CatalogList({ data: response.data, key: EnumRxKey.Catalog.view }));
			this.showPreview = true;
			/*if(this.update?.id === null) {
				setTimeout(() => {
					this.gs.trrigerAction('showPropertyPreview');
				}, 2500);
			}*/
			setTimeout(() => {
				this.gs.trrigerAction('showPropertyPreview');
			}, 1500);
		}, (error: Response) => {
			this.submitted = false;
		});
	}

	/**
	 * This method is triggered when the form is saved.
	 * It makes a POST request to the catalog and updates the view.
	 * @returns void
	 */
	saveCatalog(): void {
		this.submitted = true;
		// Prepare the parameters for the POST request
		let params2 = (this.update?.id === null) ? { moduleId: Enums.USER_CATALOG_MODULE_ID_JOBS } : { moduleId: Enums.USER_CATALOG_MODULE_ID_JOBS, primary_id: this.update?.id };
		// Make the POST request to the catalog
		this.itemService.catalog("POST", this._form_field(), params2).subscribe(response => {
			this.submitted = false;
			// Update the catalog view
			this.gs.store.dispatch(StoreAction.CatalogList({ data: response.data, key: EnumRxKey.Catalog.view }));
			// Show a success message
			this.gs.alert('The property details has been saved.');
		}, (error: Response) => {
			// If there is an error, set submitted to false
			this.submitted = false;
		});
	}

	/**
	 * This method is triggered when the catalog is posted.
	 * It checks the owner information and status, and if valid, it posts the catalog.
	 * @returns void
	 */
	postCatalog(): void {
		// Check if the owner information is filled and confirmed
		if (!this.ownerInfo && this.update?.property_purpose === Enums.USER_CATALOG_PROPERTY_PURPOSE_RENT) {
			this.confirmDialog.confirm({
				header: 'Post',
				icon: `<img src="${this.gs.imgUrl}/post-2.svg" alt="" />`,
				message: 'Ensure property owner details are completed and verified before posting the property.',
				rejectVisible: false,
				acceptLabel: 'Okay'
			}, () => {
				console.log('Yes clicked')
			}, () => console.log('No clicked'));
			return;
		}
		// Check if the owner has accepted the request
		if(this.ownerInfo?.status !== Enums.USER_CATALOG_ORDERS_REFERENCE_STATUS_CONFIRMED) {
			this.confirmDialog.confirm({
				header: 'Post',
				icon: `<img src="${this.gs.imgUrl}/post-2.svg" alt="" />`,
				message: 'Property Owner should accept the request before posting',
				rejectVisible: false,
				acceptLabel: 'Okay'
			}, () => {
				console.log('Yes clicked')
			}, () => console.log('No clicked'));
			return;
		}
		// Confirm the post action
		this.confirmDialog.confirm({
			header: 'Post',
			icon: `<img src="${this.gs.imgUrl}/post-2.svg" alt="" />`,
			message: 'Please verify all information before posting the property',
			rejectVisible: false,
			acceptLabel: 'Post',
		}, () => {
			// If confirmed, post the catalog
			this.postAction();
		}, () => console.log('No clicked'));
	}

	/**
	 * This method is responsible for posting the catalog.
	 * It sets the status and publish state of the catalog, filters out amenities with a tag_id of 0,
	 * and makes a POST request to the catalog service.
	 * If the request is successful, it dispatches a CatalogList action to the store and shows a success alert.
	 * If the request fails, it simply sets savePostLoading to false.
	 */
	postAction() {
		this.savePostLoading = true;
		let params = { form: { status: Enums.USER_CATALOG_STATUS_ACTIVE, is_publish: Enums.USER_CATALOG_IS_PUBLISH_PUBLISH }, amenities: this.form.value?.amenities?.filter((val: any) => val.tag_id !== 0) };
		let params2 = (this.update?.id === null) ? { moduleId: Enums.USER_CATALOG_MODULE_ID_JOBS } : { moduleId: Enums.USER_CATALOG_MODULE_ID_JOBS, primary_id: this.update?.id };
		this.itemService.catalog("POST", params, params2).subscribe(response => {
			this.savePostLoading = false;
			this.gs.store.dispatch(StoreAction.CatalogList({ data: response.data, key: EnumRxKey.Catalog.view }));
			this.gs.alert('Your property has been successfully posted.');
		}, (error: Response) => {
			this.savePostLoading = false;
		});
	}

	/**
	 * This method is responsible for deleting a catalog.
	 * It first checks if the catalog is rented. If it is, it shows a confirmation dialog and returns.
	 * If the catalog is not rented, it shows a confirmation dialog for deletion.
	 * If the user confirms, it dispatches a CatalogParams action to the store with a DELETE method.
	 */
	deleteCatalog() {
		// Check if the catalog is rented
		/* 
		if(this.update?.is_rented === 'rented') {
			this.confirmDialog.confirm({
				header: 'Warning',
				icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
				message: "Your property already rented so you can not delete this property.",
				acceptLabel: 'Okay',
				rejectVisible: false,
				rejectLabel: "Cancel",
			}, () => {
				
			}, () => {
				console.log('No clicked');
			});
			return;
		}
		*/

		if(this.gs.is_owner && this.update?.is_rented === 'rented') {
			this.confirmDialog.confirm({
				header: 'Warning',
				icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
				message: "Your property already rented, So you can not delete this property.",
				acceptLabel: 'Okay',
				rejectVisible: false,
				rejectLabel: "Cancel",
			}, () => {
				
			}, () => {
				console.log('No clicked');
			});
			return;
		}
		if(this.gs.is_manager && this.update?.is_contract) {
			this.confirmDialog.confirm({
				header: 'Warning',
				icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
				message: "You are unable to delete this property because the property owner has approved it.",
				acceptLabel: 'Okay',
				rejectVisible: false,
				rejectLabel: "Cancel",
			}, () => {
				
			}, () => {
				console.log('No clicked');
			});
			return;
		}
		// Show a confirmation dialog for deletion
		this.confirmDialog.confirm({
			header: 'Delete Property',
			icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
			message: 'Are you sure you want to delete the property?',
			acceptLabel: 'Delete',
			rejectLabel: "Cancel",
		}, () => {
			// If confirmed, dispatch a CatalogParams action to the store with a DELETE method
			this.gs.store.dispatch(StoreAction.CatalogParams({ method: "DELETE", params: null, params2: { primary_id: this.update?.id }, key: `delete-${EnumRxKey.Catalog.listing}`, url: '/properties', msg: "You have successfully deleted the property" }))
		}, () => console.log('No clicked'));
	}

	/**
	 * This method is responsible for converting the amenities from the form into an array.
	 * It first initializes the amenitiesArray to null and the amenitiesTypesArray to the mainCateTypes.
	 * Then, it iterates over the amenities from the form.
	 * For each amenity, it checks if its type matches any of the types in the amenitiesTypesArray.
	 * If it does, it finds the index of that type in the amenitiesTypesArray and gets its children.
	 * It then checks if the amenity is already in the children.
	 * If it's not, it adds the amenity to the children.
	 * Finally, it assigns the amenitiesTypesArray to the amenitiesArray.
	 */
	protected _amenities_to_array() {
		this.amenitiesArray = null;
		this.amenitiesTypesArray = this.mainCateTypes.map(p => { return { id: p.id, name: p.name, children: [] } });
		let items = this.form.value.amenities;
		items?.forEach((el: any) => {
			this.amenitiesTypesArray.forEach(val => {
				if (el.type === val.name) {
					let index = this.amenitiesTypesArray.findIndex(v => v.name === val.name);
					let children = this.amenitiesTypesArray[index]?.children;
					let childrenIndex = children?.find((val: any) => val.tag_id === el.tag_id);
					if(!childrenIndex) {
						this.amenitiesTypesArray[index]?.children?.push(el);
					}
				}
			});
		});
		this.amenitiesArray = this.amenitiesTypesArray;
	}
	
	/**
	 * This method is responsible for preparing the form data for submission.
	 * It first copies the form values into a new object.
	 * Then, it initializes a newParams object and sets its 'files' property to the allFileIds array.
	 * If the user is an owner and the form is not an update form, it sets the owner information and creates a new agreement.
	 * If the user is a manager and the form is not an update form, it creates a new agreement.
	 * It then sets the user_id, video_id, and various property details in the params object.
	 * It also sets the amenities and location in the newParams object.
	 * Finally, it deletes the unnecessary properties from the params object and sets the 'form' property of newParams to params.
	 * @returns The newParams object.
	 */
	protected _form_field() {
		let params = { ...this.form.value };
		let newParams: any = { };
		newParams['files'] = this.allFileIds;
		if (this.gs.is_owner && !this.update?.id) {
			params['owner_id'] = this.gs.identity?.id;
			params['owner_email'] = this.gs.identity?.email;
			params['owner_name'] = this.gs.identity?.name;
			params['recipients'] = null;
			let agreement: any = {};
			let reference = { name: this.gs.identity?.name, email: this.gs.identity?.email, location: this.gs.identity?.location?.location, telephone: this.gs.identity?.userProfile.telephone, doc_id: 0, order_id: null, type: AdditionalEnums.USER_CATALOG_REFERENCE_TYPE_CONTRACT, status: Enums.USER_CATALOG_ORDERS_REFERENCE_STATUS_CONFIRMED };
			agreement['moduleId'] = Enums.USER_CATALOG_ORDERS_MODULE_ID_AGREEMENT;
			agreement['order_id'] = null;
			agreement['comment'] = 'New agreement';
			agreement['paymentTransaction'] = false;
			agreement['user_id'] = this.gs.identity?.id;
			agreement['manager_id'] = this.gs.identity?.id;
			agreement['status'] = 1;
			newParams['agreement'] = { form: agreement, reference: [{ ...reference, relation: AdditionalEnums.USER_CATALOG_ROLE_OWNER }] };
		}
		if (this.gs.is_manager && !this.update?.id) {
			let agreement: any = {};
			let reference = { name: this.gs.identity?.name, email: this.gs.identity?.email, location: this.gs.identity?.location?.location, telephone: this.gs.identity?.userProfile.telephone, doc_id: 0, order_id: null, type: AdditionalEnums.USER_CATALOG_REFERENCE_TYPE_CONTRACT, status: Enums.USER_CATALOG_ORDERS_REFERENCE_STATUS_CONFIRMED };
			agreement['moduleId'] = Enums.USER_CATALOG_ORDERS_MODULE_ID_AGREEMENT;
			agreement['order_id'] = null;
			agreement['comment'] = 'New agreement';
			agreement['paymentTransaction'] = false;
			agreement['user_id'] = this.gs.identity?.id;
			agreement['manager_id'] = this.gs.identity?.id;
			agreement['status'] = 1;
			newParams['agreement'] = { form: agreement, reference: [{ ...reference, relation: AdditionalEnums.USER_CATALOG_ROLE_MANAGER }] };
		}
		params['user_id'] = this.update?.id ? this.update?.user_id : this.gs.identity?.id;
		params['video_id'] = 0;
		params['price'] = this.form.value?.price || 0;
		params['number_of_floors'] = this.form.value?.number_of_floors || 0;
		params['number_of_rooms'] = this.form.value?.number_of_rooms || 0;
		params['number_of_bathrooms'] = this.form.value?.number_of_bathrooms || 0;
		params['age_of_building'] = this.form.value?.age_of_building || 0;
		params['is_available_loan'] = this.form.value?.is_available_loan || 0;
		params['is_swap'] = this.form.value?.is_swap || 0;
		params['height'] = this.form.value?.height || 0;
		params['is_ac'] = this.form.value?.is_ac || 0;
		params['is_furnished'] = this.form.value?.is_furnished || 0;
		params['status_of_use'] = this.form.value?.status_of_use || 0;
		params['number_of_apartments'] = this.form.value?.number_of_apartments || 0;
		params['occupancy_rate'] = this.form.value?.occupancy_rate || 0;
		params['number_of_elevators'] = this.form.value?.number_of_elevators || 0;
		params['number_of_pumps'] = this.form.value?.number_of_pumps || 0;
		params['is_furniture'] = this.form.value?.is_furniture || 0;
		params['number_of_trees'] = this.form.value?.number_of_trees || 0;
		params['property_open_area'] =  `${this.form.value?.property_open_area}` || '0';
		params['sales'] =  `${this.form.value?.sales}` || '0';
		params['property_category'] =  `${this.form.value?.property_category}` || '0';
		newParams['amenities'] =  this.form.value?.amenities?.filter((val: any) => val.tag_id !== 0);
		newParams['location'] =  { form: this.form.value?.location, is_primary: true };
		newParams['prices'] =  params.prices?.map((val: any) => { return { name: val.name, type: val.type, price: `${val.price}` }});
		delete params?.files;
		delete params?.amenities;
		delete params?.agreement;
		delete params?.location;
		delete params?.prices;
		newParams['form'] = params;
		return newParams;
	}

	/**
	 * This method is called when the component is destroyed.
	 * It clears the upload store.
	 */
	ngOnDestroy() {
		//this.gs.store.dispatch(StoreAction.UploadClear({ item: null }));
	}

}


