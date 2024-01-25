import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EnumRxKey, Enums } from 'src/app/enums';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiResponseData } from 'src/app/models';
import { StoreSelector } from 'src/app/store/selector';
import { OrderPipe } from '../../../../../../shared/pipe/order.pipe';
import { AsyncPipe } from '@angular/common';
import { CatalogGoogleMapViewComponent } from '../../_partials/catalog-google-map-view/catalog-google-map-view.component';
import { CatalogListComponent } from '../../../../../../standalone/catalogs/catalog-list/catalog-list.component';
import { MatSliderModule } from '@angular/material/slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ControlErrorsDirective } from '../../../../../../shared/directive/control-errors.directive';
import { FormSubmitDirective } from '../../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-rented-listing',
    templateUrl: './rented-listing.component.html',
    styleUrls: ['./rented-listing.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, FormSubmitDirective, ControlErrorsDirective, NgxIntlTelInputModule, NgSelectModule, MatSliderModule, CatalogListComponent, CatalogGoogleMapViewComponent, AsyncPipe, OrderPipe]
})
export class RentedListingComponent {
	managers: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.UserSelectors[EnumRxKey.User['search-managers']]);
	managerLoading: Observable<any> = this.gs.store.select(StoreSelector.UserLoadingKey[`${EnumRxKey.User['search-managers']}Loading`]);
	categories: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.categories]);
	catalog: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.reference]);
	highValue = 400;
	show_map: boolean = false;
	CatalogRxKey = EnumRxKey.Catalog;
	params: any = { page: 0, size: 100, sort: '-id', key: EnumRxKey.Catalog.reference };
	enums = Enums;
	form!: UntypedFormGroup;
	submitted = false;
	categoriesArray: any[] = [];

	min_price_value: any = 0;
	max_price_value: any = 1000;
	min_price: any = 0;
	max_price: any = 0;

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.formValidation();
		//if(this.gs.is_owner) {}
		this.managers.subscribe(data => {
			if (data === null) this.onLoadManager();
		});
		this.onLoadProduct();
		this.categories.subscribe(data => {
			if (data) {
				this.categoriesArray = data?.filter((val: any) => val.moduleId === 'property').map((filteredObj: any) => filteredObj);
			}
		});
	}

	formValidation() {
		this.form = this.gs.formBuilder.group({
			property_classification: new UntypedFormControl(''),
			category_id: new UntypedFormControl(''), // Sale | Rent
			property_purpose: new UntypedFormControl(''), // Sale | Rent
			q_location: new UntypedFormControl(''),
			agreement_status: new UntypedFormControl(''),
			manager_id: new UntypedFormControl(''),
			owner_id: new UntypedFormControl(''),
			min_price: new UntypedFormControl(0),
			max_price: new UntypedFormControl(''),
			sort: new UntypedFormControl('-id'),
		});
	}

	onLoadManager() {
		let action = StoreAction.UserParams({ method: "GET", params: null, params2: { key: EnumRxKey.User['search-managers'],  size: 500 }, key: EnumRxKey.User['search-managers'] });
		this.gs.store.dispatch(action);
	}

	onLoadProduct() {
		let data = this.activeRoute.snapshot.data;
		//this.params = Object.assign({}, this.params, data.params);
		let action = StoreAction.CatalogParams({ method: 'GET', params: null, params2: this.params, key: EnumRxKey.Catalog.reference });
		this.gs.store.dispatch(action);
	}

	userChangeEnd(event: any) {
		this.form.patchValue({
			min_price: event.value,
			max_price: event.highValue,
		});
	}

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

	handleSort(key: any) {
		this.form.patchValue({ sort: key });
		let params = { ...this.form.value };
		this.params = Object.assign({}, this.params, params);
		this.onLoadProduct();
	}

	onResultMap() {
		this.show_map = true;
		let params = { ...this.form.value };
		this.params = Object.assign({}, this.params, params);
		this.onLoadProduct();
	}

	formatLabel(value: number): string {
		if (value >= 1000) {
			return Math.round(value / 1000) + 'k';
		}
		return `${value}`;
	}

	handlePriceRange(event: any) {
		const { min, max } = event.target;
		//console.log('sdsdsd', min, max)
	}

	handleMinRange(event: any) {
		const { value } = event.target;
		this.min_price = value;
		this.form.patchValue({
			min_price: value,
		});
	}

	handleMaxRange(event: any) {
		const { value } = event.target;
		this.max_price = value;
		this.form.patchValue({
			max_price: value,
		});
	}

	clear() {
		this.form.reset();
		this.params = { page: 0, size: 100, sort: '-id', key: EnumRxKey.Catalog.reference };
		this.onLoadProduct();
	}
}
