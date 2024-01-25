import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { HomeLayoutComponent } from './container/home-layout/home-layout.component';
import { DashboardLayoutComponent } from './container/dashboard-layout/dashboard-layout.component';
import { LeftSidebarComponent } from './container/left-sidebar/left-sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchLayoutComponent } from './container/search-layout/search-layout.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NgOptimizedImage,
        HeaderComponent, FooterComponent, DefaultLayoutComponent, HomeLayoutComponent, DashboardLayoutComponent, LeftSidebarComponent, SearchLayoutComponent
    ],
    exports: [HeaderComponent, FooterComponent, DefaultLayoutComponent, HomeLayoutComponent, DashboardLayoutComponent, LeftSidebarComponent, SearchLayoutComponent]
})
export class LayoutsModule { }
