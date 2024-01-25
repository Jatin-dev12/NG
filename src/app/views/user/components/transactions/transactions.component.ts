import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss'],
    standalone: true,
    imports: [
        NgxSkeletonLoaderModule,
        PaginationComponent,
        AsyncPipe,
        CurrencyPipe,
        DatePipe,
    ],
})
export class TransactionsComponent implements OnInit {
	transactions: Observable<any> = this.gs.store.select(StoreSelector.UserSelectors[EnumRxKey.User.transaction]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.UserLoading);
	page: number = 1;

	constructor(public gs: GlobalService) { }

	ngOnInit() {
		this.onLoadTransition();
	}

	onLoadTransition() {
		let params = { page: this.page, 'per-page': 20, key: EnumRxKey.User.transaction }
		let action = StoreAction.UserParams({ method: 'GET', params: null, params2: params, key: EnumRxKey.User.transaction });
		this.gs.store.dispatch(action);
	}

	handlePagination(event: any) {
		this.page = event;
		this.onLoadTransition();
	}

}
