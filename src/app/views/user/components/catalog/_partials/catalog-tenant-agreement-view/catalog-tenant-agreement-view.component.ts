import { Component, Input } from '@angular/core';
import { AdditionalEnums, EnumRxKey, Enums } from 'src/app/enums';
import { Catalog } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-catalog-tenant-agreement-view',
    templateUrl: './catalog-tenant-agreement-view.component.html',
    styleUrls: ['./catalog-tenant-agreement-view.component.scss'],
    standalone: true,
    imports: [RouterLink, CurrencyPipe, DatePipe]
})
export class CatalogTenantAgreementViewComponent {
	//tenant: UserCatalogOrdersReferences | null = null;
	@Input() item!: Catalog | null;
	Enums = Enums;
	acceptLoading: boolean = false;
	declineLoading: boolean = false;

	constructor(
		public gs: GlobalService,
		private itemService: ItemService,
		private confirmDialog: ConfirmDialogService,
	) {

	}

	/*get tenant() {
		let orderReferences = this.item?.agreement?.userCatalogOrdersReferences?.find(val => val.relation === AdditionalEnums.USER_CATALOG_ROLE_TENANT);
		return orderReferences;
	}*/

	get tenantRefrence() {
		return this.item?.agreement?.userCatalogOrdersReferences.find(val => val.relation === AdditionalEnums.USER_CATALOG_ROLE_TENANT);
	}

	get tenant() {
		return this.item?.agreement?.tenant ?? null
	}

	onLoad() {
		let params = { primary_id: this.item?.id }
		let action = StoreAction.CatalogParams({ method: 'GET', params: null, params2: params, key: EnumRxKey.Catalog.view });
		this.gs.store.dispatch(action);
	}

	accept() {
		this.confirmDialog.confirm({
			header: 'Accept?',
			icon: `<img src="${this.gs.imgUrl}/accept.svg" alt="" />`,
			message: "Are you sure you want to accept the Tenancy Agreement?"
		}, () => {
			//this.gs.store.dispatch(StoreAction.CatalogParams({ method: "DELETE", params: null, params2: { primary_id: this.item?.id }, key: `delete-${EnumRxKey.Catalog.listing}`, url: '/properties' }))
			this.itemService.reference("POST", { form: { status: 2 } }, { primary_id: this.tenantRefrence?.id }).subscribe(response => {
				this.gs.alert('You have successfully accepted the tenancy agreement');
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
			message: "Are you sure you want to reject the Tenancy Agreement?"
		}, () => {
			//this.gs.store.dispatch(StoreAction.CatalogParams({ method: "DELETE", params: null, params2: { primary_id: this.item?.id }, key: `delete-${EnumRxKey.Catalog.listing}`, url: '/properties' }))
			this.itemService.reference("POST", { form: { status: 3 } }, { primary_id: this.tenantRefrence?.id }).subscribe(response => {
				this.onLoad();
				this.gs.alert('You have successfully declined tenancy agreement.', 'danger');
			})
		}, () => {
			console.log('No clicked');
		});
	}

}
