import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiPageComponent } from './api-page/api-page.component';
import { ViewapiPageComponent } from './viewapi-page/viewapi-page.component';
import { ThrottlingComponent } from './throttling/throttling.component';
import { ParameterForwardingComponent } from './parameter-forwarding/parameter-forwarding.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:"dashboard",component:DashboardComponent},
  {path:"apis",component:ApiPageComponent,children:[
    {path:"viewapi",component:ViewapiPageComponent
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
    
  ]},
  {path:'',redirectTo:'/dashboard', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
