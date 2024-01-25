import { Component, Input } from '@angular/core';
import { EnumRxKey } from 'src/app/enums';
import { Favorites, User } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { LaddaDirective } from '../../../../../../modules/ladda/ladda.directive';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-favorites-item, [app-favorites-item]',
    templateUrl: './favorites-item.component.html',
    styleUrls: ['./favorites-item.component.scss'],
    standalone: true,
    imports: [RouterLink, LaddaDirective]
})
export class FavoritesItemComponent {
	@Input() key: string = '';
	@Input() item: Favorites | null = null;
	favourileLoading: boolean = false;

	constructor(
		public gs: GlobalService,
		private itemService: ItemService,
		public confirmDialog: ConfirmDialogService,
	) { }

	ngOnInit(): void {

	}

	handleFavourite() {
		this.confirmDialog.confirm({
			header: this.gs.translate('Remove Favorite?'),
			icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
			message: this.gs.translate('Are you sure you want to remove favorite?'),
		}, () => {
			this.favourileLoading = true;
			let params2 = { primary_id: this.item?.id, key: EnumRxKey.User.favorite };
			this.itemService.profile("DELETE", null, params2).subscribe(response => {
				this.favourileLoading = false;
				this.gs.store.dispatch(StoreAction.UserDelete({ item: this.item, key: EnumRxKey.User.favorite }));
				this.gs.alert('You have successfully removed this manager from your favorites list.', 'danger');
			}, (error: Response) => {
				this.favourileLoading = false;
			});
		}, () => console.log('No clicked'));

	}
}
