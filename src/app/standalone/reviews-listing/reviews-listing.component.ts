import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { Catalog, ApiResponseData } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
	selector: 'app-reviews-listing',
	standalone: true,
	imports: [CommonModule, SharedModule],
	templateUrl: './reviews-listing.component.html',
	styleUrls: ['./reviews-listing.component.scss']
})
export class ReviewsListingComponent implements OnInit {

	@Input() item: Catalog | null = null;
	@Input() catalog_id: any = '';
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogLoadingKey[`${EnumRxKey.Catalog.reviews}Loading`]);
	moreLoading: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogMoreLoading);
	reviews: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.reviews]);
	page: number = 1;
	constructor(
		public gs: GlobalService
	) { }

	ngOnInit(): void {
		this.onLoad();
	}

	onLoad() {
		let params2 = { catalog_id: this.catalog_id, key: EnumRxKey.Catalog.reviews, page: this.page };
		this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: params2, key: EnumRxKey.Catalog.reviews }));
	}

	handlePagination(event: any) {
		this.page = event;
		this.onLoad();
	}

	handleLoadMore() {
		this.page = this.page + 1
		let params2 = { catalog_id: this.catalog_id, key: EnumRxKey.Catalog.reviews, page: this.page };
		this.gs.store.dispatch(StoreAction.CatalogMoreParams({ method: "GET", params: null, params2: params2, key: `more-${EnumRxKey.Catalog.reviews}` }));
	}

	handleRating(event: any) {
		const { value } = event.target;
		this.page = 1;
		let params2 = { catalog_id: this.catalog_id, key: EnumRxKey.Catalog.reviews, page: this.page };
		this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: params2, key: EnumRxKey.Catalog.reviews }));
	}

}
