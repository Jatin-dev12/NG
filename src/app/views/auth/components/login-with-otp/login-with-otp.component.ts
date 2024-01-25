import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, startWith, Subject, Subscription, switchMap, take, timer } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { NgClass, AsyncPipe } from '@angular/common';
import { ControlErrorsDirective } from '../../../../shared/directive/control-errors.directive';
import { LaddaDirective } from '../../../../modules/ladda/ladda.directive';
import { ErrorSummaryComponent } from '../../../../shared/components/error-summary/error-summary.component';
import { FormSubmitDirective } from '../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-login-with-otp',
    templateUrl: './login-with-otp.component.html',
    styleUrls: ['./login-with-otp.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, FormSubmitDirective, ErrorSummaryComponent, LaddaDirective, ControlErrorsDirective, NgClass, AsyncPipe]
})
export class LoginWithOtpComponent {
	form!: FormGroup;
	submitted = false;
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.AuthLoading);
	access_code: any = '';
	otpLoading: boolean = false;
	show_resend_opt: boolean = false;
	disable_2step_verification: boolean = false;

	countDown!: Subscription;
	counter = 10;
	tick = 1000;

	timeLeft: number = 120;
	interval: any;
	subscribeTimer: any;

	constructor(
		public gs: GlobalService,
		private itemService: ItemService,
		private activeRoute: ActivatedRoute,
		private router: Router,
	) { }

	get f() { return this.form.controls; };

	ngOnInit(): void {
		this.gs.clearErrorMessages();
		if (this.itemService.isAuthenticated()) {
			this.gs.router('/');
		}
		this.form = this.gs.formBuilder.group({
			otp: new FormControl('', [Validators.required]),
		}); // Form validation
		this.activeRoute.queryParams.subscribe(data => this.access_code = data['access_code']);
		this.startTimer();
	}

	startTimer() {
		this.interval = setInterval(() => {
			if (this.timeLeft > 0) {
				this.timeLeft--;
			} else {
				//this.timeLeft = 60;
				this.show_resend_opt = true;
			}
		}, 1000)
	}

	pauseTimer() {
		clearInterval(this.interval);
	}

	resetTimer() {
		this.timeLeft = 120;
		this.pauseTimer();
	}


	timerCouter() {
		this.countDown = timer(0, this.tick).pipe(startWith(void 0), take(this.counter)).subscribe(() => {
			--this.counter;
			this.show_resend_opt = false;
			// console.log(this.counter);
			if (this.counter === 0) {
				this.countDown.unsubscribe();
				this.show_resend_opt = true;
			}
		});
	}

	onLogin(form: any) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.gs.clearErrorMessages();
		//this.gs.store.dispatch(register({ payload: form.value }));
		let params2 = { key: EnumRxKey.Auth.verify2factor, token: this.access_code, otp: form.value.otp };
		this.gs.store.dispatch(StoreAction.AuthParams({ params: null, params2: params2 }));

		return
		/*
		let params2 = this.disable_2step_verification ? 
			{ key: EnumRxKey.Auth.otpLogin, otp: form.value.otp } : 
			{ key: EnumRxKey.Auth.verify2factor, access_code: this.access_code, otp: form.value.otp };
		this.gs.store.dispatch(StoreAction.AuthParams({ params: null, params2: params2 }));

		if(this.disable_2step_verification) {
			let params2 = { key: EnumRxKey.Auth.otpLogin, otp: form.value.otp };
			this.gs.store.dispatch(StoreAction.AuthParams({ params: null, params2: params2 }));
		} else {
			let params2 = { key: EnumRxKey.Auth.verify2factor, access_code: this.access_code, otp: form.value.otp };
			this.gs.store.dispatch(StoreAction.AuthParams({ params: null, params2: params2 }));
		}*/
	}


	resendOtp() {
		this.otpLoading = true;
		let params2 = { key: EnumRxKey.Auth.resend2factor, token: this.access_code };
		this.itemService.auth(null, params2).subscribe(response => {
			this.disable_2step_verification = true;
			this.router.navigate(['/login-otp'], { queryParams: { access_code: response.data?.base32 } });
			this.otpLoading = false;
			this.gs.alert('You have successfully resend otp.');
			this.resetTimer();
			this.startTimer();
			this.show_resend_opt = false;
			//this.timerCouter();
		}, (error: Response) => {
			this.otpLoading = false;
		})
	}

	transform(value: number): string {
		const minutes: number = Math.floor(value / 60);
		return (
			('00' + minutes).slice(-2) +
			':' +
			('00' + Math.floor(value - minutes * 60)).slice(-2)
		);
	}

	ngOnDestroy() {
		//this.countDown.unsubscribe();
	}
}
