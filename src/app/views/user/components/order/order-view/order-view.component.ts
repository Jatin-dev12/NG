import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { Order } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';

@Component({
	selector: 'app-order-view',
	templateUrl: './order-view.component.html',
	styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {
	MEETING_ACTIVE = 1;
	MEETING_START = 2;
	MEETING_STOP = 3;
	OrderRxKey = EnumRxKey.Order;
	role = Enums.Role;
	itemObservable: Observable<Order> = this.gs.store.select(StoreSelector.OrderSelectors[EnumRxKey.Order.view]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.OrderLoadingKey[`${EnumRxKey.Order.view}Loading`]);
	order_id : any = null;
	item: Order | null = null;

	constructor(
		public gs: GlobalService,
		private route: ActivatedRoute,
		private modalService: NgbModal,
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

	addAdditionalPayment() {
		
	}


	sendMessage() {
		
	}

	ngOnDestroy() {
		this.gs.store.dispatch(StoreAction.OrderList({ data: null, key: EnumRxKey.Order.view}));
	}

}
