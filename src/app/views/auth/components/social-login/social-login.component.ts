import { Component, Input, OnInit } from '@angular/core';
import { GlobalService, ItemService } from 'src/app/services';

@Component({
	selector: 'app-social-login',
	templateUrl: './social-login.component.html',
	styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {
	@Input() role: any = 'User';

	constructor(
		private itemService: ItemService,
		public gs: GlobalService,
	) { }

	ngOnInit(): void {
		/*this.authSocialService.authState.subscribe((user: any) => {
			console.log('user', user);
			this.user = user;
			this.loggedIn = (user != null);
			if (user) {
				this.onSocialLogin(user);
			}
		});*/
	}

	/*onSocialLogin(user: SocialUser) {
		let provider = user.provider;
		if (provider === 'GOOGLE') {
			const params = {
				googleId: user.id,
				imageUrl: user.photoUrl,
				email: user.email,
				name: user.name,
				givenName: user.firstName,
				familyName: user.lastName,
				//role: this.role
			}
			//this.gs.store.dispatch(loginByAuth({ params: params, params2: { authclient: 'google', role: this.role }}));
		}
		if (provider === 'FACEBOOK') {
			let userF: any = user;
			const params = {
				email: userF.email,
				first_name: userF.firstName,
				last_name: userF.lastName,
				name: userF.name,
				id: userF.id,
				is_silhouette: userF.response?.picture?.data?.is_silhouette,
				url: userF.response?.picture?.data?.url,
				width: userF.response?.picture?.data?.width,
				//role: this.role
			}
			//this.gs.store.dispatch(loginByAuth({ params: params, params2: { authclient: 'facebook', role: this.role }}));
		}
	}

	signInWithGoogle(): void {
		this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID);
	}

	signInWithFB(): void {
		this.authSocialService.signIn(FacebookLoginProvider.PROVIDER_ID);
	}

	signOut(): void {
		this.authSocialService.signOut();
	}*/

}
