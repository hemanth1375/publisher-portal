import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ViewapiPageService } from '../services/viewapi-page.service';
import { OpenapiComponent } from '../openapi/openapi.component';
import { Router } from '@angular/router';
import { BackendsUpstreamComponent } from '../backends-upstream/backends-upstream.component';
import { ApiPageService } from '../services/api-page.service';
import { Subject, takeUntil } from 'rxjs';
import { EndPointPageComponent } from '../end-point-page/end-point-page.component';
import { ParameterForwardingComponent } from '../parameter-forwarding/parameter-forwarding.component';
import { AuthPageComponent } from '../auth-page/auth-page.component';
import { ThrottlingComponent } from '../throttling/throttling.component';
import { ResponseManipulationComponent } from '../response-manipulation/response-manipulation.component';
import { ConnectivityOptionsComponent } from '../connectivity-options/connectivity-options.component';

@Component({
  selector: 'app-viewapipage',
  templateUrl: './viewapipage.component.html',
  styleUrl: './viewapipage.component.css'
})
export class ViewapipageComponent {

  @ViewChild(EndPointPageComponent) endPointPageComponent!: EndPointPageComponent;
  @ViewChild(ParameterForwardingComponent) parameterForwardingComponent!: ParameterForwardingComponent;
  @ViewChild(AuthPageComponent) authPageComponent!: AuthPageComponent;
  @ViewChild(ThrottlingComponent) throttlingComponent!: ThrottlingComponent;
  @ViewChild(ResponseManipulationComponent) responseManipulationComponent!: ResponseManipulationComponent;
  @ViewChild(ConnectivityOptionsComponent) connectivityOptionsComponent!: ConnectivityOptionsComponent;
  @ViewChild(OpenapiComponent) openApiComponent!: OpenapiComponent;
  @ViewChild(BackendsUpstreamComponent) backendComponent!: BackendsUpstreamComponent;
 
   // throttle
   isIpFilterEnabled = false; // Initially false
   receivedData: any;
   private unsubscribe = new Subject<void>();
 
 
   constructor(private viewapiPageService:ViewapiPageService,private dataService: ViewapiPageService,private router:Router,private componentFactoryResolver: ComponentFactoryResolver,private apiPageService:ApiPageService){
 
   }
   collectedData1: string[] = [];
   
   sendData() {
     this.dataService.sendData(this.entireFormData);
     this.router.navigate(['apis'])
   }
   onToggleChange(event: any) {
     this.isIpFilterEnabled = event.checked; // Capture toggle state
   }
   items = [
     { name: 'EndPoint' },
     { name: 'Parameter Forwarding' },
     { name: 'Auth' },
     { name: 'Throttling' },
     { name: 'Policies' },
     { name: 'Response Manipulation' },
     { name: 'connectivity Options' },
     { name: 'Open Api' },
     { name: 'Backends(Upstream)' }
   ];
   selectedItem: any;
 
