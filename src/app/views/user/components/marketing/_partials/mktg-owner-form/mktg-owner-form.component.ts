import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { MktgOwnerDisclaimerComponent } from '../mktg-owner-disclaimer/mktg-owner-disclaimer.component';
import { MktgFeaturedAdAvailabilityComponent } from '../mktg-featured-ad-availability/mktg-featured-ad-availability.component';
import { MktgInnerPageAdAvailabilityComponent } from '../mktg-inner-page-ad-availability/mktg-inner-page-ad-availability.component';
import { MktgUpperRightAdAvailabilityComponent } from '../mktg-upper-right-ad-availability/mktg-upper-right-ad-availability.component';

@Component({
    selector: 'app-mktg-owner-form',
    templateUrl: './mktg-owner-form.component.html',
    styleUrls: ['./mktg-owner-form.component.scss'],
    standalone: true,
    imports: [MktgUpperRightAdAvailabilityComponent, MktgInnerPageAdAvailabilityComponent, MktgFeaturedAdAvailabilityComponent, MktgOwnerDisclaimerComponent]
})
export class MktgOwnerFormComponent {

	constructor(
		public gs: GlobalService,
	) {
		
	}

	ngOnInit(): void {
		
	}
}
