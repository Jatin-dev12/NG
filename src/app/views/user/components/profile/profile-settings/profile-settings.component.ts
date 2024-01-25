import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class ProfileSettingsComponent implements OnInit {

  constructor(
    public gs: GlobalService,
  ) { 
    
  }

  ngOnInit(): void {
  }

}
