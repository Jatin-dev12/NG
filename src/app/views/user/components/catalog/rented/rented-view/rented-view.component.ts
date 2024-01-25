import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums, AdditionalEnums } from 'src/app/enums';
import { Catalog, ApiResponseData } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe, UpperCasePipe, DecimalPipe } from '@angular/common';
import { GoogleMapViewComponent } from '../../../../../../standalone/google-map-view/google-map-view.component';
import { CatalogTenantAgreementViewComponent } from '../../_partials/catalog-tenant-agreement-view/catalog-tenant-agreement-view.component';
import { CatalogOwnerBoxViewComponent } from '../../_partials/catalog-owner-box-view/catalog-owner-box-view.component';
import { CatalogManagerBoxViewComponent } from '../../_partials/catalog-manager-box-view/catalog-manager-box-view.component';
import { CatalogFeaturesViewComponent } from '../../_partials/catalog-features-view/catalog-features-view.component';
import { CatalogGeneralDetailsComponent } from '../../_partials/catalog-general-details/catalog-general-details.component';
import { CatalogViewSliderComponent } from '../../_partials/catalog-view-slider/catalog-view-slider.component';

@Component({
    selector: 'app-rented-view',
    templateUrl: './rented-view.component.html',
    styleUrls: ['./rented-view.component.scss'],
    standalone: true,
    imports: [RouterLink, CatalogViewSliderComponent, CatalogGeneralDetailsComponent, CatalogFeaturesViewComponent, CatalogManagerBoxViewComponent, CatalogOwnerBoxViewComponent, CatalogTenantAgreementViewComponent, GoogleMapViewComponent, AsyncPipe, UpperCasePipe, DecimalPipe]
})
export class RentedViewComponent {
	CatalogRxKey = EnumRxKey.Catalog;
	itemObservable: Observable<Catalog> = this.gs.store.select(StoreSelector.CatalogSelectors.view);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogLoadingKey[`${EnumRxKey.Catalog.view}Loading`]);
	catalogFields: Observable<ApiResponseData | null> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.fields]);
	tagsTypesArray: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog['tag-types']]);
	item_id: any = null;
	item: Catalog | null = null;
	mainCateTypes: any[] = [];
	amenitiesTypesArray: any[] = [];
	Enums = Enums;
	AdditionalEnums = AdditionalEnums;

	constructor(
		public gs: GlobalService,
		private confirmDialog: ConfirmDialogService,
		private route: ActivatedRoute
	) {
		this.item_id = this.route.snapshot.params['id'];
	}

	ngOnInit(): void {
		this.onLoad();
		this.itemObservable.subscribe(data => this.item = new Catalog(data));
		this.tagsTypesArray.subscribe(data => {
			(data === null) && this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { key: EnumRxKey.Catalog['tag-types'], size: 500 }, key: EnumRxKey.Catalog['tag-types'] }));
			if (data) {
				this.mainCateTypes = data;
				//this.amenitiesTypesArray = this.mainCateTypes.map(p => { return { id: p.id, name: p.name, slug: p.slug, children: [] } });
				//this.cateTypesArray = this.mainCateTypes.map(p => { return { id: p.id, name: p.name, slug: p.slug, children: [] } });
			}
		});

		//console.log(inject(Enums.Base) )
	}

	onLoad() {
		let params = { primary_id: this.item_id }
		let action = StoreAction.CatalogParams({ method: 'GET', params: null, params2: params, key: EnumRxKey.Catalog.view });
		this.gs.store.dispatch(action);
	}

	get Manager() {
		return this.item?.order?.manager;
	}

	get Owner() {
		return this.item?.owner;
	}

	get is_manage() {
		return (this.item?.owner_id === this.item?.user_id);
	}

	Remove() {
		this.confirmDialog.confirm({
			message: "Are you sure you want to delete this property?"
		}, () => {
			this.gs.store.dispatch(StoreAction.CatalogParams({ method: "DELETE", params: null, params2: { primary_id: this.item?.id }, key: `delete-${EnumRxKey.Catalog.listing}`, url: '/properties' }))
		}, () => {
			console.log('No clicked');
		});
	}

	Repost() {
		this.confirmDialog.confirm({
			message: 'Lorem'
		}, () => {

		}, () => {
			console.log('No clicked');
		});
	}

	showMoreFeatures(items: any[]) {
		//console.log('items', items);
		let show: boolean = false;
		items.forEach(element => {
			if (element.name || element.description) show = true;
		});
		return show;
	}

	get amenitiesArray() {
		if(this.amenitiesTypesArray.length === 0) {
			this.amenitiesTypesArray = this.mainCateTypes.map(p => { return { id: p.id, name: p.name, children: [] } });
		}
		let items = this.item?.userCatalogAmenities ?? [];
		items.forEach((el: any) => {
			this.amenitiesTypesArray.forEach(val => {
				if (el.type === val.name) {
					let index = this.amenitiesTypesArray.findIndex(v => v.name === val.name);
					this.amenitiesTypesArray[index]?.children?.push(el);
				}
			});
		});
		//console.log('items', items, this.amenitiesTypesArray);
		return this.amenitiesTypesArray;
	}

	ngOnDestroy() {
		this.gs.store.dispatch(StoreAction.CatalogList({ data: null, key: EnumRxKey.Catalog.view }));
	}
}
