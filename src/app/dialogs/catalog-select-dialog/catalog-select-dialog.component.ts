import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreAction } from 'src/app/store/actions';
import { EnumRxKey, Enums } from 'src/app/enums';
import { Observable } from 'rxjs';
import { ApiResponseData, Catalog } from 'src/app/models';
import { StoreSelector } from 'src/app/store/selector';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfirmDialogService } from 'src/app/modules';
import { GoogleLocationInputComponent } from 'src/app/standalone';
import { handleAddressState } from 'src/app/helpers';

@Component({
	selector: 'app-catalog-select-dialog',
	standalone: true,
	imports: [CommonModule, SharedModule, NgSelectModule, GoogleLocationInputComponent],
	templateUrl: './catalog-select-dialog.component.html',
	styleUrls: ['./catalog-select-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CatalogSelectDialogComponent {
	@Input() items: Catalog[] = [];
	@Input() agreement_status: any = 'managed';
	@Input() key: any = EnumRxKey.Catalog.listing;
	catalog: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.listing]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogLoadingKey[`${EnumRxKey.Catalog.listing}Loading`]);
	managers: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.UserSelectors[EnumRxKey.User['search-managers']]);
	managerLoading: Observable<any> = this.gs.store.select(StoreSelector.UserLoadingKey[`${EnumRxKey.User['search-managers']}Loading`]);

	form!: UntypedFormGroup;
	submitted = false;
	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private confirmDialog: ConfirmDialogService,
	) { }

	get f() { return this.form.controls; };

	ngOnInit(): void {
		this.formValidation();
		if(this.gs.identity?.role === Enums.ROLE_OWNER) {
			this.managers.subscribe(data => {
				if(data === null) this.onLoadManager();
			});
		}
		this.onLoad();
		
	}

	formValidation() {
		this.form = this.gs.formBuilder.group({
			q: new UntypedFormControl(''),
			q_location: new UntypedFormControl(''),
			manager_id: new UntypedFormControl(null),
			agreement_status: new UntypedFormControl(this.agreement_status),
			sort: new UntypedFormControl('-id'),
			key: new UntypedFormControl(this.key),
			size: new UntypedFormControl(10),
			page: new UntypedFormControl(0),
		});
	}

	onLoad() {
		let action = StoreAction.CatalogParams({ method: 'GET', params: null, params2: this.form.value, key: EnumRxKey.Catalog.listing });
		this.gs.store.dispatch(action);
	}

	onLoadManager() {
		let action = StoreAction.UserParams({ method: "GET", params: null, params2: { key: EnumRxKey.User['search-managers'], page: 0, size: 100 }, key: EnumRxKey.User['search-managers'] });
		this.gs.store.dispatch(action);
	}

	handleCheched(id: number) {
		const index = this.items?.findIndex((f: any) => f.id == id);
		return (index !== -1) ? true : false
	}

	handleSelect(event: any, item: Catalog) {
		const { value, checked } = event.target;
		console.log('event', value, checked);
		if(checked) {
			//this.activeModal.close({ id: value });
			this.items.push(item);
		} else {
			this.items = this.items.filter(val => val.id !== item.id)
		}
	}

	done() {
		this.activeModal.close({ items: this.items });
	}

	reset() {
		this.form.patchValue({
			q: '',
			q_location: null,
			manager_id: null,
			page: 0
		});
		this.onLoad();
	}

	handleAddressChange(address: any) {
		let state = handleAddressState(address);
		this.form.patchValue({
			q_location: state.location
		})
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

}
