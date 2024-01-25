import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbDropdown, NgbDropdownAnchor, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { Enums, EnumRxKey, AdditionalEnums } from 'src/app/enums';
import { Catalog, User } from 'src/app/models';
import { LaddaDirective } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { ControlErrorContainerDirective, ControlErrorsDirective, FileDragDropUploaderComponent, FormSubmitDirective } from 'src/app/shared';
import { StoreAction } from 'src/app/store/actions';

@Component({
	selector: 'app-catalog-contact-request-dialog',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FormsModule, LaddaDirective, FormSubmitDirective, ControlErrorContainerDirective, ControlErrorsDirective, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem, FileDragDropUploaderComponent],
	templateUrl: './catalog-contact-request-dialog.component.html',
	styleUrl: './catalog-contact-request-dialog.component.scss'
})
export class CatalogContactRequestDialogComponent {
	@Input() catalog: Catalog | null = null;
	@Input() user: User | null = null;
	form!: UntypedFormGroup; // Form group for the Catalog form 
	submitted: boolean = false;
	Enums = Enums;
	TypeOfRequestArray = AdditionalEnums.CatalogRefRequestTypeArray;

	get f() { return this.form.controls; };

	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private itemService: ItemService
	) { }

	ngOnInit(): void {
		this.formValidation();
	}

	formValidation() {
		this.form = this.gs.formBuilder.group({
			user_id: new UntypedFormControl(''),
			contact_id: new UntypedFormControl(''),
			location_id: new UntypedFormControl(''),
			type_of_request: new UntypedFormControl('', [Validators.required]),
			description: new UntypedFormControl('', [Validators.required, Validators.maxLength(this.gs.maxLength)]),
			doc_id: new UntypedFormControl(0),
			relation: new UntypedFormControl((this.user?.role === Enums.ROLE_OWNER) ? AdditionalEnums.USER_CATALOG_ROLE_OWNER : AdditionalEnums.USER_CATALOG_ROLE_MANAGER),
			name: new UntypedFormControl(''),
			email: new UntypedFormControl(''),
			gender: new UntypedFormControl(''),
			date_of_birth: new UntypedFormControl(''),
			telephone: new UntypedFormControl(''),
			status: new UntypedFormControl(Enums.USER_PROFILE_CONTACT_STATUS_PENDING, [Validators.required]),
		});
	}
	

	onSubmit(form: UntypedFormGroup) {
		console.log('dfgdfgdf', form.value);
		this.submitted = true;
		if (!this.form.valid) {
			this.gs.validateAllFormFields(this.form);
			this.submitted = false;
			return;
		}
		let params = { ...form.value };
		params['user_id'] = this.gs.identity?.id;
		params['contact_id'] = this.user?.id;
		params['location_id'] = this.user?.location?.id;
		params['name'] = this.gs.identity?.name;
		params['email'] = this.gs.identity?.email;
		params['gender'] = this.gs.identity?.userProfile.gender;
		params['date_of_birth'] = this.gs.identity?.userProfile.date_of_birth;
		params['telephone'] = this.gs.identity?.userProfile.telephone;
		console.log('params', params)
		//return
		this.itemService.contact("POST", { form: params }, null).subscribe(response => {
			//console.log('response', response)
			let data = response.data;
			this.submitted = false;
			this.gs.alert(`You have successfully sent a contact request to the Property ${this.user?.role}`);
			this.gs.store.dispatch(StoreAction.ProfileParams({ method: "GET", params: null, params2: { primary_id: this.gs.identity?.id }, key: 'load_profile' }));
			this.gs.router(`/requests/contact/view/${data?.id}`);
			this.dismiss();
		}, (error: Response) => {
			this.submitted = false;
		});
	}

	dismiss() {
		this.activeModal.close();
	}
}
