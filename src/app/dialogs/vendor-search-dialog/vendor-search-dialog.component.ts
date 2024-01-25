import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { ApiResponseData, User } from 'src/app/models';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { ConfirmDialogService } from 'src/app/modules';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
	selector: 'app-vendor-search-dialog',
	standalone: true,
	imports: [CommonModule, SharedModule, NgSelectModule],
	templateUrl: './vendor-search-dialog.component.html',
	styleUrls: ['./vendor-search-dialog.component.scss']
})
export class VendorSearchDialogComponent {
	@Input() catalog_id: any = null;
	@Input() vendor_ids: any[] = [];
	@Input() userArray: User[] = [];
	users: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.UserSelectors[EnumRxKey.User.search]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.UserLoadingKey[`${EnumRxKey.User.search}Loading`]);
	countriesObservable: Observable<any> = this.gs.store.select(StoreSelector.DefaultSelectors[EnumRxKey.Default.countries]);
	stateObservable: Observable<any> = this.gs.store.select(StoreSelector.DefaultSelectors[EnumRxKey.Default.states]);
	citiesObservable: Observable<any> = this.gs.store.select(StoreSelector.DefaultSelectors[EnumRxKey.Default.cities]);

	favourileLoading: boolean = false;
	form!: UntypedFormGroup;
	submitted = false;

	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		public confirmDialog: ConfirmDialogService,
		private itemService: ItemService
	) { }

	get f() { return this.form.controls; };

	ngOnInit(): void {
		this.formValidation();
		this.onLoad();
	}

	formValidation() {
		this.form = this.gs.formBuilder.group({
			q: new UntypedFormControl(''),
			q_location: new UntypedFormControl(''),
			q_location_country_code: new UntypedFormControl(''),
			q_location_state_code: new UntypedFormControl(''),
			q_location_city: new UntypedFormControl(''),
			sort: new UntypedFormControl('-id'),
			key: new UntypedFormControl(EnumRxKey.User.search),
			roles: Enums.Role.ROLE_VENDORS,
			size: new UntypedFormControl(20),
			page: new UntypedFormControl(0),
		});
	}

	onLoad() {
		let action = StoreAction.UserParams({ method: 'GET', params: null, params2: this.form.value, key: EnumRxKey.User.search });
		this.gs.store.dispatch(action);
	}

	handleSelect(event: any, user: User) {
		const { value, checked } = event.target;
		//console.log('event', value, checked, user);
		if(this.vendor_ids.length > 3) {
			alert('Only select 4 vendors');
			return;
		}
		if (checked) {
			this.userArray.push(user);
			this.vendor_ids.push(user.id);
		} else {
			//const index = checkBox.controls.findIndex(x => x.value?.tag_id === value);
			this.userArray = this.userArray.filter(val => val.id !== user.id);
			this.vendor_ids = this.vendor_ids.filter(val => val !== user.id);
		}
	}

	loadState(country_code: any) {
		this.gs.store.dispatch(StoreAction.DefaultParams({ method: "GET", params: null, params2: { code: country_code, key: EnumRxKey.Default.states }, key: EnumRxKey.Default.states }));
	}

	loadCity(state_code: any) {
		this.gs.store.dispatch(StoreAction.DefaultParams({ method: "GET", params: { country_code: state_code }, params2: { key: EnumRxKey.Default.cities }, key: EnumRxKey.Default.cities }));
	}

	handleCountries(event: any) {
		if(event) {
			this.form.patchValue({
				q_location_country_code: event?.iso2
			});
			this.loadCity(event?.iso2);
		} else {
			this.form.patchValue({
				q_location_country_code: null,
				q_location_city: null,
			});
		}
		this.onLoad();
	}

	handleState(event: any) {
		if(event) {
			this.form.patchValue({
				q_location_state_code: event?.state_code,
			});
			this.loadCity(event?.state_code);
		} else {
			this.form.patchValue({
				q_location_state_code: null,
				q_location_city: null
			});
		}
		this.onLoad();
	}

	handleCity(event: any) {
		this.form.patchValue({
			q_location_city: event ? event.name : null
		});
		this.onLoad();
	}

	handlePagination(event: any) {
		this.form.patchValue({
			page: event - 1
		});
		this.onLoad();
	}

	onSubmit(form: UntypedFormGroup) {
		this.onLoad();
	}

	chackedVendor(item: any) {
		const valueIndex = this.vendor_ids.findIndex((val: any) => +val === item.id);
		return (valueIndex !== -1) ? true : false;
	}

	addVendor() {
		this.activeModal.close({ id: this.vendor_ids, users: this.userArray });
	}

	reset() {
		this.form.patchValue({
			q: '',
			q_location_country_code: null,
			q_location_city: null,
		});
		this.onLoad();
	}

	handleFavourite(item: User) {
		if(!item.is_favorite) {
			this.favourileLoading = true;
			let params = { UserFavorite: { user_id: this.gs.identity?.id, favorite_id: item.id } };
			let params2 = { key: EnumRxKey.User.favorite };
			this.itemService.profile("POST", params, params2).subscribe(response => {
				this.favourileLoading = false;
				let user = { ...item };
				user['is_favorite'] = true;
				this.gs.store.dispatch(StoreAction.UserUpdate({ item: user, key: EnumRxKey.User.search}));
				this.gs.alert('You have successfully added this vendor your favorite list');
			}, (error: Response) => {
				this.favourileLoading = false;
			});
		} else {
			this.favourileLoading = true;
			let params2 = { favorite_id: item.id, key: EnumRxKey.User.favorite };
			this.itemService.profile("DELETE", null, params2).subscribe(response => {
				this.favourileLoading = false;
				let user = { ...item };
				user['is_favorite'] = false;
				this.gs.store.dispatch(StoreAction.UserUpdate({ item: user, key: EnumRxKey.User.search}));
				this.gs.alert('You have successfully removed this vendor your favorite list', 'danger');
			}, (error: Response) => {
				this.favourileLoading = false;
			});
		}
	}

}
