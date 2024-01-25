import { Component } from '@angular/core';
import { EnumRxKey } from 'src/app/enums';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { Observable } from 'rxjs';
import { ApiResponseData } from 'src/app/models';
import { StoreSelector } from 'src/app/store/selector';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PaginationComponent } from 'src/app/shared';
import { AsyncPipe } from '@angular/common';
import { CatalogItemComponent } from 'src/app/standalone';
import { RouterLink } from '@angular/router';
import { ConfirmDialogService } from 'src/app/modules';

@Component({
    selector: 'app-favorites-property',
    templateUrl: './favorites-property.component.html',
    styleUrls: ['./favorites-property.component.scss'],
    standalone: true,
    imports: [NgxSkeletonLoaderModule, PaginationComponent, AsyncPipe, CatalogItemComponent, RouterLink]
})
export class FavoritesPropertyComponent {
	EnumRxKey = EnumRxKey;
	catalogs: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.wishlist]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogLoadingKey[`${EnumRxKey.Catalog.wishlist}Loading`]);
	params: any = { page: 0, size: 20, key: EnumRxKey.Catalog.wishlist };

	constructor(
		public gs: GlobalService,
		private itemService: ItemService,
		private confirmDialog: ConfirmDialogService,
	) { }

	ngOnInit(): void {
		this.onLoad();
	}

	onLoad() {
		let action = StoreAction.CatalogParams({ method: "GET", params: null, params2: this.params, key: EnumRxKey.Catalog.wishlist });
		this.gs.store.dispatch(action);
	}

	handlePagination(event: any) {
		this.params = Object.assign({}, this.params, { page: event - 1 });
		this.onLoad();
	}


	sort(sort: string) {
		this.params = Object.assign({}, this.params, { sort: sort, page: 0 });
		this.onLoad();
	}

	handleWishlist(item: any) {
		this.confirmDialog.confirm({
			header: 'Delete Favorite',
			icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
			message: this.gs.translate('Are you sure you want to remove the property from favorites?'),
			rejectVisible: true,
			acceptLabel: 'Yes'
		}, () => {
			this.itemService.catalog("DELETE", null, { user_id: item?.user_id, catalog_id: item.catalog_id, key: EnumRxKey.Catalog.wishlist }).subscribe(response => {
				this.gs.alert(`You have successfully removed the property to favorite`, 'danger');
				this.gs.store.dispatch(StoreAction.CatalogDelete({ item: item, key: EnumRxKey.Catalog.wishlist }));
	
			}, (error: Response) => {
				
			})
		}, () => { console.log('No clicked'); });
	}


}
