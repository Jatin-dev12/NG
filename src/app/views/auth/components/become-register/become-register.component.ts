import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';
import { BecomeDialogComponent } from '../../dialogs/become-dialog/become-dialog.component';

@Component({
    selector: 'app-become-register',
    templateUrl: './become-register.component.html',
    styleUrls: ['./become-register.component.scss'],
    standalone: true
})
export class BecomeRegisterComponent implements OnInit {
	customPatterns = { '1': { pattern: new RegExp('(?!666|000|9\\d{2})\\d{3}') } };
	form!: UntypedFormGroup;
	get f() { return this.form.controls; };
	constructor(
		public gs: GlobalService,
		private modalService: NgbModal,
	) {

	}

	ngOnInit(): void {
		this.form = this.gs.formBuilder.group({
			price: [],
			ssn: [],
			date: [],
			cap: [],
		})
	}

	onLogin(form: UntypedFormGroup) {
		if (!form.valid) {
			this.gs.validateAllFormFields(this.form);
			return;
		}
	}

	becomeHost() {
		const modalRef = this.modalService.open(BecomeDialogComponent, {
			windowClass: 'right',
			//backdrop: 'static', 
			keyboard: false,
			animation: true
		});
		//modalRef.componentInstance.user = data;
		modalRef.result.then((result) => {
			//this.openPopup(result);
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason)
		});
	}

	openPopup(result: any) {
		switch (result) {
			case 'openLogin':
				//this.openLogin();
				break;
			case 'openRegister':
				//this.openRegister();
				break;
			case 'openForgot':
				//this.openForgot();
				break;
			default:
				break;
		}
	}

}
