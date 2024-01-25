import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-saved-searches',
    templateUrl: './saved-searches.component.html',
    styleUrls: ['./saved-searches.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class SavedSearchesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
