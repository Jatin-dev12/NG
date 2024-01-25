import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, noop, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GlobalService } from 'src/app/services';
import { NgbDropdown, NgbDropdownToggle, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';
import { ControlErrorsDirective } from '../../directive/control-errors.directive';
import { ControlErrorContainerDirective } from '../../directive/control-error-container.directive';

@Component({
    selector: 'custom-drop-down',
    templateUrl: './custom-drop-down.component.html',
    styleUrls: ['./custom-drop-down.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomDropDownComponent),
            multi: true,
        },
    ],
    standalone: true,
    imports: [
        ControlErrorContainerDirective,
        ReactiveFormsModule,
        ControlErrorsDirective,
        NgbDropdown,
        NgbDropdownToggle,
        NgbDropdownAnchor,
        NgbDropdownMenu,
        NgbDropdownItem,
    ],
})
export class CustomDropDownComponent implements OnInit, ControlValueAccessor {
	@Input() items: any[] = [];
	@Input() field: string = '';
	@Input() form!: UntypedFormGroup;
	formControl: FormControl = new FormControl<string>('');

	value = 0;

	destroyRef: DestroyRef = inject(DestroyRef);

	constructor(
		public gs: GlobalService
	) {

	}

	onChange: any = () => { };
	onTouched: any = () => { };

	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.formControl.disable() : this.formControl.enable();
	}

	writeValue(value: any): void {
		this.formControl.setValue(value, { emitEvent: false });
	}

	ngOnInit(): void {
		console.log('this.formControl', this.formControl, this.form)
		/*this.formControl.valueChanges.pipe(debounceTime(200), tap(value => this.onChange(value)),
			takeUntilDestroyed(this.destroyRef),
		).subscribe(data => {
			console.log('dfgd', data)
		});*/
	}
}
