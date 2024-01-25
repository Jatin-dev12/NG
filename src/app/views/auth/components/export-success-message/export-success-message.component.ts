import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-export-success-message',
    templateUrl: './export-success-message.component.html',
    styleUrls: ['./export-success-message.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class ExportSuccessMessageComponent implements OnInit {

  constructor(
    public gs: GlobalService
  ) { }

  ngOnInit(): void {
  }

}
