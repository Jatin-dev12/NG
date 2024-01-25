import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-staffs',
    templateUrl: './staffs.component.html',
    styleUrls: ['./staffs.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class StaffsComponent {

  constructor(
		public gs: GlobalService,
	) { }

	ngOnInit(): void {
	}

}
