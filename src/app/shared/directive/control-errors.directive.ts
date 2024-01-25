import { ComponentRef, Directive, Host, Inject, Input, Optional, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, EMPTY, of, Subject } from 'rxjs';
import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { FORM_ERRORS } from '../form-errors';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { FormSubmitDirective } from './form-submit.directive';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { GlobalService } from 'src/app/services';

@Directive({
    selector: '[formControl], [formControlName]',
    standalone: true
})
export class ControlErrorsDirective {
	private destroy$ = new Subject<void>();
	ref!: ComponentRef<ControlErrorComponent>;
	container: ViewContainerRef;
	submit$: Observable<Event>;
	reset$: Observable<Event>;
	@Input() customErrors: any = {};  // { required: 'Please accept the terms' }
	@Input() name: any = null;

	constructor(
		private vcr: ViewContainerRef,
		@Optional() controlErrorContainer: ControlErrorContainerDirective,
		@Inject(FORM_ERRORS) private errors: any,
		@Optional() @Host() private form: FormSubmitDirective,
		private controlDir: NgControl,
		private gs: GlobalService
	) {
		this.container = controlErrorContainer ? controlErrorContainer?.vcr : vcr;
		this.submit$ = this.form ? this.form.submit$ : EMPTY;
		this.reset$ = this.form ? this.form.reset$ : EMPTY;
	}

	ngOnInit() {
		//console.log('this.errors', this.errors);
		this.schedule.pipe(mergeMap((action: any) => { return action; })).pipe(takeUntil(this.destroy$)).subscribe(data => {
			try {
				const controlErrors = this.control?.errors;
				//console.log('this.control', this.controlDir.name);
				if (controlErrors) {
					const firstKey = Object.keys(controlErrors)[0];
					const getError: any = this.errors[firstKey] ?? null;
					//console.log('firstKey', firstKey);
					//console.log('getError', getError);
					const text = this.customErrors[firstKey] || getError && getError(controlErrors[firstKey] ?? null);
					//console.log('firstKey', firstKey, getError, text);
					this.setError(text);
				} else if (this.ref) {
					this.setError(null);
				}
			} catch (e) {
				console.log('Error:', e);
				//throw new Error('failed.');
			}
		});

		/*this.reset.pipe(mergeMap((action: any) => { return action; })).pipe(untilDestroyed(this)).subscribe(data => {
			try {
				if(data) {
					console.log('Reset1234', data);
				}
			} catch (e) {
				console.log('Error:', e);
				throw new Error('failed.');
			}
		});*/

		this.gs.trrigerAction$.subscribe(data => {
			if(data === 'ResetForm') {
				//console.log('this.form', this.form);
				this.setError(null);
				/*this.form.formGroup.reset();
				Object.keys(this.form.formGroup.controls).forEach(key => {
					this.form.formGroup.get(key)?.setErrors(null);
					this.form.formGroup.get(key)?.updateValueAndValidity();
				});*/
			}
		})


	}

	get schedule() {
		return of(this.submit$, this.control?.valueChanges);
	}

	get reset() {
		return of(this.reset$, this.control?.valueChanges);
	}

	get control() {
		return this.controlDir.control;
	}

	setError(text: any, name?: any) {
		if (!this.ref) {
			this.ref = this.container.createComponent(ControlErrorComponent);
		}
		//console.log('this.ref', this.ref);
		this.ref.instance.text = this.replateText(text);
	}

	replateText(text: any) {
		let name = this.name ? this.name : this.humanize(this.controlDir.name);
		return text?.replace('this_field', name);
	}

	humanize(str: any) {
		let i, frags = str.split('_');
		for (i = 0; i < frags.length; i++) {
			frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
		}
		return frags.join(' ');
	}

	ngOnDestroy() { }

}
