import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { Enums } from 'src/app/enums';
import { User } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-left-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.scss'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem, AsyncPipe, NgTemplateOutlet]
})
export class LeftSidebarComponent implements OnInit {
	userObservable: Observable<User> = this.gs.store.select(state => state.auth.user);
	user: User | null = null;
	role = Enums.Role;
	unread: number = 0;
	Enums = Enums;
	constructor(
		public gs: GlobalService,
		public router: Router
	) { }

	ngOnInit(): void {
		this.userObservable.subscribe(data => this.user = data);
		//console.log('sdfds', this.router)
	}

	get allRequestsCount() {
		let allCount = 0;
		if(this.user?.id) {
			switch (this.user?.role) {
				case Enums.ROLE_OWNER:
				case Enums.ROLE_VENDORS:
					allCount = this.user.number_of_send_proposal_pending;
					break;
				default:
					allCount = this.user?.number_of_received_proposal_pending;
					break;
			}
		}
		return allCount;
	}

	logout() {
		// let loginLogout = StoreAction.ProfileParams({ method: "POST", params: null, params2: { key: EnumRxKey.User.logout }, key: EnumRxKey.User.logout });
		// this.gs.store.dispatch(loginLogout);
		this.gs.logout();
	}

	removeNotificationCount() {
		/*this.gs.store.dispatch(new NotificationsAction.ListInitialized({ method: "GET", params: null, params2: { page: 1 } }));
		let newItem = this.user;
		let user = Object.assign({}, newItem, { userProfile: { notifications: 0, messages: newItem?.userProfile?.messages } });
		this.gs.store.dispatch(new AuthActions.loginSuccess(user));*/
	}

	// isActive(instruction: any[]): boolean {
	// 	return this.router.isRouteActive(this.router.generate(instruction));
	// }
 

}

