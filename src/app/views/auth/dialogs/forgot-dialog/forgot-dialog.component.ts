import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { ForgotFormComponent } from '../../forms/forgot-form/forgot-form.component';

@Component({
    selector: 'app-forgot-dialog',
    templateUrl: './forgot-dialog.component.html',
    styleUrls: ['./forgot-dialog.component.scss'],
    standalone: true,
    imports: [ForgotFormComponent]
})
export class ForgotDialogComponent implements OnInit {

  constructor(
		public gs: GlobalService,		
		public activeModal: NgbActiveModal,
		private modalService: NgbModal,
	) { }

	ngOnInit(): void {
	}

	modalEvent(event: string) {
		this.activeModal.dismiss();
		switch (event) {
			case 'Login':
				this.login();
				break;
			case 'Become':
				this.host();
				break;
			default:
				break;
		}
	}

	login() {
		const modalRef = this.modalService.open(LoginDialogComponent, {
			windowClass: 'loginmodal',
			keyboard: false,
			animation: true,
		});
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			console.log('reason', reason)
		});
	}

	host() {
		
	}

}
