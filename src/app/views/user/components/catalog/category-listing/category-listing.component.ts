import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { GlobalService } from 'src/app/services';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormSubmitDirective, ControlErrorsDirective, OrderPipe } from 'src/app/shared';
import { handleAddressState } from 'src/app/helpers';
import { GoogleLocationInputComponent } from 'src/app/standalone';

@Component({
    selector: 'app-category-listing',
    templateUrl: './category-listing.component.html',
    styleUrls: ['./category-listing.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, FormSubmitDirective, ControlErrorsDirective, NgxIntlTelInputModule, NgSelectModule, NgxSkeletonLoaderModule, AsyncPipe, OrderPipe, GoogleLocationInputComponent]
})
export class CategoryListingComponent implements OnInit {
	categories: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.categories]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.CatalogLoading);
	categoriesArray: any[] = [];
	form!: UntypedFormGroup;
	enums = Enums;

	constructor(
		public gs: GlobalService,
		private router: Router
	) {
		
	}

	ngOnInit(): void {
		this.formValidation();
		this.categories.subscribe(data => {
			if (data) {
				this.categoriesArray = data?.filter((obj: any) => obj.moduleId === 'property').map((filteredObj: any) => filteredObj);
			}
		});
	}

	formValidation() {
		this.form = this.gs.formBuilder.group({
			q: new UntypedFormControl(''),
			category_id: new UntypedFormControl(null), // Sale | Rent
			property_purpose: new UntypedFormControl(null), // Sale | Rent
			q_location: new UntypedFormControl(''),
		});
	}

	handleAddressChange(address: any) {
		let state = handleAddressState(address);
		this.form.patchValue({
			q_location: state.location
		})
	}

	onSubmit(form: UntypedFormGroup) {
		let params = { ...this.form.value };
		params['show_map'] = 1;
		this.router.navigate(['/search/listing'], { queryParams: params, queryParamsHandling: 'merge' });
	}

	onResultMap() {
		let params = { ...this.form.value };
		params['show_map'] = 0;
		this.router.navigate(['/search/listing'], { queryParams: params, queryParamsHandling: 'merge' });
	}

}
