import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { Enums } from 'src/app/enums';
import { CustomValidators, MustMatch, PasswordStrengthValidator } from 'src/app/helpers';
import { Order } from 'src/app/models';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { environment } from 'src/environments/environment';
import { LaddaDirective } from 'src/app/modules';
import { FormSubmitDirective, ErrorSummaryComponent, ControlErrorContainerDirective, ControlErrorsDirective, FileDragDropUploaderComponent, PasswordToggleDirective } from 'src/app/shared';
import { TermsConditionDialogComponent } from '../../components/terms-condition-dialog/terms-condition-dialog.component';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss'],
	standalone: true,
	imports: [ReactiveFormsModule, FormSubmitDirective, ErrorSummaryComponent, ControlErrorContainerDirective, NgSelectModule, ControlErrorsDirective, FileDragDropUploaderComponent, PasswordToggleDirective, LaddaDirective, RouterLink, AsyncPipe, RecaptchaModule, RecaptchaFormsModule],
	providers: [
		{
			provide: RECAPTCHA_SETTINGS,
			useValue: {
				siteKey: environment.googleCaptcha
			} as RecaptchaSettings
		}
	]
})
export class RegisterFormComponent implements OnInit {
	@Input() isModal: boolean = false;
	@Output() modalEvent: EventEmitter<string> = new EventEmitter<string>();
	form!: UntypedFormGroup;
	submitted = false;
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.AuthLoading);
	RoleArray = Enums.RoleArray;
	role = Enums.Role;

	order: Order | null = null;

	constructor(
		public gs: GlobalService,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private itemService: ItemService,
		private modalService: NgbModal,
	) {

	}

	get f() { return this.form.controls; };

	ngOnInit(): void {
		this.gs.clearErrorMessages();
		if (this.itemService.isAuthenticated()) {
			this.gs.router('/');
		}
		this.form = this.gs.formBuilder.group({
			//first_name: new UntypedFormControl('', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$')]),
			//last_name: new UntypedFormControl('', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$')]),
			name: new UntypedFormControl('', [Validators.required, CustomValidators.isEmptyOrSpaces]),
			email: new UntypedFormControl('', {
				validators: [Validators.required, Validators.email], asyncValidators: this.itemService.uniqueEmailValidator(),
				updateOn: 'blur'
			}),
			password: new UntypedFormControl('', [Validators.required, PasswordStrengthValidator]),
			confirm_password: new UntypedFormControl('', [Validators.required]),
			role: new UntypedFormControl(null, [Validators.required]),
			files: new UntypedFormControl(''),
			profile: this.gs.formBuilder.group({
				is_owner: new UntypedFormControl(null),
				is_manager: new UntypedFormControl(null),
				is_vendor: new UntypedFormControl(null),
				is_staff: new UntypedFormControl(null),
				is_tenant: new UntypedFormControl(null),
			}),
			terms: new UntypedFormControl(false, [Validators.requiredTrue]),
			recaptcha: new UntypedFormControl('', [Validators.required]),
		}, { validators: MustMatch('password', 'confirm_password') }); // Form validation


		this.route.queryParamMap.subscribe(data => {
			let role = data.get('role') ?? null;
			//console.log('role', role)
			this.form?.patchValue({
				role: role
			})
		});

		this.form.get('role')?.valueChanges.subscribe(data => {
			if (data === Enums.ROLE_MANAGERS || data === Enums.ROLE_VENDORS) {
				this.form.controls['files'].setValidators([Validators.required, CustomValidators.maxLengthArray(4)]);
			} else {
				this.form.controls['files'].clearValidators()
			}
			this.form.controls['files'].updateValueAndValidity();
		})

	}

	fileUpdate(event: any) {
		//console.log('event', event)
		this.form.patchValue({ files: event });
		this.gs.validateAllFormFields(this.form);
	}

	onLogin(form: any) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		form.value.confirm_password = form.value.password;
		this.gs.clearErrorMessages();
		let params = { ...form.value };
		params['files'] = form.value?.files ? form.value?.files : [];
		let profile = { ...form.value.profile };
		profile['name'] = form.value?.name;
		//profile['telephone'] = "";
		params['profile'] = profile;
		delete params.name;
		delete params.recaptcha;
		delete params.terms
		this.gs.store.dispatch(StoreAction.AuthParams({ params: params, params2: { key: 'register' }, url: '/' }));
		setTimeout(() => {
			this.modalEvent.emit('HideModal');
		}, 900);
	}

	handleRole(value: any) {
		switch (value) {
			case Enums.Role.ROLE_OWNER:
				this.form.get('profile')?.patchValue({
					is_owner: 1,
					is_manager: null,
					is_vendor: null,
					is_staff: null,
				});
				break;
			case Enums.Role.ROLE_MANAGERS:
				this.form.get('profile')?.patchValue({
					is_owner: null,
					is_manager: 1,
					is_vendor: null,
					is_staff: null,
				});
				break;
			case Enums.Role.ROLE_VENDORS:
				this.form.get('profile')?.patchValue({
					is_owner: null,
					is_manager: null,
					is_vendor: 1,
					is_staff: null,
				});
				break;
			case Enums.Role.ROLE_GUEST:
				this.form.get('profile')?.patchValue({
					is_owner: null,
					is_manager: null,
					is_vendor: null,
					is_staff: null,
				});
				break;

			case Enums.Role.ROLE_STAFF:
				this.form.get('profile')?.patchValue({
					is_owner: null,
					is_manager: null,
					is_vendor: null,
					is_staff: 1,
				});
				break;

			default:
				this.form.get('profile')?.patchValue({
					is_owner: null,
					is_manager: null,
					is_vendor: null,
					is_staff: null,
					role: Enums.Role.ROLE_USER
				});
				break;
		}
	}

	addTokenLog(message: string, token: string | any) {
		console.log('token', token)
	}

	openTermCondition(slug = 'terms-condition', item_id = 20) {
		const modalRef = this.modalService.open(TermsConditionDialogComponent, {
			windowClass: 'dark-modal-forgot',
			//backdrop: 'static', 
			keyboard: false,
			animation: true,
			scrollable: false
		});
		modalRef.componentInstance.slug = slug;
		modalRef.componentInstance.item_id = item_id;
		modalRef.result.then((result: any) => {
			//this.openPopup(result);
		}, (reason: any) => {
			console.log('reason', reason)
		});
	}

	openLogin() {
		this.modalEvent.emit('Login');
	}


}
