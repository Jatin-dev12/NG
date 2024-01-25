import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';
import { ResetFormComponent } from '../../forms/reset-form/reset-form.component';

@Component({
    selector: 'app-reset-dialog',
    templateUrl: './reset-dialog.component.html',
    styleUrls: ['./reset-dialog.component.scss'],
    standalone: true,
    imports: [ResetFormComponent]
})
export class ResetDialogComponent implements OnInit {

  constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private modalService: NgbModal,
	) { }

	ngOnInit(): void {
	}

}
