import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { LaddaDirective } from '../../../../../../modules/ladda/ladda.directive';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ControlErrorsDirective } from '../../../../../../shared/directive/control-errors.directive';
import { FormSubmitDirective } from '../../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-profile-reviews-dialog',
    templateUrl: './profile-reviews-dialog.component.html',
    styleUrls: ['./profile-reviews-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ControlErrorsDirective, NgxIntlTelInputModule, LaddaDirective]
})
export class ProfileReviewsDialogComponent {
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
			value: new UntypedFormControl('', [Validators.required]),
		});
		this.settingsObservable.subscribe(data => {
			if(data?.items) {
				this.item = data?.items?.find((val: any) => val.key === 'user_profile_show_reviews');
				this.form.patchValue({
					value: this.item?.value ?? 'No'
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
		const params = { value: form.value?.value, key: this.item?.key };
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
