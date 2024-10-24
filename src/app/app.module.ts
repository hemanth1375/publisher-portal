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
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { ResponseManipulationComponent } from './response-manipulation/response-manipulation.component';
import { OpenapiComponent } from './openapi/openapi.component';

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
    OpenapiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
