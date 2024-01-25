import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { LoginFormComponent } from '../../forms/login-form/login-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [RouterLink, LoginFormComponent]
})
export class LoginComponent implements OnInit {

	constructor(
		public gs: GlobalService,
	) {

	}

	ngOnInit(): void {
		
	}

	modalEvent(event: string) {
		
	}

}
