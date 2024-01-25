import { Routes } from '@angular/router';
import { NotFoundComponent } from './views/default/components/not-found/not-found.component';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./views/default/default.routes') },
	{ path: '', loadChildren: () => import('./views/auth/auth.routes') },
	{ path: '', loadChildren: () => import('./views/user/user.routes') },
	{ path: '', loadChildren: () => import('./views/user/components/catalog/catalog.routes') },
	{ path: '', loadChildren: () => import('./views/user/components/messanger/messanger.routes') },
	{ path: '', loadChildren: () => import('./views/user/components/marketing/marketing.routes') },
	{ path: '', loadChildren: () => import('./views/user/components/requests/requests.routes') },
	{ path: '', loadChildren: () => import('./views/user/components/reports/reports.routes') },
	{ path: '', loadChildren: () => import('./views/user/components/bills/bills.routes') },
	{ path: '', loadChildren: () => import('./views/user/components/staffs/staffs.routes') },
	{ path: '', loadChildren: () => import('./views/user/components/saved-searches/saved-searches.routes') },
	{ path: '', loadChildren: () => import('./views/user/components/property-managers/property-managers.routes') },
	

	{ path: '**', component: NotFoundComponent, title: "Page not found" }
];
