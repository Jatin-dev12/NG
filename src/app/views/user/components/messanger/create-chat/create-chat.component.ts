import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Observable, Subject } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { User } from 'src/app/models';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-create-chat',
    templateUrl: './create-chat.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule],
})
export class CreateChatComponent implements OnInit {
	// loading: Observable<boolean> = this.gs.store.select(StoreSelector.FriendLoadingKey[`${FriendRxKey.friends}Loading`]);
	// moreLoading: Observable<boolean> = this.gs.store.select(StoreSelector.FriendMoreLoading);
	// friendObservable: Observable<any> = this.gs.store.select(StoreSelector.FriendSelectors[FriendRxKey.friends]);
	page = 1;
	username: any = '';
	q: any = '';
	modelChanged: Subject<string> = new Subject<string>();
	//FriendRxKey = FriendRxKey;

	constructor(
		private itemService: ItemService,
		public gs: GlobalService,
		private router: Router,
		public activeModal: NgbActiveModal,
	) { }

	ngOnInit(): void {
		/*this.friendObservable.subscribe(data => {
			if(data === null) this.onLoadFriend();
		});*/
		this.modelChanged.pipe(debounceTime(400)).subscribe(data => {
			if(data) {
				this.page = 0;
				this.handleLoadMore();
			}	
		});
	}

	clearSearch() {
		this.q = '';
		this.modelChanged.next(this.q);
	}

	onLoadFriend() {
		//let action = StoreAction.FriendParams({ method: "GET", params: null, params2: { q: this.q, key: FriendRxKey.friends, 'per-page': 20, page: this.page }, key: FriendRxKey.friends });
		//this.gs.store.dispatch(action);
	}

	handleLoadMore() {
		this.page += 1;
		//let action = StoreAction.FriendMoreParams({ method: "GET", params: null, params2: { q: this.q, key: FriendRxKey.friends, 'per-page': 20, page: this.page }, key: FriendRxKey.friends });
		//this.gs.store.dispatch(action);
	}

	createChat(friend: any) {
		let formData = {
			text: ' Hi ',
			recipients: [friend.id]
		}
		let params: any = { UserMessageForm: formData };
		this.itemService.default("POST", params, { key: EnumRxKey.Default.message }).subscribe((data: any) => {
			//console.log('data', data)
			//this.router.navigate(['/messages/sender/', data.data.message_id]);
			this.router.navigate(['/messenger'], { queryParams: { message_id: data.data.message_id } });
			this.activeModal.close(data.data)
		}, (error: Response) => {
			
		});
	}


}
