import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { GalleryModule, Image, ModalGalleryService } from "@ks89/angular-modal-gallery";
import { Catalog } from 'src/app/models';

@Component({
	selector: 'app-catalog-request-slider-dialog',
	standalone: true,
	imports: [SharedModule, GalleryModule],
	templateUrl: './catalog-request-slider-dialog.component.html',
	styleUrls: ['./catalog-request-slider-dialog.component.scss'],
	providers: [ModalGalleryService],
})
export class CatalogRequestSliderDialogComponent {
	@Input() catalog: Catalog | null = null;
	images: Image[] = [];
	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) { }

	ngOnInit(): void {
		let imageArray = this.catalog?.media?.image;
		let coverImg = this.catalog?.cover;
		//console.log('imageArray', imageArray, coverImg);
		if(coverImg) {
			this.images.push(
				new Image(coverImg.id, {
					img: coverImg.path,
				})
			)
		}
		if(imageArray) {
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
