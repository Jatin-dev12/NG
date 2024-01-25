import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AdditionalEnums, EnumRxKey, Enums } from 'src/app/enums';
import { ActionsHelper } from 'src/app/helpers/actions.helper';
import { Catalog, CatalogPrices, Photo, Wishlist } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { ReadMoreComponent } from 'src/app/shared';

@Component({
	selector: 'app-catalog-item, [app-catalog-item]',
	standalone: true,
	imports: [CommonModule, RouterLink, CarouselModule, ReadMoreComponent],
	templateUrl: './catalog-item.component.html',
	styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit {
	@Input() layout: "grid" | "inline" | "grid-inline" | "my-list" | "search" = 'grid';
	@Input() item!: Catalog;
	@Input() wishlist!: Wishlist;
	@Input() url: string = '';
	@Input() key: string = '';
	@Input() Type_Slug: string = '';
	showActionButton: boolean = false;
	CatalogRxKey = EnumRxKey.Catalog;
	getPrice: any = 0;
	AdditionalEnums = AdditionalEnums;
	Enums = Enums;

	images: Photo[] = [];

	sliderimages: OwlOptions = {
		items: 1,
		loop: true,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		dots: true,
		navSpeed: Math.floor(Math.random() * (4500 - 500 + 1) + 500),
		margin: 0,
		autoplay: false,
		smartSpeed: Math.floor(Math.random() * (6500 - 1200 + 1) + 1200),
		//navText: ['next', 'Pre'],
		nav: true
	}
	
	constructor(
		public gs: GlobalService,
		private confirmDialog: ConfirmDialogService,
		public actionHelper: ActionsHelper,
	) { }

	ngOnInit(): void {
		(this.url === '/properties/view') && (this.showActionButton = true);
		this.item = new Catalog(this.item);
		let imageArray = this.gs.margeMedia(this.item?.media)?.image;
		let coverImg = this.item?.cover;
		//console.log('imageArray', imageArray, coverImg);
		if(coverImg) {
			this.images.push(coverImg)
		}
		if(imageArray) {
			imageArray?.forEach((el: any) => {
				this.images.push(el)
			});
		}
		//this.getPrice = this.item.userCatalogPrices[0]?.price;
	}

	remove() {
		this.confirmDialog.confirmThis("Are you sure to delete?", () => {
			this.gs.store.dispatch(StoreAction.CatalogParams({ method: "DELETE", params: null, params2: { item_id: this.item?.id }, key: `delete-${this.key}`, url: null, msg: "You have successfully deleted the property." }))
		}, () => {
			console.log('No clicked');
		});
	}

	get Status() {
		let text = '';
		let cls = '';
		switch (this.item.status) {
			case Enums.USER_CATALOG_STATUS_ACTIVE:
				text = 'Approved';
				cls = 'primary';
				break;
			case Enums.USER_CATALOG_STATUS_DEACTIVE:
				text = 'Rejected';
				cls = 'danger';
				break;
			default:
				text = 'Pending';
				cls = 'default';
				break;
		}
		return { text: text, cls: cls };
	}

	setPrice(item: CatalogPrices) {
		this.getPrice = item.price ?? 0;
	}

	get getFrequency() {
		let text = '';
		return text;
	}

	

}
