import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnumRxKey } from 'src/app/enums';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';

@Component({
    selector: 'app-reactivation',
    templateUrl: './reactivation.component.html',
    styleUrls: ['./reactivation.component.scss'],
    standalone: true
})
export class ReactivationComponent {
	constructor(
		private route: ActivatedRoute,
		public gs: GlobalService,
	) { }

	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			//this.gs.store.dispatch(emailVerification({ payload: params.token }));
			this.gs.store.dispatch(StoreAction.AuthParams({ params: null, params2: { key: EnumRxKey.Auth.reactivation, token: params['token'] } }));
		});
	}
}
