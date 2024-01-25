import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Enums } from 'src/app/enums';
import { User } from 'src/app/models';
import { GlobalService, ItemService } from 'src/app/services';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.scss'],
    standalone: true,
    imports: [HeaderComponent, RouterOutlet, FooterComponent]
})
export class HomeLayoutComponent implements OnInit {
	isLoggedIn: Observable<boolean> = this.itemService.authenticationState;
	user: Observable<User> = this.gs.store.select(state => state.auth.user);
	role = Enums.Role;
	isCollapsed = true;

	constructor(
		private itemService: ItemService,
		public gs: GlobalService,
	) { }

	ngOnInit(): void {
	}

	logout = () => {
		// let loginLogout = StoreAction.ProfileParams({ method: "POST", params: null, params2: { key: EnumRxKey.User.logout }, key: EnumRxKey.User.logout });
		// this.gs.store.dispatch(loginLogout);
		this.gs.logout();
	}

}
