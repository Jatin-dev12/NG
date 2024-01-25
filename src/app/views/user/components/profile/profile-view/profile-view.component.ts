import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { User } from 'src/app/models';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { ProfileAboutDialogComponent } from '../_dialog/profile-about-dialog/profile-about-dialog.component';
import { ProfileLocationDialogComponent } from '../_dialog/profile-location-dialog/profile-location-dialog.component';
import { ProfileSpecialitiesDialogComponent } from '../_dialog/profile-specialities-dialog/profile-specialities-dialog.component';
import { ConfirmDialogService } from 'src/app/modules';
import { ReadMoreComponent } from '../../../../../shared/components/read-more/read-more.component';
import { LaddaDirective } from '../../../../../modules/ladda/ladda.directive';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
    styleUrls: ['./profile-view.component.scss'],
    standalone: true,
    imports: [RouterLink, NgClass, LaddaDirective, ReadMoreComponent]
})
export class ProfileViewComponent implements OnInit {
	itemObservable: Observable<User> = this.gs.store.select(StoreSelector.UserSelectors.view);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.UserLoadingKey[`${EnumRxKey.User.view}Loading`]);
	item: User | null = null;
	username: any = null;
	favourileLoading: boolean = false;
	Enums = Enums;

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
		private modalService: NgbModal,
		public confirmDialog: ConfirmDialogService,
		private itemService: ItemService
	) {
		this.username = this.activeRoute.snapshot.params['username'];
	}

	ngOnInit(): void {
		this.OnLoad();
		this.itemObservable.subscribe(data => {
			this.item = new User(data);
			//console.log('sdfvsd', data?.userProfile.tags)
			if (data && data.role === Enums.ROLE_GUEST) {
				this.gs.router('/profile/update');
			}
		});
		this.gs.trrigerAction$.subscribe(data => {
			if (data === EnumRxKey.Trriger.ProfileSpecialitiesDialog || data === EnumRxKey.Trriger.ProfileAboutDialog || data === EnumRxKey.Trriger.ProfileLocationDialog) {
				this.OnLoad();
			}
		})
	}

	OnLoad() {
		let params = { username: this.username }
		let action = StoreAction.UserParams({ method: 'GET', params: null, params2: params, key: EnumRxKey.User.view });
		this.gs.store.dispatch(action);
	}

	get languagesArray() {
		let languages = this.item?.userProfile?.fieldModel?.languages ?? [];
		//console.log('languages', Object.assign([], languages), languages);
		//let newArray = [];
		return (languages && languages) ? Array.isArray(languages) ? languages : Object.assign([], languages) : [];
	}

	get tagsArray() {
		let tagsString = this.item?.tags ? this.item?.tags?.split(', ') : [];
		return tagsString;
	}

	AboutDialog() {
		const modalRef = this.modalService.open(ProfileAboutDialogComponent, {
			//windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true,
			size: 'lg'
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
			centered: true,
			size: 'lg'
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	SpecialitiesDialog() {
		const modalRef = this.modalService.open(ProfileSpecialitiesDialogComponent, {
			//windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true,
			size: 'lg'
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	handleFavourite(item: User) {
		if (this.gs.identity === null) {
			this.confirmDialog.confirmThis(`Login Required`, () => {
				this.gs.router('/login');
			}, () => { console.log('No clicked'); });
			return
		}
		if(!item.is_favorite) {
			this.favourileLoading = true;
			let params = { user_id: this.gs.identity.id, favorite_id: item.id, moduleId: 'UserProfile' };
			let params2 = { key: EnumRxKey.User.favorite };
			this.itemService.profile("POST", { form: params }, params2).subscribe(response => {
				this.favourileLoading = false;
				let user = { ...this.item };
				user['is_favorite'] = true;
				this.gs.store.dispatch(StoreAction.UserList({ data: user, key: EnumRxKey.User.view}));
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
