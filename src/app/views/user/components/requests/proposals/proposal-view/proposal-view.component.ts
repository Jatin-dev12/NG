import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { OneToOneChatComponent } from '../../../../../../standalone/one-to-one-chat/one-to-one-chat.component';
import { LaddaDirective } from '../../../../../../modules/ladda/ladda.directive';

@Component({
    selector: 'app-proposal-view',
    templateUrl: './proposal-view.component.html',
    styleUrls: ['./proposal-view.component.scss'],
    standalone: true,
    imports: [RouterLink, LaddaDirective, OneToOneChatComponent]
})
export class ProposalViewComponent {
	itemObservable: Observable<any> = this.gs.store.select(StoreSelector.ContactSelectors[EnumRxKey.Contact.view]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.ContactLoadingKey[`${EnumRxKey.Contact.view}Loading`]);
	item: any = null;
	item_id: any = null;
	accept_loading: boolean = false;
	decline_loading: boolean = false;
	remove_loading: boolean = false;
	complete_loading: boolean = false;
	Enums = Enums;
	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
		private confirmDialog: ConfirmDialogService,
		private itemService: ItemService
	) { 
		this.item_id = this.activeRoute.snapshot.params['id'];
	}

	ngOnInit(): void {
		this.onLoad();
		this.itemObservable.subscribe(data => {
			this.item = data;
		});
	}

	onLoad() {
		let action = StoreAction.ContactParams({ method: 'GET', params: null, params2: { primary_id: this.item_id }, key: EnumRxKey.Contact.view });
		this.gs.store.dispatch(action);
	}

	accept() {
		this.confirmDialog.confirm({
			header: 'Accept?',
			icon: `<img src="${this.gs.imgUrl}/accept.svg" alt="" />`,
			message: 'Are you sure you want to accept the request?',
		}, () => {
			this.accept_loading = true;
			let params = { status: Enums.USER_PROFILE_CONTACT_STATUS_ACCEPT };
			this.itemService.contact("POST", { form: params }, { primary_id: this.item_id }).subscribe(response => {
				this.gs.store.dispatch(StoreAction.ContactList({ data: response.data, key: EnumRxKey.Contact.view }));
				this.accept_loading = false;
				this.gs.alert('You have successfully accepted the request');
				this.gs.store.dispatch(StoreAction.ProfileParams({ method: "GET", params: null, params2: { primary_id: this.gs.identity?.id }, key: 'load_profile' }));
				setTimeout(() => {
					this.onLoad();
				}, 5000);
			}, (error: Response) => {
				this.accept_loading = false;
			});
		}, () => console.log('No clicked'));
	}

	decline() {
		this.confirmDialog.confirm({
			header: 'Reject?',
			icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
			message: 'Are you sure you want to reject the request?',
		}, () => {
			this.decline_loading = true;
			let params = { status: Enums.USER_PROFILE_CONTACT_STATUS_DECLINED };
			this.itemService.contact("POST", { form: params }, { primary_id: this.item_id }).subscribe(response => {
				this.gs.store.dispatch(StoreAction.ContactList({ data: response.data, key: EnumRxKey.Contact.view }));
				this.decline_loading = false;
				this.gs.store.dispatch(StoreAction.ProfileParams({ method: "GET", params: null, params2: { primary_id: this.gs.identity?.id }, key: 'load_profile' }));
				this.gs.alert('You have successfully rejected the request.');
			}, (error: Response) => {
				this.decline_loading = false;
			});
		}, () => console.log('No clicked'));
	}

	remove() {
		this.confirmDialog.confirm({
			header: 'Delete Request?',
			icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
			message: 'Are you sure you want to delete this request?',
		}, () => {
			this.remove_loading = true;
			this.itemService.contact("DELETE", null, { primary_id: this.item_id }).subscribe(response => {
				this.remove_loading = false;
				this.gs.alert('You have successfully deleted the request sent to manager.', 'danger');
				this.gs.store.dispatch(StoreAction.ProfileParams({ method: "GET", params: null, params2: { primary_id: this.gs.identity?.id }, key: 'load_profile' }));
				this.gs.router('/requests/contact/send-pending-requests');
			}, (error: Response) => {
				this.remove_loading = false;
			});
		}, () => console.log('No clicked'));
	}

	markAsCompleted() {
		this.confirmDialog.confirm({
			header: 'Confirm!',
			message: 'Are you sure you want to accept the request?',
		}, () => {
			this.complete_loading = true;
			let params = { status: Enums.USER_PROFILE_CONTACT_STATUS_VISITED };
			this.itemService.contact("POST", { form: params }, { primary_id: this.item_id }).subscribe(response => {
				this.gs.store.dispatch(StoreAction.ContactList({ data: response.data, key: EnumRxKey.Contact.view }));
				this.complete_loading = false;
				this.gs.store.dispatch(StoreAction.ProfileParams({ method: "GET", params: null, params2: { primary_id: this.gs.identity?.id }, key: 'load_profile' }));
				this.gs.alert('Accept');
			}, (error: Response) => {
				this.complete_loading = false;
			});
		}, () => console.log('No clicked'));
	}

	ngOnDestroy() {
		this.gs.store.dispatch(StoreAction.ContactList({ data: null, key: EnumRxKey.Contact.view }));
	}
}
