import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgClass } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss'],
    standalone: true,
    imports: [HeaderComponent, NgClass, RouterOutlet, FooterComponent]
})
export class DefaultLayoutComponent implements OnInit {
	hideContainer: boolean = false;
	constructor(
		public route: ActivatedRoute,
	) { 
		this.hideContainer = route.snapshot.data['hideContainer'] ?? false;
	}

	ngOnInit(): void {
	}

}
