import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapse, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Enums } from 'src/app/enums';
import { User } from 'src/app/models';
import { GlobalService, ItemService } from 'src/app/services';
import { TranslocoPipe } from '@ngneat/transloco';
import { AsyncPipe } from '@angular/common';
import { SelectLanguageComponent } from 'src/app/shared';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	standalone: true,
	imports: [RouterLink, NgbCollapse, RouterLinkActive, SelectLanguageComponent, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, AsyncPipe, TranslocoPipe]
})
export class HeaderComponent implements OnInit {
	@Input() homeClassName: string = '';
	isCollapsed = true;
	isLoggedIn: Observable<boolean> = this.itemService.authenticationState;
	user: Observable<User> = this.gs.store.select(state => state.auth.user);
	role = Enums.Role;
	form!: UntypedFormGroup;
	submitted = false;
	q_location: any = '';
	constructor(
		private itemService: ItemService,
		public gs: GlobalService,
		private route: ActivatedRoute,
		public router: Router
	) { }

	ngOnInit(): void {

		this.form = this.gs.formBuilder.group({
			q: new UntypedFormControl(''),
		});
		this.route.queryParamMap.subscribe(params => {
			this.form.patchValue({
				q: params.get('q') ? params.get('q') : '',
				//category_id: params["category_id"],
			});
			this.q_location = params.get('q') ? params.get('q') : '';
		});

		this.gs.trrigerAction$.subscribe(data => {
			//console.log('subjectAction', data);
		});
	}

	logout = () => {
		this.gs.logout();
	}

}
