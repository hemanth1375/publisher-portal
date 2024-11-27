import { AfterViewInit, Component, ComponentFactoryResolver, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ViewapiPageService } from '../services/viewapi-page.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-backends-upstream',
  templateUrl: './backends-upstream.component.html',
  styleUrl: './backends-upstream.component.css'
})
export class BackendsUpstreamComponent {
  // trail
  // @ViewChild('childContainer', { read: ViewContainerRef, static: true })
  // childContainer!: ViewContainerRef;

  // Provide a method to get the ViewContainerRef

  // trail end
  // child logic related
  @ViewChild('childContainer', { read: ViewContainerRef, static: true })
  childContainer!: ViewContainerRef;
  childData: Array<any> = [];

  getChildContainer(): ViewContainerRef {
    return this.childContainer;
  }

  //isolated logic

  upstreamAuthData: any;
  upstreamPoliciesData: any;
  upstreamRequestData: any;
  upstreamThrottlingData: any;
  upstreamResponseData: any;
  upstreamConnectivityData: any;
  selectedItem: any;

  @Input() formData: any
  @Output() backendUpStreamSubmitted = new EventEmitter<any>();


  onFormChange(form: any, updatedData: any) {
    switch (form) {
      case 'upstreamRequest': this.upstreamRequestData = updatedData; break;
      case 'upstreamResponse': this.upstreamResponseData = updatedData; break;
      case 'upstreamAuth': this.upstreamAuthData = updatedData; break;
      case 'upstreamThrottling': this.upstreamThrottlingData = updatedData; break;
      case 'upstreamPolicies': this.upstreamPoliciesData = updatedData; break;
      case 'upstreamConnectivity': this.upstreamConnectivityData = updatedData; break;
    }
  }

