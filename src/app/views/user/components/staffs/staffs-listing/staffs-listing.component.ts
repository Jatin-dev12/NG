import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { ApiResponseData } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';
import { StaffsListingItemComponent } from '../staffs-listing-item/staffs-listing-item.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
    selector: 'app-staffs-listing',
    templateUrl: './staffs-listing.component.html',
    styleUrls: ['./staffs-listing.component.scss'],
    standalone: true,
    imports: [RouterLink, NgxSkeletonLoaderModule, StaffsListingItemComponent, PaginationComponent, AsyncPipe]
})
export class StaffsListingComponent {

	catalogs: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.StaffSelectors[EnumRxKey.Staff.listing]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.StaffLoadingKey[`${EnumRxKey.Staff.listing}Loading`]);
	params: any = { q: '', sort: '-id', page: 1, 'per-page': 20 };

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
	) { }

	ngOnInit(): void {
		//let routeConfig: any = this.activeRoute.snapshot.routeConfig?.data;
		//this.params = Object.assign({}, this.params, { status: routeConfig['status'] });
		this.onLoad();
	}

	onLoad() {
		let action = StoreAction.StaffParams({ method: 'GET', params: null, params2: this.params, key: EnumRxKey.Staff.listing });
		this.gs.store.dispatch(action);
	}

	handlePagination(event: any) {
		this.params = Object.assign({}, this.params, { page: event });
		this.onLoad();
	}
}
