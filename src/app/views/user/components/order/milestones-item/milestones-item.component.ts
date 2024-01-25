import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { MilestonePaymentDialogComponent } from 'src/app/dialogs';
import { Enums } from 'src/app/enums';
import { Milestone } from 'src/app/models';
import { GlobalService } from 'src/app/services';

@Component({
	selector: 'app-milestones-item',
	templateUrl: './milestones-item.component.html',
	styleUrls: ['./milestones-item.component.scss']
})
export class MilestonesItemComponent implements OnInit {
	@Input() item!: Milestone;
	Role = Enums.Role;

	constructor(
		public gs: GlobalService,
		private modalService: NgbModal,
	) { }

	ngOnInit(): void {
		this.item = new Milestone(this.item);
	}

	get status() {
		let cls = '';
		let txt = '';
		switch (this.item.status) {
			case Enums.USER_CATALOG_ORDERS_MILESTONE_STATUS_PENDING:
				cls = 'info';
				txt = 'Pending';
				break;
			case Enums.USER_CATALOG_ORDERS_MILESTONE_STATUS_NEW:
				cls = 'primary';
				txt = 'New';
				break;
			case Enums.USER_CATALOG_ORDERS_MILESTONE_STATUS_SUBMISSION:
				cls = 'warning';
				txt = 'Submission';
				break;
			case Enums.USER_CATALOG_ORDERS_MILESTONE_STATUS_ACCEPTED:
				cls = 'success';
				txt = 'Accept';
				break;
			case Enums.USER_CATALOG_ORDERS_MILESTONE_STATUS_DECLINED:
				cls = 'danger';
				txt = 'Decline';
				break;
			case Enums.USER_CATALOG_ORDERS_MILESTONE_STATUS_PAYMENT:
				cls = 'success';
				txt = 'Payment';
				break;
			default:
				break;
		}
		return { class: cls, text: txt }
	}

	payPayment() {
		/*const modalRef = this.modalService.open(MilestonePaymentDialogComponent, { 
			windowClass: 'right', 
			keyboard: false, 
			animation: true 
		});
		modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			//console.log('reason', reason)
		});	*/
	}

}
