import { Component, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';
import { AdditionalEnums, Enums } from 'src/app/enums';
import { Catalog, User } from 'src/app/models';
import { GlobalService, ItemService } from 'src/app/services';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { LaddaDirective } from 'src/app/modules';
import { FormSubmitDirective, ErrorSummaryComponent, ControlErrorContainerDirective, ControlErrorsDirective } from 'src/app/shared';

@Component({
    selector: 'app-catalog-contact-dialog',
    templateUrl: './catalog-contact-dialog.component.html',
    styleUrls: ['./catalog-contact-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ErrorSummaryComponent, ControlErrorContainerDirective, ControlErrorsDirective, NgxIntlTelInputModule, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem, LaddaDirective]
})
export class CatalogContactDialogComponent {
	@Input() item: Catalog | null = null;
	@Input() contactUser: User | null = null;
	@Input() relation: string = AdditionalEnums.USER_CATALOG_ROLE_MANAGER;
	form!: UntypedFormGroup;
	submitted = false;
	loading: boolean = false;

	TypeOfRequestArray = AdditionalEnums.CatalogRefRequestTypeArray;

	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private itemService: ItemService
	) { }

	get f() { return this.form.controls; };

	ngOnInit(): void {
		this.form = this.gs.formBuilder.group({
			user_id: new UntypedFormControl(this.gs.identity?.id),
			contact_id: new UntypedFormControl(this.contactUser?.id),
			location_id: new UntypedFormControl(this.item?.location_id),
			type_of_request: new UntypedFormControl('', [Validators.required]),
			description: new UntypedFormControl('', [Validators.required]),
			doc_id: new UntypedFormControl(''),
			relation: new UntypedFormControl(this.relation),
			name: new UntypedFormControl(this.gs.identity?.name),
			email: new UntypedFormControl(this.gs.identity?.email, [Validators.required, Validators.email]),
			gender: new UntypedFormControl(this.gs.identity?.gender),
			date_of_birth: new UntypedFormControl(this.gs.identity?.userProfile.date_of_birth),
			telephone: new UntypedFormControl(this.gs.identity?.userProfile.telephone, [Validators.required]),
			status: new UntypedFormControl(Enums.USER_PROFILE_CONTACT_STATUS_PENDING, [Validators.required]),
		});
	}

	onSubmit(form: any) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.gs.clearErrorMessages();
		let params = { ...form.value };
		//console.log('params', params);
		this.loading = true;
		let params2 = { key: 'request' };
		this.itemService.userContact("POST", { UserProfileContactForm: params }, null).subscribe(response => {
			this.loading = false;
			this.gs.alert(`You have successfully send the contact request to ${this.relation}`);
			//this.gs.router('/requests/contact');
			this.activeModal.close();
		}, (error: Response) => {
			this.loading = false;
		});
	}
}
