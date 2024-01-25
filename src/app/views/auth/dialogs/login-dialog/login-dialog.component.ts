import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';
import { ForgotDialogComponent } from '../forgot-dialog/forgot-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { LoginFormComponent } from '../../forms/login-form/login-form.component';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss'],
    providers: [],
    standalone: true,
    imports: [LoginFormComponent]
})
export class LoginDialogComponent implements OnInit {
	@Input() url: string = '/';
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
			case 'Forgot':
				this.openForgot();
				break;
			case 'Register':
				this.openRegister();
				break;
			default:
				break;
		}
	}


	openForgot() {
		const modalRef = this.modalService.open(ForgotDialogComponent, {
			windowClass: 'forgotmodal',
			keyboard: false,
			animation: true,
		});
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			console.log('reason', reason)
		});
	}

	openRegister() {
		const modalRef = this.modalService.open(RegisterDialogComponent, {
			windowClass: 'registermodal',
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
