import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormArray, UntypedFormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { fileManupulate, handleAddressState } from 'src/app/helpers';
import { User } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { ProfileDeactiveAccountDialogComponent } from '../_dialog/profile-deactive-account-dialog/profile-deactive-account-dialog.component';
import { ProfileEditEmailDialogComponent } from '../_dialog/profile-edit-email-dialog/profile-edit-email-dialog.component';
import { ProfileEditMobileDialogComponent } from '../_dialog/profile-edit-mobile-dialog/profile-edit-mobile-dialog.component';
import { ProfileEditNameDialogComponent } from '../_dialog/profile-edit-name-dialog/profile-edit-name-dialog.component';
import { ProfileGoogleDialogComponent } from '../_dialog/profile-google-dialog/profile-google-dialog.component';
import { ProfileLocationDialogComponent } from '../_dialog/profile-location-dialog/profile-location-dialog.component';
import { ProfilePasswordDialogComponent } from '../_dialog/profile-password-dialog/profile-password-dialog.component';
import { ProfilePhotosDialogComponent } from '../_dialog/profile-photos-dialog/profile-photos-dialog.component';
import { ProfilePrivacyCookiesDialogComponent } from '../_dialog/profile-privacy-cookies-dialog/profile-privacy-cookies-dialog.component';
import { ProfileReviewsDialogComponent } from '../_dialog/profile-reviews-dialog/profile-reviews-dialog.component';
import { ProfileScreenNameDialogComponent } from '../_dialog/profile-screen-name-dialog/profile-screen-name-dialog.component';
import { ProfileTwoStepVerificationDialogComponent } from '../_dialog/profile-two-step-verification-dialog/profile-two-step-verification-dialog.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-update-profile',
    templateUrl: './update-profile.component.html',
    styleUrls: ['./update-profile.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class UpdateProfileComponent implements OnInit {
	settingsObservable: Observable<any> = this.gs.store.select(StoreSelector.UserSelectors[EnumRxKey.User.settings]);
	form!: UntypedFormGroup;
	submitted = false;
	verifiedLoading = false;
	loading: Observable<boolean> = this.gs.store.select(state => state.auth.loading);
	userObservable: Observable<User> = this.gs.store.select(state => state.auth.user);
	uploads: Observable<any> = this.gs.store.select(StoreSelector.UploadFiles);
	user: User | null = null;
	selectedLocation = '';
	UserProfileStatus = Enums.UserProfileStatus;
	role = Enums.Role;
	profile_show_reviews: any = null;
	two_step: any = null;
	privacy_cookies: any = null;

	allFiles: any = {
		image: [],
		video: [],
		docs: []
	};

	fieldModelArr: any[] = [
		{ name: 'profile_account_holder', value: '', label: 'Account Holder', field_id: 127 },
		{ name: 'profile_bank_routing', value: '', label: 'Bank Routing', field_id: 128 },
		{ name: 'profile_bank_address', value: '', label: 'Bank Address', field_id: 129 },
		{ name: 'profile_bank_name', value: '', label: 'Bank Name', field_id: 130 },
		{ name: 'profile_account_number', value: '', label: 'Account Number', field_id: 131 },
		{ name: 'profile_account_type', value: '', label: 'Account Type', field_id: 132 },
	]

	get f() { return this.form.controls; }

	constructor(
		public gs: GlobalService,
		public confirmDialog: ConfirmDialogService,
		private modalService: NgbModal,
	) {
		
	}

	ngOnInit(): void {
		this.gs.clearErrorMessages();
		this.formValidation();

		//console.log('isNaN', isNaN(this.user))

		this.settingsObservable.subscribe(data => {
			if(data === null) this.gs.store.dispatch(StoreAction.UserParams({ method: "GET", params: null, params2: { key: EnumRxKey.User.settings }, key: EnumRxKey.User.settings }));
			if(data?.items) {
				let items = data?.items;
				this.profile_show_reviews = data?.items?.find((val: any) => val.key === 'user_profile_show_reviews');
				this.two_step = data?.items?.find((val: any) => val.key === 'auth2_verification');
				this.privacy_cookies = data?.items?.find((val: any) => val.key === 'user_profile_show_privacy_cookies');
				//console.log('this.profile_show_reviews', this.profile_show_reviews)
			}
		});

		this.uploads.subscribe(data => {
			this.allFiles = data;
			let files = fileManupulate(this.allFiles);
			this.form.patchValue({
				files: files
			});
		});

		this.userObservable.subscribe(user => {
			this.user = new User(user);
			let date_of_birth: any = user.userProfile?.date_of_birth;
			//console.log('useruser', user.userProfile);
			this.gs.store.dispatch(StoreAction.UploadRespond({ files: this.user?.userProfile?.media }));
			this.form?.patchValue({
				first_name: user.userProfile?.first_name,
				last_name: user.userProfile?.last_name,
				telephone: user.userProfile?.telephone,
				gender: user.userProfile?.gender,
				about: user.userProfile?.about,
				date_of_birth: new Date(this.user?.moment(date_of_birth, 'YYYY-MM-DD')),
			});
			this.form.get('location')?.patchValue({
				name: user.userProfile?.location?.name,
				email: user.userProfile?.location?.email,
				location: user.userProfile?.location?.location,
				address_line_1: user.userProfile?.location?.address_line_1,
				is_primary: 1,
				address_line_2: user.userProfile?.location?.address_line_2,
				city: user.userProfile?.location?.city,
				postal_code: user.userProfile?.location?.postal_code,
				state_code: user.userProfile?.location?.state_code,
				country_code: user.userProfile?.location?.country_code,
				latitude: user.userProfile?.location?.latitude,
				longitude: user.userProfile?.location?.longitude,
			});

			/*const fieldModel: any = user.userProfile?.fieldModel ? user.userProfile?.fieldModel : {};
			this.fieldModelArr.forEach(el => {
				const idx = this.fieldModelArr.findIndex(elIdx => elIdx.name === el.name);
				const fields = (<FormArray>this.form?.get("fieldModel")).at(idx);
				fieldModel[`${el.name}`] && fields?.patchValue({ value: fieldModel[`${el.name}`] });
			});*/

		});

	}

	formValidation() {
		this.form = this.gs.formBuilder.group({
			first_name: new UntypedFormControl('', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$')]),
			last_name: new UntypedFormControl('', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$')]),
			telephone: new UntypedFormControl('', [Validators.required]),
			gender: new UntypedFormControl(''),
			date_of_birth: new UntypedFormControl(''),
			about: new UntypedFormControl(''),
			location: this.gs.formBuilder.group({
				name: new UntypedFormControl('Profile Address'),
				email: new UntypedFormControl(this.gs.identity?.email),
				location: new UntypedFormControl(''),
				address_line_1: new UntypedFormControl(''),
				is_primary: new UntypedFormControl(1),
				address_line_2: new UntypedFormControl(''),
				city: new UntypedFormControl(''),
				postal_code: new UntypedFormControl(''),
				state_code: new UntypedFormControl(''),
				country_code: new UntypedFormControl(''),
				latitude: new UntypedFormControl(''),
				longitude: new UntypedFormControl(''),
			}),
			files: new UntypedFormControl([])
		}); // Form validation
	}

	get fieldModel() {
		return this.form.get("fieldModel") as UntypedFormArray
	}

	private addNewFieldOptions(value: any) {
		//let reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';  Validators.pattern(reg)
		return this.gs.formBuilder.group({
			name: new UntypedFormControl(value.name),
			field_id: new UntypedFormControl(value.field_id),
			value: new UntypedFormControl(value.value ? value.value : '', Validators.compose([Validators.required]))
		});
	}

	addField(value: any) {
		this.fieldModel.push(this.addNewFieldOptions(value));
	}

	getContactsFormGroup(index: any): UntypedFormGroup {
		const formGroup = this.fieldModel.controls[index] as UntypedFormGroup;
		return formGroup;
	}

	onSubmit(form: any) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.gs.clearErrorMessages();
		let date: any = this.user?.moment(form.value.date_of_birth, 'X');
		form.value.date_of_birth = date / 1000;
		this.gs.store.dispatch(StoreAction.ProfileParams({ method: "POST", params: form.value, params2: null, key: 'profile' }));
		setTimeout(() => { this.submitted = false; }, 1500);
	}

	handleAddres(address: any) {
		let state = handleAddressState(address);
		this.form.get('location')?.patchValue({
			location: state.location,
			country_code: state.country_code,
			city: state.city,
			state_code: state.state_code,
			postal_code: state.postal_code,
			latitude: state.latitude,
			longitude: state.longitude,
			is_primary: 1,
			address_line_1: '',
			address_line_2: ''
		});
	}

	get ProfileAvatar() {
		let img = this.user?.userProfile?.avatar_id ? this.user.avatar : `${this.gs.imgUrl}/profile-img.png`;
		return img;
	}

	NameDialog() {
		const modalRef = this.modalService.open(ProfileEditNameDialogComponent, {
			//windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true
			//size: 'sm',
			//fullscreen: true
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	ScreenNameDialog() {
		const modalRef = this.modalService.open(ProfileScreenNameDialogComponent, {
			//windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	LocationDialog() {
		const modalRef = this.modalService.open(ProfileLocationDialogComponent, {
			//windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	PhotoDialog() {
		const modalRef = this.modalService.open(ProfilePhotosDialogComponent, {
			//windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	ReviewsDialog() {
		const modalRef = this.modalService.open(ProfileReviewsDialogComponent, {
			//windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	EmailDialog() {
		const modalRef = this.modalService.open(ProfileEditEmailDialogComponent, {
			//windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	MobileDialog() {
		const modalRef = this.modalService.open(ProfileEditMobileDialogComponent, {
			//windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	PasswordDialog() {
		const modalRef = this.modalService.open(ProfilePasswordDialogComponent, {
			//windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	TwoStepDialog() {
		const modalRef = this.modalService.open(ProfileTwoStepVerificationDialogComponent, {
			//windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	GoogleDialog() {
		const modalRef = this.modalService.open(ProfileGoogleDialogComponent, {
			//windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	DeactivateDialog() {
		const modalRef = this.modalService.open(ProfileDeactiveAccountDialogComponent, {
			//windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	PrivacyDialog() {
		const modalRef = this.modalService.open(ProfilePrivacyCookiesDialogComponent, {
			//windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	ngOnDestroy() {
		//this.gs.store.dispatch(new UploadActions.Clear);
	}

}
