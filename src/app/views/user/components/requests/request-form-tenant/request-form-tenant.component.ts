import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services';

@Component({
    selector: 'app-request-form-tenant',
    templateUrl: './request-form-tenant.component.html',
    styleUrls: ['./request-form-tenant.component.scss'],
    standalone: true
})
export class RequestFormTenantComponent {
  constructor(
		public gs: GlobalService,
	) { }

	ngOnInit(): void {
		//console.log('router', this.router.url)
	}
}
