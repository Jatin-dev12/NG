import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdditionalEnums, EnumRxKey, Enums } from 'src/app/enums';
import { User } from 'src/app/models';
import { ConfirmDialogService, LaddaDirective } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';
import { NgClass, AsyncPipe } from '@angular/common';
import { FormSubmitDirective, ControlErrorContainerDirective, ControlErrorsDirective, FileDragDropUploaderComponent } from 'src/app/shared';

@Component({
    selector: 'app-search-managers-view',
    templateUrl: './search-managers-view.component.html',
    styleUrls: ['./search-managers-view.component.scss'],
    standalone: true,
    imports: [NgClass, LaddaDirective, ReactiveFormsModule, FormSubmitDirective, ControlErrorContainerDirective, ControlErrorsDirective, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem, FileDragDropUploaderComponent, AsyncPipe]
})
export class SearchManagersViewComponent implements OnInit {

	userObservable: Observable<User> = this.gs.store.select(StoreSelector.UserSelectors[EnumRxKey.User.view]);
	loadingView: Observable<boolean> = this.gs.store.select(StoreSelector.UserLoadingKey[`${EnumRxKey.User.view}Loading`]);
	//loading: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogLoading);
	loading: boolean = false;
	favourileLoading: boolean = false;
	item_id: any = null;
	item: User | null = null;
	CatalogRxKey = EnumRxKey.User;
	role = Enums.Role;
	showError: boolean = false;
	TypeOfRequestArray = AdditionalEnums.CatalogRefRequestTypeArray;
	type = '';
	Enums = Enums;

	form!: UntypedFormGroup;

	get f() { return this.form.controls; };

	contact: any = null;

	constructor(
		public gs: GlobalService,
		private route: ActivatedRoute,
		public confirmDialog: ConfirmDialogService,
		private itemService: ItemService
	) {
		this.item_id = route.snapshot.params['id'];
	}

	ngOnInit(): void {
		this.onLoadUser();
		this.formValidation();
		this.userObservable.subscribe(user => {
			//console.log('user', user);
			//this.item = new User(user);
			this.item = user;
			if (user && user?.role !== Enums.ROLE_MANAGERS) {
				//this.gs.alert('This page not access', 'danger');
				//this.gs.router('/property-managers');
				//this.showError = true;
			}
			if(user?.in_contact === Enums.USER_PROFILE_CONTACT_STATUS_DECLINED) {
				this.onLoadContact();
			}
		});
	}

	onLoadUser() {
		let params = { username: this.item_id }
		let action = StoreAction.UserParams({ method: 'GET', params: null, params2: params, key: EnumRxKey.User.view });
		this.gs.store.dispatch(action);
	}

	onLoadContact() {
		this.itemService.contact("GET", null, { primary_id: this.item?.contact_id}).subscribe(response => {
			this.contact = response.data;
			if(response.data) {
				this.form.patchValue({
					description: this.contact?.description	,
					type_of_request: this.contact?.type_of_request,
					doc_id: this.contact?.doc_id,
					status: Enums.USER_PROFILE_CONTACT_STATUS_RESUBMITTED,
				})
			}
		})
	}

	formValidation() {
		this.form = this.gs.formBuilder.group({
			user_id: new UntypedFormControl(''),
			contact_id: new UntypedFormControl(''),
			location_id: new UntypedFormControl(''),
			type_of_request: new UntypedFormControl('', [Validators.required]),
			description: new UntypedFormControl('', [Validators.required, Validators.maxLength(this.gs.maxLength)]),
			doc_id: new UntypedFormControl(0),
			relation: new UntypedFormControl(AdditionalEnums.USER_CATALOG_ROLE_MANAGER),
			name: new UntypedFormControl(''),
			email: new UntypedFormControl(''),
			gender: new UntypedFormControl(''),
			date_of_birth: new UntypedFormControl(''),
			telephone: new UntypedFormControl(''),
			status: new UntypedFormControl(Enums.USER_PROFILE_CONTACT_STATUS_PENDING, [Validators.required]),
		});
	}


