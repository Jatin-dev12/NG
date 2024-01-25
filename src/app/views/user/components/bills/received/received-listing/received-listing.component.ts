import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { ApiResponseData } from 'src/app/models';
import { GlobalService } from 'src/app/services/global.service';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { PaginationComponent } from '../../../../../../shared/components/pagination/pagination.component';
import { IssuedListingItemComponent } from '../../issued/issued-listing-item/issued-listing-item.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-received-listing',
    templateUrl: './received-listing.component.html',
    styleUrls: ['./received-listing.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, RouterLink, NgxSkeletonLoaderModule, IssuedListingItemComponent, PaginationComponent, AsyncPipe]
})
export class ReceivedListingComponent {
	catalogs: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.RequestSelectors[EnumRxKey.Request.listing]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.RequestLoadingKey[`${EnumRxKey.Request.listing}Loading`]);
	params: any = { q: '', sort: '-id', catalog_id: '', id: '', receiver_id: '', type: 'bill', page: 1, 'per-page': 20 };
	q: any = '';
	catalog_id: any = '';
	receiver_id: any = '';
	id: any = '';
	title: any = 'Pending Bills';
	url: any = '';

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
	) { }

	ngOnInit(): void {
		let routeConfig: any = this.activeRoute.snapshot.routeConfig?.data;
		this.title = this.activeRoute.snapshot.title;
		this.url = `/bills/received/${routeConfig['relation']}/view/`;   // /bills/received/vendor/view/:id
		this.params = Object.assign({}, this.params, { status: routeConfig['status'] });
		this.onLoad();
	}

	onLoad() {
		let action = StoreAction.RequestParams({ method: 'GET', params: null, params2: this.params, key: EnumRxKey.Request.listing });
		this.gs.store.dispatch(action);
	}

	search() {
		this.params = Object.assign({}, this.params, { q: this.q, page: 1 });
		this.onLoad();
	}

	onEnterRequest() {
		this.params = Object.assign({}, this.params, { id: this.id, page: 1 });
		this.onLoad();
	}

	onEnterCatalog() {
		this.params = Object.assign({}, this.params, { catalog_id: this.catalog_id, page: 1 });
		this.onLoad();
	}

	onEnterReceiver() {
		this.params = Object.assign({}, this.params, { receiver_id: this.receiver_id, page: 1 });
		this.onLoad();
	}

	handleStatus(event: any) {
		const { value } = event.target;
		this.params = Object.assign({}, this.params, { is_assign: value, page: 1 });
		this.onLoad();
	}

	handlePagination(event: any) {
		this.params = Object.assign({}, this.params, { page: event });
		this.onLoad();
	}
}
