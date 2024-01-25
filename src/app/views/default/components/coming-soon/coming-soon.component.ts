import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services';

@Component({
    selector: 'app-coming-soon',
    templateUrl: './coming-soon.component.html',
    styleUrls: ['./coming-soon.component.scss'],
    standalone: true
})
export class ComingSoonComponent implements OnInit {

  constructor(
    public gs: GlobalService
  ) { }

  ngOnInit(): void {
  }

}
