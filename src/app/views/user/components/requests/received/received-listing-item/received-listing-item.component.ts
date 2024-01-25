import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogRequestSliderDialogComponent } from 'src/app/dialogs';
import { Request } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-received-listing-item, [app-received-listing-item]',
    templateUrl: './received-listing-item.component.html',
    styleUrls: ['./received-listing-item.component.scss'],
    standalone: true,
    imports: [RouterLink, DatePipe]
})
export class ReceivedListingItemComponent {
	@Input() item!: Request;
	@Input() url!: any;
	constructor(
		public gs: GlobalService,
		private modalService: NgbModal,
	) { }

	ngOnInit(): void {

	}

	view() {
		const modalRef = this.modalService.open(CatalogRequestSliderDialogComponent, {
			windowClass: 'center',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true,
			size: 'sm',
		});
		modalRef.componentInstance.catalog = this.item.catalog;
		modalRef.result.then((result) => {
			if (!result) return;
			//console.log('result', result);
			this.gs.router(`${this.url}${this.item.id}`);
		}, (reason) => {
			console.log('reason', reason);
		});
	}
}
