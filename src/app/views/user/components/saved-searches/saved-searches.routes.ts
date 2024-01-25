import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards";
import { DashboardLayoutComponent } from "src/app/layouts";
import { SavedListingComponent } from "./saved-listing/saved-listing.component";
import { SavedSearchesComponent } from "./saved-searches.component";




export default [
    {
		path: '', component: DashboardLayoutComponent, canActivate: [AuthGuard], children: [
			{ path: 'saved-searches', redirectTo: 'saved-searches/listing' },
			{
				path: 'saved-searches', component: SavedSearchesComponent, children: [
					{ path: 'listing', component: SavedListingComponent, title: "Saved Searches" },
				]
			},
		]
	},
] as Routes;