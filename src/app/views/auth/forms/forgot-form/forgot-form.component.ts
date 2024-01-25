import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LaddaDirective } from '../../../../modules/ladda/ladda.directive';
import { ControlErrorsDirective } from '../../../../shared/directive/control-errors.directive';
import { ControlErrorContainerDirective } from '../../../../shared/directive/control-error-container.directive';
import { ErrorSummaryComponent } from '../../../../shared/components/error-summary/error-summary.component';
import { FormSubmitDirective } from '../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-forgot-form',
    templateUrl: './forgot-form.component.html',
    styleUrls: ['./forgot-form.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ErrorSummaryComponent, ControlErrorContainerDirective, ControlErrorsDirective, LaddaDirective, RouterLink, AsyncPipe]
})
export class ForgotFormComponent implements OnInit {
	@Input() isModal: boolean = false;
	@Output() modalEvent: EventEmitter<string> = new EventEmitter<string>();
	form!: UntypedFormGroup;
	submitted = false;
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.AuthLoading);

	constructor(
		public gs: GlobalService,
	) { }

	get f() { return this.form.controls; }

	ngOnInit(): void {
		this.gs.clearErrorMessages();
		this.form = this.gs.formBuilder.group({
			username: new UntypedFormControl('', [Validators.required, Validators.email]),
		}); // Form validation 
	}

	onForgotPassword(form: any) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		//this.gs.store.dispatch(forgotPassword({ payload: { PasswordResetRequestForm: form.value } }));
		let params = { ...form.value };
		this.gs.store.dispatch(StoreAction.AuthParams({ params: params, params2: { key: 'forgot-password' } }));
		setTimeout(() => {
			this.modalEvent.emit('HideModal');
		}, 900);
	}

	openLogin() {
		this.modalEvent.emit('Login');
	}

}
