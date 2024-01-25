import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { NgbPagination, NgbPaginationPrevious, NgbPaginationNext, NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    standalone: true,
    imports: [NgbPagination, NgbPaginationPrevious, NgbPaginationNext, NgbPaginationNumber]
})
export class PaginationComponent implements OnInit {
	@Input() pagination: any;
	@Input() page: number = 0;
	@Output() getPage = new EventEmitter();
	constructor(
		public gs: GlobalService
	) { }

	ngOnInit(): void {
		//console.log('pagination', this.pagination, this.page);
	}

	handlePagination(event: any) {
		//this.loadItem(event);
		this.getPage.emit(event);
	}

}


