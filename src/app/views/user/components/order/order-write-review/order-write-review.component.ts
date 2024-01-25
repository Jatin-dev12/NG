import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { Order } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';

@Component({
	selector: 'app-order-write-review',
	templateUrl: './order-write-review.component.html',
	styleUrls: ['./order-write-review.component.scss']
})
export class OrderWriteReviewComponent implements OnInit {
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.OrderLoading);
	itemObservable: Observable<Order> = this.gs.store.select(StoreSelector.OrderSelectors[EnumRxKey.Order.view]);
	item: Order | null = null;
	order_id: any;
	form!: UntypedFormGroup;
	submitted = false;

	get f() { return this.form.controls; }

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
	) {
		this.order_id = this.activeRoute.snapshot.params['id'];
	}

	ngOnInit(): void {
		this.formValidation();
		this.onLoadOrder();
		//`/booking/view/${this.order_id}`
		this.itemObservable.subscribe(data => {
			this.item = new Order(data);
			this.form.patchValue({
				order_id: this.order_id,
				order_item_id: this.item?.orderItem?.id,
				catalog_id: this.item?.orderItem?.catalog_id,
				review_to: this.item?.provider_id,
				review_by: this.gs.identity?.id
			})
			if(this.item.status === Enums.USER_CATALOG_ORDERS_STATUS_COMPLETE) {
				
			}
		});
	}

	onLoadOrder() {
		let params = { order_id: this.order_id }
		let action = StoreAction.OrderParams({ method: 'GET', params: null, params2: params, key: EnumRxKey.Order.view });
		this.gs.store.dispatch(action);
	}

	formValidation() {
		this.form = this.gs.formBuilder.group({
			order_id: new UntypedFormControl(this.order_id),
			order_item_id: new UntypedFormControl(this.item?.orderItem?.id),
			catalog_id: new UntypedFormControl(this.item?.orderItem?.catalog_id),
			review_to: new UntypedFormControl(this.item?.provider_id),
			review_by: new UntypedFormControl(this.gs.identity?.id),
			rating: new UntypedFormControl('', [Validators.required]),
			text: new UntypedFormControl('', [Validators.required]),
			title: new UntypedFormControl('Rate Review', [Validators.required]),
		}); // Form validation
	}

	onSubmit(form: any) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		const params: any = { UserReviewForm: form.value };
		const params2 = { key: EnumRxKey.Order.reviews };
		this.gs.store.dispatch(StoreAction.OrderParams({ method: "POST", params: params, params2: params2, key: `send-${EnumRxKey.Order.reviews}`, url: `/booking/view/${this.order_id}` }));
	}

	ngOnDestroy() {
		this.gs.store.dispatch(StoreAction.OrderList({ data: null, key: EnumRxKey.Order.view}));
	}

}
