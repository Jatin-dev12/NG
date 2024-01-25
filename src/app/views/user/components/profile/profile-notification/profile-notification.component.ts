import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { NotificationFavoritesDialogComponent } from '../_dialog/notification-favorites-dialog/notification-favorites-dialog.component';
import { NotificationProductUpdatesDialogComponent } from '../_dialog/notification-product-updates-dialog/notification-product-updates-dialog.component';
import { NotificationSavedSearchesDialogComponent } from '../_dialog/notification-saved-searches-dialog/notification-saved-searches-dialog.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile-notification',
    templateUrl: './profile-notification.component.html',
    styleUrls: ['./profile-notification.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class ProfileNotificationComponent implements OnInit {
	settingsObservable: Observable<any> = this.gs.store.select(StoreSelector.UserSelectors[EnumRxKey.User.settings]);
	searchSetting: any = {};
	favoriteSetting: any = {};
	newsSetting: any = {};
	constructor(
		public gs: GlobalService,
		private modalService: NgbModal,
	) { }

	ngOnInit(): void {
		this.settingsObservable.subscribe(data => {
			if(data === null) this.gs.store.dispatch(StoreAction.UserParams({ method: "GET", params: null, params2: { key: EnumRxKey.User.settings }, key: EnumRxKey.User.settings }));
			if(data?.items) {
				let items = data?.items;
				this.searchSetting = items?.find((val: any) => val.key === 'user-favourite');
				this.favoriteSetting = items?.find((val: any) => val.key === 'user-favourite');
				this.newsSetting = items?.find((val: any) => val.key === 'user-favourite');
			}
		});
	}

	showSettings(item: any) {
		let text = '';
		if(item?.value === Enums.CORE_NOTIFICATION_USER_SETTING_STATUS_YES) {
			text = 'Push, Email';
		}
		if(item?.value === Enums.CORE_NOTIFICATION_USER_SETTING_STATUS_NO) {
			text = 'No';
		}
		if(item?.value === Enums.CORE_NOTIFICATION_USER_SETTING_STATUS_IS_FCM) {
			text = 'Push';
		}
		if(item?.value === Enums.CORE_NOTIFICATION_USER_SETTING_STATUS_IS_MAIL) {
			text = 'Email';
		}
		return text;
	}

	Search() {
		const modalRef = this.modalService.open(NotificationSavedSearchesDialogComponent, {
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

	Favorites() {
		const modalRef = this.modalService.open(NotificationFavoritesDialogComponent, {
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

	Product() {
		const modalRef = this.modalService.open(NotificationProductUpdatesDialogComponent, {
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

}
