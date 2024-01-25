import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css'],
    standalone: true
})
export class NotFoundComponent implements OnInit {

  constructor(
    public gs: GlobalService
  ) { }

  ngOnInit(): void {
  }

}
