import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, UntypedFormGroup, UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { MustMatch, PasswordStrengthValidator } from 'src/app/helpers';
import { User } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { AsyncPipe } from '@angular/common';
import { LaddaDirective } from '../../../../../../modules/ladda/ladda.directive';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ControlErrorsDirective } from '../../../../../../shared/directive/control-errors.directive';
import { PasswordToggleDirective } from '../../../../../../shared/directive/password-toggle.directive';
import { ControlErrorContainerDirective } from '../../../../../../shared/directive/control-error-container.directive';
import { FormSubmitDirective } from '../../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-profile-password-dialog',
    templateUrl: './profile-password-dialog.component.html',
    styleUrls: ['./profile-password-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ControlErrorContainerDirective, PasswordToggleDirective, ControlErrorsDirective, NgxIntlTelInputModule, LaddaDirective, AsyncPipe]
})
export class ProfilePasswordDialogComponent {
	userObservable: Observable<User> = this.gs.store.select(state => state.auth.user);
	loading: Observable<boolean> = this.gs.store.select(state => state.auth.loading);
	form!: UntypedFormGroup
	submitted = false;
	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) {

	}

	ngOnInit(): void {
		this.form = this.gs.formBuilder.group({
			old_password: new UntypedFormControl('', [Validators.required]),
			password: new UntypedFormControl('', [Validators.required, PasswordStrengthValidator]),
			confirm_password: new UntypedFormControl('', [Validators.required])
		}, { validators: MustMatch('password', 'confirm_password') });
		this.gs.trrigerAction$.subscribe(data => {
			if (data === EnumRxKey.User.changePassword) {
				this.activeModal.close();
			}
		})
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
		this.gs.store.dispatch(StoreAction.ProfileParams({ method: "POST", params: params, params2: { key: EnumRxKey.User.changePassword }, key: EnumRxKey.User.changePassword }));
	}
}
