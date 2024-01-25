import { Component, Input } from '@angular/core';
import { EmailValidator, UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { PasswordStrengthValidator } from 'src/app/helpers';
import { User } from 'src/app/models';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { LaddaDirective } from '../../../../../modules/ladda/ladda.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ControlErrorsDirective } from '../../../../../shared/directive/control-errors.directive';
import { FormSubmitDirective } from '../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-staffs-form',
    templateUrl: './staffs-form.component.html',
    styleUrls: ['./staffs-form.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ControlErrorsDirective, MatProgressSpinnerModule, LaddaDirective, AsyncPipe]
})
export class StaffsFormComponent {
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.StaffLoading);
	form!: UntypedFormGroup;
	submitted = false;
	@Input() update: User | null = null;

	get f() { return this.form.controls; };

	constructor(
		public gs: GlobalService,
		private itemService: ItemService
	) { }

	ngOnInit(): void {
		this.formValidation();
		switch (this.gs.identity?.role) {
			case Enums.ROLE_OWNER:
				this.form.patchValue({
					is_owner: 1,
					is_manager: null,
					is_vendor: null,
				});
				break;
			case Enums.ROLE_MANAGERS:
				this.form.patchValue({
					is_owner: null,
					is_manager: 1,
					is_vendor: null,
				});
				break;
			case Enums.ROLE_VENDORS:
				this.form.patchValue({
					is_owner: null,
					is_manager: null,
					is_vendor: 1,
				});
				break;
			default:
				this.form.patchValue({
					is_owner: null,
					is_manager: null,
					is_vendor: null,
				});
				break;
		}
		if (this.update?.id) {
			this.form.patchValue({
				first_name: this.update.userProfile.first_name,
				last_name: this.update.userProfile.last_name,
				email: this.update.email,
				password: '',
				telephone: this.update.userProfile.telephone,
				parent_id: this.update.userProfile.parent_id,
				is_staff: this.update.is_staff,
				is_owner: this.update.is_owner,
				is_manager: this.update.is_manager,
				is_vendor: this.update.is_vendor,
				role: this.update.role,
				status: this.update.status
			});
		}
	}

	formValidation() {
		let emailValidator: any = this.update?.id ? [Validators.required, Validators.email] : { validators: [Validators.required, Validators.email], asyncValidators: this.itemService.uniqueEmailValidator(), updateOn: 'blur' };
		this.form = this.gs.formBuilder.group({
			first_name: new UntypedFormControl("", [Validators.required]),
			last_name: new UntypedFormControl("", [Validators.required]),
			email: new UntypedFormControl('', emailValidator),
			password: new UntypedFormControl('', [Validators.required, PasswordStrengthValidator]),
			telephone: new UntypedFormControl(""),
			parent_id: new UntypedFormControl(this.gs.identity?.id),
			is_staff: new UntypedFormControl(1),
			is_owner: new UntypedFormControl(null),
			is_manager: new UntypedFormControl(null),
			is_vendor: new UntypedFormControl(null),
			role: new UntypedFormControl(Enums.ROLE_STAFF),
			status: new UntypedFormControl(Enums.USER_STATUS_ACTIVE)
		});
	}

	onSubmit(form: UntypedFormGroup) {
		if (!this.form.valid) {
			this.gs.validateAllFormFields(this.form);
			return;
		}
		let params = { ...form.value };
		params['name'] = `${form.value.first_name} ${form.value.last_name}`;
		let key = (this.update === null) ? `add-${EnumRxKey.Staff.listing}` : `update-${EnumRxKey.Staff.listing}`;
		let params2 = this.update?.id ? { user_id: this.update.id } : null;
		this.gs.store.dispatch(StoreAction.StaffParams({ method: "POST", params: { form: params }, params2: params2, key: key, url: "/staffs", sort: null, msg: `You have successfully ${this.update?.id ? 'updated' : 'added'} staff.` }));
	}

}
