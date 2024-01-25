import { CdkDragDrop, moveItemInArray, CdkDropListGroup, CdkDropList, CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, afterNextRender } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { fileManupulate, isBrowser } from 'src/app/helpers';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreSelector } from 'src/app/store/selector';
import { NgTemplateOutlet } from '@angular/common';
import { DragAndDropDirective } from '../../directive/drag-and-drop.directive';
import { NgbPopover, NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: '[app-file-drag-drop-uploader], app-file-drag-drop-uploader',
    templateUrl: './file-drag-drop-uploader.component.html',
    styleUrls: ['./file-drag-drop-uploader.component.scss'],
    standalone: true,
    imports: [NgbPopover, NgbProgressbar, DragAndDropDirective, NgTemplateOutlet, CdkDropListGroup, CdkDropList, CdkDrag, CdkDragPlaceholder]
})
export class FileDragDropUploaderComponent implements OnInit {
	configsObservable: Observable<any> = this.gs.store.select(StoreSelector.DefaultSelectors[EnumRxKey.Default.config]);
	@Input() title: any = 'File';
	@Input() browseLabel: any = 'Upload';
	@Input() placeholder: any = '- Please add Photos -';
	@Input() formControlName: any = '';
	@Input() accept: string = 'image/*';
	@Input() multiple: boolean = true;
	@Input() hint: string = '';
	@Input() tooltip: boolean = false;
	@Input() tooltipText: any = 'Lorem';
	@Input() layout: "grid" | "inline" | "grid-inline" | "default" | "ad-layout" = 'default';
	@Input() extensions: "doc" | "image_doc" | "image_video" | "doc_video" | "video" | "image" | "mix" = 'mix';
	@Input() checkExtensions: boolean = false;
	@Input() width: number = 100;
	@Input() height: number = 100;
	@Input() checkHeightWidth: boolean = false;
	@Input() checkSizes: boolean = false;
	@Input() minSize: number = 100;
	@Input() maxSize: number = 10000;
	@Input() checkMaxFile: boolean = false;
	@Input() maxFile: number = 100;

	@Input() deleteAlertMsg: string = 'Are you sure? Do you want to delete the attachment?';
	@Input() deleteSuccessMsg: string = 'File successfully deleted.';
	@Input() uploadSuccessMsg: string = 'File successfully uploaded.';

	@Input() allFiles: any = {
		image: [],
		video: [],
		docs: []
	};

	@Output() public getFileId = new EventEmitter();
	@Output() public getFiles = new EventEmitter();
	@Output() public removePhotos = new EventEmitter();
	@Output() public addPhotos = new EventEmitter();
	@Output() public getTimeDuration = new EventEmitter();
	@ViewChild('uploadFileElement') uploadFileElement!: ElementRef;

	loading: boolean = false;
	progress: number = 0;
	DynamicId: any = 1;
	imageCount: any = '';

	items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	option = "28rem";
	configs: any = null;

	constructor(
		public gs: GlobalService,
		private confirmDialogService: ConfirmDialogService,
		private itemService: ItemService
	) { }

	ngOnInit(): void {
		this.configsObservable.subscribe(data => {
			this.configs = data;
		});
		this.DynamicId = Math.floor((Math.random() * 1000) + 1);
		this.imageCount = '';
		let filesArr = {
			image: this.allFiles?.image?.slice().sort((a: any, b: any) => b?.dem - a?.dem),
			docs: this.allFiles?.docs?.slice().sort((a: any, b: any) => b?.dem - a?.dem),
			video: this.allFiles?.video?.slice().sort((a: any, b: any) => b?.dem - a?.dem)
		}
		this.allFiles = filesArr;
		let filesIds = fileManupulate(this.allFiles);
		this.imageCount = (filesIds.length === 0) ? '' : `${filesIds.length} selected`;
		//console.log('checkHeightWidth', this.checkHeightWidth)
		this.getFiles.emit(this.allFiles);
	}


