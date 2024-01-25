import { Routes } from "@angular/router";
import { DashboardLayoutComponent, HomeLayoutComponent, DefaultLayoutComponent } from "src/app/layouts";
import { UserDashboardComponent } from "../user/components/user-dashboard/user-dashboard.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { FaqsComponent } from "./components/faqs/faqs.component";
import { FeaturesComponent } from "./components/features/features.component";
import { HomeComponent } from "./components/home/home.component";
import { HowItWorksComponent } from "./components/how-it-works/how-it-works.component";
import { PagesComponent } from "./components/pages/pages.component";
import { getItem } from "src/app/helpers";


var token = getItem('token') ?? null;

export default [
    //{ path: '', component: LandingPageComponent, pathMatch: 'full' },
	{
		path: '', component: token ? DashboardLayoutComponent : HomeLayoutComponent, children: [
			{ path: '', component: token ? UserDashboardComponent : HomeComponent, pathMatch: 'full', title: "Home" },
		],
	},
	{
		path: '', component: HomeLayoutComponent, children: [
			{ path: 'about', component: AboutComponent, title: "About" },
			{ path: 'features', component: FeaturesComponent, title: "Features" },
			{ path: 'how-it-works', component: HowItWorksComponent, title: "How It Works" },
			{ path: 'contact', component: ContactComponent, title: "Contact" },
		],
	},
	{
		path: '', component: DefaultLayoutComponent, children: [
			{ path: 'pages/:slug', component: PagesComponent, title: "Content Pages" },
			{ path: 'faqs', component: FaqsComponent, title: "Faqs" },
			// { path: 'contact', component: ContactComponent, title: "Contact" },
			// { path: 'about', component: AboutComponent, title: "About" },
			// { path: 'how-it-works', component: HowItWorksComponent, title: "How It Works" },
			// { path: 'features', component: FeaturesComponent, title: "Features" },
		]
	},
] as Routes;