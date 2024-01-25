import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService, ItemService, WebSocketService } from 'src/app/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfiniteScrollDirective, InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AutoScrollDirective } from 'src/app/shared';
import { ComposeComponent } from 'src/app/views/user/components/messanger/compose/compose.component';
import { MessageListComponent } from 'src/app/views/user/components/messanger/message-list/message-list.component';


@Component({
	selector: 'app-one-to-one-chat',
	standalone: true,
	imports: [CommonModule, SharedModule, InfiniteScrollModule, AutoScrollDirective, ComposeComponent, MessageListComponent],
	providers: [InfiniteScrollDirective],
	templateUrl: './one-to-one-chat.component.html',
	styleUrls: ['./one-to-one-chat.component.scss']
})
export class OneToOneChatComponent {
	@Input() message_id: any;
	@Input() profile: any;

	chatList: any[] = [];
	chatLoading: boolean = false;
	chatRequestLoading: boolean = false;
	chatPagination: any = null;
	chatPage = 0;

	constructor(
		public gs: GlobalService,
		private itemService: ItemService,
		private webSocketService: WebSocketService,
	) { }

	ngOnInit(): void {

		this.onLoadChat();
		this.webSocketService.chatConnect();
		this.webSocketService.onChatMessage?.subscribe((response) => {
			let data: any = response;
			if(!data) return;
			if(data?.message_id === parseInt(this.message_id)) {
				this.chatList.unshift(data);
			}
		});
	}

	onLoadChat(removeForEach = false) {
		this.itemService.contact("GET", null, { key: 'message', sort: '-created_at', message_id: this.message_id, page: this.chatPage, size: 15 }).subscribe(response => {
			let data = response.data;
			this.chatLoading = false;
			this.chatPagination = data;
			this.chatRequestLoading = false;
			let items = response.data?.items ?? [];
			if(removeForEach) {
				this.chatList = items ? items : [];
			} else {
				items.forEach((el: any) => {
					this.chatList.push(el);
				});
			}
		}, (error: Response) => {
			this.chatLoading = false;
			this.chatRequestLoading = false;
		})
	}

	onScroll(event: any) {
		console.log('onScroll', event);
	}

	scrolledUp(event: any) {
		if(this.chatList.length < this.chatPagination?.total) {
			this.chatLoading = true;
			this.chatPage = this.chatPage + 1;
			this.onLoadChat();
		}
	}

	isMine(message: any) {
        return (message?.sender?.id === this.gs.identity?.id);
    }

	ngOnDestroy() {
		
	}

}
