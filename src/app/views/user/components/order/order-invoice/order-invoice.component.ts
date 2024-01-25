import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { Order } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';

@Component({
	selector: 'app-order-invoice',
	templateUrl: './order-invoice.component.html',
	styleUrls: ['./order-invoice.component.scss']
})
export class OrderInvoiceComponent implements OnInit {
	OrderRxKey = EnumRxKey.Order;
	itemObservable: Observable<Order> = this.gs.store.select(StoreSelector.OrderSelectors.view);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.OrderLoading);
	order_id : any = null;
	item: Order | null = null;

	constructor(
		public gs: GlobalService,
		private route: ActivatedRoute,
	) {
		this.order_id = route.snapshot.params['id'];
	}

	ngOnInit(): void {
		this.onLoadOrder();
		this.itemObservable.subscribe(data => this.item = new Order(data));
	}

	onLoadOrder() {
		let params = { order_id: this.order_id }
		let action = StoreAction.OrderParams({ method: 'GET', params: null, params2: params, key: EnumRxKey.Order.view });
		this.gs.store.dispatch(action);
	}

}
