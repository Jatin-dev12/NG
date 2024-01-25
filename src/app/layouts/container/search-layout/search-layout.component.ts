import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-search-layout',
    templateUrl: './search-layout.component.html',
    styleUrls: ['./search-layout.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class SearchLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
