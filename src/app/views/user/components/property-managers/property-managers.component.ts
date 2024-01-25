import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-property-managers',
    templateUrl: './property-managers.component.html',
    styleUrls: ['./property-managers.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class PropertyManagersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
