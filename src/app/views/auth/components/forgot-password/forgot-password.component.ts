import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { ForgotFormComponent } from '../../forms/forgot-form/forgot-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    standalone: true,
    imports: [RouterLink, ForgotFormComponent]
})
export class ForgotPasswordComponent implements OnInit {

	constructor(
		public gs: GlobalService,
	) { }

	ngOnInit(): void {
		
	}

}