   selectItem(item: any) {
     console.log(item);
 
     this.selectedItem = item;
   }
   ngOnInit() {
     this.apiPageService.getData$().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
       this.receivedData = data;
       console.log(this.receivedData);
       
     });
     //  this.addChildComponents(this.receivedData.backend.length);
     this.selectedItem = this.items[8];
     this.dataService.dataBackend$.subscribe(data => {
       this.collectedData1.push(data);
       console.log('Data received from child:', data);
       console.log(this.collectedData1);
       
     });
   }
   ngOnDestroy(){
     this.collectedData1=[];
   }
   onFormSubmit(formData: any) {
     console.log("Form data received from child:", formData);
     // Handle the form data, e.g., submit it to a service or API.
   }
   entireFormData: any = {
     endPoint: null,
     parameterForwarding: null,
     throttling: null,
     responseManipulation: null,
     connectivityOptions: null,
     policies: null,
     auth: null,
     openApi: null,
     backend:null
   };
   @ViewChild('childContainer', { read: ViewContainerRef, static: true })
   childContainer!: ViewContainerRef;
   childData: Array<any> = [];
   // addChildComponents(count: number) {
     
   //   for (let i = 0; i < count; i++) {
   //     const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BackendsUpstreamComponent);
   //     const componentRef = this.childContainer.createComponent(componentFactory);
   
       
   //     componentRef.instance.backendUpStreamSubmitted.subscribe((data: any) => {
   //       console.log(`Data from component instance:`, data);
   //       this.childData.push(data);
   //     });
   //   }
   // }
   // addChild() {
   //   const count = 1; // Replace with the actual number you get from the API or other logic
   //   this.addChildComponents(count);
   // }
   addChild() {
     const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BackendsUpstreamComponent);
     const componentRef = this.childContainer.createComponent(componentFactory);
     // componentRef.instance.onFormSubmit
     componentRef.instance.backendUpStreamSubmitted.subscribe((data: any) => {
       console.log(data);
       componentRef.instance.childData.push(data)
       // this.childData.push(data);
       console.log(componentRef.instance.childData);
     });
   }
   // @ViewChild(BackendsUpstreamComponent, { static: true }) childComponent!: BackendsUpstreamComponent;
   
   // childData: Array<any> = [];
 
   // constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
 
   // addChild() {
   //   console.log(this.childComponent);
     
   //   const childContainer = this.childComponent.getChildContainer();
   //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BackendsUpstreamComponent);
   //   const componentRef = childContainer.createComponent(componentFactory);
 
   //   componentRef.instance.backendUpStreamSubmitted.subscribe((data: any) => {
   //     this.childData.push(data);
   //     console.log(this.childData);
   //   });
   // }
   collectData(formName: string, data: any) {
     this.entireFormData[formName] = data;
     this.entireFormData['backend']=this.collectedData1
     console.log("Form data collected:", this.entireFormData);
   }
   endPointData: any;
   parameterForwardingData: any;
   authPageData:any;
   connectivityData:any;
   openApiData:any;
   throttlingData:any;
   responseData:any;
   policiesData:any;
   upstreamAuthData:any;
   upstreamPoliciesData:any;
   upstreamRequestData:any;
   upstreamThrottlingData:any;
   upstreamResponseData:any;
  //  onEndPointFormChange(form:any,updatedData: any) {
  //   console.log('End Point Form Updated Data:', updatedData);
  //   switch(form){
  //     case 'endpoint': this.endPointData = updatedData;break;
  //     case 'parameterforwarding':this.parameterForwardingData=updatedData;break;
  //   }
  //    
  // }
  onEndPointFormChange(updatedData: any) {
    console.log('End Point Form Updated Data:', updatedData);
    this.endPointData = updatedData; 
  }

  onParameterForwardingFormChange(updatedData: any) {
    console.log('Parameter Forwarding Form Updated Data:', updatedData);
    this.parameterForwardingData = updatedData; 
  }
  onAuthPageFormChange(updatedData: any) {
    console.log('Auth Form Updated Data:', updatedData);
    this.authPageData = updatedData; 
  }
  onConnectivityFormChange(updatedData: any) {
    console.log('connectivity Updated Data:', updatedData);
    this.connectivityData = updatedData; 
  }
  onOpenApiFormChange(updatedData: any) {
    console.log('openApi Updated Data:', updatedData);
    this.openApiData = updatedData; 
  }
  onThrottlingFormChange(updatedData: any) {
    console.log('throttling Updated Data:', updatedData);
    this.throttlingData = updatedData; 
  }
  onPoliciesFormChange(updatedData: any) {
    console.log('policies Updated Data:', updatedData);
    this.policiesData = updatedData; 
  }
  onResponseFormChange(updatedData: any) {
    console.log('response Updated Data:', updatedData);
    this.responseData = updatedData; 
  }
  onUpstreamAuthFormChange(updatedData: any) {
    console.log('response Updated Data:', updatedData);
    this.upstreamAuthData = updatedData; 
  }
  onUpstreamPoliciesFormChange(updatedData: any) {
    console.log('response Updated Data:', updatedData);
    this.upstreamPoliciesData = updatedData; 
  }
  onUpstreamRequestFormChange(updatedData: any) {
    console.log('response Updated Data:', updatedData);
    this.upstreamRequestData = updatedData; 
  }
  onUpstreamThrottleFormChange(updatedData: any) {
    console.log('response Updated Data:', updatedData);
    this.upstreamThrottlingData = updatedData; 
  }
  onUpstreamResponseFormChange(updatedData: any) {
    console.log('response Updated Data:', updatedData);
    this.upstreamResponseData = updatedData; 
  }
   submitForm() {
    const endPointFormData = this.endPointPageComponent.formGroupEndPoint.value;
    const parameterForwardingFormData = this.endPointPageComponent.formGroupEndPoint.value;
    console.log(endPointFormData);
    console.log('Final End Point Data:', this.endPointData);
    console.log('Final Parameter Forwarding Data:', this.parameterForwardingData);
    console.log('Auth page Data:', this.authPageData);
    console.log('Connectivity Data:', this.connectivityData);
    console.log('openapi Data:', this.openApiData);
    console.log('throttling Data:', this.throttlingData);
    console.log('policies Data:', this.policiesData);
    console.log('response Data:', this.responseData);
    console.log('response Data:', this.upstreamRequestData);

   }

}
