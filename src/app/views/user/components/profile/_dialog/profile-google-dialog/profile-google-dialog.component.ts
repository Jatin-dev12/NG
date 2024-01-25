import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';
import { FormSubmitDirective } from '../../../../../../shared/directive/form-submit.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-profile-google-dialog',
    templateUrl: './profile-google-dialog.component.html',
    styleUrls: ['./profile-google-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, FormSubmitDirective]
})
export class ProfileGoogleDialogComponent {
  constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) {

	}

	ngOnInit(): void {

	}
}
