import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService, ItemService } from 'src/app/services';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { ApiResponseData } from 'src/app/models';
import { StoreSelector } from 'src/app/store/selector';
import { TranslocoService } from '@ngneat/transloco';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
    selector: 'app-terms-condition-dialog',
    templateUrl: './terms-condition-dialog.component.html',
    styleUrls: ['./terms-condition-dialog.component.scss'],
    standalone: true,
    imports: [NgxSkeletonLoaderModule]
})
export class TermsConditionDialogComponent implements OnInit {
	itemObservable: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.ItemSelectors[EnumRxKey.Item.pages]);
  	item: any = null;
	loading: boolean = false;
	showError: any = 'not found';

	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private itemService: ItemService,
		public translate: TranslocoService,
	) { }

	ngOnInit(): void {
		this.onLoad();
		/*this.itemObservable.subscribe(data => {
			//this.item = data;
			let items = data?.items
			if(data === null) {
				this.gs.store.dispatch(StoreAction.ItemParams({ method: "GET", params: null, params2: null, key: EnumRxKey.Item.pages }));
			}
			if(items) {
				//this.item = items?.find((val: any) => val?.slug === 'terms-condition');
			}
		}); */
	}

	onLoad(slug = 'terms-condition', item_id = 20) {
		this.loading = true;
		this.itemService.item("GET", null, { slug: slug, lang: this.translate.getActiveLang }).subscribe(response => {
			this.loading = false;
			let data = response.data;
			if (data) {
				//this.item = data;
				this.item = data?.items?.find((val: any) => val?.slug === 'terms-condition');
				this.showError = 'not found';
			} else {
				this.gs.alert('This page not available', 'danger');
				this.showError = null;
			}
			//console.log('data', data);
		}, (error: Response) => {
			this.loading = false;
		})
	}

}
