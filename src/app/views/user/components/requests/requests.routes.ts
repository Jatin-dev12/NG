import { Routes } from "@angular/router";
import { Enums } from "src/app/enums";
import { AuthGuard, RoleGuard } from "src/app/guards";
import { DashboardLayoutComponent } from "src/app/layouts";
import { IssuedRequestsComponent } from "./issued-requests/issued-requests.component";
import { ProposalListingComponent } from "./proposals/proposal-listing/proposal-listing.component";
import { ProposalViewComponent } from "./proposals/proposal-view/proposal-view.component";
import { ProposalsComponent } from "./proposals/proposals.component";
import { ReceivedListingComponent } from "./received/received-listing/received-listing.component";
import { ReceivedComponent } from "./received/received.component";
import { RequestCreateComponent } from "./request-create/request-create.component";
import { RequestListingComponent } from "./request-listing/request-listing.component";
import { RequestViewComponent } from "./request-view/request-view.component";
import { RequestsComponent } from "./requests.component";



export default [
    {
		path: '', component: DashboardLayoutComponent, canActivate: [AuthGuard], children: [
			//{ path: 'dashboard', component: UserDashboardComponent, title: "Dashboard" },
			{ path: 'requests', redirectTo: 'requests/issued' },
			{
				path: 'requests', component: RequestsComponent, children: [
					// { path: 'create', component: RequestCreateComponent, title: "Create Request" },
					// { path: 'update/:id', component: RequestUpdateComponent, title: "Requests Update" },
					{ path: 'view/:id', component: RequestViewComponent, title: "Requests View", data: { key: 'issue', relation: 'all' } },

					{ path: 'request-owner', component: RequestCreateComponent, title: "Request Owner", canActivate: [RoleGuard], data: { role: [Enums.ROLE_MANAGERS] } },
					{ path: 'request-manager', component: RequestCreateComponent, title: "Request Manager" },
					{ path: 'request-vendor', component: RequestCreateComponent, title: "Request Vendor" },
					// { path: 'request-tenant', component: RequestCreateComponent, title: "Request Tenant" },

					{ path: 'issued', redirectTo: 'issued/pending-requests' },
					{
						path: 'issued', component: IssuedRequestsComponent, children: [
							{ path: 'pending-requests', component: RequestListingComponent, title: "Pending Requests", data: { status: '1' } },
							{ path: 'requests-history', component: RequestListingComponent, title: "Requests History", data: { status: '1,2,3,4' } },
							{ path: 'view/:id', component: RequestViewComponent, title: "Requests View", data: { key: 'issue', relation: 'all' } },
						]
					},

					//{ path: 'received', redirectTo: 'received/pending-requests' },  canActivate: [RoleGuard], data: { role: [Enums.ROLE_USER] }
					{
						path: 'received', component: ReceivedComponent, title: "Received Requests", children: [
							{
								path: 'owner', component: IssuedRequestsComponent, children: [
									{ path: 'pending-requests', component: ReceivedListingComponent, title: "Pending Requests", data: { relation: 'owner', status: '1' } },
									{ path: 'requests-history', component: ReceivedListingComponent, title: "Requests History", data: { relation: 'owner', status: '1,2,3,4' } },
									{ path: 'view/:id', component: RequestViewComponent, title: "Requests View", data: { key: 'received', relation: 'owner' } },
								]
							},
							{
								path: 'manager', component: IssuedRequestsComponent, children: [
									{ path: 'pending-requests', component: ReceivedListingComponent, title: "Pending Requests", data: { relation: 'manager', status: '1' } },
									{ path: 'requests-history', component: ReceivedListingComponent, title: "Requests History", data: { relation: 'manager', status: '1,2,3,4' } },
									{ path: 'view/:id', component: RequestViewComponent, title: "Requests View", data: { key: 'received', relation: 'manager' } },
								]
							},
							{
								path: 'vendor', component: IssuedRequestsComponent, children: [
									{ path: 'pending-requests', component: ReceivedListingComponent, title: "Pending Requests", data: { relation: 'vendor', status: '1' } },
									{ path: 'requests-history', component: ReceivedListingComponent, title: "Requests History", data: { relation: 'vendor', status: '1,2,3,4' } },
									{ path: 'view/:id', component: RequestViewComponent, title: "Requests View", data: { key: 'received', relation: 'vendor' } },
								]
							},
							{
								path: 'tenant', component: IssuedRequestsComponent, children: [
									{ path: 'pending-requests', component: ReceivedListingComponent, title: "Pending Requests", data: { relation: 'tenant', status: '1' } },
									{ path: 'requests-history', component: ReceivedListingComponent, title: "Requests History", data: { relation: 'tenant', status: '1,2,3,4' } },
									{ path: 'view/:id', component: RequestViewComponent, title: "Requests View", data: { key: 'received', relation: 'tenant' } },
								]
							},
							{ path: 'view/:id', component: RequestViewComponent, title: "Requests View", data: { key: 'received', relation: 'all' } },
						]
					},



					//{ path: 'contact', redirectTo: 'contact/pending-requests' },
					{
						path: 'contact', component: ProposalsComponent, children: [
							{ path: 'pending-requests', component: ProposalListingComponent, title: "Pending Requests", data: { status: '1,5', url: 'pending-requests', parent_title: "Request received for proposal" } },
							{ path: 'requests-history', component: ProposalListingComponent, title: "Requests History", data: { status: '0,2,3,4,5', url: 'requests-history', parent_title: "Request received for proposal" } },
							{ path: 'send-pending-requests', component: ProposalListingComponent, title: "Pending Requests", data: { status: '1,5', url: 'send-pending-requests', parent_title: "Request sent for proposal" } },
							{ path: 'send-requests-history', component: ProposalListingComponent, title: "Requests History", data: { status: '0,2,3,4,5', url: 'send-requests-history', parent_title: "Request sent for proposal" } },
							{ path: 'view/:id', component: ProposalViewComponent, title: "Contact View" },
						]
					}
				]
			},
		]
	},
] as Routes;