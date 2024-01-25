import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class RequestsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
