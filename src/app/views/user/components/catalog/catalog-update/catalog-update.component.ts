import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { Catalog } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { CatalogFormComponent } from '../catalog-form/catalog-form.component';

@Component({
    selector: 'app-catalog-update',
    templateUrl: './catalog-update.component.html',
    styleUrls: ['./catalog-update.component.scss'],
    standalone: true,
    imports: [RouterLink, CatalogFormComponent, AsyncPipe]
})
export class CatalogUpdateComponent implements OnInit {

	view: Observable<Catalog | null> = this.gs.store.select(StoreSelector.CatalogSelectors.view);
	update: Catalog | null = null;
	item_id: any = null;

	constructor(
		public gs: GlobalService,
		private route: ActivatedRoute
	) {
		this.item_id = route.snapshot.params['id'];
	}

	ngOnInit(): void {
		//console.log('dfgdfgd', this.item_id);
		if (!this.gs.is_manager && !this.gs.is_owner) {
			this.gs.router('/dashboard');
			return;
		}
		this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { primary_id: this.item_id }, key: EnumRxKey.Catalog.view }));
	}

	ngOnDestroy() {
		//this.gs.store.dispatch(StoreAction.CatalogList({ data: null, key: CatalogRxKey.view}));
	}

}
