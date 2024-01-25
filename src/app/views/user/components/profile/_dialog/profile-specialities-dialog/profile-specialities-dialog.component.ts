import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, UntypedFormArray, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { User } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { LaddaDirective } from '../../../../../../modules/ladda/ladda.directive';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormSubmitDirective } from '../../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-profile-specialities-dialog',
    templateUrl: './profile-specialities-dialog.component.html',
    styleUrls: ['./profile-specialities-dialog.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormSubmitDirective, NgxSkeletonLoaderModule, LaddaDirective, AsyncPipe]
})
export class ProfileSpecialitiesDialogComponent {
	tagsArray: Observable<any> = this.gs.store.select(StoreSelector.DefaultSelectors[EnumRxKey.Default.tags]);
	tagsLoading: Observable<any> = this.gs.store.select(StoreSelector.DefaultLoading);
	userObservable: Observable<User> = this.gs.store.select(state => state.auth.user);
	loading: Observable<boolean> = this.gs.store.select(state => state.auth.loading);
	form!: FormGroup;
	submitted = false;

	get f() { return this.form.controls };
	constructor(
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) {

	}

	ngOnInit(): void {
		this.form = this.gs.formBuilder.group({
			name: new FormControl(''),
			tags: this.gs.formBuilder.array([], [Validators.required]),
		});

		this.userObservable.subscribe(data => {
			let tagsArray = this.gs.user?.userProfile?.tags?.split(', ') ?? [];
			this.form?.patchValue({
				name: data.name
			});
			tagsArray?.forEach((el: any) => {
				this.tags.push(new FormControl(el));
			});
		});
		this.gs.trrigerAction$.subscribe(data => {
			if (data === EnumRxKey.Trriger.ProfileSpecialitiesDialog) {
				this.activeModal.close();
			}
		});
		this.tagsArray.subscribe(data => {
			if(data === null) this.gs.store.dispatch(StoreAction.DefaultParams({ method: "GET", params: null, params2: { key: EnumRxKey.Default.tags }, key: EnumRxKey.Default.tags }));
		})
	}

	get tags() {
		return this.form.get('tags') as UntypedFormArray;
	}

	handleTags(event: any) {
		const { checked, value } = event.target;
		const checkBox: UntypedFormArray = this.tags as UntypedFormArray;
		if (checked) {
			checkBox?.push(new FormControl(value));
		} else {
			const index2 = checkBox.controls.findIndex(x => x.value === value);
			checkBox.removeAt(index2);
		}
	}

	tagsChacked(id: any) {
		let valueArr = this.gs.user?.userProfile?.tags?.split(', ') ?? [];
		const valueIndex = valueArr.findIndex((f: any) => f === id);
		//console.log('valueArr', valueArr, valueIndex);
		return (valueIndex !== -1) ? true : false;
	}

	onSubmit(form: any) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		this.gs.clearErrorMessages();
		let params = { ...this.form.value };
		params['tags'] = this.form.value.tags?.join(', ');
		this.gs.store.dispatch(StoreAction.ProfileParams({ method: "POST", params: { profile: params }, params2: null, key: EnumRxKey.Trriger.ProfileSpecialitiesDialog }));
	}

}


// "Demo, Demo2, Demo3"