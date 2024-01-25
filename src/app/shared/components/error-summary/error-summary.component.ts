import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services';

@Component({
    selector: 'app-error-summary',
    templateUrl: './error-summary.component.html',
    styleUrls: ['./error-summary.component.scss'],
    standalone: true
})
export class ErrorSummaryComponent implements OnInit {

  constructor(
    public gs: GlobalService
    ) { }

  ngOnInit(): void {
  }

}
