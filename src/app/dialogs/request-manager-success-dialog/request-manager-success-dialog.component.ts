import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';

@Component({
	selector: 'app-request-manager-success-dialog',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './request-manager-success-dialog.component.html',
	styleUrl: './request-manager-success-dialog.component.scss'
})
export class RequestManagerSuccessDialogComponent {
	@Input() items: any = [];
	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) { }


	dismiss() {
		this.gs.router('/requests/issued/pending-requests');
		this.activeModal.close();
	}
}
