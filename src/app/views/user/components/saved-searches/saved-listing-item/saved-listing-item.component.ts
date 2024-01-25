import { Component, Input, OnInit } from '@angular/core';
import { EnumRxKey } from 'src/app/enums';
import { ConfirmDialogService, LaddaDirective } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { RouterLink } from '@angular/router';
import { NgClass, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-saved-listing-item, [app-saved-listing-item]',
    templateUrl: './saved-listing-item.component.html',
    styleUrls: ['./saved-listing-item.component.scss'],
    standalone: true,
    imports: [RouterLink, LaddaDirective, NgClass, TitleCasePipe]
})
export class SavedListingItemComponent implements OnInit {
	@Input() item: any;
	loading: boolean = false;

	constructor(
		public gs: GlobalService,
		private confirmDialog: ConfirmDialogService,
		private itemService: ItemService
	) { }

	ngOnInit(): void {
	}

	get q_param() {
		return this.item.q_param ? JSON.parse(this.item.q_param) : null;
	}

	edit() {

	}

	remove() {
		this.confirmDialog.confirm({
			header: 'Delete Saved Search?',
			icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
			message: 'Are you sure you want to delete saved search?',
		}, () => {
			/*let action = StoreAction.SearchParams({ method: 'DELETE', params: null, params2: { primary_id: this.item.id }, key: `delete-${EnumRxKey.Search.listing}`, url: null, sort: null, msg: 'You have successfully deleted search' });
			this.gs.store.dispatch(action);*/
			this.loading = true;
			this.itemService.search("DELETE", null, { primary_id: this.item.id }).subscribe(response => {
				this.loading = false;
				let action = StoreAction.SearchDelete({ item: this.item, key: EnumRxKey.Search.listing });
				this.gs.store.dispatch(action);
			}, (error: Response) => {
				this.loading = false;
			})

		}, () => console.log('No clicked'));
	}

}
