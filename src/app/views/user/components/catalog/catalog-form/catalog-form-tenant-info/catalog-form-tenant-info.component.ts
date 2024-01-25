import { Component, HostListener, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbModal, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { Observable } from 'rxjs';
import { MessagesReplyDialogComponent } from 'src/app/dialogs';
import { AdditionalEnums, EnumRxKey, Enums } from 'src/app/enums';
import { Catalog, User, UserCatalogOrdersReferences } from 'src/app/models';
import { ConfirmDialogService, InputNumber, LaddaDirective } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormSubmitDirective, ControlErrorsDirective, ControlErrorContainerDirective, FileDragDropUploaderComponent } from 'src/app/shared';

@Component({
    selector: 'app-catalog-form-tenant-info',
    templateUrl: './catalog-form-tenant-info.component.html',
    styleUrls: ['./catalog-form-tenant-info.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, FormSubmitDirective, ControlErrorsDirective, NgxIntlTelInputModule, MatProgressSpinnerModule, MatFormFieldModule, InputNumber, ControlErrorContainerDirective, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem, MatNativeDateModule, MatDatepickerModule, FileDragDropUploaderComponent, LaddaDirective, CurrencyPipe, DatePipe, NgbAlertModule]
})
export class CatalogFormTenantInfoComponent {
	/*@HostListener('window:unload', ['$event']) unloadHandler(event: any) {
		console.log("Processing beforeunload...");
		event?.preventDefault();
		event.returnValue = 'Your data will be lost!';
		return 'terter';
	}
	@HostListener('window:beforeunload', ['$event']) beforeunloadHandler(event: any) {
		event?.preventDefault();
		event.returnValue = 'Your data will be lost!';
		return 'terter';
		return false;
	}*/
	@HostListener('window:pagehide', ['$event']) pagehideHandler(event: any) {
		event?.preventDefault();
		event.returnValue = 'Your data will be lost!';
		return 'terter';
		return false;
	}
	viewObservable: Observable<Catalog | null> = this.gs.store.select(StoreSelector.CatalogSelectors.view);
	update: Catalog | null = null;
	item_id: any = null;
	submitted = false;
	saveLoading = false;
	requestLoading = false;
	minDate = new Date();

	UploadPropertyDoc: any = { image: [], video: [], docs: [] };
	UserCatalogOrderPaymentTerms = AdditionalEnums.UserCatalogOrderPaymentTermsArray;
	form!: FormGroup;
	showPreview: boolean = false;
	showBackPreview: boolean = false;
	tenantRefrence: UserCatalogOrdersReferences | null = null;
	tenant: User | null = null;
	currenciesArray = AdditionalEnums.CurrenciesArray;
	currency_code: any = 'USD';

	Enums = Enums;

	get f() { return this.form.controls; };

	constructor(
		public gs: GlobalService,
		private route: ActivatedRoute,
		private itemService: ItemService,
		private confirmDialog: ConfirmDialogService,
		private modalService: NgbModal,
		private router: Router,
	) {
		this.item_id = route.snapshot.params['id'];
	}

	ngOnInit(): void {
		this.gs.clearErrorMessages();
		this.formValidation();
		//this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { primary_id: this.item_id }, key: EnumRxKey.Catalog.view }));
		this.viewObservable.subscribe(data => {
			this.update = data;
			if (data) {
				//let userRecipients = data.userCatalogRecipients?.find(val => val.relation === AdditionalEnums.USER_CATALOG_ROLE_TENANT);
				let orderReferences = this.update?.agreement?.userCatalogOrdersReferences?.find(val => val.relation === AdditionalEnums.USER_CATALOG_ROLE_TENANT);
				this.tenantRefrence = orderReferences ?? null;
				this.tenant = this.update?.agreement?.tenant ?? null;
				if (orderReferences?.doc_id) this.UploadPropertyDoc = this.gs.getFilesList(orderReferences?.doc);
				if (this.tenantRefrence) this.showPreview = true;
				//console.log('userRecipients', orderReferences);
				if (orderReferences) {
					let start_time = orderReferences?.start_time ?? null;
					let end_time = orderReferences?.end_time ?? null;
					this.form.patchValue({
						relation: orderReferences?.relation,
						type: orderReferences?.type,
						name: orderReferences?.name ?? '',
						email: orderReferences?.email ?? '',
						country_code: orderReferences?.country_code ?? '',
						contract_type: orderReferences?.contract_type ?? '',
						commission: orderReferences?.commission ?? 0,
						permitted_occupier: orderReferences?.permitted_occupier ?? '',
						telephone: orderReferences?.telephone ?? '',
						location: orderReferences?.location ?? '',
						payment_terms: orderReferences?.payment_terms ?? '',
						amount: orderReferences?.amount ?? null,
						deposit_amount: orderReferences?.deposit_amount ?? null,
						doc_id: orderReferences?.doc_id ?? '',
						start_time: start_time ? new Date(moment(start_time).format('YYYY-MM-DD')) : '',
						end_time: end_time ? new Date(moment(end_time).format('YYYY-MM-DD')) : '',
						terms: orderReferences?.terms ?? '',
						status: orderReferences?.status ?? 1,
					});
				}
			}
		});
	}

	formValidation() {
		this.form = new FormGroup({
			relation: new FormControl(AdditionalEnums.USER_CATALOG_ROLE_TENANT),
			type: new FormControl('agreement', [Validators.required]),
			order_id: new FormControl(''),
			name: new FormControl('', [Validators.required]),
			email: new FormControl('', {
				validators: [Validators.required, Validators.email], asyncValidators: this.itemService.uniqueEmailValidator(Enums.ROLE_USER),
				updateOn: 'blur'
			}),
			location: new FormControl(''),
			telephone: new FormControl(''),
			doc_id: new FormControl('', [Validators.required]),
			start_time: new FormControl('', [Validators.required]),  // YYYY-MM-DD hh:mm:ss ==> Same value in top of form
			end_time: new FormControl('', [Validators.required]),    // YYYY-MM-DD hh:mm:ss ==> Same value in top of form
			terms: new FormControl('', [Validators.required, Validators.maxLength(this.gs.maxLength)]), // Agrement Terms
			payment_terms: new FormControl('', [Validators.required]),
			country_code: new FormControl(null),
			contract_type: new FormControl(''),
			currency_code: new FormControl('USD', [Validators.required]),
			commission: new FormControl(0),
			permitted_occupier: new FormControl('', [Validators.pattern('^[a-zA-Z \-\']+')]),
			amount: new FormControl(null, [Validators.required]),
			deposit_amount: new FormControl(null, [Validators.required]),
			status: new FormControl(Enums.USER_CATALOG_ORDERS_REFERENCE_STATUS_PENDING),
		});
	}

	handleCurrency(event: any) {
		//console.log('event', event);
		this.currency_code = event?.currency_code;
		this.form.patchValue({
			currency_code: event?.currency_code,
		});
	}

	onSubmit(form: UntypedFormGroup, key = 'save', status: any = null) {
		//console.log('sdfvds', this.form.value)
		this.submitted = true;
		if (!this.form?.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		let params2 = (this.tenantRefrence === null) ? { order_id: this.update?.order_id } : { order_id: this.update?.order_id, primary_id: this.tenantRefrence?.id };
		let value = this.form.value;
		let params = { ...this.form.value };
		let start_time = moment(value.start_time).format('YYYY-MM-DD hh:mm:ss');
		let end_time = moment(value.end_time).format('YYYY-MM-DD hh:mm:ss');
		params['start_time'] = start_time;
		params['end_time'] = end_time;
		params['status'] = status;
		params['order_id'] = this.update?.order_id;
		params['telephone'] = `${this.form.value?.telephone}`;
		//console.log('params', params);
		if (key === 'save') {
			this.saveLoading = true;
			this.submitted = true;
			this.action(params, params2, 'You have successfully saved the tenant information');
		}
		if (key === 'preview') {
			console.log('params', params);
			this.saveLoading = true;
			this.showBackPreview = true;
			this.submitted = true;
			this.action(params, params2, null);
		}
		if (key === 'request') {
			if (this.update?.status !== Enums.USER_CATALOG_STATUS_ACTIVE && this.update?.is_public !== Enums.USER_CATALOG_IS_PUBLISH_PUBLISH) {
				this.confirmDialog.confirm({
					header: 'Post',
					icon: `<img src="${this.gs.imgUrl}/post-2.svg" alt="" />`,
					message: 'Post the property first, then proceed to submit the request',
					rejectVisible: false,
					acceptLabel: 'Okay'
				}, () => {
					console.log('Yes clicked')
				}, () => console.log('No clicked'));
				return;
			}
			this.confirmDialog.confirm({
				header: 'Request Confirmation',
				icon: `<img src="${this.gs.imgUrl}/accept.svg" alt="" />`,
				message: 'Are you sure you want to submit Tenancy Agreement?',
				rejectVisible: true,
				acceptLabel: 'Yes',
				mainClass: 'ert'
			}, () => {
				//console.log('Yes clicked');
				this.action(params, params2, 'You have successfully sent the confirmation request to tenant');
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

	contractFile(files: any) {
		let items = files?.image?.length > 0 ? files?.image : files?.video?.length > 0 ? files?.video : files?.docs;
		let item = items[0];
		return item?.path;
	}

	remove() {
		//alert('In Progress');
		//this.gs.router(`/properties/add/tenant/${this.item_id}`);
		this.showPreview = false;
	}

	onSubmitPreview(form: UntypedFormGroup) {
		console.log('this.form', this.form.value);
		if (!this.form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}

		if(this.update?.property_purpose === Enums.USER_CATALOG_PROPERTY_PURPOSE_SALE) {
			this.confirmDialog.confirm({
				header: 'Warning...',
				icon: `<img src="${this.gs.imgUrl}/post-2.svg" alt="" />`,
				message: 'Update the property first, then added the tenant information',
				rejectVisible: false,
				acceptLabel: 'Okay'
			}, () => {
				console.log('Yes clicked')
			}, () => console.log('No clicked'));
			return;
		}

		this.showPreview = true;
		this.showBackPreview = true;
	}

	createMsg() {
		const modalRef = this.modalService.open(MessagesReplyDialogComponent, {
			windowClass: 'center',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true,
			size: 'sm',
		});
		modalRef.componentInstance.update = this.update;
		modalRef.result.then((result) => {
			if (!result) return;
			console.log('result', result)
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	clickOutside(event: any) {
		//console.log('fdsd', event);
		if (this.showBackPreview) {
			this.confirmDialog.confirm({
				header: 'Warning',
				icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
				message: 'If you switch the tab to property details, the tenant info details will be lost. Do you want to save the tenant info before you switch the tab?',
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

	ngOnDestroy() {
		//this.router.navigate(['/properties/add/tenant', this.update?.id]);
		//this.gs.store.dispatch(StoreAction.CatalogList({ data: null, key: CatalogRxKey.view}));
		/*if(this.showBackPreview) {
			this.confirmDialog.confirm({
				message: 'If you switch the tab to property details, the tenant info details will be lost. Do you want to save the tenant info before you switch the tab?',
				acceptLabel: 'Yes',
				rejectLabel: 'No',
				mainClass: 'ert'
			}, () => {
				
			}, () => {
				this.router.navigate(['/properties/add/tenant', this.update?.id]);
			});
		}*/
	}

}
