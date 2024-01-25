import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { Request } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { OneToOneChatComponent } from '../../../../../standalone/one-to-one-chat/one-to-one-chat.component';
import { GoogleMapViewComponent } from '../../../../../standalone/google-map-view/google-map-view.component';
import { NgTemplateOutlet } from '@angular/common';
import { ReadMoreComponent } from '../../../../../shared/components/read-more/read-more.component';
import { CatalogRequestViewSliderComponent } from '../../../../../standalone/catalog-request-view-slider/catalog-request-view-slider.component';

@Component({
    selector: 'app-request-view',
    templateUrl: './request-view.component.html',
    styleUrls: ['./request-view.component.scss'],
    standalone: true,
    imports: [RouterLink, CatalogRequestViewSliderComponent, ReadMoreComponent, NgTemplateOutlet, GoogleMapViewComponent, OneToOneChatComponent]
})
export class RequestViewComponent {
	itemObservable: Observable<any> = this.gs.store.select(StoreSelector.RequestSelectors[EnumRxKey.Request.view]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.RequestLoadingKey[`${EnumRxKey.Request.view}Loading`]);
	item: Request | null = null;
	item_id: any = null;
	accept_loading: boolean = false;
	remove_loading: boolean = false;
	complete_loading: boolean = false;
	Enums = Enums;
	url = this.router.url.split('/').slice(0, -1).join('/');
	key: string = '';
	relation: string = '';

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
		private confirmDialog: ConfirmDialogService,
		private itemService: ItemService,
		private router: Router
	) {
		this.item_id = this.activeRoute.snapshot.params['id'];
	}

	ngOnInit(): void {
		let routeConfig: any = this.activeRoute.snapshot.routeConfig?.data;
		this.key = routeConfig['key'];
		this.relation = routeConfig['relation'];
		this.onLoad();
		this.itemObservable.subscribe(data => this.item = data);
		//console.log('router', this.url)
	}

	onLoad() {
		let action = StoreAction.RequestParams({ method: 'GET', params: null, params2: { primary_id: this.item_id }, key: EnumRxKey.Request.view });
		this.gs.store.dispatch(action);
	}

	ngOnDestroy() {
		this.gs.store.dispatch(StoreAction.RequestList({ data: null, key: EnumRxKey.Request.view}));
	}

}
