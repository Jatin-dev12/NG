import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, NgbNavContent, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-features',
	templateUrl: './features.component.html',
	styleUrls: ['./features.component.scss'],
	standalone: true,
	imports: [NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, NgbNavContent, NgbNavOutlet]
})
export class FeaturesComponent {

	constructor(
		public gs: GlobalService,
	) { }

	ngOnInit(): void {
		
	}

}
