import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isBrowser, isJsonString } from '../helpers';

@Injectable({
	providedIn: 'root'
})
export class WebSocketService {
	websocket: any;
	chatSocket: any;
	//reconnectInterval = 1000; // 1 second, adjust as needed

	onMessage = new Subject<void>();
	onChatMessage = new Subject<void>();
	socketClose = new Subject<void>();
	chatSocketClose = new Subject<void>();

	constructor() {
		//setTimeout(this.connect, this.reconnectInterval);
	}

	connect() {
		if(isBrowser) {
			this.websocket = new WebSocket(environment.WEB_SOCKET_URL);

			this.websocket.addEventListener('open', (event: any) => {
				//console.log('WebSocket connection opened', event);
			});
	
			this.websocket.addEventListener('message', (event: any) => {
				//console.log('Socket:', event.data);
				this.onMessage.next(isJsonString(event.data) ? JSON.parse(event.data) : event.data)
			});
	
			this.websocket.addEventListener('close', (event: any) => {
				//console.log('WebSocket connection closed:', event);
				this.socketClose.next(event);
				// Try to reconnect after a certain interval
			});
	
			this.websocket.addEventListener('error', (event: any) => {
				console.error('WebSocket error:', event);
			});

		}
	}


	chatConnect() {

		if(isBrowser) {
			this.chatSocket = new WebSocket(environment.WEB_SOCKET_CHAT_URL);

			this.chatSocket.addEventListener('open', (event: any) => {
				//console.log('ChatSocket connection opened', event);
			});

			this.chatSocket.addEventListener('message', (event: any) => {
				//console.log('ChatSocket:', event.data);
				this.onChatMessage.next(isJsonString(event.data) ? JSON.parse(event.data) : event.data)
			});

			this.chatSocket.addEventListener('close', (event: any) => {
				//console.log('ChatSocket connection closed:', event);
				this.chatSocketClose.next(event);
				// Try to reconnect after a certain interval
			});

			this.chatSocket.addEventListener('error', (event: any) => {
				console.error('ChatSocket error:', event);
			});
		}
	}

	chatSend(msg: any) {
		//console.log('this.chatSocket', this.chatSocket)
		if (this.chatSocket && this.chatSocket.readyState === WebSocket.OPEN) {
			this.chatSocket?.send(msg);
		} else {
			console.error('WebSocket is not open. Cannot send message.');
		}		
	}
	// rpc error: code = Unknown desc = text empty:: 3

}
