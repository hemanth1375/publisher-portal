import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ApicardsService } from '../services/apicards.service';
import { SharedDataService } from '../services/shared-data.service';
import { ApiPageService } from '../services/api-page.service';
import { switchMap } from 'rxjs';

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
    this.showSubmitButton = this.router.url !== '/apis' && this.router.url !== '/apis/viewapi' && this.router.url !== '/apicards' 
    && this.router.url !== '/dashboard' && this.router.url !== '/service' && this.router.url !== '/httpSecurity' && this.router.url !== '/apiMonetization'
    && this.router.url !== '/telemetry' && this.router.url !== '/apikeys';

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
  openApiData:any;
  telemetryData:any;
  cardId:any;
  entireJsondata:any;
  submitdata(){
    this.apiCardsService.getData$().subscribe(data=>{
      this.cardId=data
      
    })
    console.log(this.cardId);
    this.sharedService.getEntireJsonData$().subscribe(data=>{
      this.entireJsondata=data;
      
    })
console.log(this.entireJsondata);
    // this.apiCardsService.getData$().pipe(
    //   switchMap(data => {
    //     console.log(data);
        
    //     this.cardId = data;
    //     return this.apiPageService.getEndpoints(data);
    //   })
    // ).subscribe(secondData => {
    //   console.log(secondData);
      
    //   // this.sharedService.setEntireJsonData(secondData)
    //   this.endpointData = secondData;
     
      
    //   console.log('Second API Data:', secondData);
    // });
    
    this.sharedService.getServiceSettingData$().subscribe((data:any)=>{
      console.log(data);
      this.serviceSettingData=data;
    })
    this.sharedService.getHttpSecurityData$().subscribe((data:any)=>{
      console.log(data);
      this.httpSecurityData=data;
    })
    this.sharedService.getOpenApiData$().subscribe((data:any)=>{
      console.log(data);
      this.openApiData=data;
    })
    this.sharedService.getTelemetryData$().subscribe((data:any)=>{
      console.log(data);
      this.telemetryData=data;
    })

    const literalObj = this.serviceSettingData?.literalMatchObjectMapValue?.reduce((acc:any, [key, value]:any) => {
      acc[key] = value;
      return acc;
    }, {});

    const sslProxyHeadersObj=this.httpSecurityData?.objectMapValue?.reduce((acc:any, [key, value]:any) => {
      acc[key] = value;
      return acc;
    })
    this.apiCardsService.getData$().subscribe(data=>{
      console.log(data);
      
    })
    // zipkin
    var zipkinValue={};
    var jeagerValue={};
    var influxValue={};
    var datadogValue={};
    if(this.telemetryData?.zipkinActive){
      zipkinValue={
          "collector_url": this.telemetryData?.zipkincollectorURL,
                "service_name": this.telemetryData?.zipkinServiceName
        }
    }else{
      zipkinValue={}
    }
    if(this.telemetryData?.jaegerActive){
      jeagerValue={
          "agent_endpoint": "string",
                "buffer_max_count": 0,
                "endpoint": this.telemetryData?.jeagerEndpoint,
                "service_name": this.telemetryData?.jeagerServiceName
        }
    }else{
      jeagerValue={}
    }
    if(this.telemetryData?.influxDBActive){
      influxValue={
          "address": this.telemetryData?.influxDBaddress,
                "db": this.telemetryData?.infulxDBdatabase,
                "username": "string",
                "password": "string",
                "timeout": this.telemetryData?.influxwriteTimeout
        }
    }else{
      influxValue={}
    }
    if(this.telemetryData?.datadogActive){
      datadogValue={
         "namespace": this.telemetryData?.datadogNamespace,
                "service": this.telemetryData?.datadogService,
                "trace_address": this.telemetryData?.datadogTraceAdd,
                "stats_address": this.telemetryData?.datadogStatusAdd,
                "tags": this.telemetryData?.tagsArrayValue,
                "global_tags": {},
                "disable_count_per_buckets": true
        }
    }else{
      datadogValue={}
    }
    console.log(this.serviceSettingData);
    const body={
      
        "id": this.cardId?this.cardId:null,
        "$schema": "string",
        "version": 3,
        "name": this.serviceSettingData?.name,
        "port": this.serviceSettingData?.port,
        "host": this.serviceSettingData?.hostArrayValue,
        "timeout": this.serviceSettingData?.backendTimeout,
        "cache_ttl": this.serviceSettingData?.defaultCache,
        "output_encoding": "string",
        "debug_endpoint": true,
        "sequential_start": true,
        "disable_rest": true,
        "plugin": {
          "pattern": "string",
          "folder": "string"
        },
        "tls": {
          "public_key": this.serviceSettingData?.publicKey,
          "private_key": this.serviceSettingData?.privateKey
        },
      
        "extra_config": {
          "id": this.entireJsondata?.extra_config?.id ? this.entireJsondata?.extra_config?.id:null,
          "grpc": {
            "id": this.entireJsondata?.extra_config?.grpc?.id ? this.entireJsondata?.extra_config?.grpc?.id:null,
            "catalog": this.serviceSettingData?.directoryArrayValue,
            "server": {
              "id": this.entireJsondata?.extra_config?.grpc?.server?.id ? this.entireJsondata?.extra_config?.grpc?.server?.id:null,
              "services": [
                {
                  "id": this.entireJsondata?.extra_config?.grpc?.server?.services?.[0]?.id ? this.entireJsondata?.extra_config?.grpc?.server?.services?.[0]?.id:null,
                  "name": "string",
                  "methods": [
                    {
                      "id": this.entireJsondata?.extra_config?.grpc?.server?.services?.[0]?.methods?.[0]?.id ? this.entireJsondata?.extra_config?.grpc?.server?.services?.[0]?.methods?.[0]?.id:null,
                      "name": "string",
                      "input_headers": [
                        "string"
                      ],
                      "payload_params": {
                        "page.cursor": "string"
                      },
                      "backend": [
                        {
                          "id": this.entireJsondata?.extra_config?.grpc?.server?.services?.[0]?.methods?.[0]?.backend?.[0]?.id ? this.entireJsondata?.extra_config?.grpc?.server?.services?.[0]?.methods?.[0]?.backend?.[0]?.id:null,
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
            "prefix": this.serviceSettingData?.staticServerPrefix,
            "path": this.serviceSettingData?.staticServerPath,
            "directory_listing": this.serviceSettingData?.directoryList
          },
          "router": {
            "return_error_msg": true,
            "disable_gzip": this.serviceSettingData?.disablegZip
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
            "id": this.entireJsondata?.extra_config?.["auth/api-keys"]?.id ? this.entireJsondata?.extra_config?.["auth/api-keys"]?.id:null,
            "keys": [
              {
                "id": this.entireJsondata?.extra_config?.["auth/api-keys"]?.keys?.[0]?.id ? this.entireJsondata?.extra_config?.["auth/api-keys"]?.keys?.[0]?.id:null,
                "key": "string",
                "roles": [
                  "string"
                ],
                "@description": "string"
              }
            ]
          },
          "security/cors": {
            "allow_origins": this.httpSecurityData?.corsAllowedOriginsFormArray,
            "allow_methods": [
              "string"
            ],
            "allow_headers": this.httpSecurityData?.corsAllowedHeadersFormArray,
            "expose_headers": this.httpSecurityData?.corsExposeHeadersFormArray,
            "max_age": this.httpSecurityData?.corsMaxAgeForm
          },
          "security/bot-detector": {
            "allow": this.httpSecurityData?.botDetectorAllowFormArray,
            "cache_size": 0,
            "deny": this.httpSecurityData?.botDetectorDenyFormArray,
            "empty_user_agent_is_bot": true,
            "patterns": this.httpSecurityData?.botDetectorPatternsFormArray
          },
          "security/http": {
            "allowed_hosts": this.httpSecurityData?.httpSecurityAllowedHostsFormArray,
            "allowed_hosts_are_regex": true,
            "browser_xss_filter": this.httpSecurityData?.httpSecurityXSSProtectionForm,
            "content_security_policy": this.httpSecurityData?.httpSecurityConSecPolicyForm,
            "content_type_nosniff": this.httpSecurityData?.httpSecuritySniffingForm,
            "custom_frame_options_value": "string",
            "force_sts_header": true,
            "frame_deny": this.httpSecurityData?.httpSecurityClickjackProtectForm,
            "host_proxy_headers": [
              "string"
            ],
            "hpkp_public_key": this.httpSecurityData?.httpSecurityHPKPForm,
            "is_development": true,
            "referrer_policy": "string",
            "ssl_host": this.httpSecurityData?.httpSecuritySSLOptForm,
            "ssl_proxy_headers": sslProxyHeadersObj,
            "ssl_redirect": this.httpSecurityData?.httpSecuritySSLOptForceSSLForm,
            "sts_include_subdomains": this.httpSecurityData?.httpSecurityIncSubdomainForm,
            "sts_seconds": this.httpSecurityData?.httpSecurityHSTSForm
          },
          "plugin/http-server": {
            "name": [
              "string"
            ],
            "geoip": {
              "citydb_path":this.serviceSettingData?.databasePath
            },
            "url-rewrite": {
              "literal": literalObj,
              "regexp": this.serviceSettingData?.regExpMatchObjectMapValue
            },
            "ip-filter": {
              "CIDR": this.httpSecurityData?.ipFilterCIDRFormArray,
              "allow": this.httpSecurityData?.ipFilterAllowModeForm,
              "client_ip_headers": this.httpSecurityData?.ipFilterClientIPHeadersFormArray,
              "trusted_proxies": this.httpSecurityData?.ipFilterTrustedProxiesFormArray
            },
            "jwk-aggregator": {
              "cache": this.httpSecurityData?.multipleIdentityProviderCacheForm,
              "origins": this.httpSecurityData?.multipleIdentityProviderOriginsFormArray,
              "port": this.httpSecurityData?.multipleIdentityProviderPortForm
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
            "version": this.openApiData?.openApiVersionForm,
            "contact_name": this.openApiData?.openApiContactNameForm,
            "contact_email": this.openApiData?.openApiContactEmailForm,
            "license_name": this.openApiData?.openApiLicenseNameForm,
            "license_url": this.openApiData?.openApiLicenseUrlForm,
            "contact_url":this.openApiData?.openApiContactUrlForm,
          },
          "telemetry/opentelemetry": {
            "id": this.entireJsondata?.extra_config?.["telemetry/opentelemetry"]?.id ? this.entireJsondata?.extra_config?.["telemetry/opentelemetry"]?.id:null,
            "service_name": "string",
            "metric_reporting_period": this.telemetryData?.OTreportingPeriod,
            "trace_sample_rate": this.telemetryData?.OTsampleRate,
            "service_version": "string",
            "skip_paths": [
              "string"
            ],
            "exporters": {
              "id": this.entireJsondata?.extra_config?.["telemetry/opentelemetry"]?.exporters?.id ? this.entireJsondata?.extra_config?.["telemetry/opentelemetry"]?.exporters?.id:null,
              "otlp": this.telemetryData?.otlp,
              "prometheus": this.telemetryData?.prometheus
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
            "custom_format": this.telemetryData?.logMsgFormat,
            "syslog_facility": this.telemetryData?.logSysLogFacility,
            "level": this.telemetryData?.logginngLevel,
            "prefix": this.telemetryData?.loggingPrefix,
            "syslog": this.telemetryData?.logSysLog,
            "stdout": this.telemetryData?.logStdOut
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
              "influxdb": influxValue,
              "jaeger": jeagerValue,
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
              "zipkin": zipkinValue
            },
            "reporting_period": 0,
            "sample_rate": 0
          },
          "telemetry/newrelic": {
            "debug": this.telemetryData?.newRelicSDKDebug,
            "headers_to_pass": this.telemetryData?.headersToPassArrayValue,
            "license": this.telemetryData?.newRelicLicense
          },
          "telemetry/metrics": {
            "backend_disabled": this.telemetryData?.metricsDisableBackend,
            "collection_time": this.telemetryData?.metricCollecTime,
            "endpoint_disabled": this.telemetryData?.metricsDisableEndpoint,
            "listen_address": this.telemetryData?.metricsListenAddress,
            "proxy_disabled": this.telemetryData?.metricsDisableProxy,
            "router_disabled": this.telemetryData?.metricsDisableRouter
          }
        },
        "read_timeout": this.serviceSettingData?.httpReadTimeout,
  "write_timeout": this.serviceSettingData?.httpWriteTimeout,
  "idle_timeout": this.serviceSettingData?.httpIdleTimeout,
  "read_header_timeout": this.serviceSettingData?.httpReadHeaderTimeout
      
    }

    console.log(body);
  if(this.cardId==undefined){
this.apiPageService.createKrakend(body).subscribe({
  next:(res:any)=>{
    console.log(res);
    this.router.navigate(['apicards'])
  }
})
  }else{
this.apiPageService.updateKrakend(this.cardId,body).subscribe({
  next:(res:any)=>{
    console.log(res);
    this.router.navigate(['apicards'])
  }
})
  }
  }
}
