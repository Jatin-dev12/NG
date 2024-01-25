import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CreateGroupComponent } from '../create-group/create-group.component';
import { CreateChatComponent } from '../create-chat/create-chat.component';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ItemService, GlobalService, WebSocketService } from 'src/app/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ComposeComponent } from '../compose/compose.component';
import { MessageListComponent } from '../message-list/message-list.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ConversationListComponent } from '../conversation-list/conversation-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutoScrollDirective } from 'src/app/shared';
import { StoreAction } from 'src/app/store/actions';

@Component({
    selector: 'app-message-layout',
    templateUrl: './message-layout.component.html',
    styleUrls: ['./message-layout.component.css'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, FormsModule, NgxSkeletonLoaderModule, InfiniteScrollModule, ConversationListComponent, UserProfileComponent, AutoScrollDirective, MessageListComponent, ComposeComponent, NotFoundComponent]
})
export class MessageLayoutComponent implements OnInit, OnDestroy {
	conversations: any = [];
	conversationLoading: boolean = false;
	conversationRequestLoading: boolean = false;
	conversationPage = 0;
	conversationPagination: any = null;
	sort: string | 'all' | 'unread' = 'all';

	chatList: any[] = [];
	chatLoading: boolean = false;
	chatRequestLoading: boolean = false;
	chatPage = 0;
	chatPagination: any = null;

	chatProfile = null;
	recipients = null;

	message_id: any = null;

	searchText: any = '';
	modelChanged: Subject<string> = new Subject<string>();

