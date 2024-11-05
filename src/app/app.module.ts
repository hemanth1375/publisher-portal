import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './navbar/navbar.component';
import { ApiPageComponent } from './api-page/api-page.component';
import { ViewapiPageComponent } from './viewapi-page/viewapi-page.component';
import { ParameterForwardingComponent } from './parameter-forwarding/parameter-forwarding.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { ThrottlingComponent } from './throttling/throttling.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ResponseManipulationComponent } from './response-manipulation/response-manipulation.component';
import { OpenapiComponent } from './openapi/openapi.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConnectivityOptionsComponent } from './connectivity-options/connectivity-options.component';
import { PoliciesComponent } from './policies/policies.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EndPointPageComponent } from './end-point-page/end-point-page.component';
import { HttpClientModule } from '@angular/common/http';
import { BackendsUpstreamComponent } from './backends-upstream/backends-upstream.component';
import { UpstreamRequestComponent } from './upstream-request/upstream-request.component';
import { UpstreamThrottlingComponent } from './upstream-throttling/upstream-throttling.component';
import { UpstreamAuthComponent } from './upstream-auth/upstream-auth.component';
import { UpstreamPoliciesComponent } from './upstream-policies/upstream-policies.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ApiPageComponent,
    ViewapiPageComponent,
    ParameterForwardingComponent,
    SidenavbarComponent,
    ThrottlingComponent,
    ResponseManipulationComponent,
    OpenapiComponent,
    AuthPageComponent,
    ConnectivityOptionsComponent,
    PoliciesComponent,
    DashboardComponent,
    EndPointPageComponent,
    BackendsUpstreamComponent,
    UpstreamRequestComponent,
    UpstreamThrottlingComponent,
    UpstreamAuthComponent,
    UpstreamPoliciesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatCheckboxModule, HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
