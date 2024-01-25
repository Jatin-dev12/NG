import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { MktgCongratulationsComponent } from '../_partials/mktg-congratulations/mktg-congratulations.component';
import { MktgPaymentComponent } from '../_partials/mktg-payment/mktg-payment.component';
import { MktgFeaturedAdFormComponent } from '../_partials/mktg-featured-ad-form/mktg-featured-ad-form.component';
import { MktgInnerPageAdFormComponent } from '../_partials/mktg-inner-page-ad-form/mktg-inner-page-ad-form.component';
import { MktgUpperRightAdFormComponent } from '../_partials/mktg-upper-right-ad-form/mktg-upper-right-ad-form.component';
import { MktgVendorFormComponent } from '../_partials/mktg-vendor-form/mktg-vendor-form.component';
import { MktgManagerFormComponent } from '../_partials/mktg-manager-form/mktg-manager-form.component';
import { MktgOwnerFormComponent } from '../_partials/mktg-owner-form/mktg-owner-form.component';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
    selector: 'app-marketing-form',
    templateUrl: './marketing-form.component.html',
    styleUrls: ['./marketing-form.component.scss'],
    standalone: true,
    imports: [MatStepperModule, MktgOwnerFormComponent, MktgManagerFormComponent, MktgVendorFormComponent, MktgUpperRightAdFormComponent, MktgInnerPageAdFormComponent, MktgFeaturedAdFormComponent, MktgPaymentComponent, MktgCongratulationsComponent]
})
export class MarketingFormComponent {

	constructor(
		public gs: GlobalService,
	) {
		
	}

	ngOnInit(): void {
		
	}

}
