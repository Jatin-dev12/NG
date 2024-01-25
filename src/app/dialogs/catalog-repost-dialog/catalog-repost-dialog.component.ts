import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnumRxKey, Enums } from 'src/app/enums';
import { Catalog } from 'src/app/models';
import { LaddaDirective } from 'src/app/modules';
import { GlobalService, ItemService } from 'src/app/services';

@Component({
	selector: 'app-catalog-repost-dialog',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FormsModule, LaddaDirective],
	templateUrl: './catalog-repost-dialog.component.html',
	styleUrl: './catalog-repost-dialog.component.scss'
})
export class CatalogRepostDialogComponent {
	@Input() item: Catalog | null = null;
	form!: UntypedFormGroup; // Form group for the Catalog form
	submitted: boolean = false;
	Enums = Enums;
	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private itemService: ItemService
	) { }

	ngOnInit(): void {
		this.form = this.gs.formBuilder.group({
			property_purpose: new UntypedFormControl(Enums.USER_CATALOG_PROPERTY_PURPOSE_SALE, [Validators.required]), // Sale | Rent
		});
	}

	onSubmit(form: UntypedFormGroup) {
		console.log('dfgdfgdf', form.value);
		this.submitted = true;
		if (!this.form.valid) {
			this.gs.validateAllFormFields(this.form);
			this.submitted = false;
			return;
		}
		let params: any = {};
		let params2 = { key: EnumRxKey.Catalog.duplicate, moduleId: Enums.USER_CATALOG_MODULE_ID_JOBS, primary_id: this.item?.id, property_purpose: form.value?.property_purpose }
		this.itemService.catalog("POST", null, params2).subscribe(response => {
			this.submitted = false;
			let data = response.data;
			this.gs.router(`/properties/add/update/${data.id}`);
			this.gs.alert('You have successfuly reposted this property');
			this.dismiss();
		}, (error: Response) => {
			this.submitted = false;
		});
	}

	dismiss() {
		this.activeModal.close();
	}


}
