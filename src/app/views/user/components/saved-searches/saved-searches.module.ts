import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent, LayoutsModule } from 'src/app/layouts';
import { SharedModule } from 'src/app/shared/shared.module';
import { SavedListingItemComponent } from './saved-listing-item/saved-listing-item.component';
import { SavedListingComponent } from './saved-listing/saved-listing.component';
import { SavedSearchesComponent } from './saved-searches.component';
import { AuthGuard } from 'src/app/guards';

// Routers //
const routes: Routes = [
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
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        LayoutsModule,
        SavedSearchesComponent,
        SavedListingComponent,
        SavedListingItemComponent,
    ]
})
export class SavedSearchesModule { }
