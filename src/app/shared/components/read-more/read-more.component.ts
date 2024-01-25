import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { ParseUrlPipe } from '../../pipe/parse-url.pipe';

@Component({
    selector: 'app-read-more',
    templateUrl: './read-more.component.html',
    styleUrls: ['./read-more.component.scss'],
    standalone: true,
    imports: [RouterLink, ParseUrlPipe]
})
export class ReadMoreComponent implements OnInit {
	@Input() text: any;
	@Input() maxLength: number = 100;
	@Input() linkView: any = null;
	@Input() readMoreText: any = 'Read More';
	@Input() readLessText: any = 'Read less';
	currentText: any;
	hideToggle: boolean = true;
	urls: any = /(\b(https?|http|Https):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim; // Find/Replace URL's in text
	isCollapsed: boolean = true;
	priviewData: any = [];

	@HostListener('click', ['$event']) onClick(e: any) {
		if (e.target.classList.contains('handle-link')) {
			let link: string = e.target.innerHTML;
			event?.preventDefault();
			event?.stopPropagation();
			alert("/handle/" + link.trim());

		} else if (e.target.classList.contains('hashtag-link')) {
			let link: string = e.target.innerHTML;
			event?.preventDefault();
			event?.stopPropagation();
			let srt = link.trim().substring(1);
			let navigationExtras: NavigationExtras = {
				queryParams: { "search": srt }
			};
			this.router.navigate(['/demo'], navigationExtras);
		} else if (e.target.classList.contains('targer-link')) {
			let link: String = e.target.innerHTML;
			event?.preventDefault();
			event?.stopPropagation();
			alert("" + link.trim());
		} else if (e.target.classList.contains('url-link')) {
			let link: String = e.target.innerHTML;
		}
	}

	constructor(private elementRef: ElementRef, private router: Router) {
	}

	toggleView() {
		this.isCollapsed = !this.isCollapsed;
		this.determineView();
	}
	determineView() {
		if (!this.text || this.text.length <= this.maxLength) {
			this.currentText = this.text;
			this.isCollapsed = true;
			this.hideToggle = true;
			return;
		}
		this.hideToggle = false;
		if (this.isCollapsed == true) {
			this.currentText = this.text.substring(0, this.maxLength) + "...";
		} else if (this.isCollapsed == false) {
			this.currentText = this.text;
		}
	}

	ngOnChanges() {
		this.determineView();
	}

	ngOnInit() {
		//console.log(this.currentText);
	}

}
