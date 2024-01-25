import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services';

@Component({
    selector: 'app-mktg-owner-disclaimer',
    templateUrl: './mktg-owner-disclaimer.component.html',
    styleUrls: ['./mktg-owner-disclaimer.component.scss'],
    standalone: true
})
export class MktgOwnerDisclaimerComponent {
	constructor(
		public gs: GlobalService,
	) {
	}

	ngOnInit(): void {
		
	}
}
