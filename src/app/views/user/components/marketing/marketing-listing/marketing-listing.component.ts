import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-marketing-listing',
    templateUrl: './marketing-listing.component.html',
    styles: [],
    standalone: true,
    imports: [RouterLink],
})
export class MarketingListingComponent implements OnInit {

	constructor(
		public gs: GlobalService,
	) {
		
	}

	ngOnInit(): void {
	}

}
