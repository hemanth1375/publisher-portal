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
import { MatSnackBar } from '@angular/material/snack-bar';

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
 
 
   constructor(private viewapiPageService:ViewapiPageService,private dataService: ViewapiPageService,private router:Router,private componentFactoryResolver: ComponentFactoryResolver,private apiPageService:ApiPageService,private apiCardService:ApicardsService,private _snackBar: MatSnackBar){
 
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
          "@comment": null,
          "endpoint": this.endPointData?.endPointUri,
          "backend": [
            {
              "id": null,
              "host": this.backendData?.upstreamRequestData?.hostArrayValue,
              "url_pattern": this.backendData?.upstreamRequestData?.endpointUrl,
              "allow": [
                ''
              ],
              ...(this.backendData?.upstreamResponseData?.objectMapValue &&{"mapping": renamingObj}),
              "group": this.backendData?.upstreamResponseData?.wrappingGroup,
              "is_collection": this.backendData?.upstreamResponseData?.isCollection,
              "encoding": this.backendData?.upstreamRequestData?.decodeAs,
              "extra_config": {
                "id": null,
                ...(this.backendData?.upstreamThrottlingData?.isCircuitBreakerActive &&{"qos/circuit-breaker": {
                  ...(this.backendData?.upstreamThrottlingData?.interval && {"interval": this.backendData?.upstreamThrottlingData?.interval}),
                  ...(this.backendData?.upstreamThrottlingData?.circuitBreakerName && {"name": this.backendData?.upstreamThrottlingData?.circuitBreakerName}),
                  ...(this.backendData?.upstreamThrottlingData?.timeout && {"timeout":  this.backendData?.upstreamThrottlingData?.timeout}),
                  ...(this.backendData?.upstreamThrottlingData?.maxError && {"max_errors": this.backendData?.upstreamThrottlingData?.maxError}),
                  ...(this.backendData?.upstreamThrottlingData?.logStatusChange && {"log_status_change": this.backendData?.upstreamThrottlingData?.logStatusChange})
                }}),
                ...((this.backendData?.upstreamResponseData?.regexConReplacerActive ||this.backendData?.upstreamPoliciesData?.isResSchValidatorActive) &&{"plugin/req-resp-modifier": {
                  "name": [
                    this.backendData?.upstreamResponseData?.regexConReplacerActive && 'content-replacer',
                    this.backendData?.upstreamPoliciesData?.isResSchValidatorActive && 'response-schema-validator'
                  ].filter(Boolean),
                  ...(this.backendData?.upstreamResponseData?.regexConReplacerActive &&{"content-replacer": this.backendData?.upstreamResponseData?.contentReplacer}),
                  ...(this.backendData?.upstreamPoliciesData?.isResSchValidatorActive &&{"response-schema-validator": {
                "schema": this.backendData?.upstreamPoliciesData?.responseSchema,
                "error": {
                  "status": this.backendData?.upstreamPoliciesData?.resSchemaValErrorStCode,
                  "body": this.backendData?.upstreamPoliciesData?.resSchemaValErrorMsg
                }
              }})
                }}),
               ...(this.backendData?.upstreamThrottlingData?.isProxyRateLimitActive &&{"qos/ratelimit/proxy": {
                  "max_rate": this.backendData?.upstreamThrottlingData?.maxRateLimit,
                  "capacity": this.backendData?.upstreamThrottlingData?.capacity,
                  "every": this.backendData?.upstreamThrottlingData?.every
                }}),
                ...(this.backendData?.upstreamResponseData?.isCachingActive &&{"qos/http-cache": {
                  "shared": this.backendData?.upstreamResponseData?.isSharedCacheActive
                }}),
                ...(this.backendData?.upstreamAuthData?.isAuthActive &&{"auth/client-credentials": {
              "endpoint_params": {
                "5t": "ji"
              },
              ...(this.backendData?.upstreamAuthData?.clientId &&{"client_id": this.backendData?.upstreamAuthData?.clientId}),
              ...(this.backendData?.upstreamAuthData?.clientSecret &&{"client_secret": this.backendData?.upstreamAuthData?.clientSecret}),
              ...(this.backendData?.upstreamAuthData?.tokenUrl &&{"token_url": this.backendData?.upstreamAuthData?.tokenUrl}),
              ...(this.backendData?.upstreamAuthData?.scopes &&{"scopes": this.backendData?.upstreamAuthData?.scopes})
            }}),
            ...(this.backendData?.upstreamAuthData?.isGoogleCloudActive &&{"auth/gcp": {
              ...(this.backendData?.upstreamAuthData?.audience &&{"audience": this.backendData?.upstreamAuthData?.audience})
            }}),
            ...(this.backendData?.isNtlmAuthActive &&{"auth/ntlm": {
              "user": "g",
              "password": "yu"
            }}),
            ...(this.backendData?.upstreamPoliciesData?.isSecPolicyActive &&{"security/policies": {
              "req": {
                "policies": this.backendData?.upstreamPoliciesData?.secReqPolicyArrayValue,
                "error": {
                  "status": this.backendData?.upstreamPoliciesData?.secReqErrorStCode,
                  "body": this.backendData?.upstreamPoliciesData?.secReqErrorBody,
                  "content_type": this.backendData?.upstreamPoliciesData?.secReqErrorContentType
                }
              },
              "resp": {
                "policies": this.backendData?.upstreamPoliciesData?.secResPolicyArrayValue,
                "error": {
                  "status": this.backendData?.upstreamPoliciesData?.secResErrorStCode,
                  "body": this.backendData?.upstreamPoliciesData?.secResErrorBody,
                  "content_type": this.backendData?.upstreamPoliciesData?.secResErrorContentType
                }
              },
              "jwt": {
                "policies": this.backendData?.upstreamPoliciesData?.jwtReqPolicyArrayValue
              },
              "debug": this.backendData?.upstreamPoliciesData?.enableDebug,
              "auto_join_policies": this.backendData?.upstreamPoliciesData?.autoJoinPolicies,
              "disable_macros": this.backendData?.upstreamPoliciesData?.disableMacros
            }}),
                ...(this.backendData?.upstreamConnectivityData?.isRestToGraphqlActive &&{"backend/graphql": {
                  ...(this.backendData?.upstreamConnectivityData?.restTographQLOpTypeForm &&{"type": this.backendData?.upstreamConnectivityData?.restTographQLOpTypeForm}),
                  ...(this.backendData?.upstreamConnectivityData?.restTographQLInlineQueryForm &&{"query": this.backendData?.upstreamConnectivityData?.restTographQLInlineQueryForm}),
                  "variables": {},
              ...(this.backendData?.upstreamConnectivityData?.restToGraphqlOpNameForm &&{"operationName": this.backendData?.upstreamConnectivityData?.restToGraphqlOpNameForm}),
              ...(this.backendData?.upstreamConnectivityData?.restTographQLQueryPathForm &&{"query_path": this.backendData?.upstreamConnectivityData?.restTographQLQueryPathForm}),
                }}),
                ...(this.backendData?.upstreamConnectivityData?.isRestToSoapActive &&{"backend/soap": {
                  "@comment": null,
                  "template": "",
              "content_type": this.backendData?.upstreamConnectivityData?.contentTypeRestToSoap,
              "debug": this.backendData?.upstreamConnectivityData?.enableDebugRestToSoap,
                  "path": this.backendData?.upstreamConnectivityData?.pathRestToSoapForm
                }}),
                ...(this.backendData?.upstreamConnectivityData?.isrestToGRPCActive &&{"backend/grpc": {
                  ...(this.backendData?.upstreamConnectivityData?.objectMapValue &&{"input_mapping": inputMapObj}),
                  ...(this.backendData?.upstreamConnectivityData?.restTogrpcResNamingConventionForm &&{"response_naming_convention": this.backendData?.upstreamConnectivityData?.restTogrpcResNamingConventionForm}),
                  ...(this.backendData?.upstreamConnectivityData?.restTogrpcEnumsAsStrgsForm &&{"output_enum_as_string": this.backendData?.upstreamConnectivityData?.restTogrpcEnumsAsStrgsForm}),
                  ...(this.backendData?.upstreamConnectivityData?.restTogrpcTimestmpAsStrgsForm &&{"output_timestamp_as_string": this.backendData?.upstreamConnectivityData?.restTogrpcTimestmpAsStrgsForm}),
                  ...(this.backendData?.upstreamConnectivityData?.restTogrpcDurationAsStrgsForm &&{"output_duration_as_string": this.backendData?.upstreamConnectivityData?.restTogrpcDurationAsStrgsForm}),
                  // "client_tls": {
                  //   "allow_insecure_connections": true
                  // },
                  ...(this.backendData?.upstreamConnectivityData?.restTogrpcRemoveUnsetValForm &&{"output_remove_unset_values": this.backendData?.upstreamConnectivityData?.restTogrpcRemoveUnsetValForm}),
                  ...(this.backendData?.upstreamConnectivityData?.restTogrpcUseReqBodyForm &&{"use_request_body": this.backendData?.upstreamConnectivityData?.restTogrpcUseReqBodyForm})
                }}),
                ...(this.backendData?.upstreamConnectivityData?.isHttpClientSettingActive &&{"backend/http/client": {
              ...(this.backendData?.upstreamConnectivityData?.connectvWebProxyForm &&{"proxy_address": this.backendData?.upstreamConnectivityData?.connectvWebProxyForm}),
              "no_redirect": this.backendData?.upstreamConnectivityData?.donotFollowRedirectsForm
            }}),
                ...(this.backendData?.upstreamRequestData?.isStaticServerActive &&{"backend/static-filesystem": {
                  "directory_listing": this.backendData?.upstreamRequestData?.directory_Listing,
                  ...(this.backendData?.upstreamRequestData?.staticUrl &&{"path": this.backendData?.upstreamRequestData?.staticUrl})
                }}),
                ...(this.backendData?.upstreamRequestData?.isBodymanipulationActive &&{"modifier/body-generator": {
              ...(this.backendData?.upstreamRequestData?.bodyEditor &&{"template": this.backendData?.upstreamRequestData?.bodyEditor}),
              ...(this.backendData?.upstreamRequestData?.contentType &&{"content_type": this.backendData?.upstreamRequestData?.contentType}),
              ...(this.backendData?.upstreamRequestData?.debug &&{"debug": this.backendData?.upstreamRequestData?.debug}),
              ...(this.backendData?.upstreamRequestData?.path &&{"path": this.backendData?.upstreamRequestData?.path})
            }}),
            ...( this.backendData?.upstreamRequestData?.isMartianActive &&{"modifier/martian": this.backendData?.upstreamRequestData?.martianDslTextarea}),
            ...(this.backendData?.upstreamResponseData?.AdvResManipulationActive &&{"modifier/jmespath": {
              "expr": this.backendData?.upstreamResponseData?.expression
            }}),
            ...(this.backendData?.upstreamResponseData?.resManiWithGoTemplActive &&{"modifier/response-body-generator": {
              ...(this.backendData?.upstreamResponseData?.contentType &&{"content_type": this.backendData?.upstreamResponseData?.contentType}),
              ...(this.backendData?.upstreamResponseData?.debug &&{"debug": this.backendData?.upstreamResponseData?.debug}),
              ...(this.backendData?.upstreamResponseData?.path &&{"path": this.backendData?.upstreamResponseData?.path}),
              ...(this.backendData?.upstreamResponseData?.template &&{"template": this.backendData?.upstreamResponseData?.template})
            }})
              },
              "target": null,
              "method": this.backendData?.upstreamRequestData?.method,
              "deny": [
                ''
              ],
              "@comment": null,
              "@test_with": null,
              "disable_host_sanitize": true
            }
          ],
          "extra_config": {
            "id": null,
            ...(this.openApiData?.isDocumentationActive && {"documentation/openapi": {
              ...(this.openApiData?.summary &&{"summary": this.openApiData?.summary}),
              ...(this.openApiData?.description &&{"description": this.openApiData?.description}),
              ...(this.openApiData?.tagsArrayValue.length!=0 &&{"tags": this.openApiData?.tagsArrayValue})
            }}),
            ...(this.responseData?.isAdvanceResponseActive &&{"modifier/jmespath": {
              // "@comment": null,
              ...(this.responseData?.expression &&{"expr": this.responseData?.expression})
            }}),
            // "security/policies": {
            //   "req": {
            //     "policies": this.policiesData?.secReqPolicyArrayValue,
            //     "error": {
            //       "body": this.policiesData?.secReqErrorBody,
            //       "status": this.policiesData?.secReqErrorStCode
            //     }
            //   }
            // },
            ...(this.policiesData?.isSpFilterActive &&{"security/policies": {
          "req": {
                "policies": this.policiesData?.secReqPolicyArrayValue,
                "error": {
                  "body": this.policiesData?.secReqErrorBody,
                  "status": this.policiesData?.secReqErrorStCode
                }
              },
          "resp": {
            "policies": this.policiesData?.secResPolicyArrayValue,
            "error": {
              "status": this.policiesData?.secResErrorStCode,
              "body": this.policiesData?.secResErrorBody,
              "content_type": this.policiesData?.secResErrorContentType
            }
          },
          "jwt": {
            "policies": this.policiesData?.jwtReqPolicyArrayValue
          },
          "debug": this.policiesData?.enableDebug,
          "auto_join_policies": this.policiesData?.autoJoinPolicies,
          "disable_macros": this.policiesData?.disableMacros
        }}),
            ...(this.throttlingData?.isEndPointRateLimitEnabledActive &&{"qos/ratelimit/router": {
              ...(this.throttlingData?.rateLimit &&{"max_rate": this.throttlingData?.rateLimit}),
              ...(this.throttlingData?.defaultUserQuota &&{"client_max_rate": this.throttlingData?.defaultUserQuota}),
              "strategy": "ip",
              ...(this.throttlingData?.capacity &&{"capacity": this.throttlingData?.capacity}),
              ...(this.throttlingData?.every &&{"every": this.throttlingData?.every}),
              ...(this.throttlingData?.clientCapacity &&{"client_capacity": this.throttlingData?.clientCapacity})
            }}),
            ...(this.throttlingData?.isRedisRateLimitEnabledActive &&{"plugin/http-server": {
          "name": [
            this.throttlingData?.isRedisRateLimitEnabledActive && "redis-ratelimit"
          ].filter(Boolean),
          ...(this.throttlingData?.isRedisRateLimitEnabledActive &&{"redis-ratelimit": {
            ...(this.throttlingData?.address &&{"Host": this.throttlingData?.address}),
            ...(this.throttlingData?.tokenizer &&{"Tokenizer": this.throttlingData?.tokenizer}),
            ...(this.throttlingData?.burst &&{"Burst": this.throttlingData?.burst}),
            ...(this.throttlingData?.rate &&{"Rate": this.throttlingData?.rate}),
            ...(this.throttlingData?.periods &&{"Period": this.throttlingData?.periods}),
            ...(this.throttlingData?.tokenizerField &&{"TokenizerField": this.throttlingData?.tokenizerField})
          }})
        }}),
            "proxy": {
              "sequential": this.connectivityData?.isSequencialActive,
              ...(this.responseData?.isStaticResponseActive &&{"static": {
                "data": this.responseData?.response,
                "strategy": this.responseData?.strategy
              }})
            },
            ...((this.responseData?.regexConReplacerActive || this.policiesData?.isResponseSchValidatorFiltrActive || this.throttlingData?.isIpFilterEnabledActive) &&{"plugin/req-resp-modifier": {
              "name": [
                this.responseData?.regexConReplacerActive && "content-replacer",
                this.policiesData?.isResponseSchValidatorFiltrActive && "response-schema-validator",
                this.throttlingData?.isIpFilterEnabledActive && "ip-filter"
              ].filter(Boolean),
              ...(this.responseData?.regexConReplacerActive &&{"content-replacer": this.responseData?.contentReplacer}),
              ...(this.policiesData?.isResponseSchValidatorFiltrActive && {"response-schema-validator": {
            "schema": this.policiesData?.resJSONSchema,
            "error": {
              "status": this.policiesData?.resSchemaValErrorStCode,
              "body": this.policiesData?.resSchemaValErrorMsg
            }
          }}),
          ...(this.throttlingData?.isIpFilterEnabledActive&& {"ip-filter": {
            ...(this.throttlingData?.allowModeActive &&{"allow": this.throttlingData?.allowModeActive}),
            ...(this.throttlingData?.clientIPHeadersArrayValue.length!=0 &&{"client_ip_headers": this.throttlingData?.clientIPHeadersArrayValue}),
            ...(this.throttlingData?.cidrArrayValue.length!=0 &&{"CIDR": this.throttlingData?.cidrArrayValue}),
            ...(this.throttlingData?.trustedProxiesArrayValue.length!=0 &&{"trusted_proxies": this.throttlingData?.trustedProxiesArrayValue})
          }})
            }}),
            ...(this.responseData?.isAdvanceResponseGoActive &&{"modifier/response-body-generator": {
          "template": this.responseData?.bodyEditor,
          "content_type": this.responseData?.contentType,
          "debug": this.responseData?.debug
        }}),
        ...(this.policiesData?.isRequestSchValidatorFiltrActive &&{"validation/json-schema": this.policiesData?.reqJSONSchema}),
            "@comment": null,
            ...(this.authPageData?.isBasicAuthActive &&{"auth/basic": {
              "@comment": null,
              "htpasswd_path": null
            }}),
            "validation/cel": [
              {
                "id": null,
                "check_expr": null
              }
            ],
            ...(this.authPageData?.isTokenValidationActive &&{"auth/validator": {
              ...(this.authPageData?.algorithm &&{"alg": this.authPageData?.algorithm}),
              ...(this.authPageData?.audienceArrayValue.length!=0 &&{"audience": this.authPageData?.audienceArrayValue}),
              ...(this.authPageData?.rolesKey &&{"roles_key": this.authPageData?.rolesKey}),
              ...(this.authPageData?.rolesArrayValue.length!=0 &&{"roles": this.authPageData?.rolesArrayValue}),
              ...(this.authPageData?.jwkUri &&{"jwk_url": this.authPageData?.jwkUri}),
              ...(this.authPageData?.issuer &&{"issuer": this.authPageData?.issuer}),
              "jwk_local_path": null,
              ...(this.authPageData?.isDisableJWKSecActive &&{"disable_jwk_security": this.authPageData?.isDisableJWKSecActive})
            }}),
            ...(this.authPageData?.isTokenSigningActive &&{"auth/signer": {
              ...(this.authPageData?.tokenSignAlgorithm &&{"alg": this.authPageData?.tokenSignAlgorithm}),
              ...(this.authPageData?.keyId &&{"kid": this.authPageData?.keyId}),
              ...(this.authPageData?.keysToSignArrayValue.length!=0 &&{"keys_to_sign": this.authPageData?.keysToSignArrayValue}),
              // "jwk_local_path": null,
              // "disable_jwk_security": true
            }}),
            "auth/api-keys": {
              "roles": [
                ''
              ]
            },
            ...(this.connectivityData?.isWebSocketActive &&{"websocket": {
              ...(this.connectivityData?.inputHeaderArray.length!=0&&{"input_headers": this.connectivityData?.inputHeaderArray}),
              ...(this.connectivityData?.connectEvent &&{"connect_event": this.connectivityData?.connectEvent}),
              ...(this.connectivityData?.disconnectEvent &&{"disconnect_event": this.connectivityData?.disconnectEvent}),
              ...(this.connectivityData?.readBufferSize &&{"read_buffer_size": this.connectivityData?.readBufferSize}),
              ...(this.connectivityData?.writeBufferSize &&{"write_buffer_size": this.connectivityData?.writeBufferSize}),
              ...(this.connectivityData?.messageBufferSize &&{"message_buffer_size": this.connectivityData?.messageBufferSize}),
              ...(this.connectivityData?.maxWriteBufferSize &&{"max_message_size": this.connectivityData?.maxWriteBufferSize}),
              ...(this.connectivityData?.writeWait &&{"write_wait": this.connectivityData?.writeWait}),
              ...(this.connectivityData?.pongWait &&{"pong_wait": this.connectivityData?.pongWait}),
              // "ping_period": null,
              ...(this.connectivityData?.maxRetries &&{"max_retries": this.connectivityData?.maxRetries}),
              ...(this.connectivityData?.backoffStrategy &&{"backoff_strategy": this.connectivityData?.backoffStrategy}),
              // "enable_direct_communication": true,
              ...(this.connectivityData?.returnErr &&{"return_error_details": this.connectivityData?.returnErr}),
              // "timeout": null
            }})
          },
          "output_encoding": this.endPointData?.selectedOutput,
          "@test_with": null,
          "input_headers": this.parameterForwardingData?.parameterHeaderArrays,
          ...(this.connectivityData?.concurrentCalls &&{"concurrent_calls": this.connectivityData?.concurrentCalls}),
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
        this._snackBar.open(res.message, 'OK', {
          duration: 5000
        });

        this.router.navigate(['dashboard'])
      }
    })
    console.log(resultantFormData);
    
    
  }
  updateEndpoint(){
    const renamingObj = this.backendData?.upstreamResponseData?.objectMapValue?.reduce((acc:any, [key, value]:any) => {
      acc[key] = value;
      return acc;
    }, {});
    const inputMapObj = this.backendData?.upstreamConnectivityData?.objectMapValue?.reduce((acc:any, [key, value]:any) => {
      acc[key] = value;
      return acc;
    }, {});
    const resultantFormData={
      "id": this.receivedData?.id,
      "@comment": null,
      "endpoint": this.endPointData?.endPointUri,
      "backend": [
        {
          "id": this.receivedData?.backend?.[0]?.id,
          "host": this.backendData?.upstreamRequestData?.hostArrayValue,
              "url_pattern": this.backendData?.upstreamRequestData?.endpointUrl,
          "allow": [
            ''
          ],
          ...(this.backendData?.upstreamResponseData?.objectMapValue &&{"mapping": renamingObj}),
          "group": this.backendData?.upstreamResponseData?.wrappingGroup,
              "is_collection": this.backendData?.upstreamResponseData?.isCollection,
              "encoding": this.backendData?.upstreamRequestData?.decodeAs,
              "extra_config": {
                "id": this.receivedData?.backend?.[0]?.extra_config?.id,
                ...(this.backendData?.upstreamThrottlingData?.isCircuitBreakerActive &&{"qos/circuit-breaker": {
                  ...(this.backendData?.upstreamThrottlingData?.interval && {"interval": this.backendData?.upstreamThrottlingData?.interval}),
                  ...(this.backendData?.upstreamThrottlingData?.circuitBreakerName && {"name": this.backendData?.upstreamThrottlingData?.circuitBreakerName}),
                  ...(this.backendData?.upstreamThrottlingData?.timeout && {"timeout":  this.backendData?.upstreamThrottlingData?.timeout}),
                  ...(this.backendData?.upstreamThrottlingData?.maxError && {"max_errors": this.backendData?.upstreamThrottlingData?.maxError}),
                  ...(this.backendData?.upstreamThrottlingData?.logStatusChange && {"log_status_change": this.backendData?.upstreamThrottlingData?.logStatusChange})
                }}),
                ...((this.backendData?.upstreamResponseData?.regexConReplacerActive || this.backendData?.upstreamPoliciesData?.isResSchValidatorActive) &&{"plugin/req-resp-modifier": {
                  "name": [
                    this.backendData?.upstreamResponseData?.regexConReplacerActive && 'content-replacer',
                    this.backendData?.upstreamPoliciesData?.isResSchValidatorActive && 'response-schema-validator'
                  ].filter(Boolean),
                  ...(this.backendData?.upstreamResponseData?.regexConReplacerActive &&{"content-replacer": this.backendData?.upstreamResponseData?.contentReplacer}),
                  ...(this.backendData?.upstreamPoliciesData?.isResSchValidatorActive &&{"response-schema-validator": {
                "schema": this.backendData?.upstreamPoliciesData?.responseSchema,
                "error": {
                  "status": this.backendData?.upstreamPoliciesData?.resSchemaValErrorStCode,
                  "body": this.backendData?.upstreamPoliciesData?.resSchemaValErrorMsg
                }
              }})
                }}),
               ...(this.backendData?.upstreamThrottlingData?.isProxyRateLimitActive &&{"qos/ratelimit/proxy": {
                  "max_rate": this.backendData?.upstreamThrottlingData?.maxRateLimit,
                  "capacity": this.backendData?.upstreamThrottlingData?.capacity,
                  "every": this.backendData?.upstreamThrottlingData?.every
                }}),
                ...(this.backendData?.upstreamResponseData?.isCachingActive &&{"qos/http-cache": {
                  "shared": this.backendData?.upstreamResponseData?.isSharedCacheActive
                }}),
                ...(this.backendData?.upstreamAuthData?.isAuthActive &&{"auth/client-credentials": {
              "endpoint_params": {
                "5t": "ji"
              },
              ...(this.backendData?.upstreamAuthData?.clientId &&{"client_id": this.backendData?.upstreamAuthData?.clientId}),
              ...(this.backendData?.upstreamAuthData?.clientSecret &&{"client_secret": this.backendData?.upstreamAuthData?.clientSecret}),
              ...(this.backendData?.upstreamAuthData?.tokenUrl &&{"token_url": this.backendData?.upstreamAuthData?.tokenUrl}),
              ...(this.backendData?.upstreamAuthData?.scopes &&{"scopes": this.backendData?.upstreamAuthData?.scopes})
            }}),
            ...(this.backendData?.upstreamAuthData?.isGoogleCloudActive &&{"auth/gcp": {
              ...(this.backendData?.upstreamAuthData?.audience &&{"audience": this.backendData?.upstreamAuthData?.audience})
            }}),
            ...(this.backendData?.upstreamAuthData?.isNtlmAuthActive &&{"auth/ntlm": {
              "user": "g",
              "password": "yu"
            }}),
            ...(this.backendData?.upstreamPoliciesData?.isSecPolicyActive &&{"security/policies": {
              "req": {
                "policies": this.backendData?.upstreamPoliciesData?.secReqPolicyArrayValue,
                "error": {
                  "status": this.backendData?.upstreamPoliciesData?.secReqErrorStCode,
                  "body": this.backendData?.upstreamPoliciesData?.secReqErrorBody,
                  "content_type": this.backendData?.upstreamPoliciesData?.secReqErrorContentType
                }
              },
              "resp": {
                "policies": this.backendData?.upstreamPoliciesData?.secResPolicyArrayValue,
                "error": {
                  "status": this.backendData?.upstreamPoliciesData?.secResErrorStCode,
                  "body": this.backendData?.upstreamPoliciesData?.secResErrorBody,
                  "content_type": this.backendData?.upstreamPoliciesData?.secResErrorContentType
                }
              },
              "jwt": {
                "policies": this.backendData?.upstreamPoliciesData?.jwtReqPolicyArrayValue
              },
              "debug": this.backendData?.upstreamPoliciesData?.enableDebug,
              "auto_join_policies": this.backendData?.upstreamPoliciesData?.autoJoinPolicies,
              "disable_macros": this.backendData?.upstreamPoliciesData?.disableMacros
            }}),
                ...(this.backendData?.upstreamConnectivityData?.isRestToGraphqlActive &&{"backend/graphql": {
                  ...(this.backendData?.upstreamConnectivityData?.restTographQLOpTypeForm &&{"type": this.backendData?.upstreamConnectivityData?.restTographQLOpTypeForm}),
                  ...(this.backendData?.upstreamConnectivityData?.restTographQLInlineQueryForm &&{"query": this.backendData?.upstreamConnectivityData?.restTographQLInlineQueryForm}),
                  "variables": {},
              ...(this.backendData?.upstreamConnectivityData?.restToGraphqlOpNameForm &&{"operationName": this.backendData?.upstreamConnectivityData?.restToGraphqlOpNameForm}),
              ...(this.backendData?.upstreamConnectivityData?.restTographQLQueryPathForm &&{"query_path": this.backendData?.upstreamConnectivityData?.restTographQLQueryPathForm}),
                }}),
                ...(this.backendData?.upstreamConnectivityData?.isRestToSoapActive &&{"backend/soap": {
                  "@comment": null,
                  "template": "",
              "content_type": this.backendData?.upstreamConnectivityData?.contentTypeRestToSoap,
              "debug": this.backendData?.upstreamConnectivityData?.enableDebugRestToSoap,
                  "path": this.backendData?.upstreamConnectivityData?.pathRestToSoapForm
                }}),
                ...(this.backendData?.upstreamConnectivityData?.isrestToGRPCActive &&{"backend/grpc": {
                  ...(this.backendData?.upstreamConnectivityData?.objectMapValue &&{"input_mapping": inputMapObj}),
                  ...(this.backendData?.upstreamConnectivityData?.restTogrpcResNamingConventionForm &&{"response_naming_convention": this.backendData?.upstreamConnectivityData?.restTogrpcResNamingConventionForm}),
                  ...(this.backendData?.upstreamConnectivityData?.restTogrpcEnumsAsStrgsForm &&{"output_enum_as_string": this.backendData?.upstreamConnectivityData?.restTogrpcEnumsAsStrgsForm}),
                  ...(this.backendData?.upstreamConnectivityData?.restTogrpcTimestmpAsStrgsForm &&{"output_timestamp_as_string": this.backendData?.upstreamConnectivityData?.restTogrpcTimestmpAsStrgsForm}),
                  ...(this.backendData?.upstreamConnectivityData?.restTogrpcDurationAsStrgsForm &&{"output_duration_as_string": this.backendData?.upstreamConnectivityData?.restTogrpcDurationAsStrgsForm}),
                  // "client_tls": {
                  //   "allow_insecure_connections": true
                  // },
                  ...(this.backendData?.upstreamConnectivityData?.restTogrpcRemoveUnsetValForm &&{"output_remove_unset_values": this.backendData?.upstreamConnectivityData?.restTogrpcRemoveUnsetValForm}),
                  ...(this.backendData?.upstreamConnectivityData?.restTogrpcUseReqBodyForm &&{"use_request_body": this.backendData?.upstreamConnectivityData?.restTogrpcUseReqBodyForm})
                }}),
                ...(this.backendData?.upstreamConnectivityData?.isHttpClientSettingActive &&{"backend/http/client": {
              ...(this.backendData?.upstreamConnectivityData?.connectvWebProxyForm &&{"proxy_address": this.backendData?.upstreamConnectivityData?.connectvWebProxyForm}),
              "no_redirect": this.backendData?.upstreamConnectivityData?.donotFollowRedirectsForm
            }}),
                ...(this.backendData?.upstreamRequestData?.isStaticServerActive &&{"backend/static-filesystem": {
                  "directory_listing": this.backendData?.upstreamRequestData?.directory_Listing,
                  ...(this.backendData?.upstreamRequestData?.staticUrl &&{"path": this.backendData?.upstreamRequestData?.staticUrl})
                }}),
                ...(this.backendData?.upstreamRequestData?.isBodymanipulationActive &&{"modifier/body-generator": {
              ...(this.backendData?.upstreamRequestData?.bodyEditor &&{"template": this.backendData?.upstreamRequestData?.bodyEditor}),
              ...(this.backendData?.upstreamRequestData?.contentType &&{"content_type": this.backendData?.upstreamRequestData?.contentType}),
              ...(this.backendData?.upstreamRequestData?.debug &&{"debug": this.backendData?.upstreamRequestData?.debug}),
              ...(this.backendData?.upstreamRequestData?.path &&{"path": this.backendData?.upstreamRequestData?.path})
            }}),
            ...( this.backendData?.upstreamRequestData?.isMartianActive &&{"modifier/martian": this.backendData?.upstreamRequestData?.martianDslTextarea}),
            ...(this.backendData?.upstreamResponseData?.AdvResManipulationActive &&{"modifier/jmespath": {
              "expr": this.backendData?.upstreamResponseData?.expression
            }}),
            ...(this.backendData?.upstreamResponseData?.resManiWithGoTemplActive &&{"modifier/response-body-generator": {
              ...(this.backendData?.upstreamResponseData?.contentType &&{"content_type": this.backendData?.upstreamResponseData?.contentType}),
              ...(this.backendData?.upstreamResponseData?.debug &&{"debug": this.backendData?.upstreamResponseData?.debug}),
              ...(this.backendData?.upstreamResponseData?.path &&{"path": this.backendData?.upstreamResponseData?.path}),
              ...(this.backendData?.upstreamResponseData?.template &&{"template": this.backendData?.upstreamResponseData?.template})
            }})
              },
          "target": null,
          "method": this.backendData?.upstreamRequestData?.method,
          "deny": [
            ''
          ],
          "@comment": null,
          "@test_with": null,
          "disable_host_sanitize": true
        }
      ],
      "extra_config": {
        "id": this.receivedData?.extra_config?.id,
        ...(this.openApiData?.isDocumentationActive && {"documentation/openapi": {
          ...(this.openApiData?.summary &&{"summary": this.openApiData?.summary}),
          ...(this.openApiData?.description &&{"description": this.openApiData?.description}),
          ...(this.openApiData?.tagsArrayValue.length!=0 &&{"tags": this.openApiData?.tagsArrayValue})
        }}),
        ...(this.responseData?.isAdvanceResponseActive &&{"modifier/jmespath": {
          // "@comment": null,
          ...(this.responseData?.expression &&{"expr": this.responseData?.expression})
        }}),
        ...(this.policiesData?.isSpFilterActive &&{"security/policies": {
          "req": {
                "policies": this.policiesData?.secReqPolicyArrayValue,
                "error": {
                  "body": this.policiesData?.secReqErrorBody,
                  "status": this.policiesData?.secReqErrorStCode
                }
              },
          "resp": {
            "policies": this.policiesData?.secResPolicyArrayValue,
            "error": {
              "status": this.policiesData?.secResErrorStCode,
              "body": this.policiesData?.secResErrorBody,
              "content_type": this.policiesData?.secResErrorContentType
            }
          },
          "jwt": {
            "policies": this.policiesData?.jwtReqPolicyArrayValue
          },
          "debug": this.policiesData?.enableDebug,
          "auto_join_policies": this.policiesData?.autoJoinPolicies,
          "disable_macros": this.policiesData?.disableMacros
        }}),
            ...(this.throttlingData?.isEndPointRateLimitEnabledActive &&{"qos/ratelimit/router": {
              ...(this.throttlingData?.rateLimit &&{"max_rate": this.throttlingData?.rateLimit}),
              ...(this.throttlingData?.defaultUserQuota &&{"client_max_rate": this.throttlingData?.defaultUserQuota}),
              "strategy": "ip",
              ...(this.throttlingData?.capacity &&{"capacity": this.throttlingData?.capacity}),
              ...(this.throttlingData?.every &&{"every": this.throttlingData?.every}),
              ...(this.throttlingData?.clientCapacity &&{"client_capacity": this.throttlingData?.clientCapacity})
            }}),
            ...(this.throttlingData?.isRedisRateLimitEnabledActive &&{"plugin/http-server": {
          "name": [
            this.throttlingData?.isRedisRateLimitEnabledActive && "redis-ratelimit"
          ].filter(Boolean),
          ...(this.throttlingData?.isRedisRateLimitEnabledActive &&{"redis-ratelimit": {
            ...(this.throttlingData?.address &&{"Host": this.throttlingData?.address}),
            ...(this.throttlingData?.tokenizer &&{"Tokenizer": this.throttlingData?.tokenizer}),
            ...(this.throttlingData?.burst &&{"Burst": this.throttlingData?.burst}),
            ...(this.throttlingData?.rate &&{"Rate": this.throttlingData?.rate}),
            ...(this.throttlingData?.periods &&{"Period": this.throttlingData?.periods}),
            ...(this.throttlingData?.tokenizerField &&{"TokenizerField": this.throttlingData?.tokenizerField})
          }})
        }}),
       "proxy": {
              "sequential": this.connectivityData?.isSequencialActive,
              ...(this.responseData?.isStaticResponseActive &&{"static": {
                "data": this.responseData?.response,
                "strategy": this.responseData?.strategy
              }})
            },
            ...((this.responseData?.regexConReplacerActive || this.policiesData?.isResponseSchValidatorFiltrActive || this.throttlingData?.isIpFilterEnabledActive) &&{"plugin/req-resp-modifier": {
              "name": [
                this.responseData?.regexConReplacerActive && "content-replacer",
                this.policiesData?.isResponseSchValidatorFiltrActive && "response-schema-validator",
                this.throttlingData?.isIpFilterEnabledActive && "ip-filter"
              ].filter(Boolean),
              ...(this.responseData?.regexConReplacerActive &&{"content-replacer": this.responseData?.contentReplacer}),
              ...(this.policiesData?.isResponseSchValidatorFiltrActive && {"response-schema-validator": {
            "schema": this.policiesData?.resJSONSchema,
            "error": {
              "status": this.policiesData?.resSchemaValErrorStCode,
              "body": this.policiesData?.resSchemaValErrorMsg
            }
          }}),
          ...(this.throttlingData?.isIpFilterEnabledActive&& {"ip-filter": {
            ...(this.throttlingData?.allowModeActive &&{"allow": this.throttlingData?.allowModeActive}),
            ...(this.throttlingData?.clientIPHeadersArrayValue.length!=0 &&{"client_ip_headers": this.throttlingData?.clientIPHeadersArrayValue}),
            ...(this.throttlingData?.cidrArrayValue.length!=0 &&{"CIDR": this.throttlingData?.cidrArrayValue}),
            ...(this.throttlingData?.trustedProxiesArrayValue.length!=0 &&{"trusted_proxies": this.throttlingData?.trustedProxiesArrayValue})
          }})
            }}),
            ...(this.responseData?.isAdvanceResponseGoActive &&{"modifier/response-body-generator": {
          "template": this.responseData?.bodyEditor,
          "content_type": this.responseData?.contentType,
          "debug": this.responseData?.debug
        }}),
        ...(this.policiesData?.isRequestSchValidatorFiltrActive &&{"validation/json-schema": this.policiesData?.reqJSONSchema}),
        "@comment": null,
        ...(this.authPageData?.isBasicAuthActive &&{"auth/basic": {
          "@comment": null,
          "htpasswd_path": null
        }}),
        "validation/cel": [
          {
            "id": this.receivedData?.extra_config?.["validation/cel"]?.[0]?.id,
            "check_expr": null
          }
        ],
        ...(this.authPageData?.isTokenValidationActive &&{"auth/validator": {
          ...(this.authPageData?.algorithm &&{"alg": this.authPageData?.algorithm}),
          ...(this.authPageData?.audienceArrayValue.length!=0 &&{"audience": this.authPageData?.audienceArrayValue}),
          ...(this.authPageData?.rolesKey &&{"roles_key": this.authPageData?.rolesKey}),
          ...(this.authPageData?.rolesArrayValue.length!=0 &&{"roles": this.authPageData?.rolesArrayValue}),
          ...(this.authPageData?.jwkUri &&{"jwk_url": this.authPageData?.jwkUri}),
          ...(this.authPageData?.issuer &&{"issuer": this.authPageData?.issuer}),
          "jwk_local_path": null,
          ...(this.authPageData?.isDisableJWKSecActive &&{"disable_jwk_security": this.authPageData?.isDisableJWKSecActive})
        }}),
        ...(this.authPageData?.isTokenSigningActive &&{"auth/signer": {
          ...(this.authPageData?.tokenSignAlgorithm &&{"alg": this.authPageData?.tokenSignAlgorithm}),
          ...(this.authPageData?.keyId &&{"kid": this.authPageData?.keyId}),
          ...(this.authPageData?.keysToSignArrayValue.length!=0 &&{"keys_to_sign": this.authPageData?.keysToSignArrayValue}),
          // "jwk_local_path": null,
          // "disable_jwk_security": true
        }}),
        "auth/api-keys": {
          "roles": [
            ''
          ]
        },
        ...(this.connectivityData?.isWebSocketActive &&{"websocket": {
          ...(this.connectivityData?.inputHeaderArray.length!=0&&{"input_headers": this.connectivityData?.inputHeaderArray}),
          ...(this.connectivityData?.connectEvent &&{"connect_event": this.connectivityData?.connectEvent}),
          ...(this.connectivityData?.disconnectEvent &&{"disconnect_event": this.connectivityData?.disconnectEvent}),
          ...(this.connectivityData?.readBufferSize &&{"read_buffer_size": this.connectivityData?.readBufferSize}),
          ...(this.connectivityData?.writeBufferSize &&{"write_buffer_size": this.connectivityData?.writeBufferSize}),
          ...(this.connectivityData?.messageBufferSize &&{"message_buffer_size": this.connectivityData?.messageBufferSize}),
          ...(this.connectivityData?.maxWriteBufferSize &&{"max_message_size": this.connectivityData?.maxWriteBufferSize}),
          ...(this.connectivityData?.writeWait &&{"write_wait": this.connectivityData?.writeWait}),
          ...(this.connectivityData?.pongWait &&{"pong_wait": this.connectivityData?.pongWait}),
          // "ping_period": null,
          ...(this.connectivityData?.maxRetries &&{"max_retries": this.connectivityData?.maxRetries}),
          ...(this.connectivityData?.backoffStrategy &&{"backoff_strategy": this.connectivityData?.backoffStrategy}),
          // "enable_direct_communication": true,
          ...(this.connectivityData?.returnErr &&{"return_error_details": this.connectivityData?.returnErr}),
          // "timeout": null
        }})
      },
      "output_encoding": this.endPointData?.selectedOutput,
      "@test_with": null,
      "input_headers": this.parameterForwardingData?.parameterHeaderArrays,
       ...(this.connectivityData?.concurrentCalls &&{"concurrent_calls": this.connectivityData?.concurrentCalls}),
      "method": this.endPointData?.selectedMethod,
      "input_query_strings": this.parameterForwardingData?.parameterArrays,
      "timeout":this.throttlingData?.timeout,
      "cache_ttl":this.throttlingData?.cacheTtl
    }

    this.viewapiPageService.updateEndPoint(this.receivedData.id,resultantFormData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this._snackBar.open(res.message, 'OK', {
          duration: 5000
        });
        this.router.navigate(['dashboard'])
      }
    })
  }

}
