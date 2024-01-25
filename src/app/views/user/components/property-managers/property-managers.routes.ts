import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards";
import { DashboardLayoutComponent } from "src/app/layouts";
import { PropertyManagersComponent } from "./property-managers.component";
import { SearchManagersListingComponent } from "./search/search-managers-listing/search-managers-listing.component";
import { SearchManagersViewComponent } from "./search/search-managers-view/search-managers-view.component";


export default [
    {
		path: '', component: DashboardLayoutComponent, canActivate: [AuthGuard], children: [
			{ path: 'property-managers', redirectTo: 'property-managers/listing' },
			{
				path: 'property-managers', component: PropertyManagersComponent, children: [
					{ path: 'listing', component: SearchManagersListingComponent, title: "Property Listing" },
					{ path: 'view/:id', component: SearchManagersViewComponent, title: "Property View" },
				]
			},
		]
	},
] as Routes;