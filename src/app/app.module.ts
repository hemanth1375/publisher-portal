import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BackendsUpstreamComponent } from './backends-upstream/backends-upstream.component';
import { UpstreamRequestComponent } from './upstream-request/upstream-request.component';
import { UpstreamThrottlingComponent } from './upstream-throttling/upstream-throttling.component';
import { UpstreamAuthComponent } from './upstream-auth/upstream-auth.component';
import { UpstreamPoliciesComponent } from './upstream-policies/upstream-policies.component';
import { UpstreamResponseManipulationComponent } from './upstream-response-manipulation/upstream-response-manipulation.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ViewapipageComponent } from './viewapipage/viewapipage.component';
import { ApiCardsComponent } from './api-cards/api-cards.component';
import { ServiceSettingsComponent } from './service-settings/service-settings.component';
import { UpstreamConnectivityComponent } from './upstream-connectivity/upstream-connectivity.component';
import { MatRadioModule } from '@angular/material/radio';
import { HttpSecurityComponent } from './http-security/http-security.component';
import { ApiMonetizationAndGovernanceComponent } from './api-monetization-and-governance/api-monetization-and-governance.component';
import { OpenApiComponent } from './open-api/open-api.component';
import { TelemetryComponent } from './telemetry/telemetry.component';
import { ApiKeysComponent } from './api-keys/api-keys.component';
import {MatDialogModule} from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { AuthInterceptor } from './auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// keycloak
function initializeKeycloak(keycloak: KeycloakService){
  return () =>{
   
    keycloak.init({
      config: {
        realm: 'master',
        url: 'http://localhost:8080/',
        clientId: 'publisherportal',
       
       
      },
       initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        flow:'implicit',
      },
       enableBearerInterceptor:true,
       loadUserProfileAtStartUp:true,
       
       
    });
 
  }
   
   
}
 

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
    UpstreamPoliciesComponent,
    UpstreamResponseManipulationComponent,
    ViewapipageComponent,
    ApiCardsComponent,
    ServiceSettingsComponent,
    UpstreamConnectivityComponent,
    HttpSecurityComponent,
    ApiMonetizationAndGovernanceComponent,
    OpenApiComponent,
    TelemetryComponent,
    ApiKeysComponent

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
    MatTabsModule,
    MatCheckboxModule, HttpClientModule, MatRadioModule,MatDialogModule,MatSnackBarModule
  ],
  providers: [KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
