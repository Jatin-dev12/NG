import { Component, OnInit } from '@angular/core';

import { Enums } from 'src/app/enums';
import { GlobalService } from 'src/app/services';

@Component({
	selector: 'app-user-verify',
	standalone: true,
	imports: [],
	templateUrl: './user-verify.component.html',
	styleUrls: ['./user-verify.component.scss']
})
export class UserVerifyComponent implements OnInit {

	role = Enums.Role;
	UserProfileStatus = Enums.UserProfileStatus;


	constructor(
		public gs: GlobalService,
	) {
	}

	ngOnInit(): void {
		
	}

}
