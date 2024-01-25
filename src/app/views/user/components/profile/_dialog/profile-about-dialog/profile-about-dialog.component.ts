import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
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
    selector: 'app-profile-about-dialog',
    templateUrl: './profile-about-dialog.component.html',
    styleUrls: ['./profile-about-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ControlErrorsDirective, NgxIntlTelInputModule, LaddaDirective, AsyncPipe]
})
export class ProfileAboutDialogComponent {
	userObservable: Observable<User> = this.gs.store.select(state => state.auth.user);
	loading: Observable<boolean> = this.gs.store.select(state => state.auth.loading);
	form!: UntypedFormGroup;
	submitted = false;
	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) {

	}

	ngOnInit(): void {
		this.form = this.gs.formBuilder.group({
			about: new FormControl('', [Validators.required, Validators.maxLength(this.gs.maxLength)])
		});
		this.userObservable.subscribe(data => {
			this.form?.patchValue({
				about: data.about
			});
		});
		this.gs.trrigerAction$.subscribe(data => {
			if (data === EnumRxKey.Trriger.ProfileAboutDialog) {
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
		let key = EnumRxKey.Trriger.ProfileAboutDialog;
		this.gs.store.dispatch(StoreAction.ProfileParams({ method: "POST", params: { profile: form.value }, params2: null, key: key }));
	}
}
