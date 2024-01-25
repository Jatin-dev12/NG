import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { LaddaConfig, LaddaConfigArgs, configAttributes } from './ladda-config';
import { create as createLadda, LaddaButton } from 'ladda';

export type laddaValue = boolean | number | undefined | null;

@Directive({
    selector: '[appLadda]',
    standalone: true,
})
export class LaddaDirective implements OnInit, OnDestroy, OnChanges {

	private el: HTMLButtonElement;
    private _ladda!: LaddaButton;

	@Input('appLadda') loading: laddaValue;
	@Input('disabled') disabled!: boolean;

	constructor(
			el: ElementRef,
			@Inject(LaddaConfig) @Optional() config: LaddaConfigArgs,
			@Inject(PLATFORM_ID) private platformId: Object,
		) 
	{
		this.el = el.nativeElement;

		if (!config) {
			return;
		}

		// apply default styles if they aren't overwritten by an attribute
		for (const attribute in configAttributes) {
			const configValue = config[configAttributes[attribute]];

			if (!configValue) {
				continue; // don't waste time reading the attribute
			}

			if (!this.el.getAttribute(attribute)) {
				// attribute isn't set - apply the default config value
				const value = (typeof configValue === 'number') ? configValue.toString() : configValue;
				this.el.setAttribute(attribute, value);
			}
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if (!this._ladda) {
			return; // needed since ngOnChanges is called before ngOnInit
		}

		if (changes['loading']) {
			this.updateLadda(changes['loading'].previousValue);
		}

		if (changes['disabled']) {
			this.updateDisabled();
		}
	}

	ngOnInit() {
		if (!isPlatformBrowser(this.platformId)) {
            return;
		}
		
		this._ladda = createLadda(this.el);

		// if the initial loading value isn't false, a timeout of 0 ms
		// is necessary for the calculated spinner size to be correct.
		setTimeout(() => { this.updateLadda(false); }, 0);
	}

	ngOnDestroy() {
		if (this._ladda) {
			this._ladda.remove();
		}
	}

	private updateLadda(previousValue: laddaValue): void {
		const loading: boolean = typeof this.loading === 'number' || !!this.loading;
		const wasLoading: boolean = typeof previousValue === 'number' || !!previousValue;

		if (!loading) {
			if (wasLoading) {
				this._ladda.stop();
			}

			return this.updateDisabled();
		}

		if (!wasLoading) {
			this._ladda.start();
		}

		if (typeof this.loading === 'number') {
			this._ladda.setProgress(this.loading);
		}
	}

	private updateDisabled(): void {
		this.el.disabled = this.disabled;
	}

}
