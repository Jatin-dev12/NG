import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagesReplyDialogComponent } from 'src/app/dialogs';
import { AdditionalEnums, Enums } from 'src/app/enums';
import { Catalog } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { CatalogContactDialogComponent } from '../../_dialogs/catalog-contact-dialog/catalog-contact-dialog.component';
import { ConfirmDialogService } from 'src/app/modules';
import { RouterLink } from '@angular/router';
import { CatalogContactRequestDialogComponent } from 'src/app/dialogs/catalog-contact-request-dialog/catalog-contact-request-dialog.component';

@Component({
    selector: 'app-catalog-owner-box-view',
    templateUrl: './catalog-owner-box-view.component.html',
    styleUrls: ['./catalog-owner-box-view.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class CatalogOwnerBoxViewComponent {
	@Input() item!: Catalog | null;
	@Input() show_action: boolean = true;
	AdditionalEnums = AdditionalEnums;
	constructor(
		public gs: GlobalService,
		private modalService: NgbModal,
		private confirmDialog: ConfirmDialogService,
	) {

	}

	get manager() {
		return this.item?.agreement?.manager;
	}

	get owner() {
		return this.item?.owner;
	}

	get is_manage() {
		return (this.item?.owner_id === this.item?.user_id);
	}

	contact() {
		/*if (this.manager?.message_id === false) {
			this._contactDialog();
			return;
		}*/
		if (this.owner?.message_id === 0) {
			if(this.owner?.contact_id === Enums.USER_PROFILE_CONTACT_STATUS_NONE) {
				this._sendContactRequest();
				return
			}

			if(this.owner?.contact_id === Enums.USER_PROFILE_CONTACT_STATUS_PENDING) {
				this._confirm('You contact request is pending.');
				return
			}

			if(this.owner?.contact_id === Enums.USER_PROFILE_CONTACT_STATUS_DECLINED) {
				this._confirm('You contact request is declined.');
				return
			}
			return;
		}
		if (this.owner?.message_id) {
			this._sendMessage();
			return;
		}
	}

	protected _contactDialog() {
		const modalRef = this.modalService.open(CatalogContactDialogComponent, {
			windowClass: 'center',
			keyboard: false,
			animation: true,
		});
		modalRef.componentInstance.item = this.item;
		modalRef.componentInstance.relation = AdditionalEnums.USER_CATALOG_ROLE_OWNER;
		modalRef.componentInstance.contactUser = this.owner;
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			console.log('reason', reason)
		});
	}

	protected _sendMessage() {
		const modalRef = this.modalService.open(MessagesReplyDialogComponent, {
			windowClass: 'center',
			keyboard: false,
			animation: true,
		});
		modalRef.componentInstance.item = this.owner;
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			console.log('reason', reason)
		});
	}

	protected _confirm(msg: any,) {
		this.confirmDialog.confirm({
			message: this.gs.translate(msg),
			rejectVisible: false,
			acceptLabel: 'Okay'
		}, () => {
		}, () => { console.log('No clicked'); });
	}

	protected _sendContactRequest() {
		const modalRef = this.modalService.open(CatalogContactRequestDialogComponent, {
			windowClass: 'center',
			keyboard: false,
			animation: true,
		});
		modalRef.componentInstance.catalog = this.item;
		modalRef.componentInstance.user = this.is_manage ? this.manager : this.owner;
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

} 
