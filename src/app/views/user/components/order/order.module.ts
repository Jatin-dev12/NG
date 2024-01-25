import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardLayoutComponent, LayoutsModule } from "src/app/layouts";
import { SharedModule } from "src/app/shared/shared.module";

import { OrderLayoutComponent } from './order-layout/order-layout.component';
import { OrderListingComponent } from './order-listing/order-listing.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';
import { OrderWriteReviewComponent } from './order-write-review/order-write-review.component';
import { MilestonesListingComponent } from './milestones-listing/milestones-listing.component';
import { MilestonesItemComponent } from './milestones-item/milestones-item.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { AuthGuard } from "src/app/guards";
import { EnumRxKey, Enums } from "src/app/enums";

// Routers //
const routes: Routes = [
	{
		path: '', component: DashboardLayoutComponent, canActivate: [AuthGuard], children: [
			{ path: 'booking', redirectTo: 'booking/my-bookings' },
			{
				path: 'booking', component: OrderLayoutComponent, children: [
					{ path: 'my-bookings', component: OrderListingComponent, data: { url: 'booking', layout: 'grid', is_assign: 0, key: EnumRxKey.Order.listing, key2: EnumRxKey.Order.listing, pageTitle: "Upcoming Bookings" } },

					{ path: 'past-bookings', component: OrderListingComponent, data: { url: 'booking', layout: 'grid', is_assign: 0, key: EnumRxKey.Order.past, key2: EnumRxKey.Order.past, pageTitle: "Past Bookings" } },

					{ path: 'cancelled-bookings', component: OrderListingComponent, data: { url: 'booking', layout: 'grid', is_assign: 0, key: EnumRxKey.Order.cancelled, key2: EnumRxKey.Order.cancelled, pageTitle: "Cancelled Bookings" } },

					{ path: 'disputed-bookings', component: OrderListingComponent, data: { url: 'booking', layout: 'grid', is_assign: 0, key: EnumRxKey.Order.disputed, key2: EnumRxKey.Order.disputed, pageTitle: "Disputed Bookings" } },
					{ path: 'completed-bookings', component: OrderListingComponent, data: { url: 'booking', layout: 'grid', is_assign: 0, key: EnumRxKey.Order.completed, key2: EnumRxKey.Order.completed, pageTitle: "Completed Bookings" } },

					{ path: 'request-bookings', component: OrderListingComponent, data: { url: 'booking', layout: 'grid', is_assign: 0, key: EnumRxKey.Order.pending, key2: EnumRxKey.Order.pending, pageTitle: "Request Bookings" } },

					{ path: 'declined-bookings', component: OrderListingComponent, data: { url: 'booking', layout: 'grid', is_assign: 0, key: EnumRxKey.Order.declined, key2: EnumRxKey.Order.declined, pageTitle: "Declined Bookings" } },

					{ path: 'view/:id', component: OrderViewComponent, data: { role: [Enums.Role.ROLE_OWNER, Enums.Role.ROLE_USER] } },

					{ path: 'write-review/:id', component: OrderWriteReviewComponent, data: { role: [Enums.Role.ROLE_USER] } },

					{ path: 'invoice/:id', component: OrderInvoiceComponent },
				]
			},
		],
	},
];


@NgModule({
	declarations: [
		OrderLayoutComponent,
		OrderListingComponent,
		OrderViewComponent,
		OrderInvoiceComponent,
		OrderWriteReviewComponent,
		MilestonesListingComponent,
		MilestonesItemComponent,

	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		LayoutsModule,
		NgSelectModule,
	],
	exports: [
		
	],
	providers: []
})
export class OrderModule {

}