import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from '../services';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard  {
	
	constructor(
		private itemService: ItemService,
		private router: Router,
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

			if (this.itemService.isAuthenticated()) {
				return true;
			}

			if(this.itemService.isTokenExpired()) {
				this.itemService.profile("POST", null, { key: 'logout' });
				this.router.navigate(['/login']);
			}
		  
			this.router.navigate(['/login']);
		  
			return false;
	}

}



