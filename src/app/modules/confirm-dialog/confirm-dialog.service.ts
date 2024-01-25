import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Confirmation {
    message?: any;
    key?: string;
    icon?: string;
    header?: any;
    accept?: Function;
    reject?: Function;
    acceptLabel?: string;
    rejectLabel?: string;
    acceptIcon?: string;
    rejectIcon?: string;
    acceptVisible?: boolean;
    rejectVisible?: boolean;
    blockScroll?: boolean;
    closeOnEscape?: boolean;
    dismissableMask?: boolean;
    defaultFocus?: string;
    acceptButtonStyleClass?: string;
    rejectButtonStyleClass?: string;
    mainClass?: string;
    target?: EventTarget;
    acceptEvent?: EventEmitter<any>;
    rejectEvent?: EventEmitter<any>;
}

@Injectable({
	providedIn: 'root'
})
export class ConfirmDialogService {
	private subject = new Subject<any>();

	constructor() { }

	confirmThis(message: string, yesFn: () => void, noFn: () => void): any {
		this.setConfirmation(message, yesFn, noFn);
	}

	confirmAlert(message: string, yesFn: () => void, noFn: () => void): any {
		this.setConfirmation(message, yesFn, noFn, 'alert');
	}

	html(message: string, yesFn: () => void, noFn: () => void): any {
		this.setConfirmation(message, yesFn, noFn, 'html');
	}

	custom(message: string, yesFn: () => void, noFn: () => void): any {
		this.setConfirmation(message, yesFn, noFn, 'custom');
	}

	setConfirmation(message: string, yesFn: () => void, noFn: () => void, type: any = 'confirm'): any {
		const that = this;
		this.subject.next({
			key: type,
			message: message,
			yesFn(): any {
				that.subject.next(null); // This will close the modal  
				yesFn();
			},
			noFn(): any {
				that.subject.next(null);
				noFn();
			}
		});
	}

	confirm(confirm: Confirmation, accept: () => void, reject: () => void) {
		//console.log('confirm12', confirm);
		confirm.key = 'new-confirm';
		confirm.icon = confirm.icon ?? '';
		confirm.header = confirm.header ?? '';
		confirm.acceptLabel = confirm.acceptLabel ?? 'Yes';
		confirm.rejectLabel = confirm.rejectLabel ?? 'No';
		confirm.acceptIcon = confirm.acceptIcon ?? '';
		confirm.rejectIcon = confirm.rejectIcon ?? '';
		confirm.acceptVisible = confirm.acceptVisible ?? true;
		confirm.rejectVisible = confirm.rejectVisible ?? true;
		confirm.acceptButtonStyleClass = confirm.acceptButtonStyleClass ?? 'btn btn-yes';
    	confirm.rejectButtonStyleClass = confirm.rejectButtonStyleClass ?? 'btn btn-no';
    	confirm.mainClass = confirm.mainClass ?? 'some';
		//console.log('confirm', confirm);
		let vm = this;
		this.subject.next({ ...confirm, 
			accept(): any {
				vm.subject.next(null);
				accept();
			},
			reject(): any {
				vm.subject.next(null);
				reject();
			}
		});
        return this;
    }

	getMessage(): Observable<any> {
		return this.subject.asObservable();
	}
}
