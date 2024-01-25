import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services';

@Component({
	selector: 'app-message-attachment',
	templateUrl: './message-attachment.component.html',
	styleUrls: ['./message-attachment.component.css'],
	standalone: true
})
export class MessageAttachmentComponent implements OnInit {
	@Input() attachments: any = null;
	@Input() identifier: any = null;
	_albums: any = [];
	constructor(
		public gs: GlobalService,
	) { }

	ngOnInit(): void {

	}



}
