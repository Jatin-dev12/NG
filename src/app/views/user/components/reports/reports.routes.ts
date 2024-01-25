import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards";
import { DashboardLayoutComponent } from "src/app/layouts";
import { ReportCreateComponent } from "./report-create/report-create.component";
import { ReportListingComponent } from "./report-listing/report-listing.component";
import { ReportUpdateComponent } from "./report-update/report-update.component";
import { ReportViewComponent } from "./report-view/report-view.component";
import { ReportsComponent } from "./reports.component";


export default [
    {
		path: '', component: DashboardLayoutComponent, canActivate: [AuthGuard], children: [
			{ path: 'reports', redirectTo: 'reports/listing' },
			{
				path: 'reports', component: ReportsComponent, children: [
					{ path: 'listing', component: ReportListingComponent, title: "Reports Listing" },
					{ path: 'create', component: ReportCreateComponent, title: "Reports Create" },
					{ path: 'update/:id', component: ReportUpdateComponent, title: "Reports Update" },
					{ path: 'view/:id', component: ReportViewComponent, title: "Reports View" },
				]
			},
		]
	},
] as Routes;