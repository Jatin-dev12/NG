import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { Catalog, ApiResponseData } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { SharedModule } from 'src/app/shared/shared.module';
import { CatalogItemComponent } from '../catalog-item/catalog-item.component';

@Component({
  selector: 'app-catalog-related',
  standalone: true,
  imports: [CommonModule, SharedModule, CarouselModule, CatalogItemComponent],
  templateUrl: './catalog-related.component.html',
  styleUrls: ['./catalog-related.component.scss']
})
export class CatalogRelatedComponent implements OnInit {

  @Input() item: Catalog | null = null;
	catalog: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.related]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogLoadingKey[`${EnumRxKey.Catalog.related}Loading`]);
	catalogArray: any[] = [];
	CatalogRxKey = EnumRxKey.Catalog;
	item_id: any = null;
	constructor(
		public gs: GlobalService,
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(data => {
			let id: any = data.get('id');
			this.catalog.subscribe(data => {
				if (data === null) this.onLoadProduct();
				let items = data?.items;
				if(items) {
					this.catalogArray = items.filter((vl: any) => vl.id !== +id);
				}
				//console.log('items', this.catalogArray);
			});
		})
		
		//this.onLoadProduct();
	}

	onLoadProduct() {
		let params2 = { category_id: this.item?.category_id, page: 1, 'per-page': 12 }
		let action = StoreAction.CatalogParams({ method: 'GET', params: null, params2: params2, key: EnumRxKey.Catalog.related });
		this.gs.store.dispatch(action);
	}

	similarcourses: OwlOptions = {
		loop: false,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: false,
		dots: false,
		navSpeed: 700,
		margin: 30,
		autoplay: false,
		smartSpeed: 1200,
		navText: ['', ''],
		responsive: {
			0: {
				items: 1
			},
			400: {
				items: 1
			},
			740: {
				items: 2
			},
			940: {
				items: 3
			}
		},
		nav: true
	}

}
