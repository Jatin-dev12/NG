import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';
import { CatalogSelectDialogComponent, RequestManagerSuccessDialogComponent } from 'src/app/dialogs';
import { AdditionalEnums, EnumRxKey, Enums } from 'src/app/enums';
import { Catalog } from 'src/app/models';
import { ConfirmDialogService, LaddaDirective } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { AsyncPipe } from '@angular/common';
import { FormSubmitDirective, ControlErrorsDirective, FileDragDropUploaderComponent } from 'src/app/shared';

@Component({
    selector: 'app-request-form-manager',
    templateUrl: './request-form-manager.component.html',
    styleUrls: ['./request-form-manager.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem, ControlErrorsDirective, FileDragDropUploaderComponent, LaddaDirective, AsyncPipe]
})
export class RequestFormManagerComponent {
	form!: UntypedFormGroup;
	submitted = false;
	showPreview: boolean = false;
	TypeOfIssuesArray = AdditionalEnums.TypeOfIssuesArray;
	allFiles: any = { image: [], video: [], docs: [] };
	catalogArray: Catalog[] = [];
	files: number[] = [];
	update: any = null;

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
			type: new UntypedFormControl("issue", [Validators.required]), // issue 
			type_of_request: new UntypedFormControl("", [Validators.required]), // issue 
			//order_id: new UntypedFormControl(""),
			//catalog_id: new UntypedFormControl("", [Validators.required]),
			//category_id: new UntypedFormControl(""),
			user_id: new UntypedFormControl(this.gs.identity?.id),
			assign_by: new UntypedFormControl(null),
			assign_to: new UntypedFormControl(null),
			location_id: new UntypedFormControl(null), // 104 Catalog Location
			attachment_id: new UntypedFormControl(null), 
			description: new UntypedFormControl("", [Validators.required]),
			quantity: new UntypedFormControl(null),
			options: new UntypedFormControl(null),
			start_time: new UntypedFormControl(null),
			end_time: new UntypedFormControl(null),
			due_date: new UntypedFormControl(null),
			comment: new UntypedFormControl(""),
			is_opened: new UntypedFormControl(1),
			action: new UntypedFormControl(null),
			reason: new UntypedFormControl(null),
			paid_by: new UntypedFormControl(null),
			paid_to: new UntypedFormControl(null),
			action_by: new UntypedFormControl(this.gs.identity?.id),
			status: new UntypedFormControl(1),

			//receivers: new UntypedFormControl([]),
			properties: new UntypedFormControl([], [Validators.required]),
			//files: new UntypedFormControl(""), 
		});
	}

	selectProperty() {
		const modalRef = this.modalService.open(CatalogSelectDialogComponent, {
			windowClass: 'center billspop',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true,
			size: 'xl'
		});
		modalRef.componentInstance.items = this.catalogArray;
		modalRef.componentInstance.agreement_status = this.gs.is_tenant ? '' : 'managed';
		modalRef.componentInstance.key = this.gs.is_tenant ? EnumRxKey.Catalog.reference : EnumRxKey.Catalog.listing;
		modalRef.result.then((result) => {
			if (!result) return;
			console.log('result', result);
			this.catalogArray = result?.items ?? [];
			this.form.patchValue({
				properties: this.catalogArray.map((item) => { return item.id }),
			});

			/*if(this.catalog?.user_id === this.gs.identity?.id) {
				this.confirmDialog.confirm({
					message: 'This Property manage by you',
					rejectVisible: false,
					acceptLabel: 'Okay'
				}, () => console.log('Yes'), () => console.log('No'))
				return;
			}
			this.itemService.catalog("GET", null, { primary_id: result.id }).subscribe(response => {
				let data = response.data;
				this.catalog = data;
				this.form.patchValue({
					order_id: this.catalog?.order_id,
					catalog_id: this.catalog?.id,
					category_id: this.catalog?.category_id,
					location_id: this.catalog?.location_id,
					receivers: [this.catalog?.agreement?.manager.id]
				})
			})*/

		}, (reason) => {
			console.log('reason', reason);
		});
	}


	onSubmitPreview(form: UntypedFormGroup) {
		//this.submitted = true;
		console.log('this.form.value', this.form.value);
		if (!this.form.valid) {
			this.gs.validateAllFormFields(this.form);
			this.submitted = false;
			return;
		}
		//let params = { ...this.form.value };
		this.showPreview = true;
	}

	onSubmit(form: UntypedFormGroup) {
		this.submitted = true;
		if (!this.form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		let formFields: any = {}
		let params = { ...form.value };
		let receivers: any[] = [];
		let properties: any[] = [];
		this.catalogArray.forEach(element => {
			properties.push(element.id);
			receivers.push(element.agreement?.manager.id);
		});
		delete params.properties;
		formFields['form'] = params;
		formFields['files'] = this.files;
		formFields['receivers'] = receivers;
		formFields['properties'] = properties;
		//let params2 = (this.update === null) ? { moduleId: Enums.USER_CATALOG_MODULE_ID_JOBS } : { moduleId: Enums.USER_CATALOG_MODULE_ID_JOBS, primary_id: this.update?.id };
		let key = (this.update === null) ? `add-${EnumRxKey.Request.listing}` : `update-${EnumRxKey.Request.listing}`;
		//this.gs.store.dispatch(StoreAction.RequestParams({ method: "POST", params: { UserRequestForm: params }, params2: null, key: key, url: "/requests/issued/pending-requests", sort: null, msg: 'You have successfully added request.' }));
		this.itemService.request("POST", formFields).subscribe(response => {
			this.submitted = false;
			console.log('response', response);
			const modalRef = this.modalService.open(RequestManagerSuccessDialogComponent, {
				windowClass: 'center billspop',
				backdrop: 'static',
				keyboard: false,
				animation: true,
				centered: true,
				size: 'xl'
			});
			modalRef.componentInstance.items = response?.data;
			modalRef.result.then((result) => {
				if (!result) return;
			}, (reason) => {
				console.log('reason', reason);
			});
		}, (error: Response) => {
			this.submitted = false;
		})
	}

}
