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
   showCreateButton:boolean=true;
   ngOnInit() {
    this.apiCardService.getData$().subscribe(data => {
      this.apiData = data;
      console.log(this.apiData);
    });
     this.apiPageService.getData$().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
       this.receivedData = data;
       console.log(this.receivedData);
       if(this.receivedData.id){
        this.showCreateButton=false;
       }else{
        this.showCreateButton=true;
       }
       this.endPointData=this.receivedData;
       this.connectivityData=this.receivedData;
       this.backendData=this.receivedData;
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
   backendData:any;
  //  upstreamAuthData:any;
  //  upstreamPoliciesData:any;
  //  upstreamRequestData:any;
  //  upstreamThrottlingData:any;
  //  upstreamResponseData:any;
  //  upstreamConnectivityData:any;


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
      case 'backend': this.backendData = updatedData;break;
      // case 'upstreamRequest': this.upstreamRequestData = updatedData;break;
      // case 'upstreamResponse': this.upstreamResponseData = updatedData;break;
      // case 'upstreamAuth': this.upstreamAuthData = updatedData;break;
      // case 'upstreamThrottling': this.upstreamThrottlingData = updatedData;break;
      // case 'upstreamPolicies': this.upstreamPoliciesData = updatedData;break;
      // case 'upstreamConnectivity': this.upstreamConnectivityData = updatedData;break;
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
    console.log('response Data:', this.backendData);
    // console.log('upstreamReq Data:', this.upstreamRequestData);
    const renamingObj = this.backendData?.upstreamResponseData?.objectMapValue?.reduce((acc:any, [key, value]:any) => {
      acc[key] = value;
      return acc;
    }, {});
    const inputMapObj = this.backendData?.upstreamConnectivityData?.objectMapValue?.reduce((acc:any, [key, value]:any) => {
      acc[key] = value;
      return acc;
    }, {});

    const resultantFormData={
      "endpoints":[
        {
          "id": null,
          "@comment": "string",
          "endpoint": this.endPointData?.endPointUri,
          "backend": [
            {
              "id": null,
              "host": [
                "string"
              ],
              "url_pattern": this.backendData?.upstreamRequestData?.endpointUrl,
              "allow": [
                "string"
              ],
              "mapping": renamingObj,
              "group": this.backendData?.upstreamResponseData?.wrappingGroup,
              "is_collection": this.backendData?.upstreamResponseData?.isCollection,
              "encoding": this.backendData?.upstreamRequestData?.decodeAs,
              "extra_config": {
                "id": null,
                "qos/circuit-breaker": {
                  "interval": this.backendData?.upstreamAuthData?.interval,
                  "name": this.backendData?.upstreamAuthData?.circuitBreakerName,
                  "timeout":  this.backendData?.upstreamAuthData?.timeout,
                  "max_errors": this.backendData?.upstreamAuthData?.maxError,
                  "log_status_change": this.backendData?.upstreamAuthData?.logStatusChange
                },
                "plugin/req-resp-modifier": {
                  "name": [
                    "content-replacer"
                  ],
                  "content-replacer": this.backendData?.upstreamResponseData?.contentReplacer
                },
                "qos/ratelimit/proxy": {
                  "max_rate": this.backendData?.upstreamAuthData?.maxRateLimit,
                  "capacity": this.backendData?.upstreamAuthData?.capacity
                },
                "qos/http-cache": {
                  "shared": this.backendData?.upstreamResponseData?.isSharedCacheActive
                },
                "backend/graphql": {
                  "type": this.backendData?.upstreamConnectivityData?.restTographQLOpTypeForm,
                  "query": this.backendData?.upstreamConnectivityData?.restTographQLInlineQueryForm,
                  "variables": {}
                },
                "backend/soap": {
                  "@comment": "string",
                  "path": this.backendData?.upstreamConnectivityData?.pathRestToSoapForm
                },
                "backend/grpc": {
                  "input_mapping": inputMapObj,
                  "response_naming_convention": this.backendData?.upstreamConnectivityData?.restTogrpcResNamingConventionForm,
                  "output_enum_as_string": this.backendData?.upstreamConnectivityData?.restTogrpcEnumsAsStrgsForm,
                  "output_timestamp_as_string": this.backendData?.upstreamConnectivityData?.restTogrpcTimestmpAsStrgsForm,
                  "output_duration_as_string": this.backendData?.upstreamConnectivityData?.restTogrpcDurationAsStrgsForm,
                  "client_tls": {
                    "allow_insecure_connections": true
                  },
                  "output_remove_unset_values": this.backendData?.upstreamConnectivityData?.restTogrpcRemoveUnsetValForm,
                  "use_request_body": this.backendData?.upstreamConnectivityData?.restTogrpcUseReqBodyForm
                },
                "backend/static-filesystem": {
                  "directory_listing": this.backendData?.upstreamRequestData?.directory_Listing,
                  "path": this.backendData?.upstreamRequestData?.staticUrl
                }
              },
              "target": "string",
              "method": this.backendData?.upstreamRequestData?.method,
              "deny": [
                "string"
              ],
              "@comment": "string",
              "@test_with": "string",
              "disable_host_sanitize": true
            }
          ],
          "extra_config": {
            "id": null,
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
              "max_rate": this.throttlingData?.rateLimit
            },
            "proxy": {
              "sequential": true,
              "static": {
                "data": this.responseData?.response,
                "strategy": this.responseData?.strategy
              }
            },
            "@comment": "string",
            "auth/basic": {
              "@comment": "string",
              "htpasswd_path": "string"
            },
            "validation/cel": [
              {
                "id": null,
                "check_expr": "string"
              }
            ],
            "auth/validator": {
              "alg": this.authPageData?.algorithm,
              "audience": this.authPageData?.audienceArrayValue,
              "roles_key": this.authPageData?.rolesKey,
              "roles": this.authPageData?.rolesArrayValue,
              "jwk_url": this.authPageData?.jwkUri,
              "issuer": this.authPageData?.issuer,
              "jwk_local_path": "string",
              "disable_jwk_security": true
            },
            "auth/signer": {
              "alg": this.authPageData?.tokenSignAlgorithm,
              "kid": this.authPageData?.keyId,
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
              "input_headers": this.connectivityData?.inputHeaderArray,
              "connect_event": this.connectivityData?.connectEvent,
              "disconnect_event": this.connectivityData?.disconnectEvent,
              "read_buffer_size": this.connectivityData?.readBufferSize,
              "write_buffer_size": this.connectivityData?.writeBufferSize,
              "message_buffer_size": this.connectivityData?.messageBufferSize,
              "max_message_size": this.connectivityData?.maxWriteBufferSize,
              "write_wait": this.connectivityData?.writeWait,
              "pong_wait": this.connectivityData?.pongWait,
              "ping_period": "string",
              "max_retries": this.connectivityData?.maxRetries,
              "backoff_strategy": this.connectivityData?.backoffStrategy,
              "enable_direct_communication": true,
              "return_error_details": this.connectivityData?.returnErr,
              "timeout": "string"
            }
          },
          "output_encoding": this.endPointData?.selectedOutput,
          "@test_with": "string",
          "input_headers": this.parameterForwardingData?.parameterHeaderArrays,
          "concurrent_calls": 0,
          "method": this.endPointData?.selectedMethod,
          "input_query_strings": this.parameterForwardingData?.parameterArrays,
          "timeout":this.throttlingData?.timeout,
          "cache_ttl":this.throttlingData?.cacheTtl
        }
      ]
    }
    this.viewapiPageService.addEndPoint(this.apiData,resultantFormData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.router.navigate(['dashboard'])
      }
    })
    console.log(resultantFormData);
    
    
  }
  updateEndpoint(){
    const resultantFormData={
      "id": this.receivedData?.id,
      "@comment": "string",
      "endpoint": this.endPointData?.endPointUri,
      "backend": [
        {
          "id": this.receivedData?.backend?.[0]?.id,
          "host": [
            "string"
          ],
          "url_pattern": "string",
          "allow": [
            "string"
          ],
          "mapping": {
            "blog": "string",
            "collection": "string",
            "CapitalCityResult": "string"
          },
          "group": "string",
          "is_collection": true,
          "encoding": "string",
          "extra_config": {
            "id": this.receivedData?.backend?.[0]?.extra_config?.id,
            "plugin/req-resp-modifier": {
              "name": [
                "string"
              ],
              "content-replacer": {}
            },
            "qos/ratelimit/proxy": {
              "max_rate": 0,
              "capacity": 0
            },
            "qos/http-cache": {
              "shared": true
            },
            "backend/graphql": {
              "type": "string",
              "query": "string",
              "variables": {}
            },
            "backend/soap": {
              "@comment": "string",
              "path": "string"
            },
            "backend/grpc": {
              "input_mapping": {
                "lat": "string",
                "lon": "string",
                "Id_flight": "string",
                "Main_passenger": "string"
              },
              "response_naming_convention": "string",
              "output_enum_as_string": true,
              "output_timestamp_as_string": true,
              "output_duration_as_string": true,
              "client_tls": {
                "allow_insecure_connections": true
              },
              "output_remove_unset_values": true,
              "use_request_body": true
            },
            "backend/static-filesystem": {
              "directory_listing": true,
              "path": "string"
            }
          },
          "target": "string",
          "method": this.backendData?.upstreamRequestData?.method,
          "deny": [
            "string"
          ],
          "@comment": "string",
          "@test_with": "string",
          "disable_host_sanitize": true
        }
      ],
      "extra_config": {
        "id": this.receivedData?.extra_config?.id,
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
          "max_rate": this.throttlingData?.rateLimit
        },
        "proxy": {
          "sequential": true,
          "static": {
            "data": this.responseData?.response,
            "strategy": this.responseData?.strategy
          }
        },
        "@comment": "string",
        "auth/basic": {
          "@comment": "string",
          "htpasswd_path": "string"
        },
        "validation/cel": [
          {
            "id": this.receivedData?.extra_config?.["validation/cel"]?.[0]?.id,
            "check_expr": "string"
          }
        ],
        "auth/validator": {
          "alg": this.authPageData?.algorithm,
          "audience": this.authPageData?.audienceArrayValue,
          "roles_key": this.authPageData?.rolesKey,
          "roles": this.authPageData?.rolesArrayValue,
          "jwk_url": this.authPageData?.jwkUri,
          "issuer": this.authPageData?.issuer,
          "jwk_local_path": "string",
          "disable_jwk_security": true
        },
        "auth/signer": {
          "alg": this.authPageData?.tokenSignAlgorithm,
          "kid": this.authPageData?.keyId,
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
          "input_headers": this.connectivityData?.inputHeaderArray,
          "connect_event": this.connectivityData?.connectEvent,
          "disconnect_event": this.connectivityData?.disconnectEvent,
          "read_buffer_size": this.connectivityData?.readBufferSize,
          "write_buffer_size": this.connectivityData?.writeBufferSize,
          "message_buffer_size": this.connectivityData?.messageBufferSize,
          "max_message_size": this.connectivityData?.maxWriteBufferSize,
          "write_wait": this.connectivityData?.writeWait,
          "pong_wait": this.connectivityData?.pongWait,
          "ping_period": "string",
          "max_retries": this.connectivityData?.maxRetries,
          "backoff_strategy": this.connectivityData?.backoffStrategy,
          "enable_direct_communication": true,
          "return_error_details": this.connectivityData?.returnErr,
          "timeout": "string"
        }
      },
      "output_encoding": this.endPointData?.selectedOutput,
      "@test_with": "string",
      "input_headers": this.parameterForwardingData?.parameterHeaderArrays,
      "concurrent_calls": 0,
      "method": this.endPointData?.selectedMethod,
      "input_query_strings": this.parameterForwardingData?.parameterArrays,
      "timeout":this.throttlingData?.timeout,
      "cache_ttl":this.throttlingData?.cacheTtl
    }

    this.viewapiPageService.updateEndPoint(this.receivedData.id,resultantFormData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.router.navigate(['dashboard'])
      }
    })
  }

}
