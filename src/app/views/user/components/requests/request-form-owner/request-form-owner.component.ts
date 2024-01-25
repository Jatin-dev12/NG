import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CatalogSelectDialogComponent } from 'src/app/dialogs';
import { AdditionalEnums, Enums, EnumRxKey } from 'src/app/enums';
import { Catalog } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { LaddaDirective } from '../../../../../modules/ladda/ladda.directive';
import { FileDragDropUploaderComponent } from '../../../../../shared/components/file-drag-drop-uploader/file-drag-drop-uploader.component';
import { ControlErrorsDirective } from '../../../../../shared/directive/control-errors.directive';
import { FormSubmitDirective } from '../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-request-form-owner',
    templateUrl: './request-form-owner.component.html',
    styleUrls: ['./request-form-owner.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem, ControlErrorsDirective, FileDragDropUploaderComponent, LaddaDirective, AsyncPipe]
})
export class RequestFormOwnerComponent {
	
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.RequestLoading);
	form!: UntypedFormGroup;
	submitted = false;
	showPreview: boolean = false;
	TypeOfIssuesArray = AdditionalEnums.TypeOfIssuesArray;
	allFiles: any = { image: [], video: [], docs: [] };
	catalog: Catalog | null = null;
	update: any = null;

	get f() { return this.form.controls; };

	constructor(
		public gs: GlobalService,
		private modalService: NgbModal,
		private itemService: ItemService,
		private confirmDialog: ConfirmDialogService,
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
			order_id: new UntypedFormControl(""), // 12 Catalog order id
			catalog_id: new UntypedFormControl("", [Validators.required]),
			category_id: new UntypedFormControl(""), // 2 Catalog category id
			user_id: new UntypedFormControl(this.gs.identity?.id),
			receivers: new UntypedFormControl([]), // 35 Sender id
			assign_by: new UntypedFormControl(null),
			assign_to: new UntypedFormControl(null),
			location_id: new UntypedFormControl(""), // 104 Catalog Location
			attachment_id: new UntypedFormControl(""), 
			files: new UntypedFormControl(""), 
			description: new UntypedFormControl("", [Validators.required]),
			quantity: new UntypedFormControl(null),
			options: new UntypedFormControl(null),
			start_time: new UntypedFormControl(null),
			end_time: new UntypedFormControl(null),
			due_date: new UntypedFormControl(null),
			comment: new UntypedFormControl(""),
			is_opened: new UntypedFormControl("1"),
			action: new UntypedFormControl(null),
			reason: new UntypedFormControl(null),
			paid_by: new UntypedFormControl(null),
			paid_to: new UntypedFormControl(null),
			action_by: new UntypedFormControl(this.gs.identity?.id),
			status: new UntypedFormControl("1")
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
		modalRef.componentInstance.catalog_id = this.form.value?.catalog_id;
		modalRef.result.then((result) => {
			if (!result) return;
			//console.log('result', result);
			if(this.catalog?.owner_id === null) {
				this.confirmDialog.confirm({
					message: 'Owner information not added.',
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
					receivers: [this.catalog?.owner_id]
				})
			})
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
		if (!this.form.valid) {
			this.gs.validateAllFormFields(this.form);
			return;
		}
		let params = { ...form.value };
		//let params2 = (this.update === null) ? { moduleId: Enums.USER_CATALOG_MODULE_ID_JOBS } : { moduleId: Enums.USER_CATALOG_MODULE_ID_JOBS, primary_id: this.update?.id };
		let key = (this.update === null) ? `add-${EnumRxKey.Request.listing}` : `update-${EnumRxKey.Request.listing}`;
		this.gs.store.dispatch(StoreAction.RequestParams({ method: "POST", params: { UserRequestForm: params }, params2: null, key: key, url: "/requests/issued/pending-requests", sort: null, msg: 'You have successfully added request.' }));
	}
}
