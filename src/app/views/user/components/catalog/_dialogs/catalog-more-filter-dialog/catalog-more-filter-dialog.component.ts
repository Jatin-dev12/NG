import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import moment from 'moment';
import { AdditionalEnums, Enums } from 'src/app/enums';
import { InputNumber } from 'src/app/modules';
import { GlobalService } from 'src/app/services';
import { SharedModule } from 'src/app/shared';

@Component({
	selector: 'app-catalog-more-filter-dialog',
	standalone: true,
	imports: [CommonModule, SharedModule, MatSliderModule, NgTemplateOutlet, MatNativeDateModule, MatDatepickerModule, InputNumber, NgSelectModule],
	templateUrl: './catalog-more-filter-dialog.component.html',
	styleUrl: './catalog-more-filter-dialog.component.scss'
})
export class CatalogMoreFilterDialogComponent {
	@Input() Type_Slug: any;
	@Input() form!: UntypedFormGroup;
	AdditionalEnums = AdditionalEnums;
	Enums = Enums;

	min_price_value: any = 0;
	max_price_value: any = 1000;
	min_price: any = 0;
	max_price: any = 0;

	items = [{ key:1, value:'Yes' }, { key:0, value:'No' }];

	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
		private router: Router,
	) { }

	ngOnInit(): void {

	}

	onSubmit(form: UntypedFormGroup) {
		let params = { ...this.form.value };
		let amenities = this.form.value.amenities?.map((val: any) => { return val.tag_id });
		let posted_at = this.form.value.posted_at;
		params['amenities'] = String(amenities);
		params['number_of_floors'] = String(params.number_of_floors);
		params['number_of_rooms'] = String(params.number_of_rooms);
		params['number_of_bathrooms'] = String(params.number_of_bathrooms);
		params['age_of_building'] = String(params.age_of_building);

		params['posted_at'] = posted_at ? moment(posted_at).format('YYYY-MM-DD') : '';
		this.router.navigate(['/search/listing'], { queryParams: this.gs.removeBlankObject(params), queryParamsHandling: 'merge' });
		this.activeModal.close();
	}


	handlePriceRange(event: any) {
		const { min, max } = event.target;
		//console.log('sdsdsd', min, max)
	}

	formatLabel(value: number): string {
		if (value >= 1000) {
			return Math.round(value / 1000) + 'k';
		}
		return `${value}`;
	}

	handleMinRange(event: any) {
		const { value } = event.target;
		this.min_price = value;
		this.form.patchValue({
			min_price: value,
		});
	}

	handleMaxRange(event: any) {
		const { value } = event.target;
		this.max_price = value;
		this.form.patchValue({
			max_price: value,
		});
	}

}
