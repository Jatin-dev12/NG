import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';
//import { BillSearchPropertyDialogComponent } from '../_partials/bill-search-property-dialog/bill-search-property-dialog.component';
import { CatalogSelectDialogComponent } from 'src/app/dialogs';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BillFormManagerComponent } from '../bill-form-manager/bill-form-manager.component';
import { BillFormOwnerComponent } from '../bill-form-owner/bill-form-owner.component';
import { BillFormTenantComponent } from '../bill-form-tenant/bill-form-tenant.component';

@Component({
    selector: 'app-bill-create',
    templateUrl: './bill-create.component.html',
    styleUrls: ['./bill-create.component.scss'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive, BillFormTenantComponent, BillFormOwnerComponent, BillFormManagerComponent]
})
export class BillCreateComponent {

	constructor(
		public gs: GlobalService,
		private modalService: NgbModal,
		public router: Router
	) { }


	SelectProperty() {
		const modalRef = this.modalService.open(CatalogSelectDialogComponent, {
			windowClass: 'center billspop',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			size: 'xl'
		});
		//modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}
}
