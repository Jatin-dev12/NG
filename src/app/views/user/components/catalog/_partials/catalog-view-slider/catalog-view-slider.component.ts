import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Image, LineLayout, ModalGalleryRef, ModalGalleryService, PlainGalleryConfig, PlainGalleryStrategy, PlainLibConfig, CarouselLibConfig, GalleryModule } from '@ks89/angular-modal-gallery';
import { Catalog } from 'src/app/models';
import { GlobalService } from 'src/app/services';

@Component({
    selector: 'app-catalog-view-slider',
    templateUrl: './catalog-view-slider.component.html',
    styleUrls: ['./catalog-view-slider.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [GalleryModule]
})
export class CatalogViewSliderComponent implements OnInit {
	@Input() item: Catalog | any = null;
	@Input() type: any = 'carousel';
	images: Image[] = [];
	plainGalleryRow: PlainGalleryConfig = {
		strategy: PlainGalleryStrategy.ROW,
		layout: new LineLayout({ width: '80px', height: '80px' }, { length: 2, wrap: true }, 'flex-start')
	};
	libConfigPlainGalleryRow: PlainLibConfig = {
		plainGalleryConfig: this.plainGalleryRow
	};
	libConfig: CarouselLibConfig = {
		carouselPlayConfig: {
		  autoPlay: false,
		  interval: 5000,
		  pauseOnHover: true
		},
		carouselPreviewsConfig: {
			visible: true,
			number: 5,
		}
	  };
	constructor(
		private modalGalleryService: ModalGalleryService,
		public gs: GlobalService,
	) { }

	ngOnInit(): void {
		let imageArray = this.gs.margeMedia(this.item?.media)?.image;
		let coverImg = this.item?.cover;
		//console.log('imageArray', imageArray, coverImg);
		if(coverImg) {
			this.images.push(
				new Image(coverImg.id, {
					img: this.gs.imgPath(coverImg.path),
				})
			)
		}
		if(imageArray) {
			imageArray?.forEach((el: any) => {
				this.images.push(
					new Image(el.id, {
						img: this.gs.imgPath(el.path),
					})
				)
			});
		}
	}

	onShow(id: number, index: number, images: Image[] = this.images): void {
		const dialogRef: ModalGalleryRef = this.modalGalleryService.open({
			id,
			images,
			currentImage: images[index]
		}) as ModalGalleryRef;
	}

	/*ngOnChanges() {
		if(this.images) {
			let imageArray = this.item?.media?.image;
			imageArray?.forEach((el: any) => {
				this.images.push(
					new Image(el.id, {
						img: el.path,
					})
				)
			});
		}
	}*/



}
