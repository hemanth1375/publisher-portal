import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ApicardsService } from '../services/apicards.service';
import { SharedDataService } from '../services/shared-data.service';
import { ApiPageService } from '../services/api-page.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
apiData:any;
buttonId: any;
listOfPendingDealer: any;

gotodashboard() {
this.router.navigate(['/dashboard']);
}

constructor(private router:Router ,private elementRef: ElementRef, private renderer: Renderer2,private apiCardsService:ApicardsService,private sharedService:SharedDataService,private apiPageService:ApiPageService) {}

showSidebar: boolean = true;
showSubmitButton:boolean=true;

  ngOnInit(): void {
    console.log(this.apiData);
    this.apiData=sessionStorage.getItem('id')
    console.log(this.apiData);
    
    if(this.apiData){
    this.apiCardsService.setData(this.apiData);
    }
   this. isExpanded = false;
   this.router.events.subscribe(() => {
    this.showSidebar = this.router.url !== '/apicards';
    this.showSubmitButton=this.router.url !== '/apis';
    // this.showSubmitButton=this.router.url !== '/apis/viewapi';
  });
  }

  isExpanded = false;
  applycssClass=false;
  onMouseEnter(id:number) {
    this.buttonId=id;
  }

  onMouseLeave(id:number) {
    this.buttonId=id;
  }
 
  findByName($event: KeyboardEvent) {

  }
  showDealer(_t21: any) {
  }


//   const hamBurger = document.querySelector(".toggle-btn");

//   hamBurger.addEventListener("click", function () {
//   document.querySelector("#sidebar").classList.toggle("expand");
  
