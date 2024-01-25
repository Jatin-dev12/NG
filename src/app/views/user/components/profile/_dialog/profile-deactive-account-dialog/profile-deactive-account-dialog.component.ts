import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { AsyncPipe } from '@angular/common';
import { LaddaDirective } from '../../../../../../modules/ladda/ladda.directive';
import { FormSubmitDirective } from '../../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-profile-deactive-account-dialog',
    templateUrl: './profile-deactive-account-dialog.component.html',
    styleUrls: ['./profile-deactive-account-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, LaddaDirective, AsyncPipe]
})
export class ProfileDeactiveAccountDialogComponent {
	loading: Observable<boolean> = this.gs.store.select(state => state.auth.loading);
	form!: FormGroup;
	submitted = false;
	get f() { return this.form.controls; }
	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private confirmDialog: ConfirmDialogService
	) {

	}

	ngOnInit(): void {
		this.gs.clearErrorMessages();
		this.form = this.gs.formBuilder.group({
			password: new FormControl(''),
		}); // Form validation
	}

	onSubmit(form: FormGroup) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.gs.clearErrorMessages();
		let params = { ...form.value };
		this.gs.store.dispatch(StoreAction.ProfileParams({ method: "DELETE", params: null, params2: null, key: EnumRxKey.User.deactivate }));
		/*this.confirmDialog.confirmThis(`Are you sure won't deactivate your account?`, () => {
			this.gs.store.dispatch(StoreAction.ProfileParams({ method: "DELETE", params: { DisableAccountForm: params }, params2: null, key: EnumRxKey.User.deactivate }));
		}, () => console.log('cancel'))
		*/
	}

}
