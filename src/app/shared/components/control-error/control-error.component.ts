import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    template: `<div class="invalid-feedback is-danger d-block" [class.hide]="_hide">{{ _text  }}</div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./control-error.component.scss'],
    standalone: true
})
export class ControlErrorComponent implements OnInit {
	_text: any;
	_hide = true;

	@Input() set text(value: any) {
		if (value !== this._text) {
			this._text = value;
			this._hide = !value;
			this.cdr.detectChanges();
		}
	};

	constructor(private cdr: ChangeDetectorRef) { }

	ngOnInit() {
	}

}