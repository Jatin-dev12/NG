import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { LaddaDirective } from '../../../../../modules/ladda/ladda.directive';
import { NgClass, AsyncPipe } from '@angular/common';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ControlErrorsDirective } from '../../../../../shared/directive/control-errors.directive';
import { FormSubmitDirective } from '../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ControlErrorsDirective, NgxIntlTelInputModule, NgClass, LaddaDirective, AsyncPipe]
})
export class ChangePasswordComponent implements OnInit {

	form!: UntypedFormGroup;
	submitted = false;
	//loading: Observable<boolean> = this.gs.store.select(StoreSelector.loading);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.AuthLoading);

	constructor(
		public gs: GlobalService,

	) { }

	ngOnInit(): void {
		this.gs.clearErrorMessages();
		this.form = this.gs.formBuilder.group({
			old_password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
			new_password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
			confirm_new_password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
		}); // Form validation
		this.gs.trrigerAction$.subscribe(data => {
			if (data === EnumRxKey.User.changePassword) {
				//this.form.reset();
				this.submitted = false;
			}
		})
	}

	get f() { return this.form.controls };

	onSubmit(form: any) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		let params = { ...form.value };
		this.gs.store.dispatch(StoreAction.ProfileParams({ method: "POST", params: { ChangePasswordForm: params }, params2: { key: EnumRxKey.User.changePassword }, key: EnumRxKey.User.changePassword }));
		setTimeout(() => {
			//this.form.reset();
		}, 1500);
	}

}
