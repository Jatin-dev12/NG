import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { Order, User } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreSelector } from 'src/app/store/selector';

@Component({
	selector: 'app-order-layout',
	templateUrl: './order-layout.component.html',
	styleUrls: ['./order-layout.component.scss']
})
export class OrderLayoutComponent implements OnInit {
	Role = Enums.Role;
	userObservable: Observable<User> = this.gs.store.select(state => state.auth.user);
	itemObservable: Observable<Order> = this.gs.store.select(StoreSelector.OrderSelectors[EnumRxKey.Order.view]);
	my_booking: boolean = false;
	past_booking: boolean = false;
	cancelled_booking: boolean = false;
	disputed_booking: boolean = false;
	completed_booking: boolean = false;
	pending_booking: boolean = false;
	declined_booking: boolean = false;

	constructor(
		public gs: GlobalService
	) { }

	ngOnInit(): void {
		this.itemObservable.subscribe(data => {
			this.my_booking = false;
			this.past_booking = false;
			this.cancelled_booking = false;
			this.disputed_booking = false;
			this.completed_booking = false;
			this.pending_booking = false;
			this.declined_booking = false;
			if(data) {
				//console.log('time', Math.floor(Date.now() / 1000));
				let curent_time = Math.floor(Date.now() / 1000);
				this.my_booking = (data.status === Enums.USER_CATALOG_ORDERS_STATUS_ACCEPTED && data.end_time > curent_time) ? true : false;
				this.past_booking = (data.status !== Enums.USER_CATALOG_ORDERS_STATUS_PENDING && data.status !== Enums.USER_CATALOG_ORDERS_STATUS_DISPUTE && data.status !== Enums.USER_CATALOG_ORDERS_STATUS_CANCELLED && data.status !== Enums.USER_CATALOG_ORDERS_STATUS_DECLINED && data.end_time < curent_time) ? true : false;
				this.cancelled_booking = (data.status === Enums.USER_CATALOG_ORDERS_STATUS_CANCELLED) ? true : false;
				this.disputed_booking = (data.status === Enums.USER_CATALOG_ORDERS_STATUS_DISPUTE) ? true : false;
				this.completed_booking = (data.status === Enums.USER_CATALOG_ORDERS_STATUS_COMPLETE) ? true : false;
				this.pending_booking = (data.status === Enums.USER_CATALOG_ORDERS_STATUS_PENDING) ? true : false;
				this.declined_booking = (data.status === Enums.USER_CATALOG_ORDERS_STATUS_DECLINED) ? true : false;
			}
		});
	}

}
