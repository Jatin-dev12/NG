import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../confirm-dialog.service';
import { GlobalService } from 'src/app/services';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css'],
    standalone: true,
    imports: [NgClass]
})
export class ConfirmDialogComponent implements OnInit {

	message: any;
	constructor(
		private confirmDialog: ConfirmDialogService,
		public gs: GlobalService
	) { }

	ngOnInit(): any {
		this.confirmDialog.getMessage().subscribe(message => {
			this.message = message;
		});
	}

}
