import { Component, Input } from '@angular/core';
import { Catalog } from 'src/app/models';
import { GlobalService } from 'src/app/services';

@Component({
    selector: 'app-catalog-manager-agreement-view',
    templateUrl: './catalog-manager-agreement-view.component.html',
    styleUrls: ['./catalog-manager-agreement-view.component.scss'],
    standalone: true
})
export class CatalogManagerAgreementViewComponent {
  @Input() item!: Catalog | null;
	constructor(
		public gs: GlobalService,
	) {

	}
}
