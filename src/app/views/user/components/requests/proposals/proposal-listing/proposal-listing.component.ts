import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { ApiResponseData } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { ProposalListingItemComponent } from '../proposal-listing-item/proposal-listing-item.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from 'src/app/shared';

@Component({
    selector: 'app-proposal-listing',
    templateUrl: './proposal-listing.component.html',
    styleUrls: ['./proposal-listing.component.scss'],
    standalone: true,
    imports: [RouterLink, NgxSkeletonLoaderModule, ProposalListingItemComponent, PaginationComponent, AsyncPipe, ReactiveFormsModule, FormsModule]
})
export class ProposalListingComponent {
	catalogs: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.ContactSelectors[EnumRxKey.Contact.listing]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.ContactLoadingKey[`${EnumRxKey.Contact.listing}Loading`]);
	title: any = 'Pending Requests';
	parent_title: any = 'Request received for proposals';
	params: any = { q: '', sort: '-id', page: 0, size: 8 };
	q: any = '';
	url: any = '';
	page = 1;

	Enums = Enums;

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.activeRoute.title.subscribe(data => this.title = data);
		let routeConfig: any = this.activeRoute.snapshot.routeConfig?.data;
		//let key = (routeConfig['relation'] == AdditionalEnums.USER_CATALOG_ROLE_MANAGER) ? EnumRxKey.Contact.listing : EnumRxKey.Contact.listing;
		this.url = routeConfig['url'];
		this.parent_title = routeConfig['parent_title'];
		if(routeConfig['url'] === 'pending-requests' || routeConfig['url'] === 'requests-history') {
			this.params = Object.assign({}, this.params, { contact_id: this.gs.identity?.id });
		} else {
			this.params = Object.assign({}, this.params, { user_id: this.gs.identity?.id });
		}
		this.params = Object.assign({}, this.params, { relation: routeConfig['relation'], status: routeConfig['status'] });
		if(this.gs.is_manager) {
			this.params = Object.assign({}, this.params, { contact_id: this.gs.identity?.id });
		}
		this.onLoad();
	}

	onLoad() {
		let action = StoreAction.ContactParams({ method: 'GET', params: null, params2: this.params, key: EnumRxKey.Contact.listing });
		this.gs.store.dispatch(action);
	}

	search() {
		if(this.gs.identity?.role === Enums.ROLE_OWNER) {
			this.params = Object.assign({}, this.params, { type: 'contact', q: this.q, page: 0 });
		}
		if(this.gs.identity?.role === Enums.ROLE_MANAGERS) {
			this.params = Object.assign({}, this.params, { type: 'user', q: this.q, page: 0 });
		}
		this.onLoad();
	}

	clear() {
		this.q = '';
		this.params = Object.assign({}, this.params, { q: this.q, page: 0 });
		this.onLoad();
	}

	handlePagination(event: any) {
		this.page = event;
		this.params = Object.assign({}, this.params, { page: event - 1 });
		this.onLoad();
	}

}
