import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, Notifications, User } from '../models';
import { ToastService } from '../modules/toast-global/toast.service';
import * as CryptoJS from 'crypto-js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedLoginDialogComponent } from '../dialogs';
import { Enums } from '../enums';
import { removeItem } from '../helpers';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	userObservable: Observable<User> = this.stores.select(state => state.auth.user);
	user: User | null = null;
	public errors: any = [];
	public mainTitle = environment.siteName;
	public identity!: User | null;
	public uploadPath = environment.uploadPath;
	public imgUrl = environment.production ? `${environment.uploadPath}storage` : `/assets/images`;
	//public imgUrl = `${environment.uploadPath}storage`;
	store = this.stores;
	formBuilder = this.fb;
	formBuilderTyped = this.fb2;
	private _subjectAction = new Subject<any>();
	trrigerAction$ = this._subjectAction.asObservable();

	constructor(
		private linkRouter: Router,
		private toastService: ToastService,
		private titleService: Title,
		private stores: Store<any>,
		private fb: UntypedFormBuilder,
		private fb2: FormBuilder,
		private modalService: NgbModal,
	) {
		this.userObservable.subscribe(data => {
			this.user = new User(data);
			this.identity = (data?.id) ? new User(data) : null;
		});

	}

	trrigerAction(data: any) { this._subjectAction.next(data); }

	clearErrorMessages() {
		this.errors = [];
	}

	handleHttpError(error: HttpErrorResponse) {
		return throwError(error || 'Server Error');
	}

	ObjectToArray(objs: any) {
		const items: any = [];
		objs && Object.keys(objs).map(itemKey => {
			const item = objs[itemKey];
			items.push(item);
		});
		return items;
	};

	logout() {
		this.alert(`You have successfully logout`);
		setTimeout(() => {
			removeItem('token');
			removeItem('user');
			removeItem('ref_by');
			window.location.href = '/';
		}, 400);
	}

	public handleErrors(error: any) {
		const httpErrorCode = error.status;
		this.clearErrorMessages();
		let mainData = this.apiResponce(error);
		let showMessage = mainData?.error ? mainData?.error : mainData?.message ? mainData?.message : mainData?.data;
		//console.log('showMessage', showMessage);
		switch (httpErrorCode) {
			case 401:
				this.linkRouter.navigateByUrl('/login');
				this.toastService.show(showMessage, { classname: 'bg-warning' });
				break;
			case 403:
				this.toastService.show(showMessage, { classname: 'bg-danger' });
				break;
			case 422:
				//console.log('fgdfgdf', mainData.data)
				if (mainData.data?.user_id) {
					//this.toastService.show(showMessage, { classname: 'bg-danger' });
					this.errors.push(showMessage);
					return;
				}
				const messages: any = mainData.data;
				const messages2: any = mainData.data?.errors;
				const errors = (messages === null) ? showMessage : messages?.errors?.join(',');
				//console.log('message', errors, messages);
				for (const message in messages) {
					if (messages[message]) {
						messages[message].forEach((element: any) => {
							this.errors.push(element[0]);
						});
					}
				}
				for (const message in messages2) {
					if (messages[message]) {
						messages[message].forEach((element: any) => {
							this.errors.push(element[0]);
						});
					}
				}
				this.toastService.show(errors, { classname: 'bg-danger' });
				break;
			case 400:
				let msgShow = showMessage?.data ? showMessage?.data : showMessage?.message ? showMessage?.message : showMessage;
				this.toastService.show(msgShow, { classname: 'bg-danger' });
				//console.log('showMessage', msgShow)
				if (msgShow === "authentication required" || msgShow === 'Token is expired' || msgShow === 'signature is invalid') {
					this.linkRouter.navigateByUrl('/login');
					removeItem('token');
					removeItem('user');
					window.location.reload();
				}
				break;
			case 404:
				this.toastService.show(showMessage, { classname: 'bg-danger' });
				break;
			case 500:
				this.toastService.show(showMessage, { classname: 'bg-danger' });
				if (showMessage === "Signature verification failed" || showMessage === 'Token is expired' || showMessage === 'signature is invalid') {
					this.linkRouter.navigateByUrl('/login');
					removeItem('token');
					removeItem('user');
					window.location.reload();
				}
				break;
			case 0:
				this.toastService.show(error.message, { classname: 'bg-danger' });
				break;
			default:
				this.toastService.show('An error occurred while processing your request.', { classname: 'bg-danger' });
		}
	}

	alert(msg: any, cls = 'success', position = 'bottom-right') {
		this.toastService.show(this.translate(msg), { classname: `bg-${cls}`, position: position });
	}

	setTitle(title: any) {
		this.titleService.setTitle(this.mainTitle + ' | ' + title);
	}

	router(url: string) {
		this.linkRouter.navigate([`${url}`]);
	}

	capitalize(s: any) {
		let space = s.split('.').join(' ');
		return space && space.charAt().toUpperCase() + space.slice(1);
	}

	generateFake(count: number): Array<number> {
		const indexes = [];
		for (let i = 0; i < count; i++) {
			indexes.push(i);
		}
		return indexes;
	}

	validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateAllFormFields(control);
			} else if (control instanceof FormArray) {
				control.markAllAsTouched();
			}
		});
	}

	isValid(fieldName: any, form?: any, group?: string | undefined): boolean {
		let field = form && form[fieldName] && form[fieldName].invalid && (form[fieldName].dirty || form[fieldName].touched);
		let formGroup = group && form.get(group)?.get(fieldName)?.invalid && (form.get(group)?.get(fieldName)?.dirty || form.get(group)?.get(fieldName)?.touched);
		return (group === undefined || group === null || group === '') ? field : formGroup;
	}

	addCls(fieldName: string, form?: any, group?: string | undefined) {
		let field = { 'is-invalid': this.isValid(fieldName, form, group), 'has-feedback': this.isValid(fieldName, form, group) };
		let formGroup = { 'is-invalid': this.isValid(fieldName, form, group), 'has-feedback': this.isValid(fieldName, form, group) };
		return (group === undefined || group === null || group === '') ? field : formGroup;
	}

	validationMsg(fieldName: string, form?: any, group?: string | undefined) {
		let field = `${this.capitalize(fieldName)} is requared`;
		let formGroup = `${this.capitalize(fieldName)} is requared`;
		return (group === undefined || group === null || group === '') ? field : formGroup;
	}

	files(event: any, form: any) {
		form.patchValue({ files: event })
	}

	decrypt(encryptedString: any) {
		let _key = environment.DECRYPT_KEY;
		let json = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encryptedString)));
		let salt = CryptoJS.enc.Hex.parse(json.salt);
		let iv = CryptoJS.enc.Hex.parse(json.iv);
		let encrypted = json.ciphertext;
		let iterations = parseInt(json.iterations);
		if (iterations <= 0) {
			iterations = 999;
		}
		const encryptMethod: any = 'AES-256-CBC';
		const aesNumber = encryptMethod.match(/\d+/)[0];
		const encryptLength = parseInt(aesNumber)
		let encryptMethodLength = (encryptLength / 4);
		let hashKey = CryptoJS.PBKDF2(_key, salt, {
			'hasher': CryptoJS.algo.SHA512,
			'keySize': (encryptMethodLength / 8),
			'iterations': iterations
		});
		let decrypted = CryptoJS.AES.decrypt(encrypted, hashKey, { 'mode': CryptoJS.mode.CBC, 'iv': iv });
		return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
	} // decrypt

	apiResponce(response: ApiResponse) {
		let token = response?.token;
		let error = response.error;
		let statusText = response.statusText;
		let data = response?.mode ? this.decrypt(response?.data) : response?.data;
		let items = (data && data.items) ? data.items : [];
		let pagination = (data && data.pagination) ? data.pagination : null;
		data = (data && data.pagination) ? { items: items, pagination: pagination } : data;
		return new ApiResponse({
			mode: response?.mode,
			code: response?.code,
			message: response?.message,
			status: response?.status,
			data: data,
			token: token,
			error: error,
			statusText: statusText,
		});
	}

	yearList() {
		const current_year = new Date().getFullYear();
		const indexes = [];
		for (let i = current_year; i > 1991; i--) {
			indexes.push(i);
		}
		return indexes;
	}

	isEmptyObject(obj: any) {
		return (obj && (Object.keys(obj).length === 0));
	}

	loginDialog(url = '/') {
		const modalRef = this.modalService.open(SharedLoginDialogComponent, {
			windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true
		});
		modalRef.componentInstance.url = url;
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			console.log('reason', reason)
		});
	}

	notificationUrl(item: Notifications) {
		let url = '/';
		let redirect_url = (this.identity?.id === item.sender_id) ? item.sender_url : item.receiver_url;
		switch (item.action) {
			case 'demo':
				url = redirect_url ?? '/';
				break;
			default:
				url = redirect_url ?? '/';
				break;
		}
		return url
	}

	timeStamp(strDate: any) {
		let datum = Date.parse(strDate);
		return datum / 1000;
	}


	base64toFile(dataurl: any, filename: any) {
		let arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, { type: mime });
	}

	shortNumber(number: any) {
		const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
		// what tier? (determines SI symbol)
		const tier = Math.log10(number) / 3 | 0;
		// if zero, we don't need a suffix
		if (tier == 0) return number;
		// get suffix and determine scale
		const suffix = SI_SYMBOL[tier];
		const scale = Math.pow(10, tier * 3);
		// scale the number
		const scaled = number / scale;
		// format number and add suffix
		return scaled.toFixed(1) + suffix;
	}

	convertFieldValue(data: any, fields: any) {
		let dataArray: any[] = [];
		if (data && fields) {
			let options = fields?.options;
			data.forEach((el: any) => {
				let findData = options?.find((val: any) => val.option_code === el);
				dataArray.push(findData);
			});
		}
		return dataArray;
	}

	get is_general() { return (this.identity?.role === Enums.ROLE_GENERAL) }
	get is_guest() { return (this.identity?.role === Enums.ROLE_GUEST) }
	get is_manager() { return (this.identity?.role === Enums.ROLE_MANAGERS) }
	get is_owner() { return (this.identity?.role === Enums.ROLE_OWNER) }
	get is_staff() { return (this.identity?.role === Enums.ROLE_STAFF) }
	get is_vendor() { return (this.identity?.role === Enums.ROLE_VENDORS) }
	get is_tenant() { return (this.identity?.role === Enums.ROLE_USER) }

	numberOnly(event: any): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		return (charCode > 31 && (charCode < 48 || charCode > 57)) ? false : true;
	}

	numberOnly2(event: any): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		return (charCode < 46 || charCode > 57 || charCode === 47) ? false : true;
	}

	FirstLast(first?: any, last?: any) {
		let name = 'MY';
		if (first && last) {
			name = first?.substring(0, 1).toUpperCase() + last?.substring(0, 1).toUpperCase();
		} else {
			let first_name: any = this.user?.userProfile?.first_name?.substring(0, 1).toUpperCase();
			let last_name: any = this.user?.userProfile?.last_name?.substring(0, 1).toUpperCase();
			name = first_name + last_name;
		}
		return name;
	}

	getAge(dateString: any) {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	getFilesList(files: any) {
		let type = files?.mimetype;
		let image = (type === 'image') ? [files] : [];
		let video = (type === 'video') ? [files] : [];
		let docs = (type !== 'video' && type !== 'image') ? [files] : [];
		return { image: image, video: video, docs: docs };
	}

	convertHMS(value: any) {
		const sec = parseInt(value ?? 0, 10); // convert value to number if it's string
		let hours: any = Math.floor(sec / 3600); // get hours
		let minutes: any = Math.floor((sec - (hours * 3600)) / 60); // get minutes
		let seconds: any = sec - (hours * 3600) - (minutes * 60); //  get seconds
		// add 0 if value < 10; Example: 2 => 02
		if (hours < 10) { hours = "0" + hours; }
		if (minutes < 10) { minutes = "0" + minutes; }
		if (seconds < 10) { seconds = "0" + seconds; }
		if (+hours === 0) {
			return minutes + ':' + seconds;
		} else {
			return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
		}
	}

	// Preserve original property order
	originalOrder = (a: any, b: any): number => 0;

	// Order by ascending property value
	valueAscOrder = (a: any, b: any): number => a.value.localeCompare(b.value);

	// Order by descending property key
	keyDescOrder = (a: any, b: any): number => a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);

	// Find array to object
	find = (array: any[], value: any, key: string = 'key') => array.find(v => v[key] === value);
	findId = (array: any[], id: any) => array.find(v => v.id === +id);

	// Date Formate 
	dateFormate = (date: any, formate: 'full' | 'time' | 'date' | 'DD/MM/YYYY' | 'DD-MM-YYYY' = 'full') => {
		if (date) {
			let newDate = date;
			let split: any = date?.split(' '); // 12/29/2022  12-29-2022
			let d = split[0].split('-');
			//console.log('d', d)
			switch (formate) {
				case 'DD/MM/YYYY':
					newDate = split[0]
					break;
				case 'DD-MM-YYYY':
					newDate = split[0]
					break;
				case 'date':
					newDate = d[2] + '/' + d[1] + '/' + d[0];
					//console.log('newDate', newDate)
					break;
				case 'time':
					newDate = new Date('1970-01-01T' + split[1] + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' });
					break;
				default:
					newDate = date;
					break;
			}
			return newDate;
		};
	}

	removeBlankObject(item: any) {
		let newObj = { ...item };
		Object.keys(newObj).forEach(key => {
			if (newObj[key] === null || newObj[key] === undefined || newObj[key] === '') {
				delete newObj[key];
			}
		});
		return newObj;
	}

	formatFileSize(bytes: number, decimalPoint = 0) {
		if (bytes == 0) return '0 Bytes';
		let k = 1000,
			dm = decimalPoint || 2,
			sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
			i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	translate(str: any) {
		/*const currentLang = this.translateService.currentLang; // get current language
		const returnValue = this.translateService.translations[currentLang][str]; // get converted string from current language
		if (returnValue === undefined) {
			return this.translateService.instant(str); // if value is getting undefined then return default language string, en_merch is default english language file here
		} else {
			return returnValue;
		}*/
		return str;
	}

	imgPath(url: any) {
		let replace = url?.replace(environment.imgUrl, '');
		let newUrl = environment.imgUrl + '/' + replace;
		return url;
	}

	margeMedia(response: any) {
		let filesArr = {
			image: response?.filter((file: any) => (this.mimetype(file.mimetype) === 'image')) ?? [],
			video: response?.filter((file: any) => (this.mimetype(file.mimetype) === 'video')) ?? [],
			docs: response?.filter((file: any) => (this.mimetype(file.mimetype) !== 'video' && this.mimetype(file.mimetype) !== 'image')) ?? [],
		}
		return filesArr;
	}

	mediaFiles(response: any, type: 'image' | 'video' | 'doc') {
		let allFiles = {};
		switch (type) {
			case 'image':
				allFiles = {
					image: response?.filter((file: any) => (this.mimetype(file.mimetype) === 'image')) ?? [],
					video: [],
					docs: [],
				}
				break;
			case 'video':
				allFiles = {
					image: [],
					video: response?.filter((file: any) => (this.mimetype(file.mimetype) === 'video')) ?? [],
					docs: [],
				}
				break;
			default:
				allFiles = {
					image: [],
					video: [],
					docs: response?.filter((file: any) => (this.mimetype(file.mimetype) !== 'video' && this.mimetype(file.mimetype) !== 'image')) ?? [],
				}
				break;
		}
		return allFiles;
	}

	mimetype(type: string) {
		let mine_type = '';
		let splite = type?.split('/');
		//"doc" | "image" | "video" | "mix" = 'mix';
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
	}

	userType(role: any) {
		let type: any = Enums.Role.ROLE_USER;
		switch (role) {
			case Enums.Role.ROLE_OWNER:
				type = 'Property Owner';
				break;
			case Enums.Role.ROLE_MANAGERS:
				type = 'Property Managers';
				break;
			case Enums.Role.ROLE_VENDORS:
				type = 'Property Vendors';
				break;
			case Enums.Role.ROLE_STAFF:
				type = 'Property Staff';
				break;
			case Enums.Role.ROLE_GUEST:
				type = 'Guest';
				break;
			case Enums.Role.ROLE_GENERAL:
				type = 'General';
				break;
			default:
				break;
		}
		return type;
	}

	get requestUrl() {
		let url = '';
		switch (this.user?.role) {
			case Enums.ROLE_OWNER:
				url = 'request-manager';
				break;
			case Enums.ROLE_MANAGERS:
				url = 'request-owner';
				break;
			case Enums.ROLE_USER:
				url = 'request-manager';
				break;
			default:
				url = 'request-tenant';
				break;
		}
		return url;
	}

	get billUrl() {
		let url = '';
		switch (this.user?.role) {
			case Enums.ROLE_OWNER:
				url = 'bill-tenant';
				break;
			case Enums.ROLE_MANAGERS:
				url = 'bill-tenant';
				break;
			case Enums.ROLE_VENDORS:
				url = 'bill-manager';
				break;
			default:
				url = 'bill-tenant';
				break;
		}
		return url;
	}

	get maxLength() {
		return 5000;
	}

	removeLastS(s: any) {
		//return s?.slice(0, s?.lastIndexOf("s"));
		//console.log('s.replace(/.$/, "").endsWith("s");', s?.endsWith("s"))
		return s?.endsWith("s") ? s?.slice(0, s?.lastIndexOf("s")) : s;
	}

}