	upload(event: any, checkHeightWidth = false) {
		let files: any = event.target.files;
		const params: any = [...files];
		let checkCondition: any = null;
		
		if (this.checkHeightWidth) {
			let img = new Image();
			if (isBrowser) {
				img.src = window.URL.createObjectURL(event.target.files[0]);
			};
			img.onload = () => {
				if (img.width === this.width && img.height === this.height) {
					checkCondition = (checkCondition === false) ? false : true;
				} else {
					this.gs.alert(`Sorry, this image doesn't look like the size we wanted. It's ${img.width} px x ${img.height} px but we require ${this.width} px x ${this.height} px size image.`);
					checkCondition = false;
				}
			}
		}
		if(this.checkSizes) {
			params?.forEach((el: any) => {
				let size = Math.floor(el.size / 1000);
				if(this.minSize < size && this.maxSize > size) {
					checkCondition = (checkCondition === false) ? false : true;
				} else {
					this.gs.alert(`${el.name} size should be in between ${this.gs.formatFileSize(this.minSize * 1000)} & ${this.gs.formatFileSize(this.maxSize * 1000)} `, 'danger');
					checkCondition = false;
				}
			});
		}
		if(this.checkMaxFile) {
			let filesIds = fileManupulate(this.allFiles);
			if(this.maxFile < (params?.length + filesIds?.length)) {
				checkCondition = false;
				this.confirmDialogService.confirm({
					message: `Please upload up to ${this.maxFile} images`,
					rejectVisible: false,
					acceptLabel: 'Okay'
				}, () => console.log('Yes'), () => console.log('No'))
			} else {
				checkCondition = (checkCondition === false) ? false : true;
			}
		}
		if(this.checkExtensions) {
			params?.forEach((el: any) => {
				if(this.extensions === 'mix' || this.extensions === this.gs.mimetype(el.type)) {
					checkCondition = (checkCondition === false) ? false : true;
				} else if(this.extensions === 'image_doc' && (this.gs.mimetype(el.type) === 'image' || this.gs.mimetype(el.type) === 'doc')) {
					checkCondition = (checkCondition === false) ? false : true;
				} else if(this.extensions === 'image_video' && (this.gs.mimetype(el.type) === 'image' || this.gs.mimetype(el.type) === 'video')) {
					checkCondition = (checkCondition === false) ? false : true;
				} else if(this.extensions === 'doc_video' && (this.gs.mimetype(el.type) === 'doc' || this.gs.mimetype(el.type) === 'video')) {
					checkCondition = (checkCondition === false) ? false : true;
				}
				else {
					let showErrorMsg = this.configs[`${this.extensions}_supported_file_extensions`] ? this.configs[`${this.extensions}_supported_file_extensions`] : this.hint;
					this.gs.alert(`File Supported Extensions ${showErrorMsg}`, 'danger');
					checkCondition = false;
				}
			});
		}
		if(checkCondition === true) this.onUpload(params);
	}

	onFileDropped(event: any) {
		const params: any = [...event];
		if (event?.length > 0) {
			this.onUpload(params);
		}
	}

	onUpload(params: any) {
		this.loading = true;
		if (params?.length > 0) {
			this.getVideoDuration(params[0]).then((duration: any) => {
				if (duration) this.getTimeDuration.emit(`${duration}`)
			});
		}
		let extensions = `${this.extensions}_supported_file_extensions`;
		//console.log('extensions', extensions);
		this.itemService.uploadAndProgress(params, extensions).subscribe((progresData: any) => {
			this.progress = this.itemService.calcProgressPercent(progresData);
			//console.log('progresData', progresData);
			if (progresData.body) {
				this.loading = false;
				this.uploadFileElement.nativeElement.value = '';
				this.progress = 0;
				let data = this.gs.apiResponce(progresData.body);
				let code: any = data.code;
				if (code === false) {
					let errorMsg = data.data?.files[0]?.errors ?? 'File not supported';
					this.gs.alert(errorMsg, 'danger');
					return;
				}
				if (data.data.files) {
					let response = data.data.files;
					let files = response &&
					{
						image: response.filter((file: any) => (this.gs.mimetype(file.mimetype) === 'image')),
						video: response.filter((file: any) => (this.gs.mimetype(file.mimetype) === 'video')),
						docs: response.filter((file: any) => (this.gs.mimetype(file.mimetype) !== 'video' && this.gs.mimetype(file.mimetype) !== 'image')),
					};
					if (this.multiple) {
						const allFiles = {
							image: (this.allFiles && this.allFiles?.image) ? files?.image.concat(this.allFiles.image) : files?.image,
							video: (this.allFiles && this.allFiles?.video) ? files?.video.concat(this.allFiles.video) : files?.video,
							docs: (this.allFiles && this.allFiles?.docs) ? files?.docs.concat(this.allFiles.docs) : files?.docs,
						};

						this.allFiles = allFiles;
					} else {
						this.allFiles = files;
					}
					this.updateIds();
					this.gs.alert(this.uploadSuccessMsg, 'success');
					this.addPhotos.emit(true);
				} else {
					this.gs.alert('Action not perform', 'danger');
				}
			}
		}, (error: Response) => {
			this.loading = false;
			this.progress = 0;
		});
	}

