import { Component, OnInit } from '@angular/core';

import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';

@Component({
	selector: 'app-user-banner',
	standalone: true,
	imports: [],
	templateUrl: './user-banner.component.html',
	styleUrls: ['./user-banner.component.scss']
})
export class UserBannerComponent implements OnInit {

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
				let data = response
				let fileId = data.data.files[0].id;
				this.gs.store.dispatch(StoreAction.ProfileParams({ method: "POST", params: { banner_id: fileId }, params2: null, key: 'banner' }));
				this.loading = false;
			}, (error: Response) => {
				this.loading = false;
			})
		}
	}

}
