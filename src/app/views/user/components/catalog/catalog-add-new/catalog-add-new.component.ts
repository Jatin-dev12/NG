import { AfterRenderPhase, Component, afterNextRender } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { Catalog } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-catalog-add-new',
	templateUrl: './catalog-add-new.component.html',
	styleUrls: ['./catalog-add-new.component.scss'],
	standalone: true,
	imports: [RouterLink, RouterOutlet, AsyncPipe]
})
export class CatalogAddNewComponent {
	view: Observable<Catalog | null> = this.gs.store.select(StoreSelector.CatalogSelectors.view);
	update: Catalog | null = null;
	item_id: any = null;

	title: any = 'Add Property';

	constructor(
		public gs: GlobalService,
		private route: ActivatedRoute
	) {
		this.item_id = route.snapshot.firstChild?.params['id'];
		this.title = route.snapshot.firstChild?.title;

		afterNextRender(() => {
			
		}, { phase: AfterRenderPhase.MixedReadWrite });

	}

	ngOnInit(): void {
		this.view.subscribe(data => {
			//console.log('dfvdf', data);
		});

		if (this.item_id) {
			this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { primary_id: this.item_id }, key: EnumRxKey.Catalog.view }));
		}
		//console.log('dfgdfgd', this.item_id);
		/*this.route.queryParamMap.subscribe(data => {
			console.log('url', data);
			console.log(this.route.snapshot.firstChild?.params);
		})
		this.route.paramMap.subscribe(data => {
			console.log('data', data, this.route.url)
		})*/
		this.route.paramMap.subscribe(data => {
			//console.log('data', data)
			this.title = this.route.snapshot.firstChild?.title;
			//console.log('sdf', this.route.snapshot.firstChild?.title)
		});

		
		//this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { primary_id: this.item_id }, key: EnumRxKey.Catalog.view }));
	}

	ngOnDestroy() {
		this.gs.store.dispatch(StoreAction.CatalogList({ data: null, key: EnumRxKey.Catalog.view }));
	}
}
