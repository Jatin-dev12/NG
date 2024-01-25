import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';
import { BecomeDialogComponent } from '../become-dialog/become-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterFormComponent } from '../../forms/register-form/register-form.component';

@Component({
    selector: 'app-register-dialog',
    templateUrl: './register-dialog.component.html',
    styleUrls: ['./register-dialog.component.scss'],
    standalone: true,
    imports: [RegisterFormComponent]
})
export class RegisterDialogComponent implements OnInit {

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
		const modalRef = this.modalService.open(BecomeDialogComponent, {
			windowClass: 'becomemodal',
			keyboard: false,
			animation: true,
		});
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			console.log('reason', reason)
		});
	}

}
