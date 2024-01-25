import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
	selector: 'app-shared-login-dialog',
	standalone: true,
	imports: [CommonModule, SharedModule],
	templateUrl: './shared-login-dialog.component.html',
	styleUrls: ['./shared-login-dialog.component.scss']
})
export class SharedLoginDialogComponent implements OnInit {

	@Input() url: string = '/';
	form!: UntypedFormGroup;
	submitted = false;
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.AuthLoading);
	loggedIn: boolean = false;

	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) { }

	get f() { return this.form.controls; };

	ngOnInit(): void {
		this.form = this.gs.formBuilder.group({
			username: new UntypedFormControl('', [Validators.required, Validators.email]),
			password: new UntypedFormControl('', [Validators.required]),
		});
	}

	onLogin(form: any) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.gs.clearErrorMessages();
		//this.gs.store.dispatch(loginStart({ payload: form.value, url: this.url }));
		this.gs.store.dispatch(StoreAction.AuthParams({ params: { LoginForm: form.value }, params2: { key: 'login' }, url: this.url }));
	}

}
