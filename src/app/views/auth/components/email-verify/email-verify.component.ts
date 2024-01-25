import { AfterRenderPhase, Component, afterNextRender } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';

@Component({
	selector: 'app-email-verify',
	standalone: true,
	imports: [],
	templateUrl: './email-verify.component.html',
	styles: [
	]
})
export class EmailVerifyComponent {
	constructor(
		private route: ActivatedRoute,
		public gs: GlobalService,
	) { 
		afterNextRender(() => {
			this.route.queryParams.subscribe(params => {
				this.gs.store.dispatch(StoreAction.AuthParams({ params: null, params2: { key: 'email-verification', token: params['token'] }, url: '/' }));
			});
		  }, {phase: AfterRenderPhase.Write});
	}
}
