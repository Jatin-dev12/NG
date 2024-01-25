import { Component, Input } from '@angular/core';
import { EnumRxKey } from 'src/app/enums';
import { User } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-staffs-listing-item, [app-staffs-listing-item]',
    templateUrl: './staffs-listing-item.component.html',
    styleUrls: ['./staffs-listing-item.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class StaffsListingItemComponent {
	@Input() item: User | null = null;

	constructor(
		public gs: GlobalService,
		private confirmDialog: ConfirmDialogService,
	) { }

	ngOnInit(): void {

	}

	updateStatus() {
		this.confirmDialog.confirm({
			message: 'Are you sure?',
		}, () => {
			//console.log('Yes clicked')
			let params = { status: 2 };
		let key = `update-${EnumRxKey.Staff.listing}`;
		let params2 = { user_id: this.item?.id };
		this.gs.store.dispatch(StoreAction.StaffParams({ method: "POST", params: { StaffForm: params }, params2: params2, key: key, url: null, sort: null, msg: `You have successfully ${this.item?.id ? 'updated' : 'added'} staff.` }));
		}, () => console.log('No clicked'));
	}
}
