import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ViewapiPageComponent } from '../viewapi-page/viewapi-page.component';
import { ViewapiPageService } from '../services/viewapi-page.service';
import { ApiPageService } from '../services/api-page.service';
import { ApicardsService } from '../services/apicards.service';
import { switchMap } from 'rxjs';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-api-page',
  templateUrl: './api-page.component.html',
  styleUrl: './api-page.component.css'
})
export class ApiPageComponent {
showParent:any=true;
@ViewChild('childContainer', { read: ViewContainerRef, static: true })
  childContainer!: ViewContainerRef;
  childData: Array<any> = [];

  // button trial
  buttonLabels: any[] = []; // Array to store button labels
  buttonCount: number = 1; 
  

  // trial end
  addChild() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ViewapiPageComponent);
    const componentRef = this.childContainer.createComponent(componentFactory);
    componentRef.instance.onFormSubmit
    // componentRef.instance.openapiFormSubmitted.subscribe((data: any) => {
    //   console.log(data);
      
    //   this.childData.push(data);
    // });
  }
constructor(private router:Router,private route:ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver,private dataService: ViewapiPageService,private apiPageService:ApiPageService,private apiCardsService:ApicardsService,private sharedService:SharedDataService){
  this.router.events.subscribe((event) => {
     
    if (event instanceof NavigationEnd) {
      console.log(this.router.url );
     
       // Check if the current route is 'recipe'
      if (this.router.url === '/apis') {
        this.showParent=true;
       
       
    }else if(this.router.url === '/apis/viewapi'){
 
    this.showParent=false;
    }
  }});
}
collectedData: string[] = [];
apiData:any;
endPointData:any;
entireJsondata:any;
ngOnInit(){

  this.sharedService.getEntireJsonData$().subscribe(data=>{
    this.entireJsondata=data;
    
  })
console.log(this.entireJsondata);




  this.apiCardsService.getData$().pipe(
    switchMap(data => {
      console.log(data);
      
      this.apiData = data;
      return this.apiPageService.getEndpoints(data);
    })
  ).subscribe(secondData => {
    if('endpoints' in secondData){
      this.endPointData = secondData.endpoints;
    }else{
      this.endPointData=[]
    }
    
    console.log('Second API Data:', secondData);
  });


  // this.apiPageService.getEndpoints('').subscribe({
  //   next:(res:any)=>{
  //     this.buttonCount=res.endpoints.length
  //     for(let i=0; i<res.endpoints.length;i++){
  //       this.buttonLabels.push(...res.endpoints)
  //       console.log(this.buttonLabels);
        
  //     }
  //   }
  // })
  this.dataService.data$.subscribe(data => {
    this.collectedData.push(data);
    console.log('Data received from child:', data);
    console.log(this.collectedData);
    
  });
}
addEndpoint(){
// this.buttonLabels.push(`Endpoint ${this.buttonCount}`);
// this.buttonCount++;
this.showParent=false;
  this.apiPageService.setData({});
this.router.navigate(['viewapi'],{relativeTo:this.route})
}
submitFinalData(){
  console.log(this.collectedData);
  const resultantFormData={
    "$schema": "string",
    "version": 0,
    "name": "string",
    "port": 0,
    "host": [
      "string"
    ],
    "timeout": "string",
    "cache_ttl": "string",
    "debug_endpoint": true,
    "endpoints": [
      {
        "@comment": "string",
        "endpoint": "string",
        "backend": [
          {
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
            "method": "string",
            "deny": [
              "string"
            ],
            "@comment": "string",
            "@test_with": "string",
            "disable_host_sanitize": true
          }
        ],
        "extra_config": {
          "documentation/openapi": {
            "summary": "this.entireFormData.openApi.summary",
            "description": "this.entireFormData.openApi.description",
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
              "policies": "this.entireFormData.policies.secReqPolicyArrayValue",
              "error": {
                "body": "this.entireFormData.policies.secReqErrorBody",
                "status": "this.entireFormData.policies.secReqErrorStCode"
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
            "roles_key": "this.entireFormData.auth.rolesKey",
            "roles": "this.entireFormData.auth.rolesArrayValue",
            "jwk_url": "this.entireFormData.auth.jwkUri",
            "issuer": "this.entireFormData.auth.issuer",
            "jwk_local_path": "string",
            "disable_jwk_security": true
          },
          "auth/signer": {
            "alg": "string",
            "kid": "string",
            "keys_to_sign": "this.entireFormData.auth.keysToSignArrayValue",
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
            "read_buffer_size": "this.entireFormData.connectivityOptions.readBufferSize",
            "write_buffer_size": "this.entireFormData.connectivityOptions.writeBufferSize",
            "message_buffer_size": 0,
            "max_message_size": 0,
            "write_wait": "this.entireFormData.connectivityOptions.writeWait",
            "pong_wait": "this.entireFormData.connectivityOptions.pongWait",
            "ping_period": "string",
            "max_retries": "this.entireFormData.connectivityOptions.maxRetries",
            "backoff_strategy": "this.entireFormData.connectivityOptions.backoffStrategy"
          }
        },
        "output_encoding": "string",
        "@test_with": "string",
        "input_headers": [
          "string"
        ],
        "concurrent_calls": 0,
        "method": "string",
        "input_query_strings": [
          "string"
        ]
      }
    ],
    "endpoints1":this.collectedData.map((item?:any)=>{
      return {
        "backend":item.backend.map((item1?:any)=>{
          return {
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
                "plugin/req-resp-modifier": {
                  "name": [
                    "string"
                  ],
                  "content-replacer": {}
                },
                "qos/ratelimit/proxy": {
                  "max_rate": 0,
                  "capacity": item1?.throttling?.capacity
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
              "method": item1.request.method,
              "deny": [
                "string"
              ],
              "@comment": "string",
              "@test_with": "string",
              "disable_host_sanitize": true
            
          }
        }),
        "extra_config": {
          "documentation/openapi": {
            "summary": item?.openApi?.summary,
            "description": item?.openApi?.description,
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
              "policies": item?.policies?.secReqPolicyArrayValue,
              "error": {
                "body": item?.policies?.secReqErrorBody,
                "status": item?.policies?.secReqErrorStCode
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
            "roles_key": item?.auth?.rolesKey,
            "roles": item?.auth?.rolesArrayValue,
            "jwk_url": item?.auth?.jwkUri,
            "issuer": item?.auth?.issuer,
            "jwk_local_path": "string",
            "disable_jwk_security": true
          },
          "auth/signer": {
            "alg": "string",
            "kid": "string",
            "keys_to_sign": item?.auth?.keysToSignArrayValue,
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
            "read_buffer_size": item?.connectivityOptions?.readBufferSize,
            "write_buffer_size": item?.connectivityOptions?.writeBufferSize,
            "message_buffer_size": 0,
            "max_message_size": 0,
            "write_wait": item?.connectivityOptions?.writeWait,
            "pong_wait": item?.connectivityOptions?.pongWait,
            "ping_period": "string",
            "max_retries": item?.connectivityOptions?.maxRetries,
            "backoff_strategy": item?.connectivityOptions?.backoffStrategy
          }
        }
      }
    }),
    "sequential_start": true,
    "async_agent": [
      {
        "name": "string",
        "backend": [
          {
            "host": [
              "string"
            ],
            "url_pattern": "string",
            "method": "string"
          }
        ],
        "consumer": {
          "topic": "string",
          "workers": 0
        },
        "connection": {
          "max_retries": 0,
          "backoff_strategy": "string"
        },
        "extra_config": {
          "async/amqp": {
            "name": "string",
            "host": "string",
            "exchange": "string",
            "prefetch_count": 0,
            "auto_ack": true
          }
        }
      }
    ],
    "extra_config": {
      "grpc": {
        "catalog": [
          "string"
        ],
        "server": {
          "services": [
            {
              "name": "string",
              "methods": [
                {
                  "name": "string",
                  "input_headers": [
                    "string"
                  ],
                  "payload_params": {
                    "page.cursor": "string"
                  },
                  "backend": [
                    {
                      "host": [
                        "string"
                      ],
                      "url_pattern": "string",
                      "extra_config": {
                        "backend/grpc": {
                          "use_request_body": true
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      "server/static-filesystem": {
        "prefix": "string",
        "path": "string",
        "directory_listing": true
      },
      "router": {
        "return_error_msg": true,
        "disable_gzip": true
      },
      "auth/basic": {
        "@comment": "string",
        "htpasswd_path": "string"
      },
      "plugin/http-server": {
        "name": [
          "string"
        ],
        "geoip": {
          "citydb_path": "string"
        },
        "url-rewrite": {
          "literal": {
            "/git-profile": "string"
          },
          "regexp": [
            [
              "string"
            ]
          ]
        }
      },
      "documentation/openapi": {
        "version": "string",
        "contact_name": "string",
        "contact_email": "string",
        "license_name": "string",
        "license_url": "string"
      },
      "auth/api-keys": {
        "keys": [
          {
            "key": "string",
            "roles": [
              "string"
            ],
            "@description": "string"
          }
        ]
      },
      "telemetry/opentelemetry": {
        "service_name": "string",
        "metric_reporting_period": 0,
        "trace_sample_rate": 0,
        "exporters": {
          "otlp": [
            {
              "disable_metrics": true,
              "disable_traces": true,
              "host": "string",
              "name": "string",
              "port": 0,
              "use_http": true
            }
          ],
          "prometheus": [
            {
              "name": "string",
              "port": 0,
              "process_metrics": true,
              "go_metrics": true
            }
          ]
        },
        "layers": {
          "global": {
            "disable_metrics": true,
            "disable_propagation": true,
            "disable_traces": true,
            "report_headers": true
          },
          "proxy": {
            "disable_metrics": true,
            "disable_traces": true,
            "report_headers": true
          },
          "backend": {
            "metrics": {
              "detailed_connection": true,
              "disable_stage": true,
              "read_payload": true,
              "round_trip": true
            },
            "traces": {
              "detailed_connection": true,
              "disable_stage": true,
              "read_payload": true,
              "report_headers": true,
              "round_trip": true
            }
          }
        }
      },
      "telemetry/logging": {
        "level": "string",
        "prefix": "string",
        "syslog": true,
        "stdout": true
      },
      "telemetry/gelf": {
        "address": "string",
        "enable_tcp": true
      },
      "security/cors": {
        "allow_origins": [
          "string"
        ],
        "allow_methods": [
          "string"
        ],
        "allow_headers": [
          "string"
        ],
        "expose_headers": [
          "string"
        ],
        "max_age": "string"
      },
      "auth/revoker": {
        "@comment": "string",
        "hash_name": "string",
        "N": 0,
        "P": 0,
        "port": 0,
        "token_keys": [
          "string"
        ],
        "TTL": 0,
        "revoke_server_ping_url": "string",
        "revoke_server_ping_interval": "string",
        "revoke_server_api_key": "string",
        "revoke_server_max_workers": 0
      }
    }
  }
  console.log(resultantFormData);
  
  
}
goToViewApipage(value:any){
  // alert("ok")
  this.showParent=false;
  this.apiPageService.setData(value);
this.router.navigate(['viewapi'],{state:{res:value},relativeTo:this.route})
}
// sendData(): void {
//   const data = 'Hello, Component B!';
//   this.apiPageService.setData(data);
// }
}
