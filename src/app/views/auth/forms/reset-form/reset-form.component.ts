import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { MustMatch, PasswordStrengthValidator } from 'src/app/helpers';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { LaddaDirective } from '../../../../modules/ladda/ladda.directive';
import { PasswordToggleDirective } from '../../../../shared/directive/password-toggle.directive';
import { ControlErrorsDirective } from '../../../../shared/directive/control-errors.directive';
import { ControlErrorContainerDirective } from '../../../../shared/directive/control-error-container.directive';
import { ErrorSummaryComponent } from '../../../../shared/components/error-summary/error-summary.component';
import { FormSubmitDirective } from '../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-reset-form',
    templateUrl: './reset-form.component.html',
    styleUrls: ['./reset-form.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ErrorSummaryComponent, ControlErrorContainerDirective, ControlErrorsDirective, PasswordToggleDirective, LaddaDirective, RouterLink, AsyncPipe]
})
export class ResetFormComponent implements OnInit {

	form!: UntypedFormGroup;
	submitted = false;
	token: any;
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.AuthLoading);
	@Output() modalEvent: EventEmitter<string> = new EventEmitter<string>();

	constructor(
		public gs: GlobalService,
		private active: ActivatedRoute,
	) { }

	get f() { return this.form.controls; }

	ngOnInit(): void {
		this.gs.clearErrorMessages();
		this.active.queryParamMap.subscribe(data => {
			this.token = data.get('token');
		});
		this.form = this.gs.formBuilder.group({
			password: new UntypedFormControl('', [Validators.required, PasswordStrengthValidator]),
			confirm_password: new UntypedFormControl('', [Validators.required]),
		}, { validators: MustMatch('password', 'confirm_password') }); // Form validation 
	}

	onForgotPassword(form: any) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		//this.gs.store.dispatch(resetPassword({ payload: { ResetPasswordForm: form.value }, token: this.token }));
		let params = { ...form.value };
		this.gs.store.dispatch(StoreAction.AuthParams({ params: params, params2: { key: 'reset-password', token: this.token } }));
		setTimeout(() => {
			this.modalEvent.emit('HideModal');
		}, 900);
	}

}
