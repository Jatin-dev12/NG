import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Emoji } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { GlobalService, ItemService, WebSocketService } from 'src/app/services';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { MatButtonModule } from '@angular/material/button';
import { DOCUMENT, JsonPipe } from '@angular/common';
import { ConfirmDialogService, LaddaDirective } from 'src/app/modules';
import { FormSubmitDirective, ControlErrorsDirective, HighlightDirective } from 'src/app/shared';

@Component({
	selector: 'app-compose',
	templateUrl: './compose.component.html',
	standalone: true,
	imports: [ ReactiveFormsModule, FormSubmitDirective, ControlErrorsDirective, HighlightDirective, MatButtonModule, LaddaDirective, PickerComponent, JsonPipe ],
})
export class ComposeComponent implements OnInit {

	@ViewChild('posttext', { static: false }) input!: ElementRef<HTMLInputElement>;
	@Input() message_id: any;
	@Input() chatRequestLoading: any;
	show: boolean = false;
	opened: boolean = false;
	form!: UntypedFormGroup;
	submitted = false;
	loading = false;
	progress!: number;
	image: any[] = [];
	imageView: any[] = [];

	constructor(
		public gs: GlobalService,
		private itemService: ItemService,
		private fb: UntypedFormBuilder,
		@Inject(DOCUMENT) private _document: Document,
		private confirmDialogService: ConfirmDialogService,
		private webSocketService: WebSocketService,
	) {

	}

	get f() { return this.form.controls; }

	ngOnInit() {
		//this.webSocketService2.connect('');
		this.form = this.fb.group({
			text: new UntypedFormControl('', [Validators.maxLength(this.gs.maxLength)]),
			attachments: new UntypedFormControl([]),
		});
	}

	get isSocketOn() {
		return (this.webSocketService.chatSocket && this.webSocketService.chatSocket.readyState === WebSocket.OPEN)
	}

	reConnect() {
		window.location.reload();
	}

	sendMsg(form: any) {
		if (this.form.valid) {
			this.submitted = true;
		}
		//let websocket = new WebSocket(environment.WEB_SOCKET_CHAT_URL);
		let params = { ...form.value };
		params['token'] = `Bearer ${this.itemService.getAuthorizationToken()}`;
		params['attachments'] = (this.image.length > 0) ? this.image : [];
		params['sender_id'] = this.gs.identity?.id;
		params['message_id'] = this.message_id;
		if (params['text']?.length === 0 && params['attachments']?.length === 0) {
			this.submitted = false;
			return;
		}
		let params2 = { message_id: this.message_id, key: 'message' };
		this.show = false;
		//console.log('websocket params', params)
		this.webSocketService.chatSend(JSON.stringify(params));
		setTimeout(() => {
			this.submitted = false;
			this.form.reset();
			this.imageView = [];
			this.image = [];
		}, 500);


		/*
		this.itemService.profile("POST", params, params2).subscribe(response => {
			this.submitted = false;
			this.form.reset();
			this.imageView = [];
			this.image = [];
		}, (error: Response) => {
			this.submitted = false;
		});
		*/
	}

	upload(event: any) {
		let files: FileList = event.target.files;
		if(10 < this.imageView.length + files.length) {
			this.confirmDialogService.confirm({
				message: `Maximum 10 files are allowed`,
				rejectVisible: false,
				acceptLabel: 'Okay'
			}, () => console.log('Yes'), () => console.log('No'))
			return
		}
		this.loading = true;
		this.itemService.basicUpload(files).subscribe(response => {
			this.loading = false;
			console.log('response', response);
			if (response.data.files !== undefined && response.data.files.length > 0) {
				let dd = response.data.files;
				dd.forEach((element: any) => {
					this.image.push(element.id);
					this.imageView.push(element);
				});
			}
		}, (error: Response) => {
			this.loading = false;
		});
	}

	deletePhoto(photo: any) {
		this.imageView.splice(this.imageView.indexOf(photo), 1);
		this.image.splice(this.image.indexOf(photo.id), 1);
	}

	addEmojiPost(selected: Emoji) {
		const emoji: string = (selected.emoji as any).native;
		const input = this.input.nativeElement;
		input.focus();
		if (this._document.execCommand) {
			var event = new Event('input');
			this._document.execCommand('insertText', false, emoji);
			return;
		}
		const [start, end]: any = [input.selectionStart, input.selectionEnd];
		input.setRangeText(emoji, start, end, 'end');
	}

}
