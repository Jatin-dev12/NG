import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { FooterComponent, HeaderComponent, LeftSidebarComponent } from 'src/app/layouts';
import { UserDashboardComponent } from 'src/app/views/user/components/user-dashboard/user-dashboard.component';
import { RouterOutlet } from '@angular/router';
import { GlobalService } from 'src/app/services';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
    standalone: true,
    imports: [HomeComponent, HeaderComponent, FooterComponent, LeftSidebarComponent, UserDashboardComponent, RouterOutlet]
})
export class LandingPageComponent {
	constructor(
		public gs: GlobalService,
	) { }
}
