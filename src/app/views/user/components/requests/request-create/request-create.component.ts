import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Enums } from 'src/app/enums';
import { GlobalService } from 'src/app/services';
import { RequestFormVendorComponent } from '../request-form-vendor/request-form-vendor.component';
import { RequestFormManagerComponent } from '../request-form-manager/request-form-manager.component';
import { RequestFormOwnerComponent } from '../request-form-owner/request-form-owner.component';

@Component({
    selector: 'app-request-create',
    templateUrl: './request-create.component.html',
    styleUrls: ['./request-create.component.scss'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive, RequestFormOwnerComponent, RequestFormManagerComponent, RequestFormVendorComponent]
})
export class RequestCreateComponent {
	Enums = Enums;
	constructor(
		public gs: GlobalService,
		public router: Router
	) { }

	ngOnInit(): void {
		//console.log('router', this.router.url)
	}

}
