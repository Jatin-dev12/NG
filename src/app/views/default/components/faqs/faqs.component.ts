import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { ApiResponseData } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { SearchPipe } from '../../../../shared/pipe/search-pipe';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
    selector: 'app-faqs',
    templateUrl: './faqs.component.html',
    styleUrls: ['./faqs.component.scss'],
    standalone: true,
    imports: [NgxSkeletonLoaderModule, RouterLink, AsyncPipe, SearchPipe]
})
export class FaqsComponent implements OnInit {
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.ItemLoadingKey[`${EnumRxKey.Item.faqs}Loading`]);
	faqsObservable: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.ItemSelectors[EnumRxKey.Item.faqs]);
	clientArray: any = [];
	hostArray: any = [];
	search: string = '';
	constructor(
		public gs: GlobalService,
	) {

	}

	ngOnInit(): void {
		this.faqsObservable.subscribe(data => {
			let action = StoreAction.ItemParams({ method: "GET", params: null, params2: { size: 500, moduleId: 'faqs' }, key: EnumRxKey.Item.faqs });
			if(data === null) this.gs.store.dispatch(action);
			let items = data?.items;
			if(items) {
				// this.clientArray = items.filter((val: any) => val.category_id === 15);	
				// this.hostArray = items.filter((val: any) => val.category_id === 16);
				this.clientArray = items;	
				this.hostArray = items;
			}
		});
	}

}
