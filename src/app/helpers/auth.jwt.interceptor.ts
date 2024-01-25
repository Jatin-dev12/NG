import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemService } from '../services';


@Injectable()
export class AuthJwtInterceptor implements HttpInterceptor {

    isLoggedIn$!: Observable<boolean>;

    constructor( private itemService: ItemService ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!req.headers.has("Content-Type")) {
            let reqHeaders = req.headers;
            reqHeaders.set('Content-Type', 'application/json');
            req = req.clone({
                headers: reqHeaders
            });
        }
        this.isLoggedIn$ = this.itemService.authenticationState;

        this.isLoggedIn$.pipe().subscribe((data: any) => {
            if(data) {
                const authToken = this.itemService.getAuthorizationToken();
                if (authToken) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${authToken}`,
                            //'WWW-Authenticate': 'Bearer realm="api"',
                        },
                    });
                }
            }
        });
        return next.handle(req);

    }
}


export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthJwtInterceptor, multi: true }
];