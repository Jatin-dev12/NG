import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards";
import { DashboardLayoutComponent } from "src/app/layouts";
import { StaffsCreateComponent } from "./staffs-create/staffs-create.component";
import { StaffsListingComponent } from "./staffs-listing/staffs-listing.component";
import { StaffsUpdatateComponent } from "./staffs-updatate/staffs-updatate.component";
import { StaffsViewComponent } from "./staffs-view/staffs-view.component";
import { StaffsComponent } from "./staffs.component";



export default [
    {
		path: '', component: DashboardLayoutComponent, canActivate: [AuthGuard], children: [
			{ path: 'staffs', redirectTo: 'staffs/listing' },
			{
				path: 'staffs', component: StaffsComponent, children: [
					{ path: 'listing', component: StaffsListingComponent, title: "Staffs" },
					{ path: 'create', component: StaffsCreateComponent, title: "Staff Create" },
					{ path: 'update/:id', component: StaffsUpdatateComponent, title: "Staff Update" },
					{ path: 'view/:id', component: StaffsViewComponent, title: "Staff View" },
				]
			},
		]
	},
] as Routes;