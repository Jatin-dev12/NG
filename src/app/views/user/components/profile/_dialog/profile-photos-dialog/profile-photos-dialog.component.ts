import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnumRxKey } from 'src/app/enums';
import { GlobalService } from 'src/app/services';
import { UserAvatarComponent } from '../../../../../../standalone/users/user-avatar/user-avatar.component';

@Component({
    selector: 'app-profile-photos-dialog',
    templateUrl: './profile-photos-dialog.component.html',
    styleUrls: ['./profile-photos-dialog.component.scss'],
    standalone: true,
    imports: [UserAvatarComponent]
})
export class ProfilePhotosDialogComponent {
	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) {

	}

	ngOnInit(): void {
		this.gs.trrigerAction$.subscribe(data => {
			if(data === EnumRxKey.Trriger.ProfileAvatarDialog) {
				this.activeModal.close();
			}
		})
	}
}
