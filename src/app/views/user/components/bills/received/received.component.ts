import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Enums } from 'src/app/enums';
import { GlobalService } from 'src/app/services';
import { NgbDropdown, NgbDropdownToggle, NgbDropdownMenu } from '@ng-bootstrap/ng-bootstrap';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-received',
    templateUrl: './received.component.html',
    styleUrls: ['./received.component.scss'],
    standalone: true,
    imports: [RouterLink, NgTemplateOutlet, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, RouterLinkActive, RouterOutlet]
})
export class ReceivedComponent {
	Enums = Enums;

	constructor(
		public gs: GlobalService,
		public router: Router,
		private activeRoute: ActivatedRoute
	) { }

	ngOnInit(): void {
		//this.router.urlHandlingStrategy.
		this.activeRoute.url.subscribe(data => {
			this.checkRouts();
		});
	}

	checkRouts() {
		if (this.router.url === '/bills/received') {
			switch (this.gs.identity?.role) {
				case Enums.ROLE_MANAGERS:
				case Enums.ROLE_VENDORS:
					this.gs.router('/bills/received/tenant/pending-requests');
					break;
				case Enums.ROLE_OWNER:
				case Enums.ROLE_USER:
					this.gs.router('/bills/received/tenant/pending-requests');
					break;
				default:
					this.gs.router('/bills/received/tenant/pending-requests');
					break;
			}
		}
	}
}
