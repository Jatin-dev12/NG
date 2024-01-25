import { Component } from '@angular/core';
import { NgbDate, NgbDateParserFormatter, NgbCalendar, NgbPopover, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EnumRxKey } from 'src/app/enums';
import { GlobalService } from 'src/app/services';
import { StoreSelector } from 'src/app/store/selector';
import { OrderPipe } from '../../../../../../shared/pipe/order.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-mktg-upper-right-ad-availability, [app-mktg-upper-right-ad-availability]',
    templateUrl: './mktg-upper-right-ad-availability.component.html',
    styleUrls: ['./mktg-upper-right-ad-availability.component.scss'],
    standalone: true,
    imports: [NgbPopover, ReactiveFormsModule, NgbInputDatepicker, OrderPipe]
})
export class MktgUpperRightAdAvailabilityComponent {
	categories: Observable<any> = this.gs.store.select(StoreSelector.CatalogSelectors[EnumRxKey.Catalog.categories]);

	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate;
	toDate: NgbDate | null = null;

	categoriesArray: any[] = [];

	constructor(
		public formatter: NgbDateParserFormatter,
		private calendar: NgbCalendar,
		public gs: GlobalService,
	) {
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	}

	ngOnInit(): void {
		this.categories.subscribe(data => {
			if (data) {
				this.categoriesArray = data?.filter((val: any) => val.moduleId === 'property').map((filteredObj: any) => filteredObj);
			}
		});
	}

	validateInput(currentValue: NgbDate | any, input: string): NgbDate | any {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date)
		);
	}
}
