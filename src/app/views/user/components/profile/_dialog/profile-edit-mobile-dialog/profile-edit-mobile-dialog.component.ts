import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnumRxKey } from 'src/app/enums';
import { MustMatchPhone } from 'src/app/helpers';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { SearchCountryField, CountryISO, PhoneNumberFormat, NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { LaddaDirective } from '../../../../../../modules/ladda/ladda.directive';
import { ControlErrorsDirective } from '../../../../../../shared/directive/control-errors.directive';
import { PasswordToggleDirective } from '../../../../../../shared/directive/password-toggle.directive';
import { FormSubmitDirective } from '../../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-profile-edit-mobile-dialog',
    templateUrl: './profile-edit-mobile-dialog.component.html',
    styleUrls: ['./profile-edit-mobile-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, PasswordToggleDirective, ControlErrorsDirective, NgxIntlTelInputModule, LaddaDirective]
})
export class ProfileEditMobileDialogComponent {
	showForm: boolean = true;
	showConfirm: boolean = false;
	showOtp: boolean = false;
	form!: FormGroup;
	form2 = new FormGroup({
		otp: new FormControl('', [Validators.required]),
	});
	submitted = false;
	showError = false;
	showError2 = false;

	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
	PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedArabEmirates, CountryISO.India];
	get f() { return this.form.controls; };

	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private itemService: ItemService
	) {

	}

	ngOnInit(): void {
		this.form = this.gs.formBuilder.group({
			telephone: new FormControl(null, [Validators.required]),
			confirm_telephone: new FormControl(null, [Validators.required]),
			password: new FormControl('', [Validators.required]),
		}, { validators: MustMatchPhone('telephone', 'confirm_telephone') });
	}

	handleTelephone(event: any) {

	}


	onApply(form: FormGroup) {
		this.showError = true;
		this.showError2 = true;
		//console.log('form', form.valid, form.value);
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(form);
			return;
		}
		this.showForm = false;
		this.showConfirm = true;
	}

	sendEmail() {
		this.submitted = true;
		this.action();
	}

	onVerifyOtp(form: FormGroup) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(form);
			return;
		}
		this.action({ key: EnumRxKey.User.changePhone, otp: form.value.otp });
	}

	action(params2: any = { key: EnumRxKey.User.changePhone }) {
		let params = { ...this.form.value };
		params['telephone'] = this.form.value?.telephone?.e164Number;
		params['confirm_telephone'] = this.form.value?.confirm_telephone?.e164Number;
		params['password'] = this.form.value?.password;

		console.log('sdfsdfds', params2, params)

		this.itemService.profile("POST", params, params2).subscribe(response => {
			this.submitted = false;
			try {
				if (params2?.otp) {
					this.gs.alert('You have successfully change your phone.');
					this.gs.store.dispatch(StoreAction.ProfileParams({ method: "GET", params: null, params2: { primary_id: this.gs.identity?.id }, key: 'load_profile' }));
					this.activeModal.close();
				} else {
					this.showConfirm = false;
					this.showOtp = true;
					this.gs.alert('You have successfully send opt.');
				}
			} catch (error) {
				console.log('error', error)
			}
		}, (error: Response) => {
			this.submitted = false;
		})
	}
}
