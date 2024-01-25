import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { environment } from 'src/environments/environment';
import { AsyncPipe } from '@angular/common';
import { LaddaDirective } from '../../../../modules/ladda/ladda.directive';
import { RouterLink } from '@angular/router';
import { PasswordToggleDirective } from '../../../../shared/directive/password-toggle.directive';
import { ControlErrorsDirective } from '../../../../shared/directive/control-errors.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ControlErrorContainerDirective } from '../../../../shared/directive/control-error-container.directive';
import { ErrorSummaryComponent } from '../../../../shared/components/error-summary/error-summary.component';
import { FormSubmitDirective } from '../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ErrorSummaryComponent, ControlErrorContainerDirective, MatProgressSpinnerModule, ControlErrorsDirective, PasswordToggleDirective, RouterLink, LaddaDirective, AsyncPipe]
})
export class LoginFormComponent implements OnInit {
	@Input() url: string = '/';
	@Input() isModal: boolean = false;
	@Output() modalEvent: EventEmitter<string> = new EventEmitter<string>();
	form!: UntypedFormGroup;
	submitted = false;
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.AuthLoading);
	loggedIn: boolean = false;

	constructor(
		private itemService: ItemService,
		public gs: GlobalService,
		private cookieService: CookieService,
	) {

	}

	get f() { return this.form.controls; };

	ngOnInit(): void {
		this.gs.clearErrorMessages();
		if (this.itemService.isAuthenticated()) {
			this.gs.router('/');
		}
		this.form = this.gs.formBuilder.group({
			/*username: new UntypedFormControl('', {
				validators: [Validators.required, Validators.email], asyncValidators: this.itemService.emailNotExistsValidator(),
				updateOn: 'blur'
			}),*/
			username: new UntypedFormControl('', [Validators.required, Validators.email]),
			password: new UntypedFormControl('', [Validators.required]),
			rememberMe: new UntypedFormControl(false),
		});

		let rememberMe = this.cookieService.get('rememberMe');
		if (rememberMe) {
			this.form.patchValue({
				username: this.cookieService.get('username'),
				password: atob(this.cookieService.get('hexcode')),
				rememberMe: rememberMe,
			});
		}		
	}


	onLogin(form: any) {
		this.submitted = true;
		console.log('form', form)
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.gs.clearErrorMessages();
		if (form.value.rememberMe) {
			this.cookieService.set('rememberMe', form.value.rememberMe, undefined, environment.hostName);
			this.cookieService.set('username', form.value.username, undefined, environment.hostName);
			this.cookieService.set('hexcode', btoa(form.value.password), undefined, environment.hostName);
		} else {
			this.cookieService.delete('rememberMe');
			this.cookieService.delete('username');
			this.cookieService.delete('hexcode');
		}
		let params = { ...form.value };
		params['rememberMe'] = (form.value.rememberMe === true) ? 1 : 0;
		this.gs.store.dispatch(StoreAction.AuthParams({ params: params, params2: { key: 'login' }, url: this.url }));
		setTimeout(() => {
			this.modalEvent.emit('HideModal');
		}, 900);
	}

	openForgot() {
		this.modalEvent.emit('Forgot');
	}

	openRegister() {
		this.modalEvent.emit('Register');
	}

}
