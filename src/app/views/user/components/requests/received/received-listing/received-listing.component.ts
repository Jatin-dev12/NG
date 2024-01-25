import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { ApiResponseData } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { ReceivedListingItemComponent } from '../received-listing-item/received-listing-item.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginationComponent } from 'src/app/shared';

@Component({
    selector: 'app-received-listing',
    templateUrl: './received-listing.component.html',
    styleUrls: ['./received-listing.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, FormsModule, NgxSkeletonLoaderModule, ReceivedListingItemComponent, PaginationComponent, AsyncPipe]
})
export class ReceivedListingComponent {
	catalogs: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.RequestSelectors[EnumRxKey.Request.listing]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.RequestLoadingKey[`${EnumRxKey.Request.listing}Loading`]);
	params: any = { q: '', sort: '-id', catalog_id: '', id: '', is_assign: '', relation: '', key: EnumRxKey.Request.received, page: 0, size: 20 }; //  type: 'issue'
	q: any = '';
	catalog_id: any = '';
	id: any = '';
	url: any = '';

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
	) { }

	ngOnInit(): void {
		let routeConfig: any = this.activeRoute.snapshot.routeConfig?.data;
		this.url = `/requests/received/${routeConfig['relation']}/view/`;   // /requests/received/vendor/view/:id
		this.params = Object.assign({}, this.params, { status: routeConfig['status'], relation: routeConfig['relation'] });
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
