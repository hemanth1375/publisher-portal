import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiPageComponent } from './api-page/api-page.component';
import { ViewapiPageComponent } from './viewapi-page/viewapi-page.component';
import { ThrottlingComponent } from './throttling/throttling.component';
import { ParameterForwardingComponent } from './parameter-forwarding/parameter-forwarding.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewapipageComponent } from './viewapipage/viewapipage.component';
import { ApiCardsComponent } from './api-cards/api-cards.component';
import { ServiceSettingsComponent } from './service-settings/service-settings.component';
import { HttpSecurityComponent } from './http-security/http-security.component';
import { ApiMonetizationAndGovernanceComponent } from './api-monetization-and-governance/api-monetization-and-governance.component';
import { OpenApiComponent } from './open-api/open-api.component';
import { TelemetryComponent } from './telemetry/telemetry.component';
import { ApiKeysComponent } from './api-keys/api-keys.component';

const routes: Routes = [
  { path: "apicards", component: ApiCardsComponent },
  { path: "dashboard", component: DashboardComponent },
  {
    path: "apis", component: ApiPageComponent, children: [
      {
        path: "viewapi", component: ViewapipageComponent
        //   ,children:[
        //   {path:"parameterforwarding",component:ParameterForwardingComponent},
        // {path:"auth",component:ViewapiPageComponent},
        // {path:"throttling",component:ThrottlingComponent},
        // {path:"policies",component:ViewapiPageComponent},
        // {path:"responsemanipulation",component:ViewapiPageComponent},
        // {path:"connectivityoptions",component:ViewapiPageComponent},
        // {path:"openapi",component:ViewapiPageComponent}

        // ]
      }

    ]
  },
  { path: "service", component: ServiceSettingsComponent },
  { path: "httpSecurity", component: HttpSecurityComponent },
  { path: "apiMonetization", component: ApiMonetizationAndGovernanceComponent },
  { path: "openAPI", component: OpenApiComponent },
  {path:"telemetry",component:TelemetryComponent},
  {path:"apikeys",component:ApiKeysComponent},
  { path: '', redirectTo: '/apicards', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
