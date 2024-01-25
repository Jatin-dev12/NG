import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
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
    selector: 'app-profile-screen-name-dialog',
    templateUrl: './profile-screen-name-dialog.component.html',
    styleUrls: ['./profile-screen-name-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ControlErrorsDirective, NgxIntlTelInputModule, LaddaDirective, AsyncPipe]
})
export class ProfileScreenNameDialogComponent {
	userObservable: Observable<User> = this.gs.store.select(state => state.auth.user);
	loading: Observable<boolean> = this.gs.store.select(state => state.auth.loading);
	form = new FormGroup({
		title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
		name: new FormControl('', [Validators.required]),
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
				title: data.title,
				name: data.name,
			});
		});
		this.gs.trrigerAction$.subscribe(data => {
			if (data === EnumRxKey.Trriger.ProfileScreenNameDialog) {
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
		let key = EnumRxKey.Trriger.ProfileScreenNameDialog;
		this.gs.store.dispatch(StoreAction.ProfileParams({ method: "POST", params: { profile: form.value }, params2: null, key: key }));
	}
}