  addChild() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BackendsUpstreamComponent);
    const componentRef = this.childContainer.createComponent(componentFactory);
    // componentRef.instance.onFormSubmit
    componentRef.instance.backendUpStreamSubmitted.subscribe((data: any) => {
      console.log(data);
      this.childData.push(data);
      console.log(this.childData);

    });
  }

  // child end
  isIpFilterEnabled = false; // Initially false

  onToggleChange(event: any) {
    this.isIpFilterEnabled = event.checked; // Capture toggle state
  }


  items: any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private dataService: ViewapiPageService, private router: Router, private _snackBar: MatSnackBar) {
    this.items = [
      { name: 'Request' },
      { name: 'Response Manipulation' },
      { name: 'Throttling' },
      { name: 'Connectivity' },
      { name: 'Autentication' },
      { name: 'Policies' }
    ];
  }

  selectItem(item: any) {
    console.log(item);
    this.selectedItem = item;
  }

  isUpdate: boolean = false;

  ngOnInit() {
    this.selectedItem = this.items[0];
    console.log(this.formData);
    if (this.formData?.backend?.[0].id) {
      this.isUpdate = true;
    } else {
      this.isUpdate = false;
    }
    this.upstreamRequestData = this.formData;
    this.upstreamAuthData = this.formData;
    this.upstreamPoliciesData = this.formData;
    this.upstreamResponseData = this.formData;
    this.upstreamThrottlingData = this.formData;
    this.upstreamConnectivityData = this.formData;


  }

  onFormSubmit(formData: any) {
    console.log("Form data received from child:", formData);
    // Handle the form data, e.g., submit it to a service or API.
  }

  entireFormData: any = {
    request: null,
    throttling: null,
    responseManipulation: null,
    connectivity: null,
    auth: null,
    policies: null
  };

  collectData(formName: string, data: any) {
    this.entireFormData[formName] = data;
    console.log("Form data collected:", this.entireFormData);
  }


  submitForm() {
    // console.log(this.entireFormData);
    // this.childData.push(this.entireFormData)
    console.log(this.formData);
    const obj = {
      'upstreamAuthData': this.upstreamAuthData,
      'upstreamPoliciesData': this.upstreamPoliciesData,
      'upstreamRequestData': this.upstreamRequestData,
      'upstreamThrottlingData': this.upstreamThrottlingData,
      'upstreamResponseData': this.upstreamResponseData,
      'upstreamConnectivityData': this.upstreamConnectivityData
    }
    const renamingObj = this.upstreamResponseData?.objectMapValue?.reduce((acc: any, [key, value]: any) => {
      acc[key] = value;
      return acc;
    }, {});
    const inputMapObj = this.upstreamConnectivityData?.objectMapValue?.reduce((acc: any, [key, value]: any) => {
      acc[key] = value;
      return acc;
    }, {});

    console.log(obj);
    console.log(this.formData?.backend?.[0]?.id);
    console.log(this.formData?.backend?.[0]?.extra_config?.id);


    const body = {
      "id": this.formData?.backend?.[0]?.id ? this.formData?.backend?.[0]?.id : null,
      "host": this.upstreamRequestData?.hostArrayValue,
      "url_pattern": this.upstreamRequestData?.endpointUrl,
      "allow": [
        ""
      ],
      "mapping": renamingObj,
      "group": this.upstreamResponseData?.wrappingGroup,
      "is_collection": this.upstreamResponseData?.isCollection,
      "encoding": this.upstreamRequestData?.decodeAs,
      "extra_config": {
        "id": this.formData?.backend?.[0]?.extra_config?.id ? this.formData?.backend?.[0]?.extra_config?.id : null,
        // "qos/circuit-breaker": {
        //   "interval": this.upstreamAuthData?.interval,
        //   "name": this.upstreamAuthData?.circuitBreakerName,
        //   "timeout":  this.upstreamAuthData?.timeout,
        //   "max_errors": this.upstreamAuthData?.maxError,
        //   "log_status_change": this.upstreamAuthData?.logStatusChange
        // },
        // "plugin/req-resp-modifier": {
        //   "name": [
        //     "content-replacer"
        //   ],
        //   "content-replacer": this.upstreamResponseData?.contentReplacer
        // },
        // "qos/ratelimit/proxy": {
        //   "max_rate": this.upstreamAuthData?.maxRateLimit,
        //   "capacity": this.upstreamAuthData?.capacity
        // },
        // "qos/http-cache": {
        //   "shared": this.upstreamResponseData?.isSharedCacheActive
        // },
        ...(this.upstreamThrottlingData?.isCircuitBreakerActive && {
          "qos/circuit-breaker": {
            ...(this.upstreamThrottlingData?.interval && { "interval": this.upstreamThrottlingData?.interval }),
            ...(this.upstreamThrottlingData?.circuitBreakerName && { "name": this.upstreamThrottlingData?.circuitBreakerName }),
            ...(this.upstreamThrottlingData?.timeout && { "timeout": this.upstreamThrottlingData?.timeout }),
            ...(this.upstreamThrottlingData?.maxError && { "max_errors": this.upstreamThrottlingData?.maxError }),
            ...(this.upstreamThrottlingData?.logStatusChange && { "log_status_change": this.upstreamThrottlingData?.logStatusChange })
          }
        }),
        ...((this.upstreamResponseData?.regexConReplacerActive || this.upstreamPoliciesData?.isResSchValidatorActive) && {
          "plugin/req-resp-modifier": {
            "name": [
              this.upstreamResponseData?.regexConReplacerActive && 'content-replacer',
              this.upstreamPoliciesData?.isResSchValidatorActive && 'response-schema-validator'
            ].filter(Boolean),
            ...(this.upstreamResponseData?.regexConReplacerActive && { "content-replacer": this.upstreamResponseData?.contentReplacer }),
            ...(this.upstreamPoliciesData?.isResSchValidatorActive && {
              "response-schema-validator": {
                "schema": this.upstreamPoliciesData?.responseSchema,
                "error": {
                  "status": this.upstreamPoliciesData?.resSchemaValErrorStCode,
                  "body": this.upstreamPoliciesData?.resSchemaValErrorMsg
                }
              }
            })
          }
        }),
        ...(this.upstreamThrottlingData?.isProxyRateLimitActive && {
          "qos/ratelimit/proxy": {
            "max_rate": this.upstreamThrottlingData?.maxRateLimit,
            "capacity": this.upstreamThrottlingData?.capacity,
            "every": this.upstreamThrottlingData?.every
          }
        }),
        ...(this.upstreamResponseData?.isCachingActive && {
          "qos/http-cache": {
            "shared": this.upstreamResponseData?.isSharedCacheActive
          }
        }),
        ...(this.upstreamAuthData?.isAuthActive && {
          "auth/client-credentials": {
            "endpoint_params": {
              "5t": "ji"
            },
            ...(this.upstreamAuthData?.clientId && { "client_id": this.upstreamAuthData?.clientId }),
            ...(this.upstreamAuthData?.clientSecret && { "client_secret": this.upstreamAuthData?.clientSecret }),
            ...(this.upstreamAuthData?.tokenUrl && { "token_url": this.upstreamAuthData?.tokenUrl }),
            ...(this.upstreamAuthData?.scopes && { "scopes": this.upstreamAuthData?.scopes })
          }
        }),
        ...(this.upstreamAuthData?.isGoogleCloudActive && {
          "auth/gcp": {
            ...(this.upstreamAuthData?.audience && { "audience": this.upstreamAuthData?.audience })
          }
        }),
        ...(this.upstreamAuthData?.isNtlmAuthActive && {
          "auth/ntlm": {
            "user": "g",
            "password": "yu"
          }
        }),
        ...(this.upstreamPoliciesData?.isSecPolicyActive && {
          "security/policies": {
            "req": {
              "policies": this.upstreamPoliciesData?.secReqPolicyArrayValue,
              "error": {
                "status": this.upstreamPoliciesData?.secReqErrorStCode,
                "body": this.upstreamPoliciesData?.secReqErrorBody,
                "content_type": this.upstreamPoliciesData?.secReqErrorContentType
              }
            },
            "resp": {
              "policies": this.upstreamPoliciesData?.secResPolicyArrayValue,
              "error": {
                "status": this.upstreamPoliciesData?.secResErrorStCode,
                "body": this.upstreamPoliciesData?.secResErrorBody,
                "content_type": this.upstreamPoliciesData?.secResErrorContentType
              }
            },
            "jwt": {
              "policies": this.upstreamPoliciesData?.jwtReqPolicyArrayValue
            },
            "debug": this.upstreamPoliciesData?.enableDebug,
            "auto_join_policies": this.upstreamPoliciesData?.autoJoinPolicies,
            "disable_macros": this.upstreamPoliciesData?.disableMacros
          }
        }),
        // "backend/graphql": {
        //   "type": this.upstreamConnectivityData?.restTographQLOpTypeForm,
        //   "query": this.upstreamConnectivityData?.restTographQLInlineQueryForm,
        //   "variables": {}
        // },
        // "backend/soap": {
        //   "@comment": null,
        //   "path": this.upstreamConnectivityData?.pathRestToSoapForm
        // },
        // "backend/grpc": {
        //   "input_mapping": inputMapObj,
        //   "response_naming_convention": this.upstreamConnectivityData?.restTogrpcResNamingConventionForm,
        //   "output_enum_as_string": this.upstreamConnectivityData?.restTogrpcEnumsAsStrgsForm,
        //   "output_timestamp_as_string": this.upstreamConnectivityData?.restTogrpcTimestmpAsStrgsForm,
        //   "output_duration_as_string": this.upstreamConnectivityData?.restTogrpcDurationAsStrgsForm,
        //   "client_tls": {
        //     "allow_insecure_connections": true
        //   },
        //   "output_remove_unset_values": this.upstreamConnectivityData?.restTogrpcRemoveUnsetValForm,
        //   "use_request_body": this.upstreamConnectivityData?.restTogrpcUseReqBodyForm
        // },
        // "backend/static-filesystem": {
        //   "directory_listing": this.upstreamRequestData?.directory_Listing,
        //   "path": this.upstreamRequestData?.staticUrl
        // }
        ...(this.upstreamConnectivityData?.isRestToGraphqlActive && {
          "backend/graphql": {
            ...(this.upstreamConnectivityData?.restTographQLOpTypeForm && { "type": this.upstreamConnectivityData?.restTographQLOpTypeForm }),
            ...(this.upstreamConnectivityData?.restTographQLInlineQueryForm && { "query": this.upstreamConnectivityData?.restTographQLInlineQueryForm }),
            "variables": {},
            ...(this.upstreamConnectivityData?.restToGraphqlOpNameForm && { "operationName": this.upstreamConnectivityData?.restToGraphqlOpNameForm }),
            ...(this.upstreamConnectivityData?.restTographQLQueryPathForm && { "query_path": this.upstreamConnectivityData?.restTographQLQueryPathForm }),
          }
        }),

        ...(this.upstreamConnectivityData?.isAMQPconsumerActive && {
          "backend/amqp/consumer": {
            ...(this.upstreamConnectivityData?.amqpConsumerQueueNameForm && { "name": this.upstreamConnectivityData?.amqpConsumerQueueNameForm }),
            ...(this.upstreamConnectivityData?.amqpConsumerExchangeForm && { "exchange": this.upstreamConnectivityData?.amqpConsumerExchangeForm }),
            ...(this.upstreamConnectivityData?.amqpConsumerBackOffStratgyForm && { "backoff_strategy": this.upstreamConnectivityData?.amqpConsumerBackOffStratgyForm }),
            ...(this.upstreamConnectivityData?.amqpConsumerDurableForm && { "durable": this.upstreamConnectivityData?.amqpConsumerDurableForm }),
            ...(this.upstreamConnectivityData?.amqpConsumerRoutingKeysFormArray?.length > 0 && { "routing_key": this.upstreamConnectivityData?.amqpConsumerRoutingKeysFormArray }),
            ...(this.upstreamConnectivityData?.amqpConsumerPrefetchCntForm && { "prefetch_count": this.upstreamConnectivityData?.amqpConsumerPrefetchCntForm }),
            ...(this.upstreamConnectivityData?.amqpConsumerNoLocalForm && { "no_local": this.upstreamConnectivityData?.amqpConsumerNoLocalForm })
          }
        }),

        ...(this.upstreamConnectivityData?.isAWSlambdaActive && {
          "backend/lambda": {
            ...(this.upstreamConnectivityData?.awsLambdaFunctionNameForm && { "function_name": this.upstreamConnectivityData?.awsLambdaFunctionNameForm }),
            ...(this.upstreamConnectivityData?.awsLambdaFunctionParamNameForm && { "function_param_name": this.upstreamConnectivityData?.awsLambdaFunctionParamNameForm }),
            ...(this.upstreamConnectivityData?.awsLambdaRegionForm && { "region": this.upstreamConnectivityData?.awsLambdaRegionForm }),
            ...(this.upstreamConnectivityData?.awsLambdaMaxRetriesForm && { "max_retries": this.upstreamConnectivityData?.awsLambdaMaxRetriesForm }),
            ...(this.upstreamConnectivityData?.awsLambdaEndpointForm && { "endpoint": this.upstreamConnectivityData?.awsLambdaEndpointForm })
          }
        }),

        ...(this.upstreamConnectivityData?.isRestToSoapActive && {
          "backend/soap": {
            "@comment": null,
            "template": this.upstreamConnectivityData?.template,
            "content_type": this.upstreamConnectivityData?.contentType,
            "debug": this.upstreamConnectivityData?.debug,
            "path": this.upstreamConnectivityData?.path
          }
        }),
        ...(this.upstreamConnectivityData?.isrestToGRPCActive && {
          "backend/grpc": {
            // ...(this.upstreamConnectivityData?.objectMapValue1 && { "input_mapping": inputMapObj }),
            
            "response_naming_convention": this.upstreamConnectivityData?.restTogrpcResNamingConventionForm,
            "request_naming_convention": this.upstreamConnectivityData?.restTogrpcReqNamingConventionForm,
            "input_mapping": inputMapObj,
            "use_request_body": this.upstreamConnectivityData?.restTogrpcUseReqBodyForm,
            "client_tls": {
              "allow_insecure_connections": this.upstreamConnectivityData?.restTogrpcAllowInsecureConForm
            },
            "output_remove_unset_values": this.upstreamConnectivityData?.restTogrpcRemoveUnsetValForm,
            "output_enum_as_string": this.upstreamConnectivityData?.restTogrpcEnumsAsStrgsForm,
            "output_timestamp_as_string": this.upstreamConnectivityData?.restTogrpcTimestmpAsStrgsForm,
            "output_duration_as_string": this.upstreamConnectivityData?.restTogrpcDurationAsStrgsForm,
            "disable_query_params": this.upstreamConnectivityData?.restTogrpcDisableQueryParamForm,
          }
        }),
        ...(this.upstreamConnectivityData?.isHttpClientSettingActive && {
          "backend/http/client": {
            ...(this.upstreamConnectivityData?.connectvWebProxyForm && { "proxy_address": this.upstreamConnectivityData?.connectvWebProxyForm }),
            "no_redirect": this.upstreamConnectivityData?.donotFollowRedirectsForm
          }
        }),
        ...(this.upstreamRequestData?.isStaticServerActive && {
          "backend/static-filesystem": {
            "directory_listing": this.upstreamRequestData?.directory_Listing,
            ...(this.upstreamRequestData?.staticUrl && { "path": this.upstreamRequestData?.staticUrl })
          }
        }),
        ...(this.upstreamRequestData?.isBodymanipulationActive && {
          "modifier/body-generator": {
            ...(this.upstreamRequestData?.template && { "template": this.upstreamRequestData?.template }),
            ...(this.upstreamRequestData?.contentType && { "content_type": this.upstreamRequestData?.contentType }),
            ...(this.upstreamRequestData?.debug && { "debug": this.upstreamRequestData?.debug }),
            ...(this.upstreamRequestData?.path && { "path": this.upstreamRequestData?.path })
          }
        }),
        ...(this.upstreamRequestData?.isMartianActive && { "modifier/martian": this.upstreamRequestData?.martianDslTextarea }),
        ...(this.upstreamResponseData?.AdvResManipulationActive && {
          "modifier/jmespath": {
            "expr": this.upstreamResponseData?.expression
          }
        }),
        ...(this.upstreamResponseData?.resManiWithGoTemplActive && {
          "modifier/response-body-generator": {
            ...(this.upstreamResponseData?.contentType && { "content_type": this.upstreamResponseData?.contentType }),
            ...(this.upstreamResponseData?.debug && { "debug": this.upstreamResponseData?.debug }),
            ...(this.upstreamResponseData?.path && { "path": this.upstreamResponseData?.path }),
            ...(this.upstreamResponseData?.template && { "template": this.upstreamResponseData?.template })
          }
        })
      },
      "target": null,
      "method": this.upstreamRequestData?.method,
      "deny": [
        ''
      ],
      "@comment": null,
      "@test_with": null,
      "disable_host_sanitize": this.upstreamRequestData?.sanitization
    }

    if (this.formData?.backend?.[0].id) {
      const id = this.formData?.backend?.[0].id
      this.dataService.updatebackend(id, body).subscribe({
        next: (res: any) => {
          console.log(res);
          this._snackBar.open(res.message, 'OK', {
            duration: 5000
          });
          this.router.navigate(["dashboard"])
        }
      })

    }
    this.backendUpStreamSubmitted.emit(obj)
    this._snackBar.open('saved successfully', 'OK', {
      duration: 5000
    });
  }

  // sendData() {
  //   this.backendUpStreamSubmitted.emit(this.entireFormData)
  //   this.dataService.sendBackendData(this.entireFormData);
  // }

}
