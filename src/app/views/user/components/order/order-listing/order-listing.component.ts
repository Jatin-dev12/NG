import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnumRxKey, Enums } from 'src/app/enums';
import { GlobalService } from 'src/app/services';

@Component({
	selector: 'app-order-listing',
	templateUrl: './order-listing.component.html',
	styleUrls: ['./order-listing.component.scss']
})
export class OrderListingComponent implements OnInit {
	OrderRxKey = EnumRxKey.Order;
	routeKey: string = '';
	key2: string = '';
	url: string = '';
	is_assign: number = 0;
	layout: any = 'grid';
	pageTitle: string = 'Booking listing';

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
	) {
		this.routeKey = activeRoute.snapshot.data.key;
		this.key2 = activeRoute.snapshot.data.key2;
		this.is_assign = activeRoute.snapshot.data.is_assign;
		this.url = `/${activeRoute.snapshot.data.url}/view/`;
		this.layout = activeRoute.snapshot.data.layout;
		this.pageTitle = activeRoute.snapshot.data.pageTitle;
	}

	ngOnInit(): void {
		//this.layout = (this.gs.identity.role === Role.ROLE_USER) ? 'grid' : 'inline';
	}

}
