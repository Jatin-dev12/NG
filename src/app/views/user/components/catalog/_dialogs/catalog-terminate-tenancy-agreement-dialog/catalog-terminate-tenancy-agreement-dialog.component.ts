import { Component, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Enums } from 'src/app/enums';
import { UserCatalogOrdersReferences } from 'src/app/models';
import { LaddaDirective } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';
import { FormSubmitDirective } from 'src/app/shared';

@Component({
	selector: 'app-catalog-terminate-tenancy-agreement-dialog',
	standalone: true,
	imports: [ReactiveFormsModule, FormSubmitDirective, LaddaDirective],
	templateUrl: './catalog-terminate-tenancy-agreement-dialog.component.html',
	styleUrl: './catalog-terminate-tenancy-agreement-dialog.component.scss'
})
export class CatalogTerminateTenancyAgreementDialogComponent {
	@Input() tenantRefrence: UserCatalogOrdersReferences | null = null;
	form!: UntypedFormGroup;
	submitted = false;
	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private itemService: ItemService
	) { }

	get f() { return this.form.controls; };

	ngOnInit(): void {
		this.form = this.gs.formBuilder.group({
			status: new UntypedFormControl(Enums.USER_CATALOG_ORDERS_REFERENCE_STATUS_PROPOSE),
			note: new UntypedFormControl(''),
		});
	}

	onSubmit(form: UntypedFormGroup) {
		this.submitted = true;
		console.log('submitted', form.value)
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.gs.clearErrorMessages();
		let params = { ...form.value };
		//console.log('params', params);
		this.itemService.reference("POST", { form: params }, { primary_id: this.tenantRefrence?.id }).subscribe(response => {
			//this.onLoad();
			this.gs.alert('You have successfully send terminate request.', 'danger');
			this.activeModal.close();
		})
	}
}
