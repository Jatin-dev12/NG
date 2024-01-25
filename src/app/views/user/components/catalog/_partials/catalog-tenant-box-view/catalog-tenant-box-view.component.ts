import { Component, Input } from '@angular/core';
import { AdditionalEnums, Enums } from 'src/app/enums';
import { Catalog } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-catalog-tenant-box-view',
    templateUrl: './catalog-tenant-box-view.component.html',
    styleUrls: ['./catalog-tenant-box-view.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class CatalogTenantBoxViewComponent {
	@Input() item!: Catalog | null;
	Enums = Enums;
	constructor(
		public gs: GlobalService,
	) {

	}


	get tenantRefrence() {
		return this.item?.agreement?.userCatalogOrdersReferences.find(val => val.relation === AdditionalEnums.USER_CATALOG_ROLE_TENANT);
	}

	get tenant() {
		return this.item?.agreement?.tenant ?? null
	}


}
