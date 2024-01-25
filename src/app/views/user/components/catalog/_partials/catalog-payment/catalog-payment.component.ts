import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Catalog } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StripeService, StripeCardNumberComponent, StripeCardGroupDirective, StripeCardExpiryComponent, StripeCardCvcComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { LaddaDirective } from '../../../../../../modules/ladda/ladda.directive';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@Component({
    selector: 'app-catalog-payment',
    templateUrl: './catalog-payment.component.html',
    styleUrls: ['./catalog-payment.component.scss'],
    standalone: true,
    imports: [StripeCardGroupDirective, ReactiveFormsModule, FormsModule, NgxIntlTelInputModule, StripeCardNumberComponent, StripeCardExpiryComponent, StripeCardCvcComponent, LaddaDirective]
})
export class CatalogPaymentComponent implements OnInit {
	@Input() item: Catalog | null = null;
	@Input() form!: UntypedFormGroup;
	@Input() fields!: any;
	@ViewChild(StripeCardNumberComponent) card!: StripeCardNumberComponent;
	cardHolder: string = '';
	terms: boolean = false;
	loading: boolean = false;

	cardOptions: StripeCardElementOptions = {
		style: {
			base: {
				iconColor: '#666EE8',
				color: '#31325F',
				fontWeight: '300',
				fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
				fontSize: '18px',
				'::placeholder': {
					color: '#CFD7E0'
				}
			}
		}
	};

	elementsOptions: StripeElementsOptions = {
		locale: 'en'
	};

	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private stripeService: StripeService,
		private modalService: NgbModal
	) { }

	ngOnInit(): void {

	}

	onSubmit(form: UntypedFormGroup) {
		const name = this.gs.identity?.name;
		this.loading = true;
		this.stripeService.createToken(this.card.element, { name }).subscribe((result) => {
			if (result.token) {
				//form.value.token.id = result.token.id;
				//console.log('orm.value', form.value);
				this.loading = false;
				this.activeModal.close(result.token);
			} else if (result.error) {
				this.loading = false;
				this.gs.alert(result.error.message, 'danger');
			}
		});
	}

	rulesDialog() {
		
	}

}
