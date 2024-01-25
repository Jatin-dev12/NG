import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EnumRxKey } from './enums';
import { ConfirmDialogComponent, ConfirmDialogService, ToastsContainer } from './modules';
import { GlobalService, ItemService, WebSocketService } from './services';
import { StoreAction } from './store/actions';
import { NgbToast, NgbToastHeader } from '@ng-bootstrap/ng-bootstrap';
import { RouterOutlet } from '@angular/router';
import { getItem, isBrowser } from './helpers';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	standalone: true,
	imports: [
		RouterOutlet,
		NgbToast,
		NgbToastHeader,
		ConfirmDialogComponent,
		ToastsContainer
	],
})
export class AppComponent implements OnInit {
	isLoggedIn$!: Observable<boolean>;
	show = false;
	meesage: any = null;
	rootUrl = environment;

	constructor(
		public gs: GlobalService,
		private swUpdate: SwUpdate,
		public confirmDialog: ConfirmDialogService,
		private itemService: ItemService,
		@Inject(DOCUMENT) private _document: Document,
		private webSocketService: WebSocketService,
	) {
		this.gs.store.dispatch(StoreAction.DefaultParams({ method: "GET", params: null, params2: { key: EnumRxKey.Default.config, size: 100 }, key: EnumRxKey.Default.config }));
	}
	ngOnInit(): void {
		this.isLoggedIn$ = this.itemService.authenticationState;

		try {
			const user = getItem('user');
			const authentication = (user !== null) ? JSON.parse(user) : null;
			authentication && this.gs.store.dispatch(StoreAction.LoginSuccess({ user: authentication }));

			this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { key: EnumRxKey.Catalog['tag-types'], size: 500 }, key: EnumRxKey.Catalog['tag-types'] }));
			this.gs.store.dispatch(StoreAction.CatalogParams({ method: "GET", params: null, params2: { key: EnumRxKey.Catalog.categories, size: 300 }, key: EnumRxKey.Catalog.categories }));

		} catch (error) {
			console.error(error)
		}

		this.isLoggedIn$.pipe(debounceTime(500)).subscribe((data: any) => {
			if (data) {
				this.gs.store.dispatch(StoreAction.ProfileParams({ method: "GET", params: null, params2: { primary_id: this.gs.identity?.id }, key: 'load_profile' }));
			}
		});

		this.webSocketService.connect();
		this.webSocketService.socketClose.subscribe(data => {
			this.webSocketService.connect();
		});

		this.webSocketService.onMessage.subscribe(response => {
			console.log('Socket123', response)
			let data: any = response;
			/*let identity: any = this.gs.identity;
			let current_user = data?.recipients?.find((val: any) => val === identity?.id);
			if (data?.type !== 'message' && current_user && (data.sender_id !== identity?.id)) {
				this.gs.store.dispatch(StoreAction.ProfileParams({ method: "GET", params: null, params2: { primary_id: this.gs.identity?.id }, key: 'load_profile' }));
			}
			if ((data?.is_trigger === 1) && current_user && (data.sender_id !== identity?.id)) {
				this.show = true;
				this.meesage = data;
			}*/
		});

		if (this.swUpdate.isEnabled) {
			this.swUpdate.versionUpdates.subscribe(() => {
				if (isBrowser) {
					window.location.reload();
					/*this.confirmDialog.confirmThis("New version available. Load New Version?", () => {
						window.location.reload();
					}, () => {
						console.log('No clicked');
					});*/
				}
			});
		}
		this._document.body.classList.add(this.gs.identity ? this.gs.identity.role : 'general');
	}

	send() {

	}

	ngOnDestroy() {
		
	}
}

