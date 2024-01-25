import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { ApiResponseData } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { FavoritesPropertyComponent } from './favorites-property/favorites-property.component';
import { FavoritesTanentComponent } from './favorites-tanent/favorites-tanent.component';
import { FavoritesVendorComponent } from './favorites-vendor/favorites-vendor.component';
import { FavoritesOwnerComponent } from './favorites-owner/favorites-owner.component';
import { FavoritesManagerComponent } from './favorites-manager/favorites-manager.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-catalog-favorites',
    templateUrl: './catalog-favorites.component.html',
    styleUrls: ['./catalog-favorites.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, RouterLinkActive, FavoritesManagerComponent, FavoritesOwnerComponent, FavoritesVendorComponent, FavoritesTanentComponent, FavoritesPropertyComponent, AsyncPipe]
})
export class CatalogFavoritesComponent implements OnInit {
	users: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.UserSelectors[EnumRxKey.User.favorite]);
	catalog: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.wishlist]);
	Enums = Enums;
	CatalogRxKey = EnumRxKey.Catalog;
	key: any = 'managers';
	params: any = { page: 1, 'per-page': 12, key: EnumRxKey.Catalog.wishlist };

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
		public router: Router
	) { }

	ngOnInit(): void {
		//this.onLoadProduct();
		let routeConfig: any = this.activeRoute.snapshot.routeConfig;
		this.key = routeConfig?.data?.key;
		/*switch (this.gs.identity?.role) {
			case Enums.ROLE_OWNER:
				this.gs.router('/favorites/managers');
				break;
			case Enums.ROLE_MANAGERS:
				this.gs.router('/favorites/owners');
				break;
			case Enums.ROLE_VENDORS:
				this.gs.router('/favorites/owners');				
				break;
			case Enums.ROLE_USER:
				this.gs.router('/favorites/owners');
				break;
			case Enums.ROLE_GUEST:
				this.gs.router('/favorites/owners');
				break;
			default:
				break;
		}*/
		//console.log('data', this.key);
	}

	onLoadProduct() {
		let data = this.activeRoute.snapshot.data;
		let action = StoreAction.CatalogParams({ method: 'GET', params: null, params2: this.params, key: EnumRxKey.Catalog.wishlist });
		this.gs.store.dispatch(action);
	}

}
