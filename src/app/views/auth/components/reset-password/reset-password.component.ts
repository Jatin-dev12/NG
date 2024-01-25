import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GlobalService, ItemService } from 'src/app/services';
import { ResetFormComponent } from '../../forms/reset-form/reset-form.component';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    standalone: true,
    imports: [RouterLink, ResetFormComponent]
})
export class ResetPasswordComponent implements OnInit {
	loading: boolean = false;
	show_form: boolean = false;
	token: any;

	constructor(
		public gs: GlobalService,
		private itemService: ItemService,
		private activeRoute: ActivatedRoute,
	) { }


	ngOnInit(): void {
		this.activeRoute.queryParamMap.subscribe(data => {
			this.loading = true;
			this.token = data.get('token');
			this.itemService.auth(null, { key: 'is-password-token-exists', token: this.token }).subscribe(response => {
				//console.log('response', response);
				this.loading = false;
				this.show_form = true;
			}, (error: Response) => {
				//console.log('error', error);
				this.loading = false;
				this.show_form = false;
			});
		});
		
	}


}
