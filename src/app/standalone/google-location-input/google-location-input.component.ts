import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxGpAutocompleteDirective } from '@angular-magic/ngx-gp-autocomplete';

@Component({
  selector: 'app-google-location-input',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './google-location-input.component.html',
  styleUrls: ['./google-location-input.component.scss'],
  providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => GoogleLocationInputComponent),
			multi: true
		},
	]
})
export class GoogleLocationInputComponent implements OnInit {

	@ViewChild('places') places!: NgxGpAutocompleteDirective;
	@Input() value: any = '';
	@Input() ngClass!: any;
	@Input() formControlName!: string;
	control!: AbstractControl | any;
	@Input() placeholder: string = 'Location';
	@Input() type: string = 'email';
	@Output() public onAddressChange = new EventEmitter();
	touched = false;
	disabled = false;
	onTouched = () => {};
	onChange = (value: any) => {};

	constructor() { }

	ngOnInit() {
		/*setTimeout(() => {
			this.places.options.componentRestrictions = new ComponentRestrictions({
				//country: "AE"
			});
			//this.places.options.types = ['(regions)'];
			//this.places.options.fields = ["geometry.location"];
			this.places.reset();
		}, 1500);
		*/
	}

	registerOnChange(onChange: any){
		this.onChange = onChange;
	}
  
	registerOnTouched(onTouched: any){
		this.onTouched = onTouched;
	}

	writeValue(value: any){
		this.value = value;
	}

	setDisabledState(disabled: boolean){
		this.disabled = disabled;
	}

}
