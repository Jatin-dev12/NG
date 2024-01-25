import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';
import { BillStatusDialogComponent } from '../../_partials/bill-status-dialog/bill-status-dialog.component';
import { Request } from 'src/app/models';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-received-listing-item',
    templateUrl: './received-listing-item.component.html',
    styleUrls: ['./received-listing-item.component.scss'],
    standalone: true,
    imports: [RouterLink, DatePipe]
})
export class ReceivedListingItemComponent {
	@Input() item!: Request;
	constructor(
		public gs: GlobalService,
		private modalService: NgbModal,
	) { }



	openDialog() {
		const modalRef = this.modalService.open(BillStatusDialogComponent, {
			windowClass: 'center billspop',
			backdrop: 'static',
			keyboard: false,
			animation: true
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			//console.log('result', result);
			this.gs.router(`/bills/issued/view/${this.item.id}`);
		}, (reason) => {
			console.log('reason', reason);
		});
	}
}
