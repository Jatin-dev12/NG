import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService, ItemService } from 'src/app/services';
import { User } from 'src/app/models';
import { Emoji } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { DOCUMENT } from '@angular/common';

@Component({
	selector: 'app-messages-reply-dialog',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './messages-reply-dialog.component.html',
	styleUrls: ['./messages-reply-dialog.component.scss']
})
export class MessagesReplyDialogComponent {
	@Input() item!: User;
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

	get f() { return this.form.controls; }

	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private itemService: ItemService,
		@Inject(DOCUMENT) private _document: any,
	) { }

	ngOnInit(): void {
		this.message_id = this.item.message_id;
		this.form = this.gs.formBuilder.group({
			text: new UntypedFormControl(''),
			attachments: new UntypedFormControl([]),
		});
	}

	onSubmit(form: UntypedFormGroup) {
		if (this.form.valid) {
			this.submitted = true;
		}
		let params = { ...form.value };
		params['attachments'] = (this.image.length > 0) ? this.image : [];
		if (params['text']?.length === 0 && params['attachments']?.length === 0) {
			this.submitted = false;
			return;
		}
		let params2 = { message_id: this.message_id, key: 'message' };
		this.show = false;
		this.itemService.profile("POST", params, params2).subscribe(response => {
			this.submitted = false;
			this.form.reset();
			this.imageView = [];
			this.image = [];
			this.activeModal.close();
			this.gs.alert('Success');
		}, (error: Response) => {
			this.submitted = false;
		});
	}

	upload(event: any) {
		let files: FileList = event.target.files;
		this.loading = true;
		this.itemService.basicUpload(files).subscribe(response => {
			this.loading = false;
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
