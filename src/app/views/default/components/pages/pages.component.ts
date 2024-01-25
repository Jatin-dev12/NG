import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { ApiResponseData } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
    standalone: true,
    imports: [NgxSkeletonLoaderModule, AsyncPipe]
})
export class PagesComponent implements OnInit {
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.ItemLoadingKey[`${EnumRxKey.Item.view}Loading`]);
	itemObservable: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.ItemSelectors[EnumRxKey.Item.view]);
	item: any = null;
	showError: any = 'not found';
	slug: any = '';

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
		public translate: TranslocoService,
	) {
		this.slug = activeRoute.snapshot.params['slug'];
	}

	ngOnInit(): void {
		this.itemObservable.subscribe(data => this.item = data);
		this.onLoad(this.translate.getActiveLang);

		/*this.translate.langChanges$.subscribe(lang => {
            this.onLoad(lang);
        });*/
		
	}
	onLoad(lang: any) {
		this.activeRoute.paramMap.subscribe(data => {
			this.slug = data.get('slug');
			this.gs.store.dispatch(StoreAction.ItemParams({ method: "GET", params: null, params2: { slug: this.slug }, key: EnumRxKey.Item.view }));
		});
	}
}
