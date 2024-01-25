import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { chunkArray, categoryListToTree } from 'src/app/helpers';
import { Catalog, ApiResponseData } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
	selector: 'app-catalog-other',
	standalone: true,
	imports: [CommonModule, SharedModule, CarouselModule],
	templateUrl: './catalog-other.component.html',
	styleUrls: ['./catalog-other.component.scss']
})
export class CatalogOtherComponent implements OnInit {

	@Input() item!: Catalog | any;
	@Input() is_public: boolean = true;
	catalog: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.sameUser]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogLoadingKey[`${EnumRxKey.Catalog.sameUser}Loading`]);
	catalogArray: any[] = [];
	CatalogRxKey = EnumRxKey.Catalog;

	othercourses: OwlOptions = {
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
				items: 1
			},
			940: {
				items: 1
			}
		},
		nav: true
	}

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
				if (items) {
					let itemsList = { ...items };
					let catalogArray = items.filter((vl: any) => vl.id !== +id);
					this.catalogArray = chunkArray(catalogArray, 3);
				}
				//console.log('items', this.catalogArray);
			});
		});

	}

	onLoadProduct() {
		let params2 = { page: 1, 'per-page': 20, key: EnumRxKey.Catalog.search }
		let action = StoreAction.CatalogParams({ method: 'GET', params: null, params2: params2, key: EnumRxKey.Catalog.sameUser });
		this.gs.store.dispatch(action);
	}

	getLength(item: Catalog) {
		let course = categoryListToTree(item?.userCatalogTopics ?? []);
		return course.length ?? 0;
	}

}
