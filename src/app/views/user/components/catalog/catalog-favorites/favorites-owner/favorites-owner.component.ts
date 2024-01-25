import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { ApiResponseData } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { PaginationComponent } from '../../../../../../shared/components/pagination/pagination.component';
import { FavoritesItemComponent } from '../favorites-item/favorites-item.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
    selector: 'app-favorites-owner',
    templateUrl: './favorites-owner.component.html',
    styleUrls: ['./favorites-owner.component.scss'],
    standalone: true,
    imports: [NgxSkeletonLoaderModule, FavoritesItemComponent, PaginationComponent, AsyncPipe]
})
export class FavoritesOwnerComponent {
	users: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.UserSelectors[EnumRxKey.User.favorite]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.UserLoadingKey[`${EnumRxKey.User.favorite}Loading`]);
	@Input() params: any = { key: EnumRxKey.User.favorite, roles: Enums.Role.ROLE_OWNER, sort: 'id', page: 0, size: 20 };

	constructor(
		public gs: GlobalService,
	) { }

	ngOnInit(): void {
		this.onLoad();
	}

	onLoad() {
		let action = StoreAction.UserParams({ method: "GET", params: null, params2: this.params, key: EnumRxKey.User.favorite });
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
}
