import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { StaffsFormComponent } from '../staffs-form/staffs-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-staffs-create',
    templateUrl: './staffs-create.component.html',
    styleUrls: ['./staffs-create.component.scss'],
    standalone: true,
    imports: [RouterLink, StaffsFormComponent]
})
export class StaffsCreateComponent {
  constructor(
		public gs: GlobalService,
	) { }

	ngOnInit(): void {
	}
}
