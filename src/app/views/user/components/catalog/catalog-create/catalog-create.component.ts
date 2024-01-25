import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { CatalogFormComponent } from '../catalog-form/catalog-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-catalog-create',
    templateUrl: './catalog-create.component.html',
    styleUrls: ['./catalog-create.component.scss'],
    standalone: true,
    imports: [RouterLink, CatalogFormComponent]
})
export class CatalogCreateComponent implements OnInit {

	constructor(
		public gs: GlobalService
	) { }

	ngOnInit(): void {
		if (!this.gs.is_manager && !this.gs.is_owner) {
			this.gs.router('/dashboard');
			return;
		}
	}

}
