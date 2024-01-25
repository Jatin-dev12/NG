import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { GlobalService } from 'src/app/services';

@Component({
    selector: 'app-bill-status-dialog',
    templateUrl: './bill-status-dialog.component.html',
    styleUrls: ['./bill-status-dialog.component.scss'],
    standalone: true,
    imports: [CarouselModule]
})
export class BillStatusDialogComponent {

	options: OwlOptions = {
		loop: false,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: false,
		dots: false,
		navSpeed: 700,
		margin: 15,
		autoplay: false,
		smartSpeed: 1200,
		navText: ['', ''],
		responsive: {
			0: {
				items: 5
			},
			400: {
				items: 5
			},
			740: {
				items: 5
			},
			940: {
				items: 5
			}
		},
		nav: true
	}
	
	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) { }

	viewBill() {
		this.gs.router(`/bills/view/12`);
		this.activeModal.close();
	}
}
