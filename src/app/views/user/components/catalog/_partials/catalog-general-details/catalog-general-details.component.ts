import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdditionalEnums, Enums } from 'src/app/enums';
import { Catalog } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { TitleCasePipe, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-catalog-general-details, [app-catalog-general-details]',
    templateUrl: './catalog-general-details.component.html',
    styleUrls: ['./catalog-general-details.component.scss'],
    standalone: true,
    imports: [TitleCasePipe, CurrencyPipe, DatePipe]
})
export class CatalogGeneralDetailsComponent {
	@Input() item!: Catalog | null;
	AdditionalEnums = AdditionalEnums;
	Enums = Enums;
	
	constructor(
		public gs: GlobalService,
		private router: Router
	) {

	}

	get my_property() {
		let link = this.router.url;
		//console.log('link', link.split('/')[1])
		return (link.split('/')[1] === 'properties') ? true : false
	}
}
