import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import moment from 'moment';
import { Observable } from 'rxjs';
import { Enums, AdditionalEnums, EnumRxKey } from 'src/app/enums';
import { handleAddressState } from 'src/app/helpers';
import { Catalog, User, UserCatalogOrdersReferences } from 'src/app/models';
import { ConfirmDialogService, InputNumber, LaddaDirective } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormSubmitDirective, ControlErrorsDirective, ControlErrorContainerDirective, FileDragDropUploaderComponent } from 'src/app/shared';

@Component({
    selector: 'app-catalog-form-owner-info',
    templateUrl: './catalog-form-owner-info.component.html',
    styleUrls: ['./catalog-form-owner-info.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, FormSubmitDirective, ControlErrorsDirective, NgxIntlTelInputModule, MatProgressSpinnerModule, MatFormFieldModule, NgSelectModule, ControlErrorContainerDirective, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem, InputNumber, MatDatepickerModule, MatNativeDateModule, FileDragDropUploaderComponent, LaddaDirective, AsyncPipe, DatePipe, JsonPipe, NgbAlertModule]
})
export class CatalogFormOwnerInfoComponent {
	viewObservable: Observable<Catalog | null> = this.gs.store.select(StoreSelector.CatalogSelectors.view);
	countriesObservable: Observable<any> = this.gs.store.select(StoreSelector.DefaultSelectors[EnumRxKey.Default.countries]);
	update: Catalog | null = null;
	submitted = false;
	saveLoading = false;
	requestLoading = false;
	minDate = new Date();
	ownerInfo: UserCatalogOrdersReferences | null = null;
	managerInfo: UserCatalogOrdersReferences | null = null;
	owner: User | null = null;

	form!: UntypedFormGroup;
	showPreview: boolean = false;
	showBackPreview: boolean = false;
	UploadPropertyDoc: any = { image: [], video: [], docs: [] };

	get f() { return this.form.controls; };

	AdditionalEnums = AdditionalEnums;
	Enums = Enums;

	CatalogRefRequestType = AdditionalEnums.CatalogRefRequestTypeArray;
	UserCatalogOrderPaymentTerms = AdditionalEnums.UserCatalogOrderPaymentTermsArray;

	constructor(
		public gs: GlobalService,
		private itemService: ItemService,
		private confirmDialog: ConfirmDialogService,
		private router: Router
	) {
		if (!this.gs.is_manager) {
			//this.gs.router('/');
			return;
		};
	}

	ngOnInit(): void {
		this.gs.clearErrorMessages();
		this.formValidation();
		this.countriesObservable.subscribe(data => {
			if (data === null) {
				this.gs.store.dispatch(StoreAction.DefaultParams({ method: "GET", params: null, params2: { key: EnumRxKey.Default.countries, size: 500 }, key: EnumRxKey.Default.countries }));
			}
		});
		this.viewObservable.subscribe(data => {
			this.update = data;
			if (data) {
				this.ownerInfo = this.update?.agreement?.userCatalogOrdersReferences?.find(val => val.relation === AdditionalEnums.USER_CATALOG_ROLE_OWNER) ?? null;
				this.managerInfo = this.update?.agreement?.userCatalogOrdersReferences?.find(val => val.relation === AdditionalEnums.USER_CATALOG_ROLE_MANAGER) ?? null;

				this.owner = this.update?.agreement?.owner ?? null;
				if(this.ownerInfo?.doc_id) this.UploadPropertyDoc = this.gs.getFilesList(this.ownerInfo?.doc);
				if(this.ownerInfo) {
					this.showPreview = true;
					let start_time = this.ownerInfo?.start_time ?? null;
					let end_time = this.ownerInfo?.end_time ?? null;
					this.form.patchValue({
						relation: this.ownerInfo?.relation,
						type: this.ownerInfo?.type,
						name: this.ownerInfo?.name,
						email: this.ownerInfo?.email,
						country_code: this.ownerInfo?.country_code ?? '',
						phone_code: this.ownerInfo?.phone_code ?? null,
						telephone: this.ownerInfo?.telephone ?? '',
						location: this.ownerInfo?.location ?? '',
						contract_type: this.ownerInfo?.contract_type,
						commission: this.ownerInfo?.commission,
						payment_terms: this.ownerInfo?.payment_terms,
						doc_id: this.ownerInfo?.doc_id,
						start_time: start_time ? new Date(moment(start_time).format('YYYY-MM-DD')) : '',
						end_time: end_time ? new Date(moment(end_time).format('YYYY-MM-DD')) : '',
						terms: this.ownerInfo?.terms,
						permitted_occupier: this.ownerInfo?.permitted_occupier,
						amount: this.ownerInfo?.amount || '',
					});
				}
			}
		});
	}

	get ownerRefrence() {
		return this.update?.agreement?.userCatalogOrdersReferences?.find(val => val.relation === AdditionalEnums.USER_CATALOG_ROLE_OWNER) ?? null;
	}

	formValidation() {
		this.form = this.gs.formBuilder.group({
			relation: new UntypedFormControl(AdditionalEnums.USER_CATALOG_ROLE_OWNER, [Validators.required]),
			type: new UntypedFormControl('contract', [Validators.required]),
			order_id: new UntypedFormControl(''),
			name: new UntypedFormControl('', [Validators.required]),
			email: new UntypedFormControl('', {
				validators: [Validators.required, Validators.email], asyncValidators: this.itemService.uniqueEmailValidator(Enums.ROLE_OWNER),
				updateOn: 'blur'
			}),
			location: new UntypedFormControl('', [Validators.required]),
			telephone: new UntypedFormControl('', [Validators.pattern('^[0-9]*$')]),
			doc_id: new UntypedFormControl('', [Validators.required]),
			start_time: new UntypedFormControl('', [Validators.required]),  // YYYY-MM-DD hh:mm:ss ==> Same value in top of form
			end_time: new UntypedFormControl('', [Validators.required]),    // YYYY-MM-DD hh:mm:ss ==> Same value in top of form
			terms: new UntypedFormControl('', [Validators.required, Validators.maxLength(this.gs.maxLength)]), // Agrement Terms
			payment_terms: new UntypedFormControl('', [Validators.required]),
			country_code: new UntypedFormControl(''),
			phone_code: new UntypedFormControl(null, [Validators.required]),
			contract_type: new UntypedFormControl('', [Validators.required]),
			commission: new UntypedFormControl('', [Validators.required]),
			permitted_occupier: new UntypedFormControl(''),
			//amount: new UntypedFormControl(''),
			status: new UntypedFormControl(Enums.USER_CATALOG_ORDERS_REFERENCE_STATUS_PENDING),
		});
	}

	handleAddressChange(address: any) {
		//console.log('address', address);
		let state = handleAddressState(address);
		this.form?.patchValue({
			location: state.location,
		});
	}

	onSubmit(form: UntypedFormGroup, key = 'save', status: any = Enums.USER_CATALOG_ORDERS_REFERENCE_STATUS_NONE) {
		this.submitted = true;
		if (!this.form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		let value = this.form.value;
		let params = { ...this.form.value };
		let params2 = (this.ownerRefrence === null) ? { order_id: this.update?.order_id } : { order_id: this.update?.order_id, primary_id: this.ownerRefrence?.id };

		let start_time = moment(value.start_time).format('YYYY-MM-DD hh:mm:ss');
		let end_time = moment(value.end_time).format('YYYY-MM-DD hh:mm:ss');
		params['start_time'] = start_time;
		params['end_time'] = end_time;
		params['status'] = status;
		params['order_id'] = this.update?.order_id;
		params['telephone'] = `${this.form.value?.telephone}`;
		if(key === 'save') {
			this.saveLoading = true;
			this.submitted = true;
			this.action(params, params2, 'You have successfully saved the property owner information');
		}
		if(key === 'preview') {
			this.showBackPreview = true;
			this.saveLoading = true;
			this.submitted = true;
			this.action(params, params2, null);
		}
		if(key === 'request') {
			this.confirmDialog.confirm({
				header: 'Request Confirmation',
				icon: `<img src="${this.gs.imgUrl}/accept.svg" alt="" />`,
				message: 'Are you sure you want to submit Management Agreement?',
				rejectVisible: true,
				acceptLabel: 'Yes',
				mainClass: 'ert'
			}, () => {
				this.action(params, params2, 'You have successfully sent the request for confirmation to owner.');
			}, () => console.log('No clicked'));
		}
	}

	action(params: any, params2: any, msg: any) {
		this.itemService.reference("POST", { form: params }, params2).subscribe(response => {
			this.submitted = false;
			this.showBackPreview = msg ? false : true;
			this.saveLoading = false;
			this.requestLoading = false;
			this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { primary_id: this.update?.id }, key: EnumRxKey.Catalog.view }));
			msg && this.gs.alert(msg);
		}, (error: Response) => {
			this.submitted = false;
			this.saveLoading = false;
			this.requestLoading = false;
		});
	}

	onSubmitPreview(form: UntypedFormGroup) {
		//console.log('dfgdf', this.form.value)
		if (!this.form.valid) {
			this.gs.validateAllFormFields(this.form);
			return;
		}
		if(this.update?.property_purpose === Enums.USER_CATALOG_PROPERTY_PURPOSE_SALE) {
			this.confirmDialog.confirm({
				header: 'Warning...',
				icon: `<img src="${this.gs.imgUrl}/post-2.svg" alt="" />`,
				message: 'Update the property first, then added the owner information',
				rejectVisible: false,
				acceptLabel: 'Okay'
			}, () => {
				console.log('Yes clicked')
			}, () => console.log('No clicked'));
			return;
		}
		this.showBackPreview = true;
		this.showPreview = true;
	}

	clickOutside(event: any) {
		//console.log('fdsd', event);
		if (this.showBackPreview) {
			this.confirmDialog.confirm({
				message: 'If you switch the tab to property details, the owner info details will be lost. Do you want to save the owner info before you switch the tab?',
				acceptLabel: 'Yes',
				rejectLabel: 'No',
				mainClass: 'ert'
			}, () => {
				
			}, () => {
				this.router.navigate([event, this.update?.id]);
			});
		} else {
			this.router.navigate([event, this.update?.id]);
		}
	}

	contractFile(files: any) {
		let items = files?.image?.length > 0 ? files?.image : files?.video?.length > 0 ? files?.video : files?.docs;
		let item = items[0];
		return item?.path;
	}

	ngOnDestroy() {
		//this.gs.store.dispatch(StoreAction.CatalogList({ data: null, key: CatalogRxKey.view}));
	}
}
