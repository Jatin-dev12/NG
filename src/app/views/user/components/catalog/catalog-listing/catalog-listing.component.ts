import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { handleAddressState } from 'src/app/helpers';
import { ApiResponseData } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { OrderPipe } from '../../../../../shared/pipe/order.pipe';
import { AsyncPipe } from '@angular/common';
import { CatalogGoogleMapViewComponent } from '../_partials/catalog-google-map-view/catalog-google-map-view.component';
import { CatalogListComponent } from '../../../../../standalone/catalogs/catalog-list/catalog-list.component';
import { NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ControlErrorsDirective } from '../../../../../shared/directive/control-errors.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormSubmitDirective } from '../../../../../shared/directive/form-submit.directive';

/**
 * CatalogListingComponent is a component that handles the catalog listing view.
 * It imports various modules and components that are necessary for its functionality.
 * It also implements OnInit to handle any necessary logic upon initialization.
 */
@Component({
    selector: 'app-catalog-listing',
    templateUrl: './catalog-listing.component.html',
    styleUrls: ['./catalog-listing.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, FormSubmitDirective, NgSelectModule, ControlErrorsDirective, NgxIntlTelInputModule, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem, CatalogListComponent, CatalogGoogleMapViewComponent, AsyncPipe, OrderPipe]
})
export class CatalogListingComponent implements OnInit {
	managers: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.UserSelectors[EnumRxKey.User['search-managers']]);
	managerLoading: Observable<any> = this.gs.store.select(StoreSelector.UserLoadingKey[`${EnumRxKey.User['search-managers']}Loading`]);
	owners: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.UserSelectors[EnumRxKey.User['search-owners']]);
	ownerLoading: Observable<any> = this.gs.store.select(StoreSelector.UserLoadingKey[`${EnumRxKey.User['search-owners']}Loading`]);
	catalog: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.listing]);
	categories: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.categories]);
	params: any = { page: 0, size: 12, key: EnumRxKey.Catalog.listing, sort: '-id' };
	CatalogRxKey = EnumRxKey.Catalog;
	show_map: boolean = false;
	enums = Enums;
	categoriesArray: any[] = [];
	form!: UntypedFormGroup;
	submitted = false;
	highValue = 400;

	/**
	 * The constructor initializes the GlobalService and ActivatedRoute.
	 * @param gs - An instance of GlobalService.
	 * @param activeRoute - An instance of ActivatedRoute.
	 */
	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute
	) { }

	/**
	 * ngOnInit is a lifecycle hook that is called after data-bound properties of a directive are initialized.
	 * It initializes the form and loads the necessary data.
	 */
	ngOnInit(): void {
		this.formValidation();
		//if(this.gs.is_owner) {}

		if(this.gs.identity?.role === Enums.ROLE_OWNER) {
			this.managers.subscribe(data => {
				if(data === null) this.onLoadManager();
			});
		}

		if(this.gs.identity?.role === Enums.ROLE_MANAGERS) {
			this.owners.subscribe(data => {
				if(data === null) this.onLoadOwner();
			});
		}

		let data = this.activeRoute.snapshot.data;
		this.params = Object.assign({}, this.params, data['params']);
		this.onLoadProduct();
		this.categories.subscribe(data => {
			if (data) {
				this.categoriesArray = data?.filter((val: any) => val.moduleId === 'property').map((filteredObj: any) => filteredObj);
			}
		});
	}

	/**
	 * formValidation initializes the form with the necessary form controls.
	 */
	formValidation() {
		this.form = this.gs.formBuilder.group({
			property_classification: new UntypedFormControl(null),
			category_id: new UntypedFormControl(null), // Sale | Rent
			property_purpose: new UntypedFormControl(null), // Sale | Rent
			q_location: new UntypedFormControl(''),
			agreement_status: new UntypedFormControl(null),
			rented_status: new UntypedFormControl(null),
			manager_id: new UntypedFormControl(null),
			owner_id: new UntypedFormControl(null),
			min_price: new UntypedFormControl(''),
			max_price: new UntypedFormControl(''),
			sort: new UntypedFormControl('-id'),
		});
	}

	/**
	 * onLoadProduct dispatches an action to load the product.
	 */
	onLoadProduct() {
		let action = StoreAction.CatalogParams({ method: 'GET', params: null, params2: this.params, key: EnumRxKey.Catalog.listing });
		this.gs.store.dispatch(action);
	}

	/**
	 * onLoadManager dispatches an action to load the manager.
	 */
	onLoadManager() {
		let action = StoreAction.UserParams({ method: "GET", params: null, params2: { key: EnumRxKey.User['search-managers'], page: 0, size: 100 }, key: EnumRxKey.User['search-managers'] });
		this.gs.store.dispatch(action);
	}

	/**
	 * onLoadOwner dispatches an action to load the owner.
	 */
	onLoadOwner() {
		let action = StoreAction.UserParams({ method: "GET", params: null, params2: { key: EnumRxKey.User['search-owners'], page: 0, size: 100 }, key: EnumRxKey.User['search-owners'] });
		this.gs.store.dispatch(action);
	}

	/**
	 * handleAddressChange handles the change of address.
	 * @param address - The new address.
	 */
	handleAddressChange(address: any) {
		let state = handleAddressState(address);
		this.form?.patchValue({
			q_location: state.location,
		});
	}

	/**
	 * handleStatus handles the change of status.
	 * @param event - The event that triggered the change.
	 */
	handleStatus(event: any) {
		//console.log('event', event);
		if(event) {
			if(event === 'rented' || event === 'not-rented') {
				this.form.patchValue({
					rented_status: event,
				});
			} else {
				this.form.patchValue({
					agreement_status: event,
				});
			}
		} else {
			this.form.patchValue({
				agreement_status: '',
				rented_status: '',
			});
		}
	}

	/**
	 * userChangeEnd handles the end of a user change.
	 * @param event - The event that triggered the change.
	 */
	userChangeEnd(event: any) {
		this.form.patchValue({
			min_price: event.value,
			max_price: event.highValue,
		});
	}

	/**
	 * onSubmit handles the submission of the form.
	 * @param form - The form that was submitted.
	 */
	onSubmit(form: UntypedFormGroup) {
		if (!this.form.valid) {
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.show_map = false;
		let params = { ...this.form.value };
		this.params = Object.assign({}, this.params, params);
		this.onLoadProduct();
	}

	/**
	 * handleSort handles the sorting of data.
	 * @param key - The key to sort by.
	 */
	handleSort(key: any) {
		this.form.patchValue({ sort: key });
		let params = { ...this.form.value };
		this.params = Object.assign({}, this.params, params);
		this.onLoadProduct();
	}

	/**
	 * onResultMap handles the result of a map.
	 */
	onResultMap() {
		this.show_map = !this.show_map;
		//let params = { ...this.form.value };
		//this.params = Object.assign({}, this.params, params);
		//this.onLoadProduct();
	}

	/**
	 * clear clears the form and reloads the product.
	 */
	clear() {
		this.form.reset();
		this.params = { page: 0, size: 12, key: EnumRxKey.Catalog.listing, sort: '-id' };
		this.onLoadProduct();
	}


}
