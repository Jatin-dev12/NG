import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { User } from 'src/app/models';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { LaddaDirective } from '../../../../../../modules/ladda/ladda.directive';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ControlErrorsDirective } from '../../../../../../shared/directive/control-errors.directive';
import { FormSubmitDirective } from '../../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-notification-favorites-dialog',
    templateUrl: './notification-favorites-dialog.component.html',
    styleUrls: ['./notification-favorites-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ControlErrorsDirective, NgxIntlTelInputModule, LaddaDirective]
})
export class NotificationFavoritesDialogComponent {
	settingsObservable: Observable<any> = this.gs.store.select(StoreSelector.UserSelectors[EnumRxKey.User.settings]);
	form!: UntypedFormGroup;
	submitted = false;
	item: any = null;
	get f() { return this.form.controls; };

	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private itemService: ItemService
	) {

	}

	ngOnInit(): void {
		this.form = this.gs.formBuilder.group({
			push: new UntypedFormControl(''),
			email: new UntypedFormControl(''),
		});
		this.settingsObservable.subscribe(data => {
			if (data?.items) {
				this.item = data?.items?.find((val: any) => val.key === 'user-favourite');
				let push = false;
				let email = false;
				if(this.item?.value === Enums.CORE_NOTIFICATION_USER_SETTING_STATUS_YES) {
					push = true;
					email = true;
				}
				if(this.item?.value === Enums.CORE_NOTIFICATION_USER_SETTING_STATUS_NO) {
					push = false;
					email = false;
				}
				if(this.item?.value === Enums.CORE_NOTIFICATION_USER_SETTING_STATUS_IS_FCM) {
					push = true;
				}
				if(this.item?.value === Enums.CORE_NOTIFICATION_USER_SETTING_STATUS_IS_MAIL) {
					email = true;
				}
				//console.log('this.item', this.item)
				this.form.patchValue({
					push: push,
					email: email,
				});
			}
		})
	}

	onSubmit(form: UntypedFormGroup) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			return;
		}
		let value = '';
		if(form.value.push) {
			value = Enums.CORE_NOTIFICATION_USER_SETTING_STATUS_IS_FCM;
		}
		if(form.value.email) {
			value = Enums.CORE_NOTIFICATION_USER_SETTING_STATUS_IS_MAIL;
		}
		if(form.value.push && form.value.email) {
			value = Enums.CORE_NOTIFICATION_USER_SETTING_STATUS_YES;
		}
		if(!form.value.push && !form.value.email) {
			value = Enums.CORE_NOTIFICATION_USER_SETTING_STATUS_NO;
		}
		const params = { value: value, key: this.item?.key };
		let params2 = { key: EnumRxKey.User.settings };
		this.itemService.profile("POST", params, params2).subscribe(response => {
			this.submitted = false;
			this.gs.alert('Success!');
			//this.gs.store.dispatch(StoreAction.UserUpdate({ item: response.data, key: EnumRxKey.User.settings }));
			this.gs.store.dispatch(StoreAction.UserParams({ method: "GET", params: null, params2: { key: EnumRxKey.User.settings }, key: EnumRxKey.User.settings }));
			this.activeModal.close();
		}, (error: Response) => {
			this.submitted = false;
		});
	}
}