	onSubmit(form: UntypedFormGroup) {
		if (!this.form.valid) {
			this.gs.validateAllFormFields(this.form);
			return;
		}
		if (this.item?.role !== Enums.ROLE_MANAGERS) {
			this.confirmDialog.confirm({
				//header: this.gs.translate('Save Search'),
				message: this.gs.translate('Contact only prorperty manager'),
				rejectVisible: true,
				acceptLabel: 'Ok'
			}, () => {
				console.log('Yes clicked')
			}, () => console.log('No clicked'));
			return;
		}
		let params = { ...form.value };
		params['user_id'] = this.gs.identity?.id;
		params['contact_id'] = this.item.id;
		params['location_id'] = this.item.userProfile.location_id;
		params['name'] = this.gs.identity?.name;
		params['email'] = this.gs.identity?.email;
		params['gender'] = this.gs.identity?.userProfile.gender;
		params['date_of_birth'] = this.gs.identity?.userProfile.date_of_birth;
		params['telephone'] = this.gs.identity?.userProfile.telephone;
		//params['status'] = (this.contact?.id) ? Enums.USER_PROFILE_CONTACT_STATUS_RESUBMITTED : Enums.USER_PROFILE_CONTACT_STATUS_PENDING;
		this.loading = true;
		let params2 = this.contact ? { primary_id: this.contact?.id } : null;
		this.itemService.contact("POST", { form: params }, params2).subscribe(response => {
			//console.log('response', response)
			let data = response.data;
			this.loading = false;
			this.gs.alert("You have successfully sent a contact request to the Property Manager");
			this.gs.store.dispatch(StoreAction.ProfileParams({ method: "GET", params: null, params2: { primary_id: this.gs.identity?.id }, key: 'load_profile' }));
			this.gs.router(`/requests/contact/view/${data?.id}`);
		}, (error: Response) => {
			this.loading = false;
		});
	}



	handleFavourite(item: User) {
		if (this.gs.identity === null) {
			this.confirmDialog.confirmThis(`Login Required`, () => {
				this.gs.router('/login');
			}, () => { console.log('No clicked'); });
			return
		}
		if (!item.is_favorite) {
			this.favourileLoading = true;
			let params = { user_id: this.gs.identity.id, favorite_id: item.id, moduleId: 'UserProfile' };
			let params2 = { key: EnumRxKey.User.favorite };
			this.itemService.profile("POST", { form: params }, params2).subscribe(response => {
				this.favourileLoading = false;
				let user = { ...this.item };
				user['is_favorite'] = true;
				this.gs.store.dispatch(StoreAction.UserList({ data: user, key: EnumRxKey.User.view }));
				this.gs.alert('You have successfully added this manager to your favorites list.');
			}, (error: Response) => {
				this.favourileLoading = false;
			});
		} else {
			this.confirmDialog.confirm({
				header: this.gs.translate('Remove Favorite?'),
				icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
				message: this.gs.translate('Are you sure you want to remove favorite list?'),
			}, () => {
				this.favourileLoading = true;
				let params2 = { favorite_id: item.id, key: EnumRxKey.User.favorite };
				this.itemService.profile("DELETE", null, params2).subscribe(response => {
					this.favourileLoading = false;
					let user = { ...this.item };
					user['is_favorite'] = false;
					this.gs.store.dispatch(StoreAction.UserList({ data: user, key: EnumRxKey.User.view }));
					this.gs.alert('You have successfully removed this manager from your favorites list.', 'danger');
				}, (error: Response) => {
					this.favourileLoading = false;
				});
			}, () => console.log('No clicked'));
		}
	}


	ngOnDestroy() {
		this.gs.store.dispatch(StoreAction.UserList({ data: null, key: EnumRxKey.User.view }));
	}

}
