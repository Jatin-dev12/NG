import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputNumber } from './input-number';
import { Routes } from '@angular/router';

const routes: Routes = [
    //{ path: 'input-number-demo', component: InputNumberDemoComponent, title: 'Input Number Demo' },
];

@Component({
    selector: 'app-input-number-demo',
    template: `<div class="container mt-5 mb-5">
    <div class="grid fluid">
        <h5>Numerals</h5>
        <div class="grid fluid">
            <div class="field col-12 md-3">
                <label for="integeronly">Integer Only</label>
                <a-inputNumber inputId="integeronly" [(ngModel)]="value1"></a-inputNumber>
				{{ value1 }}
                <!-- <pre class="chroma">
                    <code data-lang="html" class="language-html" [innerHTML]="'display'"]></code>
                </pre> -->
                <pre [innerHTML]="display1"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="withoutgrouping">Without Grouping</label>
                <a-inputNumber [(ngModel)]="value2" mode="decimal" inputId="withoutgrouping" [useGrouping]="false"></a-inputNumber>
				{{ value2 }}
                <pre [innerHTML]="display2"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="minmaxfraction">Min-Max Fraction Digits</label>
                <a-inputNumber [(ngModel)]="value3" inputId="minmaxfraction" mode="decimal" [minFractionDigits]="2" [maxFractionDigits]="5"></a-inputNumber>
				{{ value3 }}
                <pre [innerHTML]="display3"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="minmax">Min-Max Boundaries</label>
                <a-inputNumber [(ngModel)]="value4" inputId="minmax" inputId="minmax" mode="decimal" [min]="0" [max]="100"></a-inputNumber>
				{{ value4 }}
                <pre [innerHTML]="display4"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="locale-user">User Locale</label>
                <a-inputNumber [(ngModel)]="value5" inputId="locale-user" [minFractionDigits]="2"></a-inputNumber>
				{{ value5 }}
                <pre [innerHTML]="display5"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="locale-us">United States Locale</label>
                <a-inputNumber [(ngModel)]="value6" inpudId="locale-us" mode="decimal" locale="en-US" [minFractionDigits]="2"></a-inputNumber>
				{{ value6 }}
                <pre [innerHTML]="display6"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="locale-german">German Locale</label>
                <a-inputNumber [(ngModel)]="value7" inputId="locale-german" mode="decimal" locale="de-DE" [minFractionDigits]="2"></a-inputNumber>
				{{ value7 }}
                <pre [innerHTML]="display7"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="locale-indian">Indian Locale</label>
                <a-inputNumber [(ngModel)]="value8" inputId="locale-indian" mode="decimal" locale="en-IN" [minFractionDigits]="2"></a-inputNumber>
				{{ value8 }}
                <pre [innerHTML]="display8"></pre>
            </div>
            <hr />
        </div>
        <h5>Currency</h5>
        <div class="grid fluid">
            <div class="field col-12 md-3">
                <label for="currency-us">United States</label>
                <a-inputNumber [(ngModel)]="value9" inputId="currency-us" mode="currency" currency="USD" locale="en-US"></a-inputNumber>
				{{ value9 }}
                <pre [innerHTML]="display9"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="currency-germany">Germany</label>
                <a-inputNumber [(ngModel)]="value10" mode="currency" inputId="currency-germany" currency="EUR" locale="de-DE"></a-inputNumber>
				{{ value10 }}
                <pre [innerHTML]="display10"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="currency-india">India</label>
                <a-inputNumber [(ngModel)]="value11" mode="currency" inputId="currency-india" currency="INR" currencyDisplay="code" locale="en-IN"></a-inputNumber>
				{{ value11 }}
                <pre [innerHTML]="display11"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="currency-japan">Japan</label>
                <a-inputNumber [(ngModel)]="value12" mode="currency" inputId="currency-japan" currency="JPY" locale="jp-JP"></a-inputNumber>
				{{ value12 }}
                <pre [innerHTML]="display12"></pre>
            </div>
            <hr />
        </div>
        <h5>Prefix and Suffix</h5>
        <div class="grid fluid">
            <div class="field col-12 md-3">
                <label for="mile">Mile</label>
                <a-inputNumber [(ngModel)]="value13" inputId="mile" suffix=" mi"></a-inputNumber>
				{{ value13 }}
                <pre [innerHTML]="display13"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="percent">Percent</label>
                <a-inputNumber [(ngModel)]="value14" inputId="percent" prefix="%"></a-inputNumber>
				{{ value14 }}
                <pre [innerHTML]="display14"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="expiry">Expiry</label>
                <a-inputNumber [(ngModel)]="value15" inputId="expiry" prefix="Expires in " suffix=" days"></a-inputNumber>
				{{ value15 }}
                <pre [innerHTML]="display15"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="temperature">Temperature</label>
                <a-inputNumber [(ngModel)]="value16" prefix="↑ " inputId="temperature" suffix="℃" [min]="0" [max]="40"></a-inputNumber>
				{{ value16 }}
                <pre [innerHTML]="display16"></pre>
            </div>
            <hr />
        </div>
        <h5>Buttons</h5>
        <div class="grid fluid">
            <div class="field col-12 md-3">
                <label for="stacked">Stacked</label>
                <a-inputNumber [(ngModel)]="value17" [showButtons]="true" inputId="stacked" mode="currency" currency="USD"></a-inputNumber>
				{{ value17 }}
                <pre [innerHTML]="display17"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="horizontal">Horizontal with Step</label>
                <a-inputNumber [(ngModel)]="value18" [showButtons]="true" buttonLayout="horizontal" inputId="horizontal" spinnerMode="horizontal" [step]="0.25" decrementButtonClass="btn-danger" incrementButtonClass="btn-success" incrementButtonIcon="fa fa-plus" decrementButtonIcon="fa fa-minus" mode="currency" currency="EUR"></a-inputNumber>
				{{ value18 }}
                <pre [innerHTML]="display18"></pre>
            </div>
            <hr />
            <div class="field col-12 md-3">
                <label for="minmax-buttons">Min-Max Boundaries</label>
                <a-inputNumber [(ngModel)]="value20" mode="decimal" [showButtons]="true" inputId="minmax-buttons" [min]="0" [max]="100"></a-inputNumber>
				{{ value20 }}
                <pre [innerHTML]="display20"></pre>
            </div>
            <hr />
        </div>
        <div class="field col-12 md-3">
            <label for="vertical" style="display: block">Vertical</label>
            <a-inputNumber [(ngModel)]="value19" [showButtons]="true" buttonLayout="vertical" spinnerMode="vertical" inputId="vertical"
            decrementButtonClass="btn-secondary" incrementButtonClass="btn-secondary" incrementButtonIcon="fa fa-plus" decrementButtonIcon="fa fa-minus"></a-inputNumber>
			{{ value19 }}
            <pre [innerHTML]="display19"></pre>
        </div>
        <hr />
    </div>
</div>`,
    styles: [],
    standalone: true,
    imports: [InputNumber, ReactiveFormsModule, FormsModule]
})
export class InputNumberDemoComponent {
	value1: number = 42723;

