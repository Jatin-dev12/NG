import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { LaddaDirective } from '../../../../modules/ladda/ladda.directive';
import { NgClass, AsyncPipe } from '@angular/common';
import { ControlErrorsDirective } from '../../../../shared/directive/control-errors.directive';
import { ErrorSummaryComponent } from '../../../../shared/components/error-summary/error-summary.component';
import { FormSubmitDirective } from '../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ErrorSummaryComponent, ControlErrorsDirective, NgClass, LaddaDirective, AsyncPipe]
})
export class ContactComponent implements OnInit {
	form!: UntypedFormGroup;
	submitted:boolean = false;
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.DefaultLoading);
	constructor(
		public gs: GlobalService,
	) { }

	get f() { return this.form.controls; };

	ngOnInit(): void {
		this.gs.clearErrorMessages();
		this.form = this.gs.formBuilder.group({
			first_name: new UntypedFormControl('', [Validators.required]),
			last_name: new UntypedFormControl(''),
			email: new UntypedFormControl('', [Validators.required, Validators.email]),
			mobile: new UntypedFormControl(''),
			subject: new UntypedFormControl('', [Validators.required]),
			body: new UntypedFormControl('', [Validators.required]),
		}); // Form validation
		this.gs.trrigerAction$.subscribe(data => {
			if(data === EnumRxKey.Default.contact) {
				this.form.reset();
			}
		})
	}

	onSubmit(form: any) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.gs.clearErrorMessages();
		let params: any = { contactForm: form.value };
		this.gs.store.dispatch(StoreAction.DefaultParams({ method: "POST", params: params, params2: { key: EnumRxKey.Default.contact } }));
	}

}
