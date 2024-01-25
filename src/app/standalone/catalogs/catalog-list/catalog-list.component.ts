import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdditionalEnums, EnumRxKey, Enums } from 'src/app/enums';
import { ApiResponseData } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { CatalogItemComponent } from '../catalog-item/catalog-item.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
	selector: 'app-catalog-list',
	standalone: true,
	imports: [CommonModule, SharedModule, CatalogItemComponent, CarouselModule],
	templateUrl: './catalog-list.component.html',
	styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {
	@Input() layout: "grid" | "inline" | "grid-inline" | "my-list" | "search" = 'grid';
	@Input() url: string = '';
	@Input() key: string = '';
	@Input() params: any = '';
	@Input() Type_Slug: any = '';
	@Input() loadMore: boolean = false;
	@Input() pagination: boolean = true;
	@Input() action: boolean = true;

	CatalogRxKey = EnumRxKey.Catalog;
	catalog!: Observable<ApiResponseData>;
	loading!: Observable<boolean>;
	moreLoading: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogMoreLoading);
	current_id: any = '';
	AdditionalEnums = AdditionalEnums;
	page: any = 1;

	constructor(
		public gs: GlobalService,
		private scroller: ViewportScroller,
	) {
		this.params = Object.assign({}, this.params, { page: 0, size: 12, user_id: this.gs.identity?.id });
	}

	ngOnInit(): void {
		this.params = Object.assign({}, this.params, { key: this.key });
		let selector: any = StoreSelector.CatalogSelectors;
		Object.keys(selector).map((key) => {
			(this.key == key) && (this.catalog = this.gs.store.select(selector[key]));
			(this.key == key) && (this.loading = this.gs.store.select(StoreSelector.CatalogLoadingKey[`${key}Loading`]));
		});
		//this.onLoadProduct();
		this.catalog.subscribe(data => {
			if (this.action && data === null) this.onLoadProduct();
		});

		this.gs.trrigerAction$.subscribe(data => {
			//console.log('data', data);
			if(data.key === 'property-map') {
				this.current_id = data.id;
				let activeId = `target_${data.id}`;
			}
		})
	}

	onLoadProduct() {
		//this.params = Object.assign({}, this.params, { page: 1 });
		let action = StoreAction.CatalogParams({ method: 'GET', params: null, params2: this.params, key: this.key });
		this.gs.store.dispatch(action);
	}

	handlePagination(event: any) {
		console.log('event', event);
		this.page = event;
		this.params = Object.assign({}, this.params, { page: event - 1 });
		this.onLoadProduct();
	}

	handleLoadMore() {
		this.params = Object.assign({}, this.params, { page: this.params.page + 1, });
		let action = StoreAction.CatalogMoreParams({ method: "GET", params: null, params2: this.params, key: this.key });
		this.gs.store.dispatch(action);
	}

	scroll() {
		this.scroller.scrollToAnchor("target_10");
	}

}
