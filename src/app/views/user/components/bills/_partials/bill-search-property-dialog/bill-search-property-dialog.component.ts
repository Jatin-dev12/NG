import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-bill-search-property-dialog',
    templateUrl: './bill-search-property-dialog.component.html',
    styleUrls: ['./bill-search-property-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink]
})
export class BillSearchPropertyDialogComponent {


	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) { }


}
