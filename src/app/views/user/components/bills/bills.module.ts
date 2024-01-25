import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthGuard } from 'src/app/guards';
import { OneToOneChatComponent } from 'src/app/standalone';
import { DashboardLayoutComponent, LayoutsModule } from 'src/app/layouts';
import { SharedModule } from 'src/app/shared/shared.module';


import { BillStatusDialogComponent } from './_partials/bill-status-dialog/bill-status-dialog.component';
import { BillCreateComponent } from './bill-create/bill-create.component';
import { BillFormComponent } from './bill-form/bill-form.component';
import { BillUpdateComponent } from './bill-update/bill-update.component';

import { BillViewComponent } from './bill-view/bill-view.component';
import { BillsComponent } from './bills.component';
import { IssuedComponent } from './issued/issued.component';
import { IssuedListingComponent } from './issued/issued-listing/issued-listing.component';
import { IssuedListingItemComponent } from './issued/issued-listing-item/issued-listing-item.component';
import { ReceivedComponent } from './received/received.component';
import { ReceivedListingComponent } from './received/received-listing/received-listing.component';
import { ReceivedListingItemComponent } from './received/received-listing-item/received-listing-item.component';
import { BillFormOwnerComponent } from './bill-form-owner/bill-form-owner.component';
import { BillFormManagerComponent } from './bill-form-manager/bill-form-manager.component';
import { BillFormTenantComponent } from './bill-form-tenant/bill-form-tenant.component';
import { BillFormVendorComponent } from './bill-form-vendor/bill-form-vendor.component';



// Routers // issued / received
const routes: Routes = [
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
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        LayoutsModule,
        CarouselModule,
        OneToOneChatComponent,
        MatNativeDateModule,
        MatDatepickerModule,
        BillsComponent,
        BillCreateComponent,
        BillUpdateComponent,
        BillFormComponent,
        BillStatusDialogComponent,
        BillViewComponent,
        IssuedComponent,
        IssuedListingComponent,
        IssuedListingItemComponent,
        ReceivedComponent,
        ReceivedListingComponent,
        ReceivedListingItemComponent,
        BillFormOwnerComponent,
        BillFormManagerComponent,
        BillFormTenantComponent,
        BillFormVendorComponent
    ]
})
export class BillsModule { }
