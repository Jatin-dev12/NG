import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MessagesReplyDialogComponent } from 'src/app/dialogs';
import { EnumRxKey, Enums, AdditionalEnums } from 'src/app/enums';
import { Catalog } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-catalog-agreement-manager-page',
    templateUrl: './catalog-agreement-manager-page.component.html',
    styleUrls: ['./catalog-agreement-manager-page.component.scss'],
    standalone: true,
    imports: [RouterLink, DatePipe]
})
export class CatalogAgreementManagerPageComponent {
	CatalogRxKey = EnumRxKey.Catalog;
	itemObservable: Observable<Catalog> = this.gs.store.select(StoreSelector.CatalogSelectors.view);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogLoadingKey[`${EnumRxKey.Catalog.view}Loading`]);
	item_id: any = null;
	item: Catalog | null = null;
	Enums = Enums;
	AdditionalEnums = AdditionalEnums;
	acceptLoading: boolean = false;

	constructor(
		public gs: GlobalService,
		private confirmDialog: ConfirmDialogService,
		private route: ActivatedRoute,
		private modalService: NgbModal,
		private itemService: ItemService
	) {
		this.item_id = this.route.snapshot.params['id'];
	}

	ngOnInit(): void {
		this.onLoad();
		this.itemObservable.subscribe(data => this.item = new Catalog(data));
		//console.log(inject(Enums.Base) )
	}

	get manager() {
		return this.item?.agreement?.manager;
	}

	get owner() {
		return this.item?.owner;
	}

	get ownerRefrence() {
		return this.item?.agreement?.userCatalogOrdersReferences.find(val => val.relation === AdditionalEnums.USER_CATALOG_ROLE_OWNER) ?? null;
	}

	get managerRefrence() {
		return this.item?.agreement?.userCatalogOrdersReferences.find(val => val.relation === AdditionalEnums.USER_CATALOG_ROLE_MANAGER) ?? null;
	}

	get is_manage() {
		return (this.item?.owner_id === this.item?.user_id);
	}
	

	onLoad() {
		let params = { primary_id: this.item_id }
		let action = StoreAction.CatalogParams({ method: 'GET', params: null, params2: params, key: EnumRxKey.Catalog.view });
		this.gs.store.dispatch(action);
	}

	sendMessage() {
		const modalRef = this.modalService.open(MessagesReplyDialogComponent, {
			windowClass: 'center',
			keyboard: false,
			animation: true,
		});
		modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			console.log('reason', reason)
		});
	}

	accept() {
		this.confirmDialog.confirm({
			header: 'Accept?',
			icon: `<img src="${this.gs.imgUrl}/accept.svg" alt="" />`,
			message: "Are you sure you want to Accept the Management Agreement?"
		}, () => {
			//this.gs.store.dispatch(StoreAction.CatalogParams({ method: "DELETE", params: null, params2: { primary_id: this.item?.id }, key: `delete-${EnumRxKey.Catalog.listing}`, url: '/properties' }))
			this.itemService.reference("POST", { form: { status: 2 } }, { primary_id: this.ownerRefrence?.id }).subscribe(response => {
				this.gs.alert('You have successfully accepted the management agreement.');
				this.onLoad();
			})
		}, () => {
			console.log('No clicked');
		});
	}

	decline() {
		this.confirmDialog.confirm({
			header: 'Reject?',
			icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
			message: "Are you sure you want to Reject the Management Agreement?"
		}, () => {
			//this.gs.store.dispatch(StoreAction.CatalogParams({ method: "DELETE", params: null, params2: { primary_id: this.item?.id }, key: `delete-${EnumRxKey.Catalog.listing}`, url: '/properties' }))
			this.itemService.reference("POST", { form: { status: 3 } }, { primary_id: this.ownerRefrence?.id }).subscribe(response => {
				this.gs.alert('You have successfully declined management agreement.', 'danger');
				this.onLoad();
			})
		}, () => {
			console.log('No clicked');
		});
	}

	terminate() {
		alert("Coming")
	}

	ngOnDestroy() {
		this.gs.store.dispatch(StoreAction.CatalogList({ data: null, key: EnumRxKey.Catalog.view }));
	}
}
