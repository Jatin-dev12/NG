import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { EnumRxKey } from 'src/app/enums';
import { User } from 'src/app/models';
import { GlobalService, ItemService } from 'src/app/services';
import { StoreAction } from 'src/app/store/actions';
import { StoreSelector } from 'src/app/store/selector';
import { LaddaDirective } from '../../../../../modules/ladda/ladda.directive';
import { FileDragDropUploaderComponent } from '../../../../../shared/components/file-drag-drop-uploader/file-drag-drop-uploader.component';
import { ControlErrorsDirective } from '../../../../../shared/directive/control-errors.directive';
import { FormSubmitDirective } from '../../../../../shared/directive/form-submit.directive';

@Component({
    selector: 'app-create-group',
    templateUrl: './create-group.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormSubmitDirective,
        ControlErrorsDirective,
        FileDragDropUploaderComponent,
        LaddaDirective,
    ],
})
export class CreateGroupComponent implements OnInit {
	// loading: Observable<boolean> = this.gs.store.select(StoreSelector.FriendLoadingKey[`${FriendRxKey.friends}Loading`]);
	// moreLoading: Observable<boolean> = this.gs.store.select(StoreSelector.FriendMoreLoading);
	// friendObservable: Observable<any> = this.gs.store.select(StoreSelector.FriendSelectors[FriendRxKey.friends]);
	friendArray: User[] = [];
	items$!: Observable<User[]>;
	page = 1;
	q: any = '';
	modelChanged: Subject<string> = new Subject<string>();
	form!: UntypedFormGroup;
	submitted = false;

	constructor(
		private itemService: ItemService,
		public gs: GlobalService,
		public activeModal: NgbActiveModal,
	) { }

	get f() { return this.form.controls; }

	ngOnInit() {
		this.onLoadFriend();
		/*
		this.friendObservable.subscribe(data => {
			this.friendArray = data ?? [];
		});
		*/
		this.form = this.gs.formBuilder.group({
			text: new UntypedFormControl('', [Validators.required]),
			recipients: new UntypedFormControl('', [Validators.required]),
			group: this.gs.formBuilder.group({
				title: new UntypedFormControl('', [Validators.required]),
				image_id: new UntypedFormControl('', [Validators.required])
			}),
		});
		this.items$ = this.modelChanged.pipe(debounceTime(1000),map((term) => {
			if (term) {
				this.page = 0;
				this.q = term;
				this.handleLoadMore();
			}
			return this.searchFriend(term);
		}))
	}

	onLoadFriend() {
		//let action = StoreAction.FriendParams({ method: "GET", params: null, params2: { q: this.q, key: FriendRxKey.friends, 'per-page': 20, page: this.page }, key: FriendRxKey.friends });
		//this.gs.store.dispatch(action);
	}

	handleLoadMore() {
		this.page += 1;
		//let action = StoreAction.FriendMoreParams({ method: "GET", params: null, params2: { q: this.q, key: FriendRxKey.friends, 'per-page': 20, page: this.page }, key: FriendRxKey.friends });
		//this.gs.store.dispatch(action);
	}

	onSubmit(form: UntypedFormGroup) {
		this.submitted = true;
		if (!form.valid) {
			this.submitted = false;
			this.gs.validateAllFormFields(this.form);
			return;
		}
		let params: any = { UserMessageForm: form.value };
		this.itemService.default("POST", params, { key: EnumRxKey.Default.message }).subscribe((data: any) => {
			this.submitted = false;
			this.activeModal.close(data.data);
		}, (error: Response) => {
			this.submitted = false;
		});
	}

	searchFriend(term: string | null): User[] {
		const searchTerm = term ? term : '';
		return this.friendArray.filter((person) => {
			return person.name.toLowerCase().startsWith(searchTerm.toLowerCase());
		});
	}

}
