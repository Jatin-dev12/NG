import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from '../services';

@Injectable({
	providedIn: 'root'
})
export class RoleGuard  {

	constructor(
		private itemService: ItemService,
		private router: Router,
	) { }

	canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		//console.log('this.itemService.isAuthenticated()', this.itemService.isAuthenticated())
		if (this.itemService.isAuthenticated()) {
			const currentUser = this.itemService.userRole;
			const role        = route.data['role'];
			//console.log('role', role, role.indexOf(currentUser) > -1, currentUser);
            if(this.itemService.isTokenExpired()) {
                this.itemService.profile("POST", null, { key: 'logout' }).subscribe(response => this.router.navigate(['/login']));
            }
			return !!(role && role.indexOf(currentUser) > -1);
		}
		this.router.navigate(['/login']);
		return false;
	}

}
