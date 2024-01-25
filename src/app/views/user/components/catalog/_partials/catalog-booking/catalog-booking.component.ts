import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment-timezone';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { EnumRxKey, Enums } from 'src/app/enums';
import { momentDate } from 'src/app/helpers';
import { ActionsHelper } from 'src/app/helpers/actions.helper';
import { Catalog } from 'src/app/models';
import { ConfirmDialogService, LaddaDirective } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { CatalogPaymentComponent } from '../catalog-payment/catalog-payment.component';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgClass, AsyncPipe, CurrencyPipe } from '@angular/common';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormSubmitDirective, ControlErrorsDirective } from 'src/app/shared';

@Component({
    selector: 'app-catalog-booking',
    templateUrl: './catalog-booking.component.html',
    styleUrls: ['./catalog-booking.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, ControlErrorsDirective, NgxIntlTelInputModule, NgClass, MatDatepickerModule, MatFormFieldModule, RouterLink, FormsModule, LaddaDirective, AsyncPipe, CurrencyPipe]
})
export class CatalogBookingComponent implements OnInit {
	@Input() item: Catalog | null = null;
	@Input() fields: any | null = null;
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.OrderLoading);
	form!: UntypedFormGroup;
	submitted = false;
	//minDate = new Date(new Date().setHours(new Date().getHours() + 24));
	minDate = new Date();
	minEndDate = null;
	moment = momentDate;
	couponLoading: boolean = false;
	couponCode: string = '';
	bookingHourse = 0;
	additionalServices: number = 0;
	serviceFee = 0;
	discountCouponPrice = 0;
	CatalogRxKey = EnumRxKey.Catalog;
	stripe_fee = 0;
	dateFilter: any = [
		new Date("02/1/2022"),
		new Date("02/20/2022"),
		new Date("02/17/2022"),
		new Date("02/25/2022"),
		new Date("02/4/2022"),
		new Date("02/7/2022"),
		new Date("02/12/2022"),
		new Date("02/11/2022"),
		new Date("02/26/2022"),
		new Date("02/25/2022")
	];

	get f() { return this.form.controls; };

	constructor(
		public gs: GlobalService,
		public confirmDialog: ConfirmDialogService,
		private modalService: NgbModal,
		private itemService: ItemService,
		public actionHelper: ActionsHelper,
	) {
	}

	ngOnInit(): void {
		this.formValidation();
		this.addItem();
		this.form.get('start_time')?.valueChanges.pipe(debounceTime(200)).subscribe(val => {
			this.minEndDate = val;
		})
		this.form.get('end_time')?.valueChanges.pipe(debounceTime(200)).subscribe(val => {
			let if_check = val?._isValid ? true : false;
			//console.log('val', val, val._isValid, if_check);
			if(if_check) {
				//console.log('val', moment(val).format('X'))
				this.bookingHourse = val?.diff(this.form.value.start_time, "hours");
				this.getTotal;
				this.items.at(0)?.patchValue({
					start_time: moment(this.form.value?.start_time).format('X'),
					end_time: val.format('X'),
					price: this.getTotal
				});
			}
		});
	}

	get getSubTotal() {
		let price: any = this.item?.price;
		let val = parseFloat(price) * this.bookingHourse;
		return val;
	}

	get getTotal() {
		let reserve_price: any = +this.depositAmount ?? 0;
		let serviceFee = ((this.getSubTotal + this.additionalServices) - (this.discountCouponPrice));
		this.serviceFee = serviceFee / 100 * this.stripe_fee;
		let amount = ((this.getSubTotal + this.additionalServices + this.serviceFee + reserve_price) - (this.discountCouponPrice));
		return amount;
	}

	formValidation() {
		this.form = this.gs.formBuilder.group({
			status: new UntypedFormControl(1),
			moduleId: new UntypedFormControl(Enums.UserCatalogModuleId.USER_CATALOG_MODULE_ID_BOOKS),
			title: new UntypedFormControl(this.item?.title, [Validators.required]),
			comment: new UntypedFormControl(`Booking Comment - ${this.item?.title}`),
			deposited_type: new UntypedFormControl(this.item?.price_type),
			deposited_percentage: new UntypedFormControl(''),
			deposited_amount: new UntypedFormControl(''),
			total: new UntypedFormControl(''),
			provider_id: new UntypedFormControl(this.item?.user_id),
			user_id: new UntypedFormControl(this.gs.identity?.id),
			coupon_id: new UntypedFormControl(''),
			no_recipients: new UntypedFormControl(1, [Validators.min(1), Validators.max(this.item?.no_guest ?? 10)]),
			start_time: new UntypedFormControl(this.minDate, [Validators.required]),
			end_time: new UntypedFormControl('', [Validators.required]),
			token: this.gs.formBuilder.group({
				id: new UntypedFormControl('tok_visa'),
				email: new UntypedFormControl(this.gs.identity?.email)
			}),
			items: this.gs.formBuilder.array([])
		}); // Form validation
	}

	get items() {
		return this.form.get('items') as UntypedFormArray;
	}

	addItem(value?: any) {
		//console.log('value', value, this.update)
		this.items.push(this.gs.formBuilder.group({
			catalog_id: new UntypedFormControl(this.item?.id),
			quantity: new UntypedFormControl('1'),
			price: new UntypedFormControl(''),
			start_time: new UntypedFormControl(this.minDate),
			end_time: new UntypedFormControl(''),
			extra: this.gs.formBuilder.array([])
		}));
	}

	get extra() {
		return this.items.at(0)?.get('extra') as UntypedFormArray;
	}

	addExtra(value: any) {
		this.extra.push(this.gs.formBuilder.group({
			title: new UntypedFormControl(value.title),
			price: new UntypedFormControl(value.price),
			quantity: new UntypedFormControl(1),
		}));
	}

	addAdditionalService() {
		
	}

	applyCoupon() {
		if (this.couponCode.length < 1) return;
		this.couponLoading = true;
		this.itemService.catalog("POST", null, { code: this.couponCode, key: EnumRxKey.Catalog.couponApply, catalog_id: this.item?.id }).subscribe(response => {
			this.couponLoading = false;
			this.couponCode = '';
			this.gs.alert('You have successfuly apply coupon code');
			let data = response.data;
			let couponPrice = 0;
			let discount = parseFloat(data.discount);
			(data.type === 'fixed') ? couponPrice = discount : couponPrice = (this.getTotal * discount / 100);
			this.form.patchValue({ coupon_id: data.id });
			this.discountCouponPrice = couponPrice
			this.getTotal;
		}, (error: Response) => {
			this.couponLoading = false;
		});
	}

	onSubmit(form: UntypedFormGroup) {
		this.submitted = true;
		//console.log('form', form.value.start_time.format('X'), form.value.end_time.format('X'));
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.checkAuth();
		if (this.gs.identity === null || this.item?.is_owner(this.gs.identity?.id)) return;
		if (this.gs.identity?.role === Enums.Role.ROLE_OWNER) {
			this.confirmDialog.confirmAlert(`You don\'t have permission to perform the action.`, () => {
				
			}, () => { console.log('No clicked'); });
			return
		}
		const modalRef = this.modalService.open(CatalogPaymentComponent, {
			windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true
		});
		modalRef.componentInstance.item = this.item;
		modalRef.componentInstance.form = this.form;
		modalRef.componentInstance.fields = this.fields;
		modalRef.result.then((result) => {
			//console.log('result', result);
			form.value.token.id = result.id;
			this.bookProperty(form);

		}, (reason) => {
			console.log('reason', reason);
		});

	}

	bookProperty(form: UntypedFormGroup) {
		//console.log('form', form.value);
		this.form.patchValue({
			start_time: form.value.start_time.format('X'),
			end_time: form.value.end_time.format('X'),
			total: this.getTotal
		})
		this.items.at(0)?.patchValue({
			price: this.getTotal
		});
		//console.log('dfgdfgfd', form.value);
		//form.value.items[0].extra = (form.value.items[0].extra.length === 0) ? 
		let params = { UserCatalogOrdersForm: form.value };
		//this.gs.store.dispatch(OrderAction.Params({ method: 'POST', params: params, params2: null, key: `add-${OrderRxKey.listing}` }));
		this.itemService.orders("POST", params, { moduleId: "property" }).subscribe(response => {
			this.gs.alert('You have successfuly book this property');
			this.gs.router(`/booking/view/${response.data.id}`);
		}, (error: Response) => {
			this.form.patchValue({
				start_time: '',
				end_time: '',
			})
		});
		this.gs.store.dispatch(StoreAction.ProfileParams({ method: "GET", params: null, params2: { primary_id: this.gs.identity?.id }, key: 'load_profile' }));
	}

	inPersonView() {
		this.checkAuth();
		if (this.gs.identity === null || this.item?.is_owner(this.gs.identity?.id)) return;

		if (this.gs.identity?.role === Enums.Role.ROLE_OWNER) {
			this.confirmDialog.confirmAlert(`You don\'t have permission to perform the action.`, () => {

			}, () => { console.log('No clicked'); });
			return
		}

		/*const modalRef = this.modalService.open(InViewingFormDialogComponent, {
			windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true
		});
		modalRef.componentInstance.item = this.item;
		modalRef.result.then((result) => {
			console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});*/
	}

	sendMessage() {
		this.checkAuth();
		if (this.gs.identity === null || this.item?.is_owner(this.gs.identity?.id)) return;

		/*if(this.gs.identity?.role === Role.ROLE_PROVIDER) {
			this.confirmDialog.confirmAlert(`You don\'t have permission to perform the action.`, () => {
			}, () => { console.log('No clicked'); });
			return
		}*/

		/*const modalRef = this.modalService.open(MessageCreateDialogComponent, {
			windowClass: 'right',
			backdrop: 'static',
			keyboard: false,
			animation: true
		});
		modalRef.componentInstance.item = this.item;
		modalRef.componentInstance.user_id = this.item?.user_id;
		modalRef.result.then((result) => {
			//console.log('result', result);
		}, (reason) => {
			console.log('reason', reason);
		});*/
	}

	private checkAuth() {
		if (this.gs.identity === null) {
			this.confirmDialog.confirmThis(`Login Required`, () => {
				this.gs.loginDialog(`/search/view/${this.item?.id}`);
			}, () => {
				console.log('No clicked');
			});
			return
		}

		if(this.item?.is_owner(this.gs.identity?.id)) {
			this.confirmDialog.confirmAlert(`You already owner this property`, () => {
			}, () => { console.log('No clicked'); });
			return
		}
		if(this.gs.identity?.role === Enums.Role.ROLE_OWNER) {
			this.confirmDialog.confirmAlert(`You already host you can't book this property`, () => {
				return
			}, () => { console.log('No clicked'); });
			return
		}
	}

	myHolidayFilter = (d: any): boolean => {
		const time = d?.getTime();
		return !this.dateFilter.find((x: any) => x.getTime() == time);
	}

	myFilter = (d: Date | null): boolean => {
		const day = (d || new Date()).getDay();
		// Prevent Saturday and Sunday from being selected.
		return day !== 0 && day !== 6;
	};

	get depositAmount() {
		let price: any = 0;
		let deposited_percentage: any = '0';
		if(this.item?.price_type === 'fixed') {
			price = this.item?.reserve_price;
		} else {
			let reserve_price: any = this.item?.reserve_price;
			deposited_percentage = this.item?.reserve_price;
			price = +this.getSubTotal * reserve_price / 100;
		}
		this.form.patchValue({
			deposited_type: this.item?.price_type,
			deposited_percentage: deposited_percentage,
			deposited_amount: price,
		})
		return price;
	}

}
