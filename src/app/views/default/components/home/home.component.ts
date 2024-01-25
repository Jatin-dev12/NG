import { Component, OnInit } from '@angular/core';
import { NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, NgbNavContent, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EnumRxKey, Enums } from 'src/app/enums';
import { ApiResponseData } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService } from 'src/app/services';
import { StoreSelector } from 'src/app/store/selector';
import { budgetRange } from 'src/app/helpers';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormSubmitDirective, ControlErrorsDirective, OrderPipe } from 'src/app/shared';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, NgbNavContent, RouterLink, NgbNavOutlet, ReactiveFormsModule, FormSubmitDirective, ControlErrorsDirective, OrderPipe]
})
export class HomeComponent implements OnInit {

	categoriesObservable: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.categories]);
	categoriesArray: any[] = [];
	form!: UntypedFormGroup;
	submitted = false;
	role = Enums.Role;
	Enums = Enums;
	get f() { return this.form.controls; };

	budgetRange = budgetRange();
	activeId: any = 1;

	constructor(
		public gs: GlobalService,
		public confirmDialog: ConfirmDialogService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.form = this.gs.formBuilder.group({
			key: new UntypedFormControl(EnumRxKey.Catalog.search),
			moduleId: new UntypedFormControl(Enums.USER_CATALOG_MODULE_ID_JOBS),
			q: new UntypedFormControl(''),
			category_id: new UntypedFormControl(''),
			property_purpose: new UntypedFormControl(''),
			property_classification: new UntypedFormControl(''),
		})
		this.categoriesObservable.subscribe(data => {
			if(data) {
				this.categoriesArray = data?.filter((val: any) => val.moduleId === 'property').map((filteredObj: any) => filteredObj);
			}
		});
	}


	onSubmit(form: UntypedFormGroup) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.gs.clearErrorMessages();
		this.router.navigate(['/search/listing'], { queryParams: this.gs.removeBlankObject(form.value), queryParamsHandling: 'merge' });
	}

}
