import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AdditionalEnums, EnumRxKey, Enums } from 'src/app/enums';
import { ApiResponseData, Catalog } from 'src/app/models';
import { ConfirmDialogService, LaddaDirective } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { UpperCasePipe, LowerCasePipe, DecimalPipe, NgClass } from '@angular/common';
import { CatalogTenantBoxViewComponent } from '../_partials/catalog-tenant-box-view/catalog-tenant-box-view.component';
import { CatalogOwnerBoxViewComponent } from '../_partials/catalog-owner-box-view/catalog-owner-box-view.component';
import { CatalogManagerBoxViewComponent } from '../_partials/catalog-manager-box-view/catalog-manager-box-view.component';
import { CatalogFeaturesViewComponent } from '../_partials/catalog-features-view/catalog-features-view.component';
import { CatalogGeneralDetailsComponent } from '../_partials/catalog-general-details/catalog-general-details.component';
import { CatalogViewSliderComponent } from '../_partials/catalog-view-slider/catalog-view-slider.component';
import { GoogleMapViewComponent } from 'src/app/standalone';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogRepostDialogComponent } from 'src/app/dialogs';

@Component({
    selector: 'app-catalog-view',
    templateUrl: './catalog-view.component.html',
    styleUrls: ['./catalog-view.component.scss'],
    standalone: true,
    imports: [RouterLink, LaddaDirective, CatalogViewSliderComponent, CatalogGeneralDetailsComponent, CatalogFeaturesViewComponent, CatalogManagerBoxViewComponent, CatalogOwnerBoxViewComponent, CatalogTenantBoxViewComponent, GoogleMapViewComponent, UpperCasePipe, LowerCasePipe, DecimalPipe, NgClass]
})
export class CatalogViewComponent implements OnInit {
	CatalogRxKey = EnumRxKey.Catalog;
	itemObservable: Observable<Catalog> = this.gs.store.select(StoreSelector.CatalogSelectors.view);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogLoadingKey[`${EnumRxKey.Catalog.view}Loading`]);
	catalogFields: Observable<ApiResponseData | null> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.fields]);
	tagsTypesArray: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog['tag-types']]);
	item_id: any = null;
	item: Catalog | null = null;
	Enums = Enums;
	AdditionalEnums = AdditionalEnums;
	repostLoading: boolean = false;

	constructor(
		public gs: GlobalService,
		private confirmDialog: ConfirmDialogService,
		private route: ActivatedRoute,
		private itemService: ItemService,
		private modalService: NgbModal,
	) {
		this.item_id = this.route.snapshot.params['id'];
	}

	ngOnInit(): void {
		this.OnLoadProduct();
		this.itemObservable.subscribe(data => this.item = new Catalog(data));
		this.tagsTypesArray.subscribe(data => {
			(data === null) && this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { key: EnumRxKey.Catalog['tag-types'], size: 500 }, key: EnumRxKey.Catalog['tag-types'] }));
		});
	}

	get is_manage() {
		return (this.item?.owner_id === this.item?.user_id);
	}

	get is_tenant() {
		let orderReferences = this.item?.agreement?.userCatalogOrdersReferences?.find(val => val.relation === AdditionalEnums.USER_CATALOG_ROLE_TENANT);
		return orderReferences ? true : false;
	}

	get is_property_disabled() {
		let is_show = false;
		if(this.gs.is_owner) {
			is_show = this.item?.is_agreement;
		}
		if(this.gs.is_manager) {
			is_show = this.item?.is_agreement || this.item?.is_contract;
		}
		return is_show;
	}

	OnLoadProduct() {
		let params = { primary_id: this.item_id }
		let action = StoreAction.CatalogParams({ method: 'GET', params: null, params2: params, key: EnumRxKey.Catalog.view });
		this.gs.store.dispatch(action);
	}

	remove() {
		if(this.gs.is_owner && this.item?.is_rented === 'rented') {
			this.confirmDialog.confirm({
				header: 'Warning',
				icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
				message: "Your property already rented, So you can not delete this property.",
				acceptLabel: 'Okay',
				rejectVisible: false,
				rejectLabel: "Cancel",
			}, () => {
				
			}, () => {
				console.log('No clicked');
			});
			return;
		}
		if(this.gs.is_manager && this.item?.is_contract) {
			this.confirmDialog.confirm({
				header: 'Warning',
				icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
				message: "You are unable to delete this property because the property owner has approved it.",
				acceptLabel: 'Okay',
				rejectVisible: false,
				rejectLabel: "Cancel",
			}, () => {
				
			}, () => {
				console.log('No clicked');
			});
			return;
		}
		this.confirmDialog.confirm({
			header: 'Delete Property',
			icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
			message: "Are you sure you want to delete the property?",
			acceptLabel: 'Delete',
			rejectLabel: "Cancel",
		}, () => {
			this.gs.store.dispatch(StoreAction.CatalogParams({ method: "DELETE", params: null, params2: { primary_id: this.item?.id }, key: `delete-${EnumRxKey.Catalog.listing}`, url: '/properties', msg: "You have successfully deleted the property" }))
		}, () => {
			console.log('No clicked');
		});
	}

	rePost() {
		const modalRef = this.modalService.open(CatalogRepostDialogComponent, {
			windowClass: 'center',
			backdrop: 'static',
			keyboard: false,
			animation: true,
			centered: true,
			size: 'sm',
		});
		modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			if (!result) return;
			console.log('result', result)
		}, (reason) => {
			console.log('reason', reason);
		});
		return;

		this.confirmDialog.confirm({
			message: 'Are you sure to repost this property?'
		}, () => {
			/*this.repostLoading = true;
			if(this.gs.is_owner) {

			}
			if(this.gs.is_manager) {
				
			}*/
			let params: any = {};
			let params2 = { key: EnumRxKey.Catalog.duplicate, moduleId: Enums.USER_CATALOG_MODULE_ID_JOBS, primary_id: this.item_id }
			this.itemService.catalog("POST", null, params2).subscribe(response => {
				this.repostLoading = false;
				let data = response.data;
				this.gs.router(`/properties/add/update/${data.id}`);
				this.gs.alert('You have successfuly reposted this property');
			}, (error: Response) => {
				this.repostLoading = false;
			});
		}, () => {
			console.log('No clicked');
		});
	}

	ngOnDestroy() {
		this.gs.store.dispatch(StoreAction.CatalogList({ data: null, key: EnumRxKey.Catalog.view}));
	}

}
