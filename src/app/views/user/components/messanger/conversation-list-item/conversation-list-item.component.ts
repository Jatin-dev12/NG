import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import moment from 'moment';
import { JsonPipe, NgClass } from '@angular/common';
import { StoreAction } from 'src/app/store/actions';
import { GlobalService } from 'src/app/services';

@Component({
    selector: 'app-conversation-list-item',
    templateUrl: './conversation-list-item.component.html',
    standalone: true,
    imports: [RouterLink, NgClass, JsonPipe, RouterLinkActive],
})
export class ConversationListItemComponent implements OnInit {
	@Input() item: any = null;
	message_id: number = 0;
	
	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute
	) {
		this.message_id = this.activeRoute.snapshot.params['message_id'];
	}

	ngOnInit(): void {
		
	}

	get recipient() {
		let recipientArray = this.item?.recipients?.filter((val: any) => val !== null);
		//console.log('recipientArray', recipientArray)
		return recipientArray && recipientArray[0];
	}

	removeCount(item?: any) {
		this.item.count = 0;
		setTimeout(() => {
			this.gs.store.dispatch(StoreAction.ProfileParams({ method: "GET", params: null, params2: { primary_id: this.gs.identity?.id }, key: 'load_profile' }));
		}, 1000);
	}

	count(item?: any) {
		let count = (parseInt(item.count) === 0) ? false : true; 
		return count
	}

	timeNow(time: any) {
		return moment(parseInt(time)).fromNow(true);
	}

}
