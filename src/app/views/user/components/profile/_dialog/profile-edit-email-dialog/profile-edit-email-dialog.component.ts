import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnumRxKey } from 'src/app/enums';
import { MustMatch } from 'src/app/helpers';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { LaddaDirective } from '../../../../../../modules/ladda/ladda.directive';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ControlErrorsDirective } from '../../../../../../shared/directive/control-errors.directive';
import { PasswordToggleDirective } from '../../../../../../shared/directive/password-toggle.directive';
import { FormSubmitDirective } from '../../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-profile-edit-email-dialog',
    templateUrl: './profile-edit-email-dialog.component.html',
    styleUrls: ['./profile-edit-email-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, PasswordToggleDirective, ControlErrorsDirective, NgxIntlTelInputModule, LaddaDirective]
})
export class ProfileEditEmailDialogComponent {
	showForm: boolean = true;
	showConfirm: boolean = false;
	showOtp: boolean = false;
	form!: FormGroup;
	form2 = new FormGroup({
		otp: new FormControl('', [Validators.required]),
	});
	submitted = false;

	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private itemService: ItemService
	) {

	}

	ngOnInit(): void {
		this.form = this.gs.formBuilder.group({
			email: new FormControl('', [Validators.required, Validators.email]),
			confirm_email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required]),
		}, { validators: MustMatch('email', 'confirm_email') });
	}


	onApply(form: FormGroup) {
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
		this.action({ key: EnumRxKey.User.changeEmail, otp: form.value.otp });
	}

	action(params2: any = { key: EnumRxKey.User.changeEmail }) {
		this.itemService.profile("POST", this.form.value, params2).subscribe(response => {
			this.submitted = false;
			if(params2?.otp) {
				this.gs.alert('You have successfully changed the email address.');
				this.gs.store.dispatch(StoreAction.ProfileParams({ method: "GET", params: null, params2: { primary_id: this.gs.identity?.id }, key: 'load_profile' }));
				this.activeModal.close();
			} else {
				this.showConfirm = false;
				this.showOtp = true;
				this.gs.alert('You have successfully send verification code.');
			}
		}, (error: Response) => {
			this.submitted = false;
		})
	}


}
