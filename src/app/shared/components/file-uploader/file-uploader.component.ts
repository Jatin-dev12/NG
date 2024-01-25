import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmDialogService } from 'src/app/modules/confirm-dialog/confirm-dialog.service';
import { GlobalService } from 'src/app/services/global.service';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { DragAndDropDirective } from '../../directive/drag-and-drop.directive';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss'],
    standalone: true,
    imports: [NgbProgressbar, DragAndDropDirective, AsyncPipe]
})
export class FileUploaderComponent implements OnInit {
	@Input() title: any = 'File';
	@Input() accept: string = 'image/*';
	@Input() multiple: boolean = true;
	@Input() uploads: any = null;
	@Input() hint: string = '';
	@Output() public getFileId = new EventEmitter();
	allFiles: any = {
		image: [],
		video: [],
		docs: []
	};
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.UploadLoading);
	files: Observable<any> = this.gs.store.select(StoreSelector.UploadFiles);

	
	constructor(
		public gs: GlobalService,
		private confirmDialog: ConfirmDialogService,
	) { }

	ngOnInit(): void {
		this.files.subscribe((data: any) => this.allFiles = data);
	}

	upload(event: any) {
		let files: any = event.target.files;
		if (files?.length > 0) {
			const params = [...files];
			this.gs.store.dispatch(StoreAction.UploadParams({ params, upload: this.allFiles }));
		}
	}

	onFileDropped(event: any) {
		//console.log('event', event);
		if (event?.length > 0) {
			const params = [...event];
			this.gs.store.dispatch(StoreAction.UploadParams({ params, upload: this.allFiles }));
		}
	}

	remove(id: any, type = "file") {
		this.confirmDialog.confirmThis("Are you sure to delete?", () => {
			this.removeFile(id, type);
		}, () => {
			console.log('No clicked');
		})
	}

	removeFile(id: any, type = "file") {
		console.log('id', id);
		//return false;
		let imageArr = this.allFiles?.image ? this.allFiles?.image : [];
		let docsArr = this.allFiles?.docs ? this.allFiles?.docs : [];
		let videoArr = this.allFiles?.video ? this.allFiles?.video : [];
		let image: any[] = [];
		let docs: any[] = [];
		let video: any[] = [];
		switch (type) {
			case 'file':
				image = imageArr.filter((val: any) => val.id !== id);
				docs = docsArr;
				video = videoArr;
				break;
			case 'doc':
				docs = docsArr.filter((val: any) => val.id !== id);
				image = imageArr;
				video = videoArr;
				break;
			case 'video':
				video = videoArr.filter((val: any) => val.id !== id);
				image = imageArr;
				docs = docsArr;
				break;
			default:
				break;
		}
		/*let docsIdx = docsArr && docsArr.findIndex((file: any) => (file.id === id));
		let docs = (docsArr.length > 0 && docsIdx === -1) && docsArr.filter((val: any) => val.id !== id);
		let imageIdx = imageArr && imageArr.findIndex((file: any) => (file.id === id));
		let image = (imageArr.length > 0 && imageIdx === -1) && imageArr.filter((val: any) => val.id !== id);
		let videoIdx = videoArr && videoArr.findIndex((file: any) => (file.id === id));
		let video = (videoArr.length > 0 && videoIdx === -1) && videoArr.filter((val: any) => val.id !== id);*/

		let filesArr = {
			image: image,
			docs: docs,
			video: video
		}

		this.gs.store.dispatch(StoreAction.UploadRespond({ files: filesArr }));
	}

}
