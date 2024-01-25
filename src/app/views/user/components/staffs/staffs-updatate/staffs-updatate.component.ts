import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { User } from 'src/app/models';
import { GlobalService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { StaffsFormComponent } from '../staffs-form/staffs-form.component';

@Component({
    selector: 'app-staffs-updatate',
    templateUrl: './staffs-updatate.component.html',
    styleUrls: ['./staffs-updatate.component.scss'],
    standalone: true,
    imports: [RouterLink, StaffsFormComponent, AsyncPipe]
})
export class StaffsUpdatateComponent {
	itemObservable: Observable<any> = this.gs.store.select(StoreSelector.StaffSelectors[EnumRxKey.Staff.view]);
	loading: Observable<boolean> = this.gs.store.select(StoreSelector.StaffLoadingKey[`${EnumRxKey.Staff.view}Loading`]);
	item: User | null = null;
	item_id: any = null;

	constructor(
		public gs: GlobalService,
		private activeRoute: ActivatedRoute,
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

	ngOnDestroy() {
		this.gs.store.dispatch(StoreAction.StaffList({ data: null, key: EnumRxKey.Staff.view}));
	}
}
