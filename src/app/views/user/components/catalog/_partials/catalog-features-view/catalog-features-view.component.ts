import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AdditionalEnums, EnumRxKey } from 'src/app/enums';
import { Catalog } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreSelector } from 'src/app/store/selector';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
    selector: 'app-catalog-features-view, [app-catalog-features-view]',
    templateUrl: './catalog-features-view.component.html',
    styleUrls: ['./catalog-features-view.component.scss'],
    standalone: true,
    imports: [NgIf, JsonPipe]
})
export class CatalogFeaturesViewComponent {
	tagsTypesArray: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog['tag-types']]);
	@Input() item!: Catalog | null;
	AdditionalEnums = AdditionalEnums;
	mainCateTypes: any[] = [];
	amenitiesTypesArray: any[] = [];
	amenitiesArray: any = null;
	constructor(
		public gs: GlobalService,
		private cdr: ChangeDetectorRef
	) {

	}

	ngOnInit(): void {
		this.tagsTypesArray.subscribe(data => {
			if (data) {
				this.mainCateTypes = data;
				this._amenities_to_array();
			}
		});
		//this.amenitiesArray = this._amenities_to_array();
	}

	ngAfterViewInit() {
		//this.amenitiesTypesArray = this.mainCateTypes.map(p => { return { id: p.id, name: p.name, children: [] } });
		this.cdr.detectChanges(); // Manually trigger change detection
	}

	showMoreFeatures(items: any[]) {
		//console.log('items', items);
		let show: boolean = false;
		items.forEach(element => {
			if (element.name || element.description) show = true;
		});
		return show;
	}

	protected _amenities_to_array() {
		if(this.amenitiesTypesArray.length === 0) {
			this.amenitiesTypesArray = this.mainCateTypes.map((p: any) => { return { id: p.id, name: p.name, children: [] } });
		}
		let items = this.item?.userCatalogAmenities ?? [];
		if(items?.length > 0) {
			items.forEach((el: any) => {
				this.amenitiesTypesArray.forEach(val => {
					if (el.type === val.name) {
						let index = this.amenitiesTypesArray.findIndex(v => v.name === val.name);
						this.amenitiesTypesArray[index]?.children?.push(el);
					}
				});
			});
		}
		this.amenitiesArray = this.amenitiesTypesArray;
	}

	get isShowEmpty() {
		let isShow = false;
		isShow = this.amenitiesTypesArray.find(val => val.children?.length > 0) ? false : true;
		return isShow;
	}

}
