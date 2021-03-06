import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';

import { LoginComponent } from './login/login.component';

import { AuthService } from './auth/auth.service';
import { AppConfig } from './app.config';
import { AuthGuard } from './auth/auth-guard.service';
import { LocalStorageModule } from 'angular-2-local-storage';

import { HttpClient } from './lib/http-client.service';
import { UserModule } from './user/user.module';

import { AlertService } from './shared/alert/alert.service';
import { AlerComponent } from './shared/alert/alert.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    HttpModule,
    UserModule,

  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    LoginComponent,
    AlerComponent

  ],
  providers: [AuthService, AppConfig, AuthGuard, AlertService, {
    provide: HttpClient,
    useFactory: httpClientLoader,
    deps: [XHRBackend, RequestOptions]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpClientLoader(backend: XHRBackend, options: RequestOptions) {
  return new HttpClient(backend, options);
}