	is_webSocket: boolean = true;
	params = { key: 'message', sort: '-created_at', size: 15, message_id: this.message_id, page: this.chatPage };

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
		private itemService: ItemService,
		private modalService: NgbModal,
		private router: Router,
		private webSocketService: WebSocketService,
	) {
		
	}

	ngOnInit(): void {
		this.webSocketService.chatConnect();
		this.webSocketService.chatSocketClose.subscribe(data => {
			this.webSocketService.chatConnect();
		});
		this.conversationRequestLoading = true;
		this.onLoadConversation();
		this.activeRoute.queryParamMap.subscribe(params => {
			//console.log('datata', params.get('message_id'), params.get('message_id123'));
			this.message_id = params.get('message_id');
			if(params.get('message_id')) {
				this.chatRequestLoading = true;
				this.chatList = [];
				this.chatPage = 0;
				this.onLoadChat();
			}
		});

		this.modelChanged.pipe(debounceTime(1000)).subscribe((data: any) => {
			this.conversationRequestLoading = true;
			this.onLoadConversation('search', data);
		});

		this.webSocketService.onChatMessage.subscribe((response) => {
			//console.log('response', response)
			let data: any = response;
			if(!data) return;
			/*if(data?.message_id === parseInt(this.message_id)) {
				this.chatList.unshift(data);
			}*/
		});

		this.webSocketService.onMessage.subscribe((response) => {
			//console.log('response', response)
			let data: any = response;
			if(!data) return;
			if(data?.type === 'message' && data?.data?.message_id === parseInt(this.message_id)) {
				this.chatList.unshift(data.data);
				this._handleConversations(data?.data)
			}
			if(data?.type === 'message' && data?.data?.recipients[0] === this.gs.identity?.id) {
				this._handleConversations(data?.data)
			}
		});

	}



	onLoadConversation(search = 'null', q = '') {
		this.itemService.contact("GET", null, { key: 'message-recipients', page: this.conversationPage, q: q, size: 20 }).subscribe(response => {
			this.conversationLoading = false;
			this.conversationRequestLoading = false;
			this.conversationPagination = response.data;
			let items = response.data?.items ?? [];
			let profile = items?.find((val: any) => val?.message_id === parseInt(this.message_id));
			if(profile) this.chatProfile = profile;
			if(search === 'null') {
				items && items.forEach((el: any) => {
					const index = this.conversations.findIndex((f: any) => f.message_id == el.message_id);
					if (index !== -1) {
						this.conversations[index] = el;
					} else {
						this.conversations.push(el);
					}
				});
			} 
			if(search === 'search') {
				this.conversations = items ? items : [];
			}
		}, (error: Response) => {
			this.conversationLoading = false;
			this.conversationRequestLoading = false;
		});
	}

	onScrollConversation(event: any) {
		if(this.conversations.length < this.conversationPagination?.total) {
			this.conversationPage = this.conversationPage + 1;
			this.conversationLoading = true;
			this.onLoadConversation();
		}
	}	

	resetSearch() {
		this.searchText = '';
		this.modelChanged.next('');
	}

	dataChanged(event: string) {
		this.modelChanged.next(event);
	}

	onLoadChat(removeForEach = false) {
		//console.log('sdfsdfdsfsd 123456')
		this.params = Object.assign({}, this.params, { message_id: this.message_id, page: this.chatPage });
		this.itemService.contact("GET", null, this.params).subscribe(response => {
			this.chatLoading = false;
			this.chatRequestLoading = false;
			this.chatPagination = response.data;
			let items = response.data?.items ?? [];
			if(removeForEach) {
				this.chatList = items ? items : [];
			} else {
				items && items.forEach((el: any) => {
					this.chatList.push(el);
				});
			}
		}, (error: Response) => {
			this.chatLoading = false;
			this.chatRequestLoading = false;
		})
	}

	handleProfile(event: any) {
		this.chatProfile = event;
	}

	handleSort(sort = '') {
		this.sort = sort;

	}

	onScroll(event: any) {
		//console.log('onScroll', event);
	}

	scrolledUp(event: any) {

		if(this.chatList.length < this.chatPagination?.total) {
			this.chatLoading = true;
			this.chatPage = this.chatPage + 1;
			this.onLoadChat();
		}
		
	}

	createGroup() {
		const modalRef = this.modalService.open(CreateGroupComponent, {
			windowClass: 'center',
			keyboard: false,
			animation: true
		});
		//modalRef.componentInstance.module = module;
		modalRef.result.then((result) => {
			console.log('result', result);
			this.onLoadConversation();
			this.router.navigate(['/messenger'], { queryParams: { message_id: result.message_id } });
		}, (reason) => console.log(reason));
	}

	createNewChat() {
		const modalRef = this.modalService.open(CreateChatComponent, {
			windowClass: 'center',
			keyboard: false,
			animation: true,
			scrollable: true
		});
		//modalRef.componentInstance.module = module;
		modalRef.result.then((result) => {
			console.log('result', result);
			this.onLoadConversation();
			this.router.navigate(['/messenger'], { queryParams: { message_id: result.message_id } });
		}, (reason) => console.log(reason));
	}

	Send() {
		let params = { type: "message", created_at: 1668590710528, message_id: 1, recipients: {7: 7, 12: 12}, sender_id: 7 };
		//this.itemService.socketEmit('message', JSON.stringify(params));
	}

	protected _handleConversations(item: any = null) {
		console.log('itemitem', item);
		this._changePotisions(item);
	}

	private _changePotisions(item: any = null) {
		let itemsArray: any = this.conversations;
		let person = this.conversations.find((val: any) => val.message_id === item.message_id);
		person['text'] = item.text;
		if(+this.message_id !== item?.message_id && person) {
			person['count'] = person.count + 1;
			this.gs.store.dispatch(StoreAction.ProfileParams({ method: "GET", params: null, params2: { primary_id: this.gs.identity?.id }, key: 'load_profile' }));
		}
		const filteredArrayOfPersons = itemsArray.filter((p: any) => p.message_id !== item.message_id);
		filteredArrayOfPersons.unshift({...person});
		this.conversations = filteredArrayOfPersons;
	}

	ngOnDestroy() {
		
	}

}
