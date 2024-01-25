import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConversationListItemComponent } from '../conversation-list-item/conversation-list-item.component';
import { SearchPipe } from 'src/app/shared';

@Component({
	selector: 'app-conversation-list',
	templateUrl: './conversation-list.component.html',
	standalone: true,
	imports: [ConversationListItemComponent, SearchPipe],
	providers: [SearchPipe]
})
export class ConversationListComponent implements OnInit {
	@Input() conversations: any = [];
	@Input() sort: string = 'all';
	@Output() public getProfile = new EventEmitter();
	constructor() { }

	ngOnInit(): void {

	}

	get itemsArray() {
		let items: any = [];
		switch (this.sort) {
			case 'unread':
				items = this.conversations?.filter((val: any) => val.count !== 0);
				break;
			default:
				items = this.conversations;
				break;
		}
		return items;
	}

}
