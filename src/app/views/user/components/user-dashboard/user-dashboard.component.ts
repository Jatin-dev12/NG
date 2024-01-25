
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { ApiResponseData, User } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreSelector } from 'src/app/store/selector';

@Component({
	selector: 'app-user-dashboard',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './user-dashboard.component.html',
	styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
	OrderRxKey = EnumRxKey.Order;
	userObservable: Observable<User> = this.gs.store.select(state => state.auth.user);
	user: User | null = null;
	loading: Observable<any> = this.gs.store.select(state => state.userModule.catalog.loading);
	catalog: Observable<ApiResponseData> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.listing]);

	constructor(
		public gs: GlobalService
	) { }

	ngOnInit(): void {
		//UserSelector
		this.userObservable.subscribe((response: User) => {
			this.user = new User(response);
			if(response.role === Enums.ROLE_STAFF) {
				this.gs.router(`/profile/view/${response.username}`);
			}
		});
		
	}

}
