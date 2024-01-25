import { Component } from '@angular/core';
import { MarketingFormComponent } from '../marketing-form/marketing-form.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-marketing-create',
    templateUrl: './marketing-create.component.html',
    styleUrls: ['./marketing-create.component.scss'],
    standalone: true,
    imports: [RouterLink, MarketingFormComponent]
})
export class MarketingCreateComponent {

}