	/*mimetype(type: string) {
		let mine_type = '';
		let splite = type?.split('/');
		switch (splite[0]) {
			case 'image':
				mine_type = 'image';
				break;
			case 'video':
				mine_type = 'video';
				break;
			default:
				mine_type = 'doc';
				break;
		}
		return mine_type;
	}*/

	

	remove(item: any, type: string) {
		this.confirmDialogService.confirm({
			header: 'Delete?',
			icon: `<img src="${this.gs.imgUrl}/reject.svg" alt="" />`,
			message: this.deleteAlertMsg,
		}, () => {
			this.removeFile(item.id, type);
			this.removePhotos.emit(true);
		}, () => {
			console.log('No clicked');
		})
	}

	removeFile(id: any, type: string) {
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
		let filesArr = {
			image: image,
			docs: docs,
			video: video
		}
		this.allFiles = filesArr;
		this.updateIds();
		this.gs.alert(this.deleteSuccessMsg, 'danger');
	}

	drop(event: CdkDragDrop<any>) {
		let allFiles = { ...this.allFiles };
		let image = allFiles?.image ?? [];
		image[event.previousContainer.data.index] = event.container.data.item;
		image[event.container.data.index] = event.previousContainer.data.item;
		this.allFiles = Object.assign({}, this.allFiles, { image: image });
		//moveItemInArray(this.allFiles?.image, event.previousIndex, event.currentIndex);
		this.updateIds();
	}


	dropImage(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.allFiles?.image, event.previousIndex, event.currentIndex);
		this.updateIds();
	}

	dropDocs(event: CdkDragDrop<any>) {
		let allFiles = { ...this.allFiles };
		let docs = allFiles?.docs ?? [];
		docs[event.previousContainer.data.index] = event.container.data.item;
		docs[event.container.data.index] = event.previousContainer.data.item;
		this.allFiles = Object.assign({}, this.allFiles, { docs: docs });
		//moveItemInArray(this.allFiles?.docs, event.previousIndex, event.currentIndex);
		this.updateIds();
	}

	dropVideo(event: CdkDragDrop<any>) {
		let allFiles = { ...this.allFiles };
		let video = allFiles?.video ?? [];
		video[event.previousContainer.data.index] = event.container.data.item;
		video[event.container.data.index] = event.previousContainer.data.item;
		this.allFiles = Object.assign({}, this.allFiles, { video: video });
		//moveItemInArray(this.allFiles?.video, event.previousIndex, event.currentIndex);
		this.updateIds();
	}

	updateIds() {
		let filesIds = fileManupulate(this.allFiles);
		this.imageCount = `${filesIds.length} selected`;
		this.getFileId.emit(filesIds);
		this.getFiles.emit(this.allFiles);
	}

	getVideoDuration = (file: any) =>
		new Promise((resolve, reject) => {
			const reader: any = new FileReader();
			reader.onload = () => {
				const media = new Audio(reader?.result);
				media.onloadedmetadata = () => resolve(media.duration);
			};
			reader.readAsDataURL(file);
			reader.onerror = (error: any) => reject(error);
		});

}
