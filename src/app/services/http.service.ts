import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { GlobalService } from "./global.service";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private gs: GlobalService,
    ) {

    }


    request(method: string, url: string, params: any): Observable<any> {
        //console.log('params', this.newObject(params.params)); 
        return this.http.request(method, this.apiUrl + url, { body: params.body, params: this.gs.removeBlankObject(params.params) }).pipe(map((response: any) => {
            return this.gs.apiResponce(response);
        }),catchError(this.errorHandler.bind(this)));
    }

    get(url: string, params?: any): Observable<any> {
        const data = { params };
        return this.http.get(this.apiUrl + url, data).pipe(map((response: any) => {
            return this.gs.apiResponce(response);
        }),catchError(this.errorHandler.bind(this)));
    }

    post(url: string, params?: any, event?: any): Observable<any> {
        return this.http.post(this.apiUrl + url, params, event).pipe(map((response: any) => {
            return event ? response : this.gs.apiResponce(response);
        }),catchError(this.errorHandler.bind(this)));
    }

    emailCheck(method: string, url: string, params: any): Observable<any> {
        return this.http.request(method, this.apiUrl + url, params).pipe(map((response: any) => {
            return this.gs.apiResponce(response);
        }));
    }

    private errorHandler(response: any) {
        //console.log('response', response)
        this.gs.handleErrors(response);
        //return;
        const error = response?.error;
        if(!error) {
            return throwError({ messages: error, error });
        }
        //console.log('response', error, response)
        const keys = Object?.keys(error);
        const key = keys[0];
        let message = error[key];
        /*if (response.status === 401) {
            // auth token delete
            // redirect login page
        }
        if (error[key] instanceof Array) {
            message = error[key][0];
        }
        if (key === 'isTrusted') {
            // this will occur when not connected to internet
        } else {
            message = key + ' : ' + message;
        }
        // call snackbar and show error with message
        */
        return throwError({ messages: message, error });
    }

    handleErrors() {
        
    }

}