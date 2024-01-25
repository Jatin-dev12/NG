import { Component, Input } from '@angular/core';
import { Enums } from 'src/app/enums';
import { GlobalService } from 'src/app/services';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-proposal-listing-item, [app-proposal-listing-item]',
	templateUrl: './proposal-listing-item.component.html',
	styleUrls: ['./proposal-listing-item.component.scss'],
	standalone: true,
	imports: [RouterLink]
})
export class ProposalListingItemComponent {
	@Input() item: any;
	constructor(
		public gs: GlobalService,
	) { }

	get status() {
		let status = 'None';
		let cls = 'secondary';
		switch (this.item.status) {
			case Enums.USER_PROFILE_CONTACT_STATUS_PENDING:
				status = 'Pending';
				cls = 'secondary';
				break;
			case Enums.USER_PROFILE_CONTACT_STATUS_ACCEPT:
				status = 'Accepted';
				cls = 'primary';
				break;
			case Enums.USER_PROFILE_CONTACT_STATUS_DECLINED:
				status = 'Rejected';
				cls = 'danger';
				break;
			case Enums.USER_PROFILE_CONTACT_STATUS_VISITED:
				status = 'Assigned';
				cls = 'primary';
				break;
			case Enums.USER_PROFILE_CONTACT_STATUS_RESUBMITTED:
				status = 'Re-Submitted';
				cls = 'secondary';
				break;
			default:
				break;
		}
		return { status: status, cls: cls };
	}
}
