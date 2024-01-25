import { NgModule, isDevMode } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxStripeModule } from 'ngx-stripe';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxGpAutocompleteModule } from "@angular-magic/ngx-gp-autocomplete";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { provideTransloco, TranslocoModule } from '@ngneat/transloco';
import { provideTranslocoPersistLang, cookiesStorage } from '@ngneat/transloco-persist-lang';


import { LaddaModule } from 'src/app/modules/ladda/ladda.module';


import { TruncatePipe } from './pipe/truncate.pipe';
import { SearchPipe } from './pipe/search-pipe';
import { SafePipe } from './pipe/safe.pipe';
import { ParseUrlPipe } from './pipe/parse-url.pipe';
import { HtmlToPlainTextPipe } from './pipe/html-to-plain-text.pipe';
import { OrderPipe } from './pipe/order.pipe';
import { FilterPipe } from './pipe/filter.pipe';

import { SocialShareDirective } from './directive/social-share.directive';
import { CurrencyFormatterDirective } from './directive/currency-formatter.directive';
import { HighlightDirective } from './directive/highlight.directive';
import { AutocompleteOffDirective } from './directive/autocomplete-off.directive';
import { PhoneMaskDirective } from './directive/phone-mask.directive';
import { DragAndDropDirective } from './directive/drag-and-drop.directive';
import { ControlErrorsDirective } from './directive/control-errors.directive';
import { ControlErrorContainerDirective } from './directive/control-error-container.directive';
import { FormSubmitDirective } from './directive/form-submit.directive';
import { PasswordToggleDirective } from './directive/password-toggle.directive';

import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { FileDragDropUploaderComponent } from './components/file-drag-drop-uploader/file-drag-drop-uploader.component';
import { ErrorSummaryComponent } from './components/error-summary/error-summary.component';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { environment } from 'src/environments/environment';
import { ImgLazyComponent } from './components/img-lazy/img-lazy.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { AutoScrollDirective } from './directive/auto-scroll.directive';
import { TranslocoHttpLoader } from './transloco-loader';
import { CustomDropDownComponent } from './components/custom-drop-down/custom-drop-down.component';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    LaddaModule,
    NgxSkeletonLoaderModule.forRoot(),
    MatAutocompleteModule,
    DragDropModule,
    NgxStripeModule.forRoot(environment.STRIPE_PUBLIC_KEY),
    NgxGpAutocompleteModule.forRoot({
        loaderOptions: {
            apiKey: environment.GOOGLE_MAP_KEY,
            libraries: ['places']
        }
    }),
    NgOptimizedImage,
    TranslocoModule,
    TruncatePipe,
    SearchPipe,
    SafePipe,
    ParseUrlPipe,
    HtmlToPlainTextPipe,
    OrderPipe,
    FilterPipe,
    SocialShareDirective,
    HighlightDirective,
    AutocompleteOffDirective,
    CurrencyFormatterDirective,
    PhoneMaskDirective,
    DragAndDropDirective,
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    FormSubmitDirective,
    PasswordToggleDirective,
    AutoScrollDirective,
    FileUploaderComponent,
    PaginationComponent,
    ReadMoreComponent,
    FileDragDropUploaderComponent,
    ErrorSummaryComponent,
    ControlErrorComponent,
    ImgLazyComponent,
    SelectLanguageComponent,
    CustomDropDownComponent,
],
    exports: [
    TranslocoModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    LaddaModule,
    NgxStripeModule,
    NgxGpAutocompleteModule,
    NgxSkeletonLoaderModule,
    NgOptimizedImage,
    // Module Export
    TruncatePipe,
    SearchPipe,
    SafePipe,
    ParseUrlPipe,
    HtmlToPlainTextPipe,
    OrderPipe,
    FilterPipe,
    SocialShareDirective,
    HighlightDirective,
    AutocompleteOffDirective,
    CurrencyFormatterDirective,
    PhoneMaskDirective,
    DragAndDropDirective,
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    FormSubmitDirective,
    PasswordToggleDirective,
    AutoScrollDirective,
    FileUploaderComponent,
    PaginationComponent,
    ReadMoreComponent,
    FileDragDropUploaderComponent,
    ErrorSummaryComponent,
    ControlErrorComponent,
    ImgLazyComponent,
    SelectLanguageComponent,
    CustomDropDownComponent
],
    providers: [
        //provideImgixLoader('/assets/'),
        /*{
            provide: IMAGE_LOADER,
            useValue: (config: ImageLoaderConfig) => {
                return `https://example.com/${config.src}-${config.width}.jpg}`;
            }
        },*/
        provideTransloco({
            config: {
                availableLangs: ['en', 'ar'],
                defaultLang: 'en',
                // Remove this option if your application doesn't support changing language in runtime.
                reRenderOnLangChange: true,
                prodMode: !isDevMode(),
            },
            loader: TranslocoHttpLoader
        }),
        provideTranslocoPersistLang({
            storage: {
                useValue: cookiesStorage(),
            },
        }),
    ]
})

export class SharedModule {

}