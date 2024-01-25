import { Directive, ElementRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Directive({
    selector: 'form',
    standalone: true
})
export class FormSubmitDirective {
	@Input() formGroup!: FormGroup;
	submit$ = fromEvent(this.element, 'submit').pipe(tap(() => {
		if (this.element.classList.contains('submitted') === false) {
			this.element.classList.add('submitted');
		}
	}), shareReplay(1))

	reset$ = fromEvent(this.element, 'reset').pipe(tap(() => {
		if (this.element.classList.contains('reset') === false) {
			this.element.classList.add('reset');
		}
	}), shareReplay(1))

	constructor(private host: ElementRef<HTMLFormElement>) {
		//console.log('submit$', this.formGroup)
		this.reset$.subscribe(data => {
			//console.log('submit$', this.formGroup)
			/*console.log('data', this.element.classList.contains('invalid-feedback'));
			if(this.element.classList.contains('invalid-feedback') === false) {
				this.element.classList.add('hide');
			}*/
		})
	}

	get element() {
		return this.host.nativeElement;
	}

}
