import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-bills',
    templateUrl: './bills.component.html',
    styleUrls: ['./bills.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class BillsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
