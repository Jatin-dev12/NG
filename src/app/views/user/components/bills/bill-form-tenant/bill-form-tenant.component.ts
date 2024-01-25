import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { Observable } from 'rxjs';
import { CatalogSelectDialogComponent } from 'src/app/dialogs';
import { AdditionalEnums, EnumRxKey, Enums } from 'src/app/enums';
import { Catalog } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { FileDragDropUploaderComponent } from '../../../../../shared/components/file-drag-drop-uploader/file-drag-drop-uploader.component';
import { InputNumber } from '../../../../../modules/input-number/input-number';
import { NgClass, CurrencyPipe, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ControlErrorsDirective } from '../../../../../shared/directive/control-errors.directive';
import { ControlErrorContainerDirective } from '../../../../../shared/directive/control-error-container.directive';
import { FormSubmitDirective } from '../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-bill-form-tenant',
    templateUrl: './bill-form-tenant.component.html',
    styleUrls: ['./bill-form-tenant.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ControlErrorContainerDirective, ControlErrorsDirective, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem, MatDatepickerModule, NgClass, InputNumber, FileDragDropUploaderComponent, CurrencyPipe, DatePipe]
})
export class BillFormTenantComponent {
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.RequestLoading);
	form!: UntypedFormGroup;
	submitted = false;
	showPreview: boolean = false;
	typeOfIssuesArray = AdditionalEnums.TypeOfIssuesArray;
	allFiles: any = { image: [], video: [], docs: [] };
	catalog: Catalog | null = null;
	update: any = null;
	currenciesArray = AdditionalEnums.CurrenciesArray;

	minDate = new Date();

	get f() { return this.form.controls; };

	constructor(
		public gs: GlobalService,
		private modalService: NgbModal,
		private confirmDialog: ConfirmDialogService,
		private itemService: ItemService
	) { }

	ngOnInit(): void {
		//console.log('router', this.router.url)
		this.formValidation();
	}

	get tenantRefrence() {
		return this.catalog?.agreement?.userCatalogOrdersReferences.find(val => val.relation === AdditionalEnums.USER_CATALOG_ROLE_TENANT) ?? null;
	}

	get tenant() {
		return this.catalog?.agreement?.tenant ?? null;
	}

	get is_relation() {
		let type = '';
		switch (this.gs.identity?.role) {
			case Enums.ROLE_OWNER:
				type = AdditionalEnums.USER_CATALOG_ROLE_OWNER;
				break;
			case Enums.ROLE_OWNER:
				type = AdditionalEnums.USER_CATALOG_ROLE_MANAGER;
				break;
			case Enums.ROLE_OWNER:
				type = AdditionalEnums.USER_CATALOG_ROLE_VENDOR;
				break;
			default:
				type = AdditionalEnums.USER_CATALOG_ROLE_TENANT;
				break;
		}
		return type;
	}

	formValidation() {
		this.form = this.gs.formBuilder.group({
			relation: new UntypedFormControl(this.is_relation),
			type: new UntypedFormControl("bill", [Validators.required]), // issue 
			type_of_request: new UntypedFormControl("", [Validators.required]), // issue 
			parent_id: new UntypedFormControl(""), // 12 Catalog order id
			order_id: new UntypedFormControl(""), // 12 Catalog order id
			catalog_id: new UntypedFormControl("", [Validators.required]),
			category_id: new UntypedFormControl(""), // 2 Catalog category id
			user_id: new UntypedFormControl(this.gs.identity?.id),
			receivers: new UntypedFormControl([]), // 35 Sender id
			currency_code: new UntypedFormControl(null, [Validators.required]),
			assign_by: new UntypedFormControl(null),
			assign_to: new UntypedFormControl(null),
			location_id: new UntypedFormControl(""), // 104 Catalog Location
			files: new UntypedFormControl(""), 
			description: new UntypedFormControl("", [Validators.required]),
			quantity: new UntypedFormControl(null),
			options: new UntypedFormControl(null),
			start_time: new UntypedFormControl(null, [Validators.required]),
			end_time: new UntypedFormControl(null, [Validators.required]),
			due_date: new UntypedFormControl(null, [Validators.required]),
			comment: new UntypedFormControl(""),
			amount: new UntypedFormControl(null, [Validators.required]),
			tax_rates: new UntypedFormControl(null, [Validators.required]),
			total_amount: new UntypedFormControl(null, [Validators.required]),
			is_opened: new UntypedFormControl("1"),
			action: new UntypedFormControl(null),
			reason: new UntypedFormControl(null),
			paid_by: new UntypedFormControl(null),
			paid_to: new UntypedFormControl(null),
			action_by: new UntypedFormControl(this.gs.identity?.id),
			status: new UntypedFormControl("1")
		});
	}


	SelectProperty() {
		const modalRef = this.modalService.open(CatalogSelectDialogComponent, {
			windowClass: 'center',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true,
			size: 'sm',
		});
		modalRef.componentInstance.catalog_id = this.form.value?.catalog_id;
		modalRef.componentInstance.agreement_status = this.gs.is_tenant ? '' : 'not-managed';
		modalRef.componentInstance.key = this.gs.is_tenant ? EnumRxKey.Catalog.reference : EnumRxKey.Catalog.listing;
		modalRef.result.then((result) => {
			if (!result) return;
			//console.log('result', result);
			this.catalog = result.item;
			if(this.gs.is_owner && this.catalog?.user_id !== this.gs.identity?.id) {
				this.confirmDialog.confirm({
					message: 'This Property manage by manager',
					rejectVisible: false,
					acceptLabel: 'Okay'
				}, () => console.log('Yes'), () => console.log('No'))
				return;
			}
			if(this.catalog?.agreement?.tenant === null) {
				this.confirmDialog.confirm({
					message: 'Tenant is not available',
					rejectVisible: false,
					acceptLabel: 'Okay'
				}, () => console.log('Yes'), () => console.log('No'))
				return;
			}
			this.form.patchValue({
				order_id: this.catalog?.order_id,
				catalog_id: this.catalog?.id,
				category_id: this.catalog?.category_id,
				location_id: this.catalog?.location_id,
				receivers: [this.catalog?.agreement?.tenant.id]
			});
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	onSubmitPreview(form: UntypedFormGroup) {
		this.submitted = true;
		/* let totalErrors = 0;
		Object.keys(this.form.controls).forEach(key => {
			const controlErrors: any = this.form.get(key)?.errors;
			if (controlErrors != null) {
				totalErrors++;
				Object.keys(controlErrors).forEach(keyError => {
					console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
				});
			}
		});*/
		if (!this.form.valid) {
			this.gs.validateAllFormFields(this.form);
			this.submitted = false;
			return;
		}
		let params = { ...this.form.value };
		this.showPreview = true;
	}

	onSubmit(form: UntypedFormGroup) {
		console.log('form', form.value);
		if (!this.form.valid) {
			this.gs.validateAllFormFields(this.form);
			this.submitted = false;
			return;
		}
		let value = this.form.value;
		let params = { ...form.value };
		let start_time = moment(value.start_time).format('YYYY-MM-DD hh:mm:ss');
		let end_time = moment(value.end_time).format('YYYY-MM-DD hh:mm:ss');
		let due_date = moment(value.due_date).format('YYYY-MM-DD hh:mm:ss');
		params['start_time'] = start_time;
		params['end_time'] = end_time;
		params['due_date'] = due_date;
		let key = (this.update === null) ? `add-${EnumRxKey.Request.listing}` : `update-${EnumRxKey.Request.listing}`;
		this.gs.store.dispatch(StoreAction.RequestParams({ method: "POST", params: { UserRequestForm: params }, params2: null, key: key, url: "/bills/issued/pending-requests", sort: null, msg: 'You have successfully added bill.' }));
	}

}
