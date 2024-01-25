import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services';

@Component({
    selector: 'app-marketing-disclaimer',
    templateUrl: './marketing-disclaimer.component.html',
    styleUrls: ['./marketing-disclaimer.component.scss'],
    standalone: true
})
export class MarketingDisclaimerComponent {
  
  constructor( public gs: GlobalService) {

  }

}
