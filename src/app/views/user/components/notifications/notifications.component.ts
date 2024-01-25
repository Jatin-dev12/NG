import { Component, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { Notifications, Pagination } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { environment } from 'src/environments/environment';
import { AsyncPipe, DatePipe } from '@angular/common';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    standalone: true,
    imports: [NgxSkeletonLoaderModule, RouterLink, PaginationComponent, AsyncPipe, DatePipe]
})
export class NotificationsComponent implements OnInit {
	notifications: Observable<Notifications[]> = this.gs.store.select(StoreSelector.Notifications);
	pagination: Observable<Pagination | null> = this.gs.store.select(StoreSelector.NotificationPagination);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.NotificationLoading);
	page = 1;
	constructor(
		public gs: GlobalService,
		private confirmDialog: ConfirmDialogService
	) { }

	ngOnInit(): void {
		this.notifications.subscribe(data => {
			//if(data === null) this.loadItems();
		});
		this.loadItems();
	}

	loadItems() {
		this.gs.store.dispatch(StoreAction.NotificationParams({ method: "GET", params: null, params2: { page: this.page }, key: 'setAll' }));
	}

	read(item: Notifications) {
		let params = { selection: [item?.message_id] };
		this.gs.store.dispatch(StoreAction.NotificationParams({ method: "POST", params: params, params2: { item_id: item?.message_id }, key: 'updateOne', item: Object.assign({}, item, { status: 'Read', seen: true }) }));
	}

	remove(item: Notifications) {
		this.confirmDialog.confirmThis("Are you sure, you want to delete this notification?", () => {
			let params = { selection: [item?.message_id] };
			this.gs.store.dispatch(StoreAction.NotificationParams({
				method: "DELETE",
				params: params,
				params2: { item_id: item?.message_id },
				key: 'removeOne',
				item: item
			}));
		}, () => {
			console.log('No clicked');
		});
	}

	handlePagination(event: any) {
		this.page = event;
		this.loadItems();
	}

	url(url: any) {
		let newUrl = url?.replace(environment.hostName, '');
		return newUrl;
	}

}