	value2: number = 58151;

	value3: number = 2351.35;

	value4: number = 50;

	value5: number = 151351;

	value6: number = 115744;

	value7: number = 635524;

	value8: number = 732762;

	value9: number = 1500;

	value10: number = 2500;

	value11: number = 4250;

	value12: number = 5002;

	value13: number = 20;

	value14: number = 50;

	value15: number = 10;

	value16: number = 20;

	value17: number = 20;

	value18: number = 10.50;

	value19: number = 25;

	value20: number = 50;


    display1 = `<xmp><a-inputNumber inputId="integeronly" [(ngModel)]="value1"></a-inputNumber></xmp>`;
    display2 = `<xmp><a-inputNumber [(ngModel)]="value2" mode="decimal" inputId="withoutgrouping" [useGrouping]="false"></a-inputNumber></xmp>`;
    display3 = `<xmp><a-inputNumber [(ngModel)]="value3" inputId="minmaxfraction" mode="decimal" [minFractionDigits]="2" [maxFractionDigits]="5"></a-inputNumber></xmp>`;
    display4 = `<xmp><a-inputNumber [(ngModel)]="value4" inputId="minmax" inputId="minmax" mode="decimal" [min]="0" [max]="100"></a-inputNumber></xmp>`;
    display5 = `<xmp><a-inputNumber [(ngModel)]="value5" inputId="locale-user" [minFractionDigits]="2"></a-inputNumber></xmp>`;
    display6 = `<xmp><a-inputNumber [(ngModel)]="value6" inpudId="locale-us" mode="decimal" locale="en-US" [minFractionDigits]="2"></a-inputNumber></xmp>`;
    display7 = `<xmp><a-inputNumber [(ngModel)]="value7" inputId="locale-german" mode="decimal" locale="de-DE" [minFractionDigits]="2"></a-inputNumber></xmp>`;
    display8 = `<xmp><a-inputNumber [(ngModel)]="value8" inputId="locale-indian" mode="decimal" locale="en-IN" [minFractionDigits]="2"></a-inputNumber></xmp>`;
    display9 = `<xmp><a-inputNumber [(ngModel)]="value9" inputId="currency-us" mode="currency" currency="USD" locale="en-US"></a-inputNumber></xmp>`;
    display10 = `<xmp><a-inputNumber [(ngModel)]="value10" mode="currency" inputId="currency-germany" currency="EUR" locale="de-DE"></a-inputNumber></xmp>`;
    display11 = `<xmp><a-inputNumber [(ngModel)]="value11" mode="currency" inputId="currency-india" currency="INR" currencyDisplay="code" locale="en-IN"></a-inputNumber></xmp>`;
    display12 = `<xmp><a-inputNumber [(ngModel)]="value12" mode="currency" inputId="currency-japan" currency="JPY" locale="jp-JP"></a-inputNumber></xmp>`;
    display13 = `<xmp><a-inputNumber [(ngModel)]="value13" inputId="mile" suffix=" mi"></a-inputNumber></xmp>`;
    display14 = `<xmp><a-inputNumber [(ngModel)]="value14" inputId="percent" prefix="%"></a-inputNumber></xmp>`;
    display15 = `<xmp><a-inputNumber [(ngModel)]="value15" inputId="expiry" prefix="Expires in " suffix=" days"></a-inputNumber></xmp>`;
    display16 = `<xmp><a-inputNumber [(ngModel)]="value16" prefix="↑ " inputId="temperature" suffix="℃" [min]="0" [max]="40"></a-inputNumber></xmp>`;
    display17 = `<xmp><a-inputNumber [(ngModel)]="value17" [showButtons]="true" inputId="stacked" mode="currency" currency="USD"></a-inputNumber></xmp>`;
    display18 = `<xmp><a-inputNumber [(ngModel)]="value18" [showButtons]="true" buttonLayout="horizontal" inputId="horizontal" spinnerMode="horizontal" [step]="0.25" decrementButtonClass="btn-danger" incrementButtonClass="btn-success" incrementButtonIcon="fa fa-plus" decrementButtonIcon="fa fa-minus" mode="currency" currency="EUR"></a-inputNumber></xmp>`;
    display19 = `<xmp><a-inputNumber [(ngModel)]="value19" [showButtons]="true" buttonLayout="vertical" spinnerMode="vertical" inputId="vertical"
    decrementButtonClass="btn-secondary" incrementButtonClass="btn-secondary" incrementButtonIcon="fa fa-plus" decrementButtonIcon="fa fa-minus"></a-inputNumber></xmp>`;
    display20 = `<xmp><a-inputNumber [(ngModel)]="value20" mode="decimal" [showButtons]="true" inputId="minmax-buttons" [min]="0" [max]="100"></a-inputNumber></xmp>`

}
