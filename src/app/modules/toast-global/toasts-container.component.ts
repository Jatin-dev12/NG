import { Component, TemplateRef } from '@angular/core';
import { ToastService } from './toast.service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-toasts',
	template: `
    @for (toast of toastService.toasts; track toast) {
      <ngb-toast
        [class]="toast.classname + ' text-white ' + toast.position"
        [autohide]="true"
        [delay]="toast.delay || 15000"
        [header]="isTemplate(toast) ? removeMsg(isTemplate(toast)) : removeMsg(toast.textOrTpl)"
        (hide)="toastService.remove(toast)"
        >
      </ngb-toast>
    }
    `,
	host: { '[class.ngb-toasts]': 'true' },
	styles: [`
    .toast {min-width: 300px; max-width: 500px;};
    .toast.bottom-center {position: fixed; bottom: 50%; left: 50%; margin-left: -150px;}
    .toast .toast-header strong { text-transform: capitalize; }
  `],
	standalone: true,
	imports: [NgbToast]
})
export class ToastsContainer {
	constructor(public toastService: ToastService) { }

	isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }

	removeMsg(text: any) {
		//console.log('texttext', text)
		//rpc error: code = Unknown desc =
		let msg = text && text?.replace("rpc error: code = Unknown desc = ", "");
		return msg ?? text;
	}

}
