import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-marketing',
    templateUrl: './marketing.component.html',
    styleUrls: ['./marketing.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class MarketingComponent implements OnInit {
  form = this.fb.group({
    email: ["", {
      validators: [Validators.required, Validators.email]
    }],
    password: ['', [Validators.required, Validators.minLength(8)]]
 });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form.value
  }

}


