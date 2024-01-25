import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { RegisterFormComponent } from '../../forms/register-form/register-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [RouterLink, RegisterFormComponent]
})
export class RegisterComponent implements OnInit {

	constructor(
		public gs: GlobalService,
	) { 
		
	}

	ngOnInit(): void {
		
	}

}
