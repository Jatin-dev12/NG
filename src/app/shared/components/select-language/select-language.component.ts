import { DOCUMENT, NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { GlobalService } from 'src/app/services';
import { NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-select-language',
    template: `
    <div class="languagesection">
      <div class="dropdown" ngbDropdown>
        <a class="btn btn-secondary dropdown-toggle" ngbDropdownToggle>
          {{ (activeLang === 'en') ? 'English' : 'Arabic' }}
          <img src="{{gs.imgUrl}}/lang-errow-white.png" class="white" alt="" />
          <img src="{{gs.imgUrl}}/lang-errow.png" class="black" alt="" />
        </a>
        <ul ngbDropdownMenu>
          @for (lang of languages; track lang) {
            <li><a ngbDropdownItem (click)="clickMe(lang.lang)" [ngClass]="{'active' : lang.lang === activeLang}">{{lang.name}}</a></li>
          }
        </ul>
      </div>
    </div>
    `,
    standalone: true,
    imports: [
        NgbDropdown,
        NgbDropdownToggle,
        NgbDropdownMenu,
        NgbDropdownItem,
        NgClass,
    ],
})
export class SelectLanguageComponent {
	activeLang: any = this._translocoService.getActiveLang();
	public languages: any[] = [
		{
			lang: 'en',
			name: 'English',
		},
		{
			lang: 'ar',
			name: 'Arabic',
		},
	];
	constructor(
		public gs: GlobalService,
		private _translocoService: TranslocoService,
		@Inject(DOCUMENT) private _document: Document,
	) { 
		//console.log('sdds', this._translocoService.getActiveLang())
		//this._translocoService.setActiveLang('en');
	}

	clickMe(lang: string) {
		this._translocoService.setActiveLang(lang);
		this._translocoService.langChanges$.subscribe((event: any) => {
			this.activeLang = event;
			this._document.documentElement.lang = event;
			this._document.documentElement.className = event;
			//console.log('this.', this.document.documentElement.lang)
			//location.reload();
		});
		//console.log('sdf', lang, this.translate.currentLang)
	}
}

// <select #langSelect (change)="translate.use(langSelect.value)">
//   <option
//     *ngFor="let lang of translate.getLangs()"
//     [value]="lang"
//     [attr.selected]="lang === translate.currentLang ? '' : null"
//   >{{lang}}</option>
// </select>
