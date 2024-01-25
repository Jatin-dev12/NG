import { Component, Input, OnInit } from '@angular/core';

import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { EnumRxKey } from 'src/app/enums';

@Component({
	selector: 'app-user-avatar',
	standalone: true,
	imports: [],
	templateUrl: './user-avatar.component.html',
	styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {
	@Input() removeAvatar: boolean = false;
	loading: boolean = false;

	constructor(
		public gs: GlobalService,
		private itemService: ItemService,
	) { }

	ngOnInit(): void {

	}

	upload(event: any) {
		let files: FileList = event.target.files;
		if (files.length > 0) {
			this.loading = true;
			this.itemService.basicUpload(files).subscribe(response => {
				let data = response;
				let fileId = data.data.files[0].id;
				this.gs.store.dispatch(StoreAction.ProfileParams({ method: "POST", params: { profile: { avatar_id: fileId } }, params2: null, key: EnumRxKey.Trriger.ProfileAvatarDialog }));
				this.loading = false;
			}, (error: Response) => {
				this.loading = false;
			})
		}
	}


	remove() {
		this.gs.store.dispatch(StoreAction.ProfileParams({ method: "POST", params: { profile: { avatar_id: 0 } }, params2: null, key: 'removeAvatar' }));
	}

}