// });

  sidebarExpanded: boolean = false;
  sidebarHovered: boolean = false;

  toggleSidebar() {
    this.isExpanded=!this.isExpanded;
    this.sidebarExpanded = !this.sidebarExpanded;
    this.sidebarHovered = !this.sidebarHovered
  }

  expandSidebar() {
    if (!this.sidebarExpanded) {
      this.sidebarHovered = true;
    }
  }

  collapseSidebar() {
    if (!this.sidebarExpanded) {
      this.sidebarHovered = false;
    }
  }
  serviceSettingData:any;
  httpSecurityData:any;
  submitdata(){
    this.sharedService.getServiceSettingData$().subscribe((data:any)=>{
      console.log(data);
      this.serviceSettingData=data;
    })
    this.sharedService.getHttpSecurityData$().subscribe((data:any)=>{
      console.log(data);
      this.httpSecurityData=data;
    })

    const literalObj = this.serviceSettingData.literalMatchObjectMapValue.reduce((acc:any, [key, value]:any) => {
      acc[key] = value;
      return acc;
    }, {});
    console.log(this.serviceSettingData);
    const body={
      
        "id": 0,
        "$schema": "string",
        "version": 0,
        "name": this.serviceSettingData.name,
        "port": this.serviceSettingData.port,
        "host": this.serviceSettingData.hostArrayValue,
        "timeout": this.serviceSettingData.backendTimeout,
        "cache_ttl": this.serviceSettingData.defaultCache,
        "output_encoding": "string",
        "debug_endpoint": true,
        "sequential_start": true,
        "disable_rest": true,
        "plugin": {
          "pattern": "string",
          "folder": "string"
        },
        "tls": {
          "public_key": this.serviceSettingData.publicKey,
          "private_key": this.serviceSettingData.privateKey
        },
      
        "extra_config": {
          "id": 0,
          "grpc": {
            "id": 0,
            "catalog": this.serviceSettingData.directoryArrayValue,
            "server": {
              "id": 0,
              "services": [
                {
                  "id": 0,
                  "name": "string",
                  "methods": [
                    {
                      "id": 0,
                      "name": "string",
                      "input_headers": [
                        "string"
                      ],
                      "payload_params": {
                        "page.cursor": "string"
                      },
                      "backend": [
                        {
                          "id": 0,
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
            "prefix": this.serviceSettingData.staticServerPrefix,
            "path": this.serviceSettingData.staticServerPath,
            "directory_listing": this.serviceSettingData.directoryList
          },
          "router": {
            "return_error_msg": true,
            "disable_gzip": this.serviceSettingData.disablegZip
          },
          "auth/basic": {
            "@comment": "string",
            "htpasswd_path": "string"
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
          },
          "auth/api-keys": {
            "id": 0,
            "keys": [
              {
                "id": 0,
                "key": "string",
                "roles": [
                  "string"
                ],
                "@description": "string"
              }
            ]
          },
          "security/cors": {
            "allow_origins": this.httpSecurityData.corsAllowedOriginsFormArray,
            "allow_methods": [
              "string"
            ],
            "allow_headers": this.httpSecurityData.corsAllowedHeadersFormArray,
            "expose_headers": this.httpSecurityData.corsExposeHeadersFormArray,
            "max_age": this.httpSecurityData.corsMaxAgeForm
          },
          "security/bot-detector": {
            "allow": this.httpSecurityData.botDetectorAllowFormArray,
            "cache_size": 0,
            "deny": this.httpSecurityData.botDetectorDenyFormArray,
            "empty_user_agent_is_bot": true,
            "patterns": this.httpSecurityData.botDetectorPatternsFormArray
          },
          "security/http": {
            "allowed_hosts": [
              "string"
            ],
            "allowed_hosts_are_regex": true,
            "browser_xss_filter": true,
            "content_security_policy": "string",
            "content_type_nosniff": true,
            "custom_frame_options_value": "string",
            "force_sts_header": true,
            "frame_deny": true,
            "host_proxy_headers": [
              "string"
            ],
            "hpkp_public_key": "string",
            "is_development": true,
            "referrer_policy": "string",
            "ssl_host": "string",
            "ssl_proxy_headers": {},
            "ssl_redirect": true,
            "sts_include_subdomains": true,
            "sts_seconds": 0
          },
          "plugin/http-server": {
            "name": [
              "string"
            ],
            "geoip": {
              "citydb_path":this.serviceSettingData.databasePath
            },
            "url-rewrite": {
              "literal": literalObj,
              "regexp": this.serviceSettingData.regExpMatchObjectMapValue
            },
            "ip-filter": {
              "CIDR": this.httpSecurityData.ipFilterCIDRFormArray,
              "allow": this.httpSecurityData.ipFilterAllowModeForm,
              "client_ip_headers": this.httpSecurityData.ipFilterClientIPHeadersFormArray,
              "trusted_proxies": this.httpSecurityData.ipFilterTrustedProxiesFormArray
            },
            "jwk-aggregator": {
              "cache": this.httpSecurityData.multipleIdentityProviderCacheForm,
              "origins": [
                "string"
              ],
              "port": 0
            },
            "redis-ratelimit": {
              "burst": 0,
              "host": "string",
              "period": "string",
              "rate": 0,
              "tokenizer": "string",
              "tokenizer_field": "string"
            },
            "static-filesystem": {
              "path": "string",
              "prefix": "string",
              "skip": [
                "string"
              ]
            },
            "virtualhost": {
              "hosts": [
                "string"
              ]
            },
            "wildcard": {
              "endpoints": {}
            }
          },
          "documentation/openapi": {
            "version": "string",
            "contact_name": "string",
            "contact_email": "string",
            "license_name": "string",
            "license_url": "string"
          },
          "telemetry/opentelemetry": {
            "id": 0,
            "service_name": "string",
            "metric_reporting_period": 0,
            "trace_sample_rate": 0,
            "service_version": "string",
            "skip_paths": [
              "string"
            ],
            "exporters": {
              "id": 0,
              "otlp": [
                {
                  "id": 0,
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
                  "id": 0,
                  "name": "string",
                  "listen_ip": "string",
                  "port": 0,
                  "process_metrics": true,
                  "go_metrics": true,
                  "disable_metrics": true
                }
              ]
            },
            "layers": {
              "global": {
                "disable_metrics": true,
                "disable_propagation": true,
                "disable_traces": true,
                "report_headers": true,
                "traces_static_attributes": [
                  {}
                ],
                "metrics_static_attributes": [
                  {}
                ]
              },
              "proxy": {
                "disable_metrics": true,
                "disable_traces": true,
                "report_headers": true,
                "traces_static_attributes": [
                  {}
                ],
                "metrics_static_attributes": [
                  {}
                ]
              },
              "backend": {
                "metrics": {
                  "detailed_connection": true,
                  "disable_stage": true,
                  "read_payload": true,
                  "round_trip": true,
                  "static_attributes": [
                    {}
                  ]
                },
                "traces": {
                  "detailed_connection": true,
                  "disable_stage": true,
                  "read_payload": true,
                  "report_headers": true,
                  "round_trip": true,
                  "static_attributes": [
                    {}
                  ]
                }
              }
            }
          },
          "telemetry/logging": {
            "format": "string",
            "custom_format": "string",
            "syslog_facility": "string",
            "level": "string",
            "prefix": "string",
            "syslog": true,
            "stdout": true
          },
          "telemetry/gelf": {
            "address": "string",
            "enable_tcp": true
          },
          "telemetry/moesif": {
            "@comment": "string",
            "application_id": "string",
            "user_id_headers": [
              "string"
            ],
            "user_id_jwt_claim": "string",
            "identify_company": {
              "jwt_claim": "string"
            },
            "debug": true,
            "log_body": true,
            "event_queue_size": 0,
            "batch_size": 0,
            "timer_wake_up_seconds": 0,
            "request_body_masks": [
              "string"
            ],
            "request_header_masks": [
              "string"
            ],
            "response_body_masks": [
              "string"
            ],
            "response_header_masks": [
              "string"
            ],
            "should_skip": "string"
          },
          "telemetry/opencensus": {
            "enabled_layers": {
              "backend": true,
              "pipe": true,
              "router": true
            },
            "exporters": {
              "datadog": {
                "namespace": "string",
                "service": "string",
                "trace_address": "string",
                "stats_address": "string",
                "tags": [
                  "string"
                ],
                "global_tags": {},
                "disable_count_per_buckets": true
              },
              "influxdb": {
                "address": "string",
                "db": "string",
                "username": "string",
                "password": "string",
                "timeout": "string"
              },
              "jaeger": {
                "agent_endpoint": "string",
                "buffer_max_count": 0,
                "endpoint": "string",
                "service_name": "string"
              },
              "logger": {
                "spans": true,
                "stats": true
              },
              "ocagent": {
                "address": "string",
                "enable_compression": true,
                "headers": {},
                "insecure": true,
                "reconnection": "string",
                "service_name": "string"
              },
              "prometheus": {
                "namespace": "string",
                "port": 0,
                "tag_host": true,
                "tag_method": true,
                "tag_path": true,
                "tag_statuscode": true
              },
              "stackdriver": {
                "project_id": "string",
                "default_labels": {},
                "metric_prefix": "string"
              },
              "xray": {
                "region": "string",
                "version": "string",
                "access_key_id": "string",
                "secret_access_key": "string",
                "use_env": true
              },
              "zipkin": {
                "collector_url": "string",
                "service_name": "string"
              }
            },
            "reporting_period": 0,
            "sample_rate": 0
          },
          "telemetry/newrelic": {
            "debug": true,
            "headers_to_pass": [
              "string"
            ],
            "license": "string"
          },
          "telemetry/metrics": {
            "backend_disabled": true,
            "collection_time": "string",
            "endpoint_disabled": true,
            "listen_address": "string",
            "proxy_disabled": true,
            "router_disabled": true
          }
        },
        "read_timeout": this.serviceSettingData.httpReadTimeout,
  "write_timeout": this.serviceSettingData.httpWriteTimeout,
  "idle_timeout": this.serviceSettingData.httpIdleTimeout,
  "read_header_timeout": this.serviceSettingData.httpReadHeaderTimeout
      
    }

    console.log(body);
    
this.apiPageService.createKrakend(body).subscribe({
  next:(res:any)=>{
    console.log(res);
    this.router.navigate(['apicards'])
  }
})
  }
}
