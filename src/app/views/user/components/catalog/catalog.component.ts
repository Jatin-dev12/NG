import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GlobalService } from 'src/app/services';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class CatalogComponent implements OnInit {

	constructor(
		public gs: GlobalService,
		private router: Router
	) { }

	ngOnInit(): void {
		//this.router.navigate(['/properties/sale']);
	}

}
