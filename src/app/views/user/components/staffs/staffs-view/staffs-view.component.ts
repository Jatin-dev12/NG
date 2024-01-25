import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { User } from 'src/app/models';
import { ConfirmDialogService } from 'src/app/modules';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormSubmitDirective } from '../../../../../shared/directive/form-submit.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-staffs-view',
    templateUrl: './staffs-view.component.html',
    styleUrls: ['./staffs-view.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, FormsModule, FormSubmitDirective, NgbPopover]
})
export class StaffsViewComponent {
	itemObservable: Observable<any> = this.gs.store.select(StoreSelector.StaffSelectors[EnumRxKey.Staff.view]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.StaffLoadingKey[`${EnumRxKey.Staff.view}Loading`]);
	item: User | null = null;
	item_id: any = null;

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
		private confirmDialog: ConfirmDialogService,
	) {
		this.item_id = this.activeRoute.snapshot.params['id'];
	}

	ngOnInit(): void {
		this.onLoad();
		this.itemObservable.subscribe(data => this.item = data);
	}

	onLoad() {
		let action = StoreAction.StaffParams({ method: 'GET', params: null, params2: { user_id: this.item_id }, key: EnumRxKey.Staff.view });
		this.gs.store.dispatch(action);
	}

	remove() {
		this.confirmDialog.confirm({
			message: 'Are you sure?',
		}, () => {
			let params2 = { user_id: this.item?.id };
			this.gs.store.dispatch(StoreAction.StaffParams({ method: "DELETE", params: null, params2: params2, key: `update-${EnumRxKey.Staff.listing}`, url: '/staffs', sort: null, msg: `You have successfully delete staff.` }));
		}, () => console.log('No clicked'));
	}

	ngOnDestroy() {
		this.gs.store.dispatch(StoreAction.StaffList({ data: null, key: EnumRxKey.Staff.view }));
	}
}
