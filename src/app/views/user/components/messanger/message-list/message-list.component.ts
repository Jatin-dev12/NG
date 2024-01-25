import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { MessageItemComponent } from '../message-item/message-item.component';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import moment from 'moment';

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.css'],
    standalone: true,
    imports: [NgxSkeletonLoaderModule, NgClass, MessageItemComponent, DatePipe, NgIf]
})
export class MessageListComponent implements OnInit {
	@Input() items: any = null;
	@Input() requestLoading: boolean = false;
	@Input() loading: boolean = false;
	constructor(
		public gs: GlobalService
	) { }

	ngOnInit(): void {
	}

	isMine(message: any) {
        return (message?.sender?.id === this.gs.identity?.id);
    }

	timeNow(time: any) {
		return moment(parseInt(time)).fromNow(true);
	}

	get itemsArray() {
		return this.items.slice().reverse();
	}


}
