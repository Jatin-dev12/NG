import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'; 
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class NewWebSocketService {

	public socket$!: WebSocketSubject<any>;
	constructor() {
	}
    
	connect() {
		this.socket$ = webSocket(environment.WEB_SOCKET_CHAT_URL); // Replace with your WebSocket server URL 
	}

	disconnect() {
		this.socket$?.complete();
	}

	isConnected(): boolean {
		//console.log('this.socket$', this.socket$)
		return (this.socket$ === null ? false : !this.socket$.closed);
	}

	onMessage(): Observable<any> {
		return this.socket$!.asObservable().pipe(
			map(message => message)
		);
	}

	send(message: any) {
		this.socket$.next(message);
	}


}
