import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { GlobalService, ItemService } from 'src/app/services';
import { RouterLink } from '@angular/router';
import { ConfirmDialogService, LaddaDirective } from 'src/app/modules';
import { EnumRxKey, Enums } from 'src/app/enums';
import { StoreAction } from 'src/app/store/actions';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { ReadMoreComponent } from 'src/app/shared';

@Component({
    selector: '[app-search-managers-listing-item], app-search-managers-listing-item',
    templateUrl: './search-managers-listing-item.component.html',
    styleUrls: ['./search-managers-listing-item.component.scss'],
    standalone: true,
    imports: [RouterLink, ReadMoreComponent, LaddaDirective, NgClass, NgOptimizedImage],
	providers: [
		
	]
})
export class SearchManagersListingItemComponent implements OnInit {

	@Input() item: User | null = null;
	@Input() favorite!: any;
	@Input() key: string = 'search';
	favourileLoading: boolean = false;
	Enums = Enums;

	constructor(
		public gs: GlobalService,
		public confirmDialog: ConfirmDialogService,
		private itemService: ItemService,
	) { }

	ngOnInit(): void {
		//this.item = new User(this.item);
	}

	get tagsArray() {
		let tagsString = this.item?.tags ? this.item?.tags?.split(', ') : [];
		return tagsString;
	}


	handleFavourite(item: any) {
		if (this.gs.identity === null) {
			this.confirmDialog.confirmThis(`Login Required`, () => {
				this.gs.router('/login');
			}, () => { console.log('No clicked'); });
			return
		}
		if (!item.is_favorite) {
			this.favourileLoading = true;
			let params = { user_id: this.gs.identity.id, favorite_id: item.id, moduleId: 'UserProfile' };
			let params2 = { key: EnumRxKey.User.favorite };
			this.itemService.profile("POST", { form: params }, params2).subscribe(response => {
				this.favourileLoading = false;
				let user = { ...this.item };
				user['is_favorite'] = true;
				this.gs.store.dispatch(StoreAction.UserUpdate({ item: user, key: EnumRxKey.User.search }));
				this.gs.alert('You have successfully added this manager to your favorites list.');
			}, (error: Response) => {
				this.favourileLoading = false;
			});
		} else {
			this.confirmDialog.confirm({
				header: this.gs.translate('Remove Favorite?'),
				icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
				message: this.gs.translate('Are you sure you want to remove favorite list?'),
			}, () => {
				this.favourileLoading = true;
				let params2 = { favorite_id: item.id, key: EnumRxKey.User.favorite };
				this.itemService.profile("DELETE", null, params2).subscribe(response => {
					this.favourileLoading = false;
					let user = { ...this.item };
					user['is_favorite'] = false;
					this.gs.store.dispatch(StoreAction.UserUpdate({ item: user, key: EnumRxKey.User.search }));
					this.gs.alert('You have successfully removed this manager from your favorites list.', 'danger');
				}, (error: Response) => {
					this.favourileLoading = false;
				});
			}, () => console.log('No clicked'));
		}
	}

}
