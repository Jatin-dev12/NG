import { ApplicationConfig, DEFAULT_CURRENCY_CODE, ENVIRONMENT_INITIALIZER, Injectable, importProvidersFrom, inject, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { httpInterceptorProviders } from './helpers';
import { AlkurnSplashScreenService } from './services';
import { provideEntityData } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { environment } from 'src/environments/environment';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { appReducer } from './store/app.state';
import { provideEffects } from '@ngrx/effects';
import { StoreEffects, UserEffects } from './store/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { SharedModule } from './shared/shared.module';
import { PreloadAllModules, TitleStrategy, provideRouter, withComponentInputBinding, withDebugTracing, withInMemoryScrolling, withPreloading, withRouterConfig, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { CustomTitleStrategy } from './modules';
import { IMAGE_LOADER, ImageLoaderConfig, provideImageKitLoader } from '@angular/common';





// Application configuration object
export const appConfig: ApplicationConfig = {
	// Array of providers for the application
	providers: [
        // Provides animations for the application
        provideAnimations(),
        // Provides routing for the application with various configurations
        provideRouter(routes, withViewTransitions(), withComponentInputBinding(), withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' }), withPreloading(PreloadAllModules)),
        // Provides HTTP client for the application with fetch and interceptors
        provideHttpClient(withFetch(), withInterceptorsFromDi()),
        // Imports providers from various modules
        importProvidersFrom(
            BrowserModule, 
            NoopAnimationsModule, 
            BrowserAnimationsModule, 
            SharedModule
        ),
        // Provides service worker for the application
        provideServiceWorker('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000'
        }),
        // Provides store for the application
        provideStore(appReducer),
        // Provides effects for the application
        provideEffects([StoreEffects, UserEffects]),
        // Provides store devtools for the application with various configurations
        provideStoreDevtools({
            maxAge: 25,
            logOnly: !isDevMode(),
            autoPause: true,
            trace: false,
            traceLimit: 75,
        }),
        // Provides entity data for the application
        provideEntityData(entityConfig),

        // Provides HTTP interceptors for the application
        httpInterceptorProviders, 
        // Provides default currency code for the application
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'USD '
        }, 
        // Provides environment initializer for the application
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(AlkurnSplashScreenService),
            multi: true,
        },
        // Provides title strategy for the application
        {
            provide: TitleStrategy,
            useClass: CustomTitleStrategy,
        },
        {
			provide: IMAGE_LOADER,
			useValue: (config: ImageLoaderConfig) => {
			  return `${config.src}`;
			},
		},
        // Provides transloco for the application
        //provideTransloco(),
    ]
};





