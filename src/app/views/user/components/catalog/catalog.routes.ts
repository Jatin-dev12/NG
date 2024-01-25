import { Routes } from "@angular/router";
import { EnumRxKey } from "src/app/enums";
import { AuthGuard } from "src/app/guards";
import { getItem } from "src/app/helpers";
import { DashboardLayoutComponent, DefaultLayoutComponent } from "src/app/layouts";
import { CatalogAddNewComponent } from "src/app/views/user/components/catalog/catalog-add-new/catalog-add-new.component";
import { CatalogAgreementManagerPageComponent } from "src/app/views/user/components/catalog/catalog-agreement-manager-page/catalog-agreement-manager-page.component";
import { CatalogAgreementTenantPageComponent } from "src/app/views/user/components/catalog/catalog-agreement-tenant-page/catalog-agreement-tenant-page.component";
import { CatalogCreateComponent } from "src/app/views/user/components/catalog/catalog-create/catalog-create.component";
import { CatalogFavoritesComponent } from "src/app/views/user/components/catalog/catalog-favorites/catalog-favorites.component";
import { CatalogFormOwnerInfoComponent } from "src/app/views/user/components/catalog/catalog-form/catalog-form-owner-info/catalog-form-owner-info.component";
import { CatalogFormTenantInfoComponent } from "src/app/views/user/components/catalog/catalog-form/catalog-form-tenant-info/catalog-form-tenant-info.component";
import { CatalogFormComponent } from "src/app/views/user/components/catalog/catalog-form/catalog-form.component";
import { CatalogListingComponent } from "src/app/views/user/components/catalog/catalog-listing/catalog-listing.component";
import { CatalogPublicSearchComponent } from "src/app/views/user/components/catalog/catalog-public-search/catalog-public-search.component";
import { CatalogPublicViewComponent } from "src/app/views/user/components/catalog/catalog-public-view/catalog-public-view.component";
import { CatalogUpdateComponent } from "src/app/views/user/components/catalog/catalog-update/catalog-update.component";
import { CatalogViewComponent } from "src/app/views/user/components/catalog/catalog-view/catalog-view.component";
import { CatalogComponent } from "src/app/views/user/components/catalog/catalog.component";
import { CategoryListingComponent } from "src/app/views/user/components/catalog/category-listing/category-listing.component";
import { RentedListingComponent } from "src/app/views/user/components/catalog/rented/rented-listing/rented-listing.component";
import { RentedViewComponent } from "src/app/views/user/components/catalog/rented/rented-view/rented-view.component";
import { RentedComponent } from "src/app/views/user/components/catalog/rented/rented.component";


var token = getItem('token') ?? null;



export default [
    /*{
		path: '', redirectTo: 'search', pathMatch: 'full', children: [
			{ path: 'listing', component: CatalogPublicSearchComponent }
		]
	},*/
	// Public Pages Routers
	{ path: 'search', redirectTo: 'search/category', pathMatch: 'full' },

	{
		path: 'search', component: token ? DashboardLayoutComponent : DefaultLayoutComponent, children: [
			{ path: 'category', component: CategoryListingComponent, title: 'Category Page' },
			{ path: 'listing', component: CatalogPublicSearchComponent, title: 'Search Page' },
			//{ path: 'search', redirectTo: '/search/listing', pathMatch: 'full' },
			{ path: 'view/:id', component: CatalogPublicViewComponent, title: 'View Property' },
		],
	},

	{
		path: '', component: DashboardLayoutComponent, children: [
			//{ path: 'favorites', redirectTo: 'favorites/managers' },
			{
				path: 'favorites', component: CatalogComponent, canActivate: [AuthGuard], children: [
					{ path: 'managers', component: CatalogFavoritesComponent, title: 'Favorite Managers', data: { key: 'managers' } },
					{ path: 'owners', component: CatalogFavoritesComponent, title: 'Favorite Owners', data: { key: 'owners' } },
					{ path: 'venders', component: CatalogFavoritesComponent, title: 'Favorite Venders', data: { key: 'venders' } },
					{ path: 'tenants', component: CatalogFavoritesComponent, title: 'Favorite Tenants', data: { key: 'tenants' } },
					{ path: 'properies', component: CatalogFavoritesComponent, title: 'Favorite Properies', data: { key: 'properies' } },
				]
			},
			{ path: 'properties', redirectTo: 'properties/listing' },
			{
				path: 'properties', component: CatalogComponent, canActivate: [AuthGuard], children: [
					{ path: 'listing', component: CatalogListingComponent, data: { key: EnumRxKey.Catalog.listing, pageTitle: "My Property" }, title: 'Properties' },
					{ path: 'create', component: CatalogCreateComponent, title: 'Create Properties' },
					{ path: 'update/:id', component: CatalogUpdateComponent, title: 'Update Properties' },
					{ path: 'owner/:id', component: CatalogFormOwnerInfoComponent, title: 'Owner Info Properties' },
					{ path: 'tenant/:id', component: CatalogFormTenantInfoComponent, title: 'Tenant Info Properties' },
					{ path: 'add', redirectTo: 'add/create' },
					{
						path: 'add', component: CatalogAddNewComponent, children: [
							{ path: 'create', component: CatalogFormComponent, title: 'Add Property' },
							{ path: 'update/:id', component: CatalogFormComponent, title: 'Update Property' },
							{ path: 'owner/:id', component: CatalogFormOwnerInfoComponent, title: 'Property Owner Info' },
							{ path: 'tenant/:id', component: CatalogFormTenantInfoComponent, title: 'Property Tenant Info' },
						]
					},
					{ path: 'view/:id', component: CatalogViewComponent, title: 'View Properties' },
					{ path: 'manager-agreement/:id', component: CatalogAgreementManagerPageComponent, title: 'Mamager Agreement' },
					{ path: 'tenant-agreement/:id', component: CatalogAgreementTenantPageComponent, title: 'Tenant Agreement' },
				]
			},
			{ path: 'rented', redirectTo: 'rented/listing' },
			{
				path: 'rented', component: RentedComponent, canActivate: [AuthGuard], children: [
					{ path: 'listing', component: RentedListingComponent, title: 'Rented Properties' },
					{ path: 'view/:id', component: RentedViewComponent, title: 'View Rented Properties' },
				]
			},
		],
	},
] as Routes;