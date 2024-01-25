import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards";
import { DashboardLayoutComponent } from "src/app/layouts";
import { BillCreateComponent } from "./bill-create/bill-create.component";
import { BillViewComponent } from "./bill-view/bill-view.component";
import { BillsComponent } from "./bills.component";
import { IssuedListingComponent } from "./issued/issued-listing/issued-listing.component";
import { IssuedComponent } from "./issued/issued.component";
import { ReceivedListingComponent } from "./received/received-listing/received-listing.component";
import { ReceivedComponent } from "./received/received.component";


export default [
    {
		path: '', component: DashboardLayoutComponent, canActivate: [AuthGuard], children: [
			{ path: 'bills', redirectTo: 'bills/issued' },
			{
				path: 'bills', component: BillsComponent, children: [
					{ path: 'bill-owner', component: BillCreateComponent, title: "Bill Owner", },
					{ path: 'bill-manager', component: BillCreateComponent, title: "Bill Manager" },
					{ path: 'bill-vendor', component: BillCreateComponent, title: "Bill Vendor" },
					{ path: 'bill-tenant', component: BillCreateComponent, title: "Bill Tenant" },

					{ path: 'issued', redirectTo: 'issued/pending-requests' },
					{
						path: 'issued', component: IssuedComponent, children: [
							{ path: 'pending-requests', component: IssuedListingComponent, title: "Pending Bills", data: { status: '1' } },
							{ path: 'requests-history', component: IssuedListingComponent, title: "Bills History", data: { status: '1,2,3,4' } },
							{ path: 'view/:id', component: BillViewComponent, title: "Bill View", data: { key: 'issue', relation: 'all' } },
						]
					},

					{
						path: 'received', component: ReceivedComponent, title: "Received Requests", children: [
							{
								path: 'owner', component: BillsComponent, children: [
									{ path: 'pending-requests', component: ReceivedListingComponent, title: "Pending Bill", data: { relation: 'owner', status: '1' } },
									{ path: 'requests-history', component: ReceivedListingComponent, title: "Bill History", data: { relation: 'owner', status: '1,2,3,4' } },
									{ path: 'view/:id', component: BillViewComponent, title: "Bill View", data: { key: 'received', relation: 'owner' } },
								]
							},
							{
								path: 'manager', component: BillsComponent, children: [
									{ path: 'pending-requests', component: ReceivedListingComponent, title: "Pending Bill", data: { relation: 'manager', status: '1' } },
									{ path: 'requests-history', component: ReceivedListingComponent, title: "Bill History", data: { relation: 'manager', status: '1,2,3,4' } },
									{ path: 'view/:id', component: BillViewComponent, title: "Bill View", data: { key: 'received', relation: 'manager' } },
								]
							},
							{
								path: 'vendor', component: BillsComponent, children: [
									{ path: 'pending-requests', component: ReceivedListingComponent, title: "Pending Bill", data: { relation: 'vendor', status: '1' } },
									{ path: 'requests-history', component: ReceivedListingComponent, title: "Bill History", data: { relation: 'vendor', status: '1,2,3,4' } },
									{ path: 'view/:id', component: BillViewComponent, title: "Bill View", data: { key: 'received', relation: 'vendor' } },
								]
							},
							{
								path: 'tenant', component: BillsComponent, children: [
									{ path: 'pending-requests', component: ReceivedListingComponent, title: "Pending Bill", data: { relation: 'tenant', status: '1' } },
									{ path: 'requests-history', component: ReceivedListingComponent, title: "Bill History", data: { relation: 'tenant', status: '1,2,3,4' } },
									{ path: 'view/:id', component: BillViewComponent, title: "Bill View", data: { key: 'received', relation: 'tenant' } },
								]
							},
							{ path: 'view/:id', component: BillViewComponent, title: "Bill View", data: { key: 'received', relation: 'all' } },
						]
					},


					/*
					{ path: 'listing', component: BillListingComponent, title: "Bills Listing" },
					{ path: 'create', component: BillCreateComponent, title: "Bills Create" },
					{ path: 'update/:id', component: BillUpdateComponent, title: "Bills Update" },
					*/
					{ path: 'view/:id', component: BillViewComponent, title: "Bills View" },
				]
			},
		]
	},
] as Routes;