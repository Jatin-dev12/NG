import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment-timezone';
import { GlobalService } from 'src/app/services';
import { MessageAttachmentComponent } from '../message-attachment/message-attachment.component';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-message-item',
    templateUrl: './message-item.component.html',
    styleUrls: ['./message-item.component.css'],
    standalone: true,
    imports: [NgbTooltip, MessageAttachmentComponent]
})
export class MessageItemComponent implements OnInit {
	@Input() item: any = null;
	constructor(
		public gs: GlobalService,
	) { }

	ngOnInit(): void {

	}

	timeNow(time: any) {
		//console.log('time', time)
		return moment(parseInt(time)).fromNow(true);
	}

}
