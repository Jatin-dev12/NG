import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, Inject, Input } from '@angular/core';
import { isBrowser } from 'src/app/helpers';
import { GlobalService } from 'src/app/services';

@Directive({
	selector: '[socialShare]',
	standalone: true
})

export class SocialShareDirective {

	@Input('socialShare') socialShare: any | null;
	@Input('url') url: any | null;
	constructor(
		public gs: GlobalService,
		@Inject(DOCUMENT) private _document: Document,
	) {

	}

	@HostListener('click') onMouseEnter() {
		if (isBrowser) {
			const url = this.url;
			switch (this.socialShare) {
				case 'fb':
					window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
					break;
				case 'tw':
					window.open(`https://twitter.com/home?status=${url}`);
					break;
				case 'in':
					window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
					break;
				case 'tr':
					window.open(`https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}`);
					break;
				case 'dg':
					window.open(`http://digg.com/submit?url=${url}`);
					break;
				case 'rd':
					window.open(`https://reddit.com/submit?url=${url}`);
					break;
				case 'pn':
					window.open(`https://www.pinterest.com/pin/find/?url=${url}`);
					break;
				case 'cpl':
					let selBox = this._document.createElement('textarea');
					selBox.style.position = 'fixed';
					selBox.style.left = '0';
					selBox.style.top = '0';
					selBox.style.opacity = '0';
					selBox.value = url;
					this._document.body.appendChild(selBox);
					selBox.focus();
					selBox.select();
					this._document.execCommand('copy');
					this._document.body.removeChild(selBox);
					this.gs.alert('Copied');
					break;
				default:
					break;
			}
		};
	}

}