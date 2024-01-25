import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';

@Component({
  selector: 'app-profile-notification-favorites-dialog',
  templateUrl: './profile-notification-favorites-dialog.component.html',
  styleUrls: ['./profile-notification-favorites-dialog.component.scss']
})
export class ProfileNotificationFavoritesDialogComponent {
  constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) {

	}

	ngOnInit(): void {

	}
}
