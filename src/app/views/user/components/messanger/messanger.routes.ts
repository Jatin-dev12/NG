import { Routes } from "@angular/router";
import { DashboardLayoutComponent } from "src/app/layouts";
import { MessageLayoutComponent } from "./message-layout/message-layout.component";
import { AuthGuard } from "src/app/guards";


export default [
    { path: 'contacts', component: DashboardLayoutComponent, children: [
		{ path: '', component: MessageLayoutComponent, title: "Contacts", canActivate: [AuthGuard] },
	]},
] as Routes;