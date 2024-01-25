import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { ApiResponseData, Order } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';

@Component({
	selector: 'app-milestones-listing',
	templateUrl: './milestones-listing.component.html',
	styleUrls: ['./milestones-listing.component.scss']
})
export class MilestonesListingComponent implements OnInit {
	@Input() order!: Order | null;
	@Input() order_id: any = '';

	loading: Observable<boolean> = this.gs.store.select(StoreSelector.OrderLoadingKey[`${EnumRxKey.Order.milestone}Loading`]);
	milestones: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.OrderSelectors[EnumRxKey.Order.milestone]);
	

	constructor(
		public gs: GlobalService,
	) { }

	ngOnInit(): void {
		let params2 = { order_id: this.order_id, key: EnumRxKey.Order.milestone };
		this.gs.store.dispatch(StoreAction.OrderParams({ method: "GET", params: null, params2: params2, key: EnumRxKey.Order.milestone }));
	}

}
