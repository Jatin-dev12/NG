import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';
import { FormSubmitDirective } from '../../../../../../shared/directive/form-submit.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-profile-unlink-accouint-dialog',
    templateUrl: './profile-unlink-accouint-dialog.component.html',
    styleUrls: ['./profile-unlink-accouint-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, FormSubmitDirective]
})
export class ProfileUnlinkAccouintDialogComponent {
  constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) {

	}

	ngOnInit(): void {

	}
}
