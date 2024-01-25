import { Component, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormArray, UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, NgbNavContent, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services';
import { FormSubmitDirective } from '../../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-catalog-feature-search-dialog',
    templateUrl: './catalog-feature-search-dialog.component.html',
    styleUrls: ['./catalog-feature-search-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, NgbNavContent, NgbNavOutlet]
})
export class CatalogFeatureSearchDialogComponent {
	@Input() form!: UntypedFormGroup;
	@Input() featuresArray!: any[];
	//@Input() featuresArray!: any[];
	active = 0;

	formAmenities!: UntypedFormGroup;

	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) { }

	ngOnInit(): void {
		this.formAmenities = this.gs.formBuilder.group({
			amenities: this.gs.formBuilder.array([]),
			addMoreFeatures: this.gs.formBuilder.array([]),
		});
		//console.log('this.form.value', this.form.value?.amenities);
		let amenities: UntypedFormArray = this.amenities as UntypedFormArray;
		if(this.form.value?.amenities?.length > 0) {
			this.amenities.clear();
			this.form.value?.amenities?.forEach((el: any) => {
				amenities.push(this.addNewFieldAmenities(el));
			});
		}
		this.featuresArray.forEach(el => {
			let children = el?.children;
			if(el.slug === 'add-more-features' && children?.length > 0) {
				children.forEach((element: any) => {
					const index = this.form.value?.amenities?.findIndex((val: any) => val?.tag_id === element.id);
					const item = this.form.value?.amenities?.find((val: any) => val?.tag_id === element.id);
					//console.log('indexindex', index, item);
					let group = { tag_id: element.id, type: el.name, name: '', description: '' };
					if((index === -1)) {
						//amenities.push(this.addNewFieldAmenities(group));
					}
				});
			}
		});
		//let addMoreFeatures: UntypedFormArray = this.addMoreFeatures as UntypedFormArray;
		//this.amenities.reset();
		//console.log('this.form.value?.amenities', this.form.value?.amenities)
		this.form.value?.amenities?.forEach((el: any) => {
			const index = this.amenities?.controls.findIndex((val: any) => val.value?.tag_id === el.tag_id);
			//console.log('index', el, index);
			amenities.at(index)?.patchValue({
				tag_id: el.tag_id,
				type: el.type,
				name: el.name,
				description: el?.description,
			})
			/*amenities.push(this.addNewFieldAmenities(el));
			if((index === -1)) {
				amenities.push(this.addNewFieldAmenities(el));
			}*/
		});
	}

	get amenities() {
		return this.formAmenities.get('amenities') as UntypedFormArray;
	}

	get addMoreFeatures() {
		return this.formAmenities.get('addMoreFeatures') as UntypedFormArray;
	}

	addNewFieldAmenities(item?: any) {
		return this.gs.formBuilder.group({
			tag_id: new UntypedFormControl(item.tag_id),
			type: new UntypedFormControl(item.type),
			name: new UntypedFormControl(item.name),
			description: new UntypedFormControl(item?.description ?? ''),
		});
	}

	handleAmenities(event: any, item: any, type: any) {
		const { checked, value } = event.target;
		const checkBox: UntypedFormArray = this.amenities as UntypedFormArray;
		if (checked) {
			let group = { tag_id: item.id, type: type, name: item.name, description: item.description };
			checkBox.push(this.addNewFieldAmenities(group));
		} else {
			const index2 = checkBox.controls.findIndex(x => x.value?.tag_id === value);
			checkBox.removeAt(index2);
		}
	}

	amenitiesChacked(item: any) {
		//console.log('item', item)
		const valueIndex = this.amenities?.controls.findIndex((val: any) => val.value?.tag_id === item.id);
		//console.log('valueIndex', valueIndex, this.amenities.value);
		return (valueIndex !== -1) ? true : false;

	}

	remove = (array: any[], key: any, value: any) => {
		const index = array.findIndex(obj => obj[key] === value);
		return index >= 0 ? [
			...array.slice(0, index),
			...array.slice(index + 1)
		] : array;
	}

	handleTitle(event: any, item: any) {
		const { value } = event.target;
		//console.log('value', value, item);
	}

	handleDescription(event: any, item: any) {
		const { value } = event.target;
		//console.log('value', value, item);
	}

	getIndex(item: any) {
		//const index = this.addMoreFeatures?.controls.findIndex((val: any) => val.value?.tag_id === item.id);
		const index = this.amenities?.controls.findIndex((val: any) => val.value?.tag_id === item.id);
		return (index !== -1) ? index : '';
	}

	onSave() {
		this.activeModal.close();
	}

	get NewFeaturesArray() {
		let filteredArray: any[] = [];
		this.featuresArray.forEach(el => {
			if(el?.children?.length > 0) {
				filteredArray.push(el);
			}
		});
		return filteredArray;
	}

	onSubmit(form: UntypedFormGroup) {
		//console.log('form', form.value?.amenities);
		this.activeModal.close(form.value?.amenities ?? []);
	}
}
