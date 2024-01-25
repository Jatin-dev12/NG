import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { ApiResponseData, User } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreSelector } from 'src/app/store/selector';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class FooterComponent implements OnInit {
	userObservable: Observable<User> = this.gs.store.select(state => state.auth.user);
	role = Enums.Role;
	Enums = Enums;
	constructor(
		public gs: GlobalService,
	) { }

	ngOnInit(): void {
	}

	get year() {
		return new Date().getFullYear();
	}

}
