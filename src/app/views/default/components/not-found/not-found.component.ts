import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { FooterComponent } from '../../../../layouts/components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../../layouts/components/header/header.component';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    standalone: true,
    imports: [HeaderComponent, RouterLink, FooterComponent]
})
export class NotFoundComponent implements OnInit {

  constructor(
    public gs: GlobalService
  ) { }

  ngOnInit(): void {
    //this.gs.router('/')
  }

}
