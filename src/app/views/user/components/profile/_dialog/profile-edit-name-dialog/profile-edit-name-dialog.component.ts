import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { User } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { AsyncPipe } from '@angular/common';
import { LaddaDirective } from '../../../../../../modules/ladda/ladda.directive';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ControlErrorsDirective } from '../../../../../../shared/directive/control-errors.directive';
import { FormSubmitDirective } from '../../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-profile-edit-name-dialog',
    templateUrl: './profile-edit-name-dialog.component.html',
    styleUrls: ['./profile-edit-name-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ControlErrorsDirective, NgxIntlTelInputModule, LaddaDirective, AsyncPipe]
})
export class ProfileEditNameDialogComponent {
	userObservable: Observable<User> = this.gs.store.select(state => state.auth.user);
	loading: Observable<boolean> = this.gs.store.select(state => state.auth.loading);
	form = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.maxLength(50)])
	});
	submitted = false;
	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) {

	}

	ngOnInit(): void {
		this.userObservable.subscribe(data => {
			this.form?.patchValue({
				name: data.name
			});
		});
		this.gs.trrigerAction$.subscribe(data => {
			if(data === EnumRxKey.Trriger.ProfileNameDialog) {
				this.activeModal.close();
			}
		})
	}

	onSubmit(form: FormGroup) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.gs.clearErrorMessages();
		let key = EnumRxKey.Trriger.ProfileNameDialog;
		let params = { ...form.value };
		this.gs.store.dispatch(StoreAction.ProfileParams({ method: "POST", params: { profile: form.value }, params2: null, key: key }));
	}
}
