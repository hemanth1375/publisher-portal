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
import { ApicardsService } from '../services/apicards.service';

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
 
 
   constructor(private viewapiPageService:ViewapiPageService,private dataService: ViewapiPageService,private router:Router,private componentFactoryResolver: ComponentFactoryResolver,private apiPageService:ApiPageService,private apiCardService:ApicardsService){
 
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
   apiData:any;
   ngOnInit() {
    this.apiCardService.getData$().subscribe(data => {
      this.apiData = data;
      console.log(this.apiData);
    });
     this.apiPageService.getData$().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
       this.receivedData = data;
       console.log(this.receivedData);
       this.endPointData=this.receivedData;
       this.connectivityData=this.receivedData;
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


  onFormChange(form:any,updatedData:any){
    switch(form){
      case 'endpoint': this.endPointData = updatedData;break;
      case 'parameter': this.parameterForwardingData=updatedData;break;
      case 'auth': this.authPageData = updatedData;break;
      case 'connectivity': this.connectivityData = updatedData;break;
      case 'throttling': this.throttlingData = updatedData;break;
      case 'policies': this.policiesData = updatedData;break;
      case 'openapi': this.openApiData = updatedData;break;
      case 'response': this.responseData = updatedData;break;
      case 'upstreamRequest': this.upstreamRequestData = updatedData;break;
      case 'upstreamResponse': this.upstreamResponseData = updatedData;break;
      case 'upstreamAuth': this.upstreamAuthData = updatedData;break;
      case 'upstreamThrottling': this.upstreamThrottlingData = updatedData;break;
      case 'upstreamPolicies': this.upstreamPoliciesData = updatedData;break;
    }
  }
  //  submitForm() {
  //   const endPointFormData = this.endPointPageComponent.formGroupEndPoint.value;
  //   const parameterForwardingFormData = this.endPointPageComponent.formGroupEndPoint.value;
  //   console.log(endPointFormData);
  //   console.log('Final End Point Data:', this.endPointData);
  //   console.log('Final Parameter Forwarding Data:', this.parameterForwardingData);
  //   console.log('Auth page Data:', this.authPageData);
  //   console.log('Connectivity Data:', this.connectivityData);
  //   console.log('openapi Data:', this.openApiData);
  //   console.log('throttling Data:', this.throttlingData);
  //   console.log('policies Data:', this.policiesData);
  //   console.log('response Data:', this.responseData);
  //   console.log('upstreamReq Data:', this.upstreamRequestData);

  //  }
  submitEndpointData(){
    console.log('Final End Point Data:', this.endPointData);
    console.log('Final Parameter Forwarding Data:', this.parameterForwardingData);
    console.log('Auth page Data:', this.authPageData);
    console.log('Connectivity Data:', this.connectivityData);
    console.log('openapi Data:', this.openApiData);
    console.log('throttling Data:', this.throttlingData);
    console.log('policies Data:', this.policiesData);
    console.log('response Data:', this.responseData);
    console.log('upstreamReq Data:', this.upstreamRequestData);
    const resultantFormData={
      "endpoints":[{
        "@comment": "string",
      "endpoint": this.endPointData.endPointUri,
          // "backend":item.backend.map((item1?:any)=>{
          //   return {
          //       "host": [
          //         "string"
          //       ],
          //       "url_pattern": "string",
          //       "allow": [
          //         "string"
          //       ],
          //       "mapping": {
          //         "blog": "string",
          //         "collection": "string",
          //         "CapitalCityResult": "string"
          //       },
          //       "group": "string",
          //       "is_collection": true,
          //       "encoding": "string",
          //       "extra_config": {
          //         "plugin/req-resp-modifier": {
          //           "name": [
          //             "string"
          //           ],
          //           "content-replacer": {}
          //         },
          //         "qos/ratelimit/proxy": {
          //           "max_rate": 0,
          //           "capacity": item1?.throttling?.capacity
          //         },
          //         "qos/http-cache": {
          //           "shared": true
          //         },
          //         "backend/graphql": {
          //           "type": "string",
          //           "query": "string",
          //           "variables": {}
          //         },
          //         "backend/soap": {
          //           "@comment": "string",
          //           "path": "string"
          //         },
          //         "backend/grpc": {
          //           "input_mapping": {
          //             "lat": "string",
          //             "lon": "string",
          //             "Id_flight": "string",
          //             "Main_passenger": "string"
          //           },
          //           "response_naming_convention": "string",
          //           "output_enum_as_string": true,
          //           "output_timestamp_as_string": true,
          //           "output_duration_as_string": true,
          //           "client_tls": {
          //             "allow_insecure_connections": true
          //           },
          //           "output_remove_unset_values": true,
          //           "use_request_body": true
          //         },
          //         "backend/static-filesystem": {
          //           "directory_listing": true,
          //           "path": "string"
          //         }
          //       },
          //       "target": "string",
          //       "method": item1.request.method,
          //       "deny": [
          //         "string"
          //       ],
          //       "@comment": "string",
          //       "@test_with": "string",
          //       "disable_host_sanitize": true
              
          //   }
          // }),
          "extra_config": {
            "documentation/openapi": {
              "summary": this.openApiData?.summary,
              "description": this.openApiData?.description,
              "tags": [
                "string"
              ]
            },
            "modifier/jmespath": {
              "@comment": "string",
              "expr": "string"
            },
            "security/policies": {
              "req": {
                "policies": this.policiesData?.secReqPolicyArrayValue,
                "error": {
                  "body": this.policiesData?.secReqErrorBody,
                  "status": this.policiesData?.secReqErrorStCode
                }
              }
            },
            "qos/ratelimit/router": {
              "max_rate": 0
            },
            "proxy": {
              "sequential": true,
              "static": {
                "data": {},
                "strategy": "string"
              }
            },
            "@comment": "string",
            "auth/basic": {
              "@comment": "string",
              "htpasswd_path": "string"
            },
            "validation/cel": [
              {
                "check_expr": "string"
              }
            ],
            "auth/validator": {
              "alg": "string",
              "audience": [
                "string"
              ],
              "roles_key": this.authPageData?.rolesKey,
              "roles": this.authPageData?.rolesArrayValue,
              "jwk_url": this.authPageData?.jwkUri,
              "issuer": this.authPageData?.issuer,
              "jwk_local_path": "string",
              "disable_jwk_security": true
            },
            "auth/signer": {
              "alg": "string",
              "kid": "string",
              "keys_to_sign": this.authPageData?.keysToSignArrayValue,
              "jwk_local_path": "string",
              "disable_jwk_security": true
            },
            "auth/api-keys": {
              "roles": [
                "string"
              ]
            },
            "websocket": {
              "input_headers": [
                "string"
              ],
              "connect_event": true,
              "disconnect_event": true,
              "read_buffer_size": this.connectivityData?.readBufferSize,
              "write_buffer_size": this.connectivityData?.writeBufferSize,
              "message_buffer_size": 0,
              "max_message_size": 0,
              "write_wait": this.connectivityData?.writeWait,
              "pong_wait": this.connectivityData?.pongWait,
              "ping_period": "string",
              "max_retries": this.connectivityData?.maxRetries,
              "backoff_strategy": this.connectivityData?.backoffStrategy
            }
          }
        }]
    }
    this.viewapiPageService.addEndPoint(this.apiData,resultantFormData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.router.navigate(['apis'])
      }
    })
    console.log(resultantFormData);
    
    
  }

}
