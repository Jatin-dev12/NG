import { Component, Input } from '@angular/core';
import { Catalog } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-catalog-owner-agreement-view',
    templateUrl: './catalog-owner-agreement-view.component.html',
    styleUrls: ['./catalog-owner-agreement-view.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class CatalogOwnerAgreementViewComponent {
  @Input() item!: Catalog | null;
	constructor(
		public gs: GlobalService,
	) {

	}
}
