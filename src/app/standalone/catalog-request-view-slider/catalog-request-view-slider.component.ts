import { Component, Input } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { GalleryModule, ModalGalleryService, Image } from '@ks89/angular-modal-gallery';
import { Catalog } from 'src/app/models';
import { GlobalService } from 'src/app/services';

@Component({
	selector: 'app-catalog-request-view-slider',
	standalone: true,
	imports: [SharedModule, GalleryModule],
	templateUrl: './catalog-request-view-slider.component.html',
	styleUrls: ['./catalog-request-view-slider.component.scss'],
	providers: [ModalGalleryService],
})
export class CatalogRequestViewSliderComponent {
	@Input() catalog: Catalog | null = null;
	@Input() carousel: boolean = true;
	images: Image[] = [];
	constructor(
		public gs: GlobalService,
	) { }

	ngOnInit(): void {
		let imageArray = this.catalog?.media?.image;
		let coverImg = this.catalog?.cover;
		//console.log('imageArray', imageArray, coverImg);
		if (coverImg) {
			this.images.push(
				new Image(coverImg.id, {
					img: coverImg.path,
				})
			)
		}
		if (imageArray) {
			imageArray?.forEach((el: any) => {
				this.images.push(
					new Image(el.id, {
						img: el.path,
					})
				)
			});
		}
	}
}
