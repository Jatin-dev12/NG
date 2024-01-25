import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards";
import { DashboardLayoutComponent } from "src/app/layouts";
import { MarketingCreateComponent } from "./marketing-create/marketing-create.component";
import { MarketingListingComponent } from "./marketing-listing/marketing-listing.component";
import { MarketingUpdateComponent } from "./marketing-update/marketing-update.component";
import { MarketingViewComponent } from "./marketing-view/marketing-view.component";
import { MarketingComponent } from "./marketing.component";



export default [
    {
		path: '', component: DashboardLayoutComponent, canActivate: [AuthGuard], children: [
			{ path: 'marketing', redirectTo: 'marketing/listing' },
			{
				path: 'marketing', component: MarketingComponent, children: [
					{ path: 'listing', component: MarketingListingComponent, title: "Marketing Listing" },
					{ path: 'create', component: MarketingCreateComponent, title: "Marketing Create" },
					{ path: 'update/:id', component: MarketingUpdateComponent, title: "Marketing Update" },
					{ path: 'view/:id', component: MarketingViewComponent, title: "Marketing View" },
				]
			}, //
		]
	},
] as Routes;