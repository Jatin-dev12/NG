import { Component, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchCountryField, CountryISO, PhoneNumberFormat, NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AdditionalEnums, Enums } from 'src/app/enums';
import { Catalog, User } from 'src/app/models';
import { GlobalService, ItemService } from 'src/app/services';
import { LaddaDirective } from '../../../../../../modules/ladda/ladda.directive';
import { ControlErrorsDirective } from '../../../../../../shared/directive/control-errors.directive';
import { ErrorSummaryComponent } from '../../../../../../shared/components/error-summary/error-summary.component';
import { FormSubmitDirective } from '../../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-catalog-apply-dialog',
    templateUrl: './catalog-apply-dialog.component.html',
    styleUrls: ['./catalog-apply-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ErrorSummaryComponent, ControlErrorsDirective, NgxIntlTelInputModule, LaddaDirective]
})
export class CatalogApplyDialogComponent {
	@Input() item: Catalog | null = null;
	@Input() contactUser: User | null = null;
	@Input() relation: string = AdditionalEnums.USER_CATALOG_ROLE_MANAGER;
	form!: UntypedFormGroup;
	submitted = false;
	loading: boolean = false;

	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
	PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedArabEmirates, CountryISO.India];

	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private itemService: ItemService
	) { }

	get f() { return this.form.controls; };

	ngOnInit(): void {
		this.form = this.gs.formBuilder.group({
			user_id: new UntypedFormControl(null),
			contact_id: new UntypedFormControl(this.contactUser?.id),
			location_id: new UntypedFormControl(this.item?.location_id),
			type_of_request: new UntypedFormControl('Others', [Validators.required]),
			description: new UntypedFormControl(''),
			relation: new UntypedFormControl(this.relation),
			email: new UntypedFormControl('', [Validators.required, Validators.email]),
			telephone: new UntypedFormControl('', [Validators.required]),
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
		params['telephone'] = this.form.value?.telephone?.e164Number;
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
