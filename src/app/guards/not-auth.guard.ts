import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from '../services';

@Injectable({
	providedIn: 'root'
})
export class NotAuthGuard  {
	constructor(
		private itemService: ItemService,
		private router: Router,
	) { }
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		if (!this.itemService.isAuthenticated()) {
			return true;
		}

		this.router.navigate(['/']);

		return false;
	}

}
