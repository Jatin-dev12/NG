import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AdditionalEnums, EnumRxKey, Enums } from 'src/app/enums';
import { ActionsHelper } from 'src/app/helpers/actions.helper';
import { ApiResponseData, Catalog, User } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { CatalogApplyDialogComponent } from '../_dialogs/catalog-apply-dialog/catalog-apply-dialog.component';
import { CatalogContactDialogComponent } from '../_dialogs/catalog-contact-dialog/catalog-contact-dialog.component';
import { MessagesReplyDialogComponent } from 'src/app/dialogs';
import { GoogleMapViewComponent } from '../../../../../standalone/google-map-view/google-map-view.component';
import { CatalogFeaturesViewComponent } from '../_partials/catalog-features-view/catalog-features-view.component';
import { CatalogGeneralDetailsComponent } from '../_partials/catalog-general-details/catalog-general-details.component';
import { CatalogViewSliderComponent } from '../_partials/catalog-view-slider/catalog-view-slider.component';
import { NgClass, NgTemplateOutlet, AsyncPipe, UpperCasePipe, DecimalPipe } from '@angular/common';
import { CatalogContactRequestDialogComponent } from 'src/app/dialogs/catalog-contact-request-dialog/catalog-contact-request-dialog.component';

@Component({
    selector: 'app-catalog-public-view',
    templateUrl: './catalog-public-view.component.html',
    styleUrls: ['./catalog-public-view.component.scss'],
    standalone: true,
    imports: [NgClass, RouterLink, CatalogViewSliderComponent, CatalogGeneralDetailsComponent, CatalogFeaturesViewComponent, NgTemplateOutlet, GoogleMapViewComponent, AsyncPipe, UpperCasePipe, DecimalPipe]
})
export class CatalogPublicViewComponent implements OnInit {

	itemObservable: Observable<Catalog> = this.gs.store.select(StoreSelector.CatalogSelectors.view);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogLoadingKey[`${EnumRxKey.Catalog.view}Loading`]);
	catalogFields: Observable<ApiResponseData | null> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.fields]);
	item_id: any = null;
	item: Catalog | null = null;
	Enums = Enums;

	constructor(
		public gs: GlobalService,
		private route: ActivatedRoute,
		public actionHelper: ActionsHelper,
		private confirmDialog: ConfirmDialogService,
		private modalService: NgbModal,
	) {
		this.item_id = route.snapshot.params['id'];
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe(data => {
			this.item_id = data.get('id');
			this.onLoadProduct();
		});
		this.itemObservable.subscribe(data => {
			this.item = new Catalog(data);
		});
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

	onLoadProduct() {
		let params = { primary_id: this.item_id }
		let action = StoreAction.CatalogParams({ method: 'GET', params: null, params2: params, key: EnumRxKey.Catalog.view });
		this.gs.store.dispatch(action);
	}

	contact() {
		if (!this.gs.identity) {
			this._applyDialog();
			return;
		}

		if (this.item?.is_owner(this.gs.identity?.id)) {
			this._confirm('You already manage this property');
			return
		}
		switch (this.gs.identity.role) {
			case Enums.ROLE_OWNER:
				if (this.is_manage) {
					this._confirm('You already owner role do not contact other owner');
				} else {
					//this._contactDialog();
					this._checkMessageId(this.item?.agreement?.manager);
					//this.gs.router(`/property-managers/view/${this.manager?.username}`);
				}
				break;
			case Enums.ROLE_MANAGERS:
				if (this.is_manage) {
					//this._contactDialog();
					this._checkMessageId(this.item?.agreement?.owner);
				} else {
					this._confirm('You already manager role do not contact other manager');
				}
				break;
			case Enums.ROLE_VENDORS:
			case Enums.ROLE_USER:
			case Enums.ROLE_GUEST:
			case Enums.ROLE_STAFF:
				//this._contactDialog();
				this._checkMessageId(this.is_manage ? this.item?.agreement?.owner : this.item?.agreement?.manager);
				break;
			default:
				break;
		}
	}

	private _checkMessageId(user: any) {
		/*if (user.message_id > 0) {
			this._contactDialog();
			return;
		}*/
		if (user.message_id === 0) {
			if(user.contact_id === Enums.USER_PROFILE_CONTACT_STATUS_NONE) {
				this._sendContactRequest();
				return
			}

			if(user.contact_id === Enums.USER_PROFILE_CONTACT_STATUS_PENDING) {
				this._confirm('You contact request is pending.');
				return
			}

			if(user.contact_id === Enums.USER_PROFILE_CONTACT_STATUS_DECLINED) {
				this._confirm('You contact request is declined.');
				return
			}
			return;
		}
		if (user.message_id) {
			this._sendMessage();
			return;
		}
	}

	protected _contactManagerDialog() {
		const modalRef = this.modalService.open(CatalogContactDialogComponent, {
			windowClass: 'center',
			keyboard: false,
			animation: true,
		});
		modalRef.componentInstance.item = this.item;
		modalRef.componentInstance.relation = this.is_manage ? AdditionalEnums.USER_CATALOG_ROLE_MANAGER : AdditionalEnums.USER_CATALOG_ROLE_OWNER;
		modalRef.componentInstance.contactUser = this.is_manage ? this.manager : this.owner;
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	protected _contactDialog() {
		const modalRef = this.modalService.open(CatalogContactDialogComponent, {
			windowClass: 'center',
			keyboard: false,
			animation: true,
		});
		modalRef.componentInstance.item = this.item;
		modalRef.componentInstance.relation = this.is_manage ? AdditionalEnums.USER_CATALOG_ROLE_MANAGER : AdditionalEnums.USER_CATALOG_ROLE_OWNER;
		modalRef.componentInstance.contactUser = this.is_manage ? this.manager : this.owner;
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	protected _applyDialog() {
		const modalRef = this.modalService.open(CatalogApplyDialogComponent, {
			windowClass: 'center',
			keyboard: false,
			animation: true,
		});
		modalRef.componentInstance.item = this.item;
		modalRef.componentInstance.relation = this.is_manage ? AdditionalEnums.USER_CATALOG_ROLE_MANAGER : AdditionalEnums.USER_CATALOG_ROLE_OWNER;
		modalRef.componentInstance.contactUser = this.is_manage ? this.manager : this.owner;
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});
	}

	protected _sendMessage() {
		const modalRef = this.modalService.open(MessagesReplyDialogComponent, {
			windowClass: 'center',
			keyboard: false,
			animation: true,
		});
		modalRef.componentInstance.item = this.is_manage ? this.manager : this.owner;
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
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

	ngOnDestroy() {
		this.gs.store.dispatch(StoreAction.CatalogList({ data: null, key: EnumRxKey.Catalog.view }));
	}

}
