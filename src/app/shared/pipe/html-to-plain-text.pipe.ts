import { DOCUMENT } from '@angular/common';
import { Inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'htmlToPlainText',
    standalone: true
})
export class HtmlToPlainTextPipe implements PipeTransform {

    constructor(
		@Inject(DOCUMENT) private _document: Document,
    ) {}

	transform(value: any): string {
        const temp = this._document.createElement('div');
        temp.innerHTML = value;
        return temp.textContent || temp.innerText || '';
    }

}
