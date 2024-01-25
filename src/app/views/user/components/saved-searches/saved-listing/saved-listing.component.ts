import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';
import { SavedListingItemComponent } from '../saved-listing-item/saved-listing-item.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-saved-listing',
    templateUrl: './saved-listing.component.html',
    styleUrls: ['./saved-listing.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, FormsModule, NgxSkeletonLoaderModule, SavedListingItemComponent, PaginationComponent, AsyncPipe]
})
export class SavedListingComponent implements OnInit {

	catalog: Observable<any> = this.gs.store.select(StoreSelector.SearchSelectors[EnumRxKey.Search.listing]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.SearchLoading);
	page: number = 1;
	q: any = '';
	constructor(
		public gs: GlobalService,
	) { }

	ngOnInit() {
		this.onLoad();
	}

	onLoad(page = 0) {
		let params = { sort: '-id', q: this.q, page: page, size: 20 }
		let action = StoreAction.SearchParams({ method: 'GET', params: null, params2: params, key: EnumRxKey.Search.listing });
		this.gs.store.dispatch(action);
	}

	search() {
		this.onLoad();
	}

	handlePagination(event: any) {
		this.page = event;
		this.onLoad(event -1);
	}

}
