import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Enums } from 'src/app/enums';
import { Files, Order } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { environment } from 'src/environments/environment';
import { TermsConditionDialogComponent } from '../../components/terms-condition-dialog/terms-condition-dialog.component';
import { LaddaDirective } from '../../../../modules/ladda/ladda.directive';
import { NgClass, AsyncPipe } from '@angular/common';
import { ControlErrorsDirective } from '../../../../shared/directive/control-errors.directive';
import { ErrorSummaryComponent } from '../../../../shared/components/error-summary/error-summary.component';
import { FormSubmitDirective } from '../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-become-form',
    templateUrl: './become-form.component.html',
    styleUrls: ['./become-form.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ErrorSummaryComponent, ControlErrorsDirective, NgClass, RouterLink, LaddaDirective, AsyncPipe]
})
export class BecomeFormComponent implements OnInit {
	
	@Input() isModal: boolean = false;
	@Output() modalEvent: EventEmitter<string> = new EventEmitter<string>();
	form!: UntypedFormGroup;
	submitted = false;
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.AuthLoading);
	role = Enums.Role;
	uploadLoading: boolean = false;
	coverView: any = null;

	order: Order | null = null;

	customPatterns = { '0': { pattern: new RegExp('\[0-9\]') } };

	constructor(
		public gs: GlobalService,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private itemService: ItemService,
		private modalService: NgbModal,
		private confirmDialog: ConfirmDialogService
	) {
		//this.role = route.snapshot.data['Role'];
	}

	get f() { return this.form.controls; };

	ngOnInit(): void {
		this.gs.clearErrorMessages();
		if (this.itemService.isAuthenticated()) {
			this.gs.router('/');
		}
		this.form = this.gs.formBuilder.group({
			first_name: new UntypedFormControl('', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$')]),
			last_name: new UntypedFormControl('', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$')]),
			email: new UntypedFormControl('', [Validators.required, Validators.email]),
			password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
			// ssn_number: new FormControl('', [Validators.required, Validators.pattern('^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$'), Validators.maxLength(11)]),
			telephone: new UntypedFormControl('', [Validators.required]),
			confirm_password: new UntypedFormControl(''),
			document_id: new UntypedFormControl('', [Validators.required]),
			role: new UntypedFormControl(Enums.Role.ROLE_OWNER, [Validators.required]),
			terms: new UntypedFormControl('1', [Validators.required]),
			recaptcha: new UntypedFormControl('recaptcha', [Validators.required]),
		}); // Form validation
	}

	onLogin(form: any) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		form.value.telephone = form.value.telephone.split('-').join('');
		form.value.confirm_password = form.value.password;
		this.gs.clearErrorMessages();
		//this.gs.store.dispatch(register({ payload: form.value }));
		let params = { ...form.value };
		this.gs.store.dispatch(StoreAction.AuthParams({ params: params, params2: { key: 'register' } }));
		setTimeout(() => {
			this.modalEvent.emit('HideModal');
		}, 900);
	}

	openTermCondition() {
		const modalRef = this.modalService.open(TermsConditionDialogComponent, {
			windowClass: 'dark-modal-forgot',
			//backdrop: 'static', 
			keyboard: false,
			animation: true,
			scrollable: true
		});
		modalRef.result.then((result: any) => {
			//this.openPopup(result);
		}, (reason: any) => {
			console.log('reason', reason)
		});
	}

	uploadVideo(event: any) {
		let files: FileList = event.target.files;
		if ((files !== null) && (files.length > 0)) {
			this.uploadLoading = true;
			this.itemService.basicUpload(files).subscribe(data => {
				if (data.data) {
					this.uploadLoading = false;
					let filesList: Files[] = data.data.files;
					this.coverView = filesList[0];
					this.form.patchValue({
						document_id: filesList[0].id
					});
				}
			}, (error: Response) => {
				this.uploadLoading = false;
			})
		}
	}

	removeVideo(id: any) {
		this.confirmDialog.confirmThis("Are you sure to delete?", () => {
			this.coverView = null;
			this.form.patchValue({
				document_id: ''
			});
		}, () => {
			console.log('No clicked');
		})
	}


}
