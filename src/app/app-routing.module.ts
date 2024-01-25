import { Injectable, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppRouterLoader } from './app-routing-loader';
import { NotFoundComponent } from './views/default/components/not-found/not-found.component';

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
	constructor(private readonly title: Title) {
		super();
	}
	override updateTitle(routerState: RouterStateSnapshot): void {
		const title = this.buildTitle(routerState);
		if (title !== undefined) {
			this.title.setTitle(`${environment.siteName} | ${title}`);
		} else {
			this.title.setTitle(`${environment.siteName}`);
		}
	}
}

const routes: Routes = [
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

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', preloadingStrategy: AppRouterLoader, initialNavigation: 'enabledBlocking' })
	],
	exports: [RouterModule],
	providers: [AppRouterLoader, {
		provide: TitleStrategy,
		useClass: CustomTitleStrategy,
	}]
})
export class AppRoutingModule { }
