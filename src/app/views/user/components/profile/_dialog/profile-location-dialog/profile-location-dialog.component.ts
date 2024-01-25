import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { handleAddressState } from 'src/app/helpers';
import { User } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { LaddaDirective } from '../../../../../../modules/ladda/ladda.directive';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgClass, AsyncPipe } from '@angular/common';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ControlErrorsDirective } from '../../../../../../shared/directive/control-errors.directive';
import { GoogleLocationInputComponent } from '../../../../../../standalone/google-location-input/google-location-input.component';
import { FormSubmitDirective } from '../../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-profile-location-dialog',
    templateUrl: './profile-location-dialog.component.html',
    styleUrls: ['./profile-location-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, GoogleLocationInputComponent, ControlErrorsDirective, NgxIntlTelInputModule, NgClass, NgxSkeletonLoaderModule, LaddaDirective, AsyncPipe]
})
export class ProfileLocationDialogComponent {
	catalogFields: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.fields]);
	loadingFields: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogLoadingKey[`${EnumRxKey.Catalog.fields}Loading`]);
	userObservable: Observable<User> = this.gs.store.select(state => state.auth.user);
	loading: Observable<boolean> = this.gs.store.select(state => state.auth.loading);
	form!: FormGroup;
	//get fieldModel() { return this.form.get('fieldModel') as FormArray; };
	submitted = false;
	LanguagesArray: any[] = [];
	get f() { return this.form.controls };
	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) {

	}

	ngOnInit(): void {

		this.form = this.gs.formBuilder.group({
			location: new FormGroup({
				name: new FormControl('Profile Address'),
				email: new FormControl(this.gs.identity?.email),
				location: new FormControl('', [Validators.required]),
				address_line_1: new FormControl(''),
				address_line_2: new FormControl(''),
				city: new FormControl(''),
				zip5: new FormControl(''),
				state_code: new FormControl(''),
				country_code: new FormControl(''),
				latitude: new FormControl(''),
				longitude: new FormControl(''),
			}),
			languages: this.gs.formBuilder.array([], [Validators.required])
		});

		this.catalogFields.subscribe(data => {
			//console.log('this.LanguagesArray', data)
			if(data === null) {
				this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { key: EnumRxKey.Catalog.fields }, key: EnumRxKey.Catalog.fields }));
			}
			if(data) {
				this.LanguagesArray = data?.find((val: any) => val.name === 'languages')?.options ?? [];
				//console.log('this.LanguagesArray', this.LanguagesArray)
			}
		});
		this.userObservable.subscribe(data => {
			//console.log('data.userProfile.fieldModel?.fieldModel ?? []', data.userProfile.fieldModel?.languages ?? [])
			let languages = data?.userProfile?.fieldModel?.languages ?? [];
			let displayLang = (languages && languages) ? Array.isArray(languages) ? languages : Object.assign([], languages) : [];
			console.log('displayLang', displayLang)

			this.form?.patchValue({
				location: {
					name: data?.location?.name,
					email: data?.location?.email,
					location: data?.location?.location,
					address_line_1: data?.location?.address_line_1,
					address_line_2: data?.location?.address_line_2,
					city: data?.location?.city,
					zip5: data?.location?.zip5,
					state_code: data?.location?.state_code,
					country_code: data?.location?.country_code,
					latitude: data?.location?.latitude,
					longitude: data?.location?.longitude,
				},
				//languages: displayLang
			});
			displayLang?.forEach((el: any) => {
				this.languages.push(new FormControl(el));
			});
		});
		this.gs.trrigerAction$.subscribe(data => {
			if (data === EnumRxKey.Trriger.ProfileLocationDialog) {
				this.activeModal.close();
			}
		})
	}

	get languages() {
		return this.form.get('languages') as FormArray;
	}

	handleTags(event: any) {
		const { checked, value } = event.target;
		const checkBox: FormArray = this.languages as FormArray;
		if (checked) {
			checkBox?.push(new FormControl(value));
		} else {
			const index2 = checkBox.controls.findIndex(x => x.value === value);
			checkBox.removeAt(index2);
		}
	}




	tagsChacked(id: any) {
		// ?.trim()
		let languages = this.gs.user?.userProfile?.fieldModel?.languages ?? [];
		let valueArr = (languages && languages) ? Array.isArray(languages) ? languages : Object.assign([], languages) : [];
		const valueIndex = valueArr?.findIndex((f: any) => f?.trim() === id);
		return (valueIndex !== -1) ? true : false;
	}

	handleAddres(address: any) {
		let state = handleAddressState(address);
		//console.log('state', state, address)
		this.form?.patchValue({
			location: {
				location: state.location,
				country_code: state.country_code,
				city: state.city,
				state_code: state.state_code,
				zip5: state.zip5,
				latitude: state.latitude,
				longitude: state.longitude,
				is_primary: 1,
				address_line_1: '',
				address_line_2: '',
			}
		});
	}



	onSubmit(form: FormGroup) {
		console.log('this.form.value?.location', this.form.value?.location)
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.gs.clearErrorMessages();
		let key = EnumRxKey.Trriger.ProfileLocationDialog;
		let params: any = { ...this.form.value };
		params['location'] = { form: this.form.value?.location, is_primary: true };
		params['fieldModel'] = [ { name: 'languages', field_id: 8, value: this.form.value.languages.join(", ") } ];
		delete params['languages'];
		this.gs.store.dispatch(StoreAction.ProfileParams({ method: "POST", params: params, params2: null, key: key }));
	}

}



