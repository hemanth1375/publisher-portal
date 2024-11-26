import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { ApicardsService } from '../services/apicards.service';
import { SharedDataService } from '../services/shared-data.service';
import { ApiPageService } from '../services/api-page.service';
import { switchMap } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { MatSnackBar } from '@angular/material/snack-bar';

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

constructor(private router:Router,private activatedRoute:ActivatedRoute ,private elementRef: ElementRef, private renderer: Renderer2,private apiCardsService:ApicardsService,private sharedService:SharedDataService,private apiPageService:ApiPageService,public dialog: MatDialog,private _snackBar: MatSnackBar) {}

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
    console.log(this.router.url);
    // console.log(this.activatedRoute);
    
    this.showSidebar = !this.router.url.includes('/apicards');
    // this.showSubmitButton = this.router.url !== '/apis' && this.router.url !== '/apis/viewapi' && this.router.url !== '/apicards' 
    // && this.router.url !== '/dashboard' && this.router.url !== '/service' && this.router.url !== '/httpSecurity' && this.router.url !== '/apiMonetization'
    // && this.router.url !== '/telemetry' && this.router.url !== '/apikeys';
this.showSubmitButton=this.router.url.includes('/openAPI')
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
  apikeysData:any;
  apiMonetizationdata:any;
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
    this.sharedService.getApikeysData$().subscribe((data:any)=>{
      console.log(data);
      this.apikeysData=data;
    })
    this.sharedService.getApiMonetizationDataData$().subscribe((data:any)=>{
      this.apiMonetizationdata=data;
    })
    const literalObj = this.serviceSettingData?.literalMatchObjectMapValue?.reduce((acc:any, [key, value]:any) => {
      acc[key] = value;
      return acc;
    }, {});

    const sslProxyHeadersObj=this.httpSecurityData?.objectMapValue?.reduce((acc:any, [key, value]:any) => {
      acc[key] = value;
      return acc;
    })
    const telStackDriverObj=this.telemetryData?.objectMapValue?.reduce((acc:any,[key,value]:any)=>{
      acc[key]=value;
      return acc;
    })
    console.log(telStackDriverObj);
    
    const openCensusAGentObj=this.telemetryData?.headerObjectMapValue?.reduce((acc:any,[key,value]:any)=>{
      acc[key]=value;
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
          ...(this.telemetryData?.zipkincollectorURL)&& {"collector_url": this.telemetryData?.zipkincollectorURL},
          ...(this.telemetryData?.zipkinServiceName)&&{"service_name": this.telemetryData?.zipkinServiceName}
        }
    }else{
      zipkinValue={}
    }
    if(this.telemetryData?.jaegerActive){
      jeagerValue={
          "agent_endpoint": null,
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
                "username": null,
                "password": null,
                "timeout": this.telemetryData?.influxwriteTimeout
        }
    }else{
      influxValue={}
    }
    if(this.telemetryData?.datadogActive){
      datadogValue={
      ...(this.telemetryData?.datadogNamespace) &&{"namespace": this.telemetryData?.datadogNamespace},
      ...(this.telemetryData?.datadogService) &&{"service": this.telemetryData?.datadogService},
      ...(this.telemetryData?.datadogTraceAdd) &&{"trace_address": this.telemetryData?.datadogTraceAdd},
      ...(this.telemetryData?.datadogStatusAdd) &&{"stats_address": this.telemetryData?.datadogStatusAdd},
      ...(this.telemetryData?.tagsArrayValue) &&{"tags": this.telemetryData?.tagsArrayValue},
      "global_tags": {},
      "disable_count_per_buckets": true
        }
    }else{
      datadogValue={}
    }
    console.log(this.serviceSettingData);
    const body={
      
        "id": this.cardId?this.cardId:null,
        "$schema": null,
        "version": 3,
        "name": this.serviceSettingData?.name,
        "port": this.serviceSettingData?.port,
        ...(this.serviceSettingData?.hostArrayValue?.length!=0 &&{"host": this.serviceSettingData?.hostArrayValue}),
        ...(this.serviceSettingData?.backendTimeout &&{"timeout": this.serviceSettingData?.backendTimeout}),
        ...(this.serviceSettingData?.defaultCache &&{"cache_ttl": this.serviceSettingData?.defaultCache}),
        // "output_encoding": null,
        // "debug_endpoint": true,
        // "sequential_start": true,
        // "disable_rest": true,
        // "plugin": {
        //   "pattern": null,
        //   "folder": null
        // },
        ...(this.serviceSettingData?.isEnableHttpsActive &&{"tls": {
          "public_key": this.serviceSettingData?.publicKey,
          "private_key": this.serviceSettingData?.privateKey
        }}),
      
        "extra_config": {
          "id": this.entireJsondata?.extra_config?.id ? this.entireJsondata?.extra_config?.id:null,
          ...(this.serviceSettingData?.isgRPCActive && {"grpc": {
            // "id": this.entireJsondata?.extra_config?.grpc?.id ? this.entireJsondata?.extra_config?.grpc?.id:null,
            "id": this.serviceSettingData?.grpcId ? this.serviceSettingData?.grpcId:null,
            ...(this.serviceSettingData?.directoryArrayValue.length!=0 &&{"catalog": this.serviceSettingData?.directoryArrayValue}),
            // "server": {
            //   "id": this.entireJsondata?.extra_config?.grpc?.server?.id ? this.entireJsondata?.extra_config?.grpc?.server?.id:null,
            //   "services": [
            //     {
            //       "id": this.entireJsondata?.extra_config?.grpc?.server?.services?.[0]?.id ? this.entireJsondata?.extra_config?.grpc?.server?.services?.[0]?.id:null,
            //       "name": null,
            //       "methods": [
            //         {
            //           "id": this.entireJsondata?.extra_config?.grpc?.server?.services?.[0]?.methods?.[0]?.id ? this.entireJsondata?.extra_config?.grpc?.server?.services?.[0]?.methods?.[0]?.id:null,
            //           "name": null,
            //           "input_headers": [
            //             ''
            //           ],
            //           "payload_params": {
            //             "page.cursor": null
            //           },
            //           "backend": [
            //             {
            //               "id": this.entireJsondata?.extra_config?.grpc?.server?.services?.[0]?.methods?.[0]?.backend?.[0]?.id ? this.entireJsondata?.extra_config?.grpc?.server?.services?.[0]?.methods?.[0]?.backend?.[0]?.id:null,
            //               "host": [
            //                 ''
            //               ],
            //               "url_pattern": null,
            //               "extra_config": {
            //                 "backend/grpc": {
            //                   "use_request_body": true
            //                 }
            //               }
            //             }
            //           ]
            //         }
            //       ]
            //     }
            //   ]
            // }
          }}),
          ...(this.serviceSettingData?.isStaticServerActive && {"server/static-filesystem": {
            ...(this.serviceSettingData?.staticServerPrefix && {"prefix": this.serviceSettingData?.staticServerPrefix}),
            ...(this.serviceSettingData?.staticServerPath && {"path": this.serviceSettingData?.staticServerPath}),
            ...(this.serviceSettingData?.directoryList && {"directory_listing": this.serviceSettingData?.directoryList})
          }}),
          ...(this.serviceSettingData?.isVirtualHostActive && {"server/virtualhost": {
              ...(this.serviceSettingData?.virtualHostArrayValue.length!=0 && {"hosts": this.serviceSettingData?.virtualHostArrayValue})
          }}),
          ...(this.serviceSettingData?.disablegZip && {"router": {
            // "return_error_msg": true,
            "disable_gzip": this.serviceSettingData?.disablegZip
          }}),
          ...(this.serviceSettingData?.isRateLimitingActive && {
            "qos/ratelimit/service":{
              ...(this.serviceSettingData?.rateLimit && {"max_rate": this.serviceSettingData?.rateLimit}),
              ...(this.serviceSettingData?.every && {"every": this.serviceSettingData?.every}),
              ...(this.serviceSettingData?.capacity && {"capacity": this.serviceSettingData?.capacity}),
              ...(this.serviceSettingData?.defaultUserQuota && {"client_max_rate": this.serviceSettingData?.defaultUserQuota}),
              ...(this.serviceSettingData?.headerValue && {"key": this.serviceSettingData?.headerValue}),
              ...(this.serviceSettingData?.uniqueStrategy && {"strategy": this.serviceSettingData?.uniqueStrategy}),
              ...(this.serviceSettingData?.clientCapacity && {"client_capacity": this.serviceSettingData?.clientCapacity})
            }
          }),
          ...(this.serviceSettingData?.isJwkSharedActive && {
            "auth/validator": {
              ...(this.serviceSettingData?.sharedCacheDuration && {"shared_cache_duration": this.serviceSettingData?.sharedCacheDuration})
            }
          }),
          ...(this.httpSecurityData?.isBasicAuthActive &&{"auth/basic": {
            "@comment": null,
            ...(this.httpSecurityData?.basicAuthHtpasswdPathForm &&{"htpasswd_path": this.httpSecurityData?.basicAuthHtpasswdPathForm})
          }}),
          // "auth/revoker": {
          //   "@comment": null,
          //   "hash_name": 'hash',
          //   "N": 0,
          //   "P": 0,
          //   "port": 0,
          //   "token_keys": [
          //     'abcd'
          //   ],
          //   "TTL": 0,
          //   "revoke_server_ping_url": null,
          //   "revoke_server_ping_interval": null,
          //   "revoke_server_api_key": null,
          //   "revoke_server_max_workers": 0
          // },
          ...(this.apikeysData?.isAPIKeyAuthActive && {"auth/api-keys": {
            "id": this.apikeysData?.apiKeyAuthId ? this.apikeysData?.apiKeyAuthId:null,
            "keys":this.apikeysData?.keysArray.map((item:any)=>{
              return {
                "id":this.entireJsondata?.extra_config?.["auth/api-keys"]?.keys?.[0]?.id ? this.entireJsondata?.extra_config?.["auth/api-keys"]?.keys?.[0]?.id:null,
                "key":item.APIKey,
                "roles":item.rolesArrayValue,
                ...(item.description &&{"description":item.description})

              }
            })
          }}),
          ...(this.httpSecurityData?.isCorsActive &&{"security/cors": {
            ...(this.httpSecurityData?.corsAllowedOriginsFormArray.length!=0 &&{"allow_origins": this.httpSecurityData?.corsAllowedOriginsFormArray}),
            "allow_methods": [
              ''
            ],
            ...(this.httpSecurityData?.corsAllowedHeadersFormArray.length!=0 &&{"allow_headers": this.httpSecurityData?.corsAllowedHeadersFormArray}),
            ...(this.httpSecurityData?.corsExposeHeadersFormArray.length!=0 &&{"expose_headers": this.httpSecurityData?.corsExposeHeadersFormArray}),
            ...(this.httpSecurityData?.corsMaxAgeForm &&{"max_age": this.httpSecurityData?.corsMaxAgeForm}),
            ...(this.httpSecurityData?.corsAllowCredentialsForm &&{"allow_credentials": this.httpSecurityData?.corsAllowCredentialsForm})
          }}),
          ...(this.httpSecurityData?.isBotDetectorActive &&{"security/bot-detector": {
            ...(this.httpSecurityData?.botDetectorAllowFormArray.length!=0 && {"allow": this.httpSecurityData?.botDetectorAllowFormArray}),
            ...(this.httpSecurityData?.botDetectorCacheSizeForm && {"cache_size": this.httpSecurityData?.botDetectorCacheSizeForm}),
            ...(this.httpSecurityData?.botDetectorDenyFormArray.length!=0 && {"deny": this.httpSecurityData?.botDetectorDenyFormArray}),
            ...(this.httpSecurityData?.botDetectorEmptyUsersForm && {"empty_user_agent_is_bot": this.httpSecurityData?.botDetectorEmptyUsersForm}),
            ...(this.httpSecurityData?.botDetectorPatternsFormArray.length!=0 && {"patterns": this.httpSecurityData?.botDetectorPatternsFormArray})
          }}),
          ...(this.httpSecurityData?.isHttpSecurityActive &&{"security/http": {
            ...(this.httpSecurityData?.httpSecurityAllowedHostsFormArray.length!=0 &&{"allowed_hosts": this.httpSecurityData?.httpSecurityAllowedHostsFormArray}),
            // "allowed_hosts_are_regex": true,
            ...(this.httpSecurityData?.httpSecurityXSSProtectionForm &&{"browser_xss_filter": this.httpSecurityData?.httpSecurityXSSProtectionForm}),
            ...(this.httpSecurityData?.httpSecurityConSecPolicyForm &&{"content_security_policy": this.httpSecurityData?.httpSecurityConSecPolicyForm}),
            ...(this.httpSecurityData?.httpSecuritySniffingForm &&{"content_type_nosniff": this.httpSecurityData?.httpSecuritySniffingForm}),
            ...(this.httpSecurityData?.frameOptions &&{"custom_frame_options_value": this.httpSecurityData?.frameOptions}),
            // "force_sts_header": true,
            ...(this.httpSecurityData?.httpSecurityClickjackProtectForm &&{"frame_deny": this.httpSecurityData?.httpSecurityClickjackProtectForm}),
            ...(this.httpSecurityData?.httpSecurityXSSProtectionForm &&{"host_proxy_headers": [
              ''
            ]}),
            ...(this.httpSecurityData?.httpSecurityHPKPForm &&{"hpkp_public_key": this.httpSecurityData?.httpSecurityHPKPForm}),
            // "is_development": true,
            // "referrer_policy": null,
            ...(this.httpSecurityData?.httpSecuritySSLOptForm &&{"ssl_host": this.httpSecurityData?.httpSecuritySSLOptForm}),
            ...(this.httpSecurityData?.sslProxyHeadersObj &&{"ssl_proxy_headers": sslProxyHeadersObj}),
            ...(this.httpSecurityData?.httpSecuritySSLOptForceSSLForm &&{"ssl_redirect": this.httpSecurityData?.httpSecuritySSLOptForceSSLForm}),
            ...(this.httpSecurityData?.httpSecurityIncSubdomainForm &&{"sts_include_subdomains": this.httpSecurityData?.httpSecurityIncSubdomainForm}),
            ...(this.httpSecurityData?.httpSecurityHSTSForm &&{"sts_seconds": this.httpSecurityData?.httpSecurityHSTSForm})
          }}),
          ...((this.serviceSettingData?.isUrlRewriteActive || this.httpSecurityData?.isIpFilterActive || this.httpSecurityData?.isMultipleIdentityProviderActive) &&{"plugin/http-server": {
            "name": [
              this.serviceSettingData?.isUrlRewriteActive && 'url-rewrite',
              this.httpSecurityData?.isIpFilterActive && 'ip-filter',
              this.httpSecurityData?.isMultipleIdentityProviderActive && 'jwk-aggregator'
            ].filter(Boolean),
            ...(this.serviceSettingData?.isGeoIpActive &&{"geoip": {
              ...(this.serviceSettingData?.databasePath &&{"citydb_path":this.serviceSettingData?.databasePath})
            }}),
            ...(this.serviceSettingData?.isUrlRewriteActive && {"url-rewrite": {
              "literal": literalObj,
              "regexp": this.serviceSettingData?.regExpMatchObjectMapValue
            }}),
            ...(this.httpSecurityData?.isIpFilterActive && {"ip-filter": {
              ...(this.httpSecurityData?.ipFilterCIDRFormArray.length!=0 &&{"CIDR": this.httpSecurityData?.ipFilterCIDRFormArray}),
              "allow": this.httpSecurityData?.ipFilterAllowModeForm,
              ...(this.httpSecurityData?.ipFilterClientIPHeadersFormArray.length!=0 &&{"client_ip_headers": this.httpSecurityData?.ipFilterClientIPHeadersFormArray}),
              ...(this.httpSecurityData?.ipFilterTrustedProxiesFormArray.length!=0 &&{"trusted_proxies": this.httpSecurityData?.ipFilterTrustedProxiesFormArray})
            }}),
            ...(this.httpSecurityData?.isMultipleIdentityProviderActive &&{"jwk-aggregator": {
              ...(this.httpSecurityData?.multipleIdentityProviderCacheForm &&{"cache": this.httpSecurityData?.multipleIdentityProviderCacheForm}),
              ...(this.httpSecurityData?.multipleIdentityProviderOriginsFormArray.length!=0 &&{"origins": this.httpSecurityData?.multipleIdentityProviderOriginsFormArray}),
              ...(this.httpSecurityData?.multipleIdentityProviderPortForm &&{"port": this.httpSecurityData?.multipleIdentityProviderPortForm})
            }}),
            // "redis-ratelimit": {
            //   "burst": 0,
            //   "host": null,
            //   "period": null,
            //   "rate": 0,
            //   "tokenizer": null,
            //   "tokenizer_field": null
            // },
            // "static-filesystem": {
            //   "path": null,
            //   "prefix": null,
            //   "skip": [
            //     ''
            //   ]
            // },
            // "virtualhost": {
            //   "hosts": [
            //     ''
            //   ]
            // },
            // "wildcard": {
            //   "endpoints": {}
            // }
          }}),
          ...(this.openApiData?.isOpenApiActive && {"documentation/openapi": {
            ...(this.openApiData?.version && {"version": this.openApiData?.openApiVersionForm}),
            ...(this.openApiData?.openApiContactNameForm && {"contact_name": this.openApiData?.openApiContactNameForm}),
            ...(this.openApiData?.openApiContactEmailForm && {"contact_email": this.openApiData?.openApiContactEmailForm}),
            ...(this.openApiData?.openApiLicenseNameForm && {"license_name": this.openApiData?.openApiLicenseNameForm}),
            ...(this.openApiData?.openApiLicenseUrlForm && {"license_url": this.openApiData?.openApiLicenseUrlForm}),
            ...(this.openApiData?.openApiContactUrlForm && {"contact_url":this.openApiData?.openApiContactUrlForm}),
            ...(this.openApiData?.openApiHostForm && {"host": this.openApiData?.openApiHostForm}),
            ...(this.openApiData?.openApiBasePathForm && {"base_path": this.openApiData?.openApiBasePathForm}),
            ...(this.openApiData?.openApiDescriptionForm && {"description": this.openApiData?.openApiDescriptionForm}),
            ...(this.openApiData?.openApiTermsOfServiceForm && {"terms_of_service": this.openApiData?.openApiTermsOfServiceForm}),
            ...(this.openApiData?.openApiTagsFormArray.length!=0 && {"tags": this.openApiData?.openApiTagsFormArray}),
            ...(this.openApiData?.openApiSchemesFormArray.length!=0 && {"schemes": this.openApiData?.openApiSchemesFormArray})
          }}),
          ...(this.telemetryData?.isOpenTelActive && 
          {
            "telemetry/opentelemetry": {
            "id": this.telemetryData?.openTelId ? this.telemetryData?.openTelId:null,
            // "service_name": null,
            ...(this.telemetryData?.OTreportingPeriod &&{"metric_reporting_period": this.telemetryData?.OTreportingPeriod}),
            ...(this.telemetryData?.OTsampleRate &&{"trace_sample_rate": this.telemetryData?.OTsampleRate}),
            // "service_version": null,
            // "skip_paths": [
            //   ''
            // ],
            "exporters": {
              "id": this.telemetryData?.openTelExporterId ? this.telemetryData?.openTelExporterId:null,
              ...(this.telemetryData?.otlp.length!==0)&&{"otlp": this.telemetryData?.otlp},
              ...(this.telemetryData?.prometheus.length!==0)&&{"prometheus": this.telemetryData?.prometheus}
            },
            // "layers": {
            //   "global": {
            //     "disable_metrics": true,
            //     "disable_propagation": true,
            //     "disable_traces": true,
            //     "report_headers": true,
            //     "traces_static_attributes": [
            //       {}
            //     ],
            //     "metrics_static_attributes": [
            //       {}
            //     ]
            //   },
            //   "proxy": {
            //     "disable_metrics": true,
            //     "disable_traces": true,
            //     "report_headers": true,
            //     "traces_static_attributes": [
            //       {}
            //     ],
            //     "metrics_static_attributes": [
            //       {}
            //     ]
            //   },
            //   "backend": {
            //     "metrics": {
            //       "detailed_connection": true,
            //       "disable_stage": true,
            //       "read_payload": true,
            //       "round_trip": true,
            //       "static_attributes": [
            //         {}
            //       ]
            //     },
            //     "traces": {
            //       "detailed_connection": true,
            //       "disable_stage": true,
            //       "read_payload": true,
            //       "report_headers": true,
            //       "round_trip": true,
            //       "static_attributes": [
            //         {}
            //       ]
            //     }
            //   }
            // }
          }
        }
        ),
          ...(this.telemetryData?.isLoggingActive &&{"telemetry/logging": {
            ...(this.telemetryData?.logMsgFormat &&{"format": this.telemetryData?.logMsgFormat}),
            ...(this.telemetryData?.logSysLogFacility &&{"syslog_facility": this.telemetryData?.logSysLogFacility}),
            ...(this.telemetryData?.logginngLevel &&{"level": this.telemetryData?.logginngLevel}),
            ...(this.telemetryData?.loggingPrefix &&{"prefix": this.telemetryData?.loggingPrefix}),
            ...(this.telemetryData?.logSysLog &&{"syslog": this.telemetryData?.logSysLog}),
            ...(this.telemetryData?.logStdOut &&{"stdout": this.telemetryData?.logStdOut})
          }}),
          ...(this.telemetryData?.isGelfActive && {"telemetry/gelf": {
            ...(this.telemetryData?.GELFAdrress &&{"address": this.telemetryData?.GELFAdrress}),
            ...(this.telemetryData?.enableTCP &&{"enable_tcp": this.telemetryData?.enableTCP})
          }}),
          ...(this.apiMonetizationdata?.isApiMonetizationActive &&{"telemetry/moesif": {
            // "@comment": null,
            "application_id": this.apiMonetizationdata?.apiMonetizationAppIDForm,
            "user_id_headers": this.apiMonetizationdata?.apiMonetizationHeadersFormArray,
            "user_id_jwt_claim": this.apiMonetizationdata?.apiMonetizationClaimForm,
            // "identify_company": {
            //   "jwt_claim": null
            // },
            "debug": this.apiMonetizationdata?.apiMonetizationDebugForm,
            // "log_body": true,
            // "event_queue_size": 0,
            // "batch_size": 0,
            // "timer_wake_up_seconds": 0,
            // "request_body_masks": [
            //   ''
            // ],
            // "request_header_masks": [
            //   ''
            // ],
            // "response_body_masks": [
            //   ''
            // ],
            // "response_header_masks": [
            //   ''
            // ],
            // "should_skip": null
          }}),
          
          ...(this.telemetryData?.openCensusActive && 
            {
              "telemetry/opencensus": {
            // "enabled_layers": {
            //   "backend": true,
            //   "pipe": true,
            //   "router": true
            // },
            "exporters": {
              ...(this.telemetryData?.datadogActive && {
                "datadog": {
                  ...(this.telemetryData?.datadogNamespace) &&{"namespace": this.telemetryData?.datadogNamespace},
                  ...(this.telemetryData?.datadogService) &&{"service": this.telemetryData?.datadogService},
                  ...(this.telemetryData?.datadogTraceAdd) &&{"trace_address": this.telemetryData?.datadogTraceAdd},
                  ...(this.telemetryData?.datadogStatusAdd) &&{"stats_address": this.telemetryData?.datadogStatusAdd},
                  ...(this.telemetryData?.tagsArrayValue) &&{"tags": this.telemetryData?.tagsArrayValue},
                  ...(this.telemetryData?.globalTagsArrayValue &&{"global_tags": this.telemetryData?.globalTagsArrayValue}),
                  ...(this.telemetryData?.countPerBuckets &&{"disable_count_per_buckets": this.telemetryData?.countPerBuckets})
              },
              }),
              ...(this.telemetryData?.influxDBActive) &&{
              "influxdb": {
                ...(this.telemetryData?.influxDBaddress)&&{"address": this.telemetryData?.influxDBaddress},
                ...(this.telemetryData?.infulxDBdatabase) &&{"db": this.telemetryData?.infulxDBdatabase},
                // "username": null,
                // "password": null,
                ...(this.telemetryData?.influxwriteTimeout)&&{"timeout": this.telemetryData?.influxwriteTimeout}
              }
              },
              ...(this.telemetryData?.jaegerActive) && {
                "jeager":{
                //   "agent_endpoint": null,
                // "buffer_max_count": 0,
                ...(this.telemetryData?.jeagerEndpoint)&&{"endpoint": this.telemetryData?.jeagerEndpoint},
                ...(this.telemetryData?.jeagerServiceName)&&{"service_name": this.telemetryData?.jeagerServiceName}
                }
              },
              ...(this.telemetryData?.loggerActive &&
                {"logger": {
                // "spans": true,
                // "stats": true
              }}),
              ...(this.telemetryData?.openCensusAgentActive &&
                {"ocagent": {
                ...(this.telemetryData?.ocagentCollectorsAddress &&{"address": this.telemetryData?.ocagentCollectorsAddress}),
                ...(this.telemetryData?.ocagentEnableCompression &&{"enable_compression": this.telemetryData?.ocagentEnableCompression}),
                ...(this.telemetryData?.headerObjectMapValue&&{"headers": openCensusAGentObj}),
                ...(this.telemetryData?.ocagentInsecure &&{"insecure": this.telemetryData?.ocagentInsecure}),
                ...(this.telemetryData?.ocagentReconTime &&{"reconnection": this.telemetryData?.ocagentReconTime}),
                ...(this.telemetryData?.ocagentServiceName &&{"service_name": this.telemetryData?.ocagentServiceName})
              }}),
              ...(this.telemetryData?.prometheusActive &&{
                "prometheus": {
                // "namespace": null,
                "port": this.telemetryData?.prometheusPort,
                // "tag_host": true,
                // "tag_method": true,
                // "tag_path": true,
                // "tag_statuscode": true
              }}),
              ...(this.telemetryData?.googleStkActive &&{
                "stackdriver": {
                ...(this.telemetryData?.stkProjectID &&{"project_id": this.telemetryData?.stkProjectID}),
                ...(this.telemetryData?.objectMapValue &&{"default_labels": telStackDriverObj}),
                ...(this.telemetryData?.stkMetricsPrefix &&{"metric_prefix": this.telemetryData?.stkMetricsPrefix})
              }}),
              ...(this.telemetryData?.awsActice &&{
                "xray": {
                ...(this.telemetryData?.awsRegion &&{"region": this.telemetryData?.awsRegion}),
                ...(this.telemetryData?.awsService &&{"version": this.telemetryData?.awsService}),
                ...(this.telemetryData?.awsAccessKey &&{"access_key_id": this.telemetryData?.awsAccessKey}),
                ...(this.telemetryData?.awsSecretKey &&{"secret_access_key": this.telemetryData?.awsSecretKey}),
                ...(this.telemetryData?.useCredFromEnvActice &&{"use_env": this.telemetryData?.useCredFromEnvActice})
              }}),
              ...(this.telemetryData?.zipkinActive &&
              {"zipkin": {
                ...(this.telemetryData?.zipkincollectorURL)&& {"collector_url": this.telemetryData?.zipkincollectorURL},
                ...(this.telemetryData?.zipkinServiceName)&&{"service_name": this.telemetryData?.zipkinServiceName}
              }}),
              ...(this.telemetryData?.newRelicActive &&{
                "newrelic": {
                ...(this.telemetryData?.relicServiceName &&{"service_name": this.telemetryData?.relicServiceName}),
                ...(this.telemetryData?.relicApiKey &&{"api_key": this.telemetryData?.relicApiKey}),
                ...(this.telemetryData?.relicSpansURL &&{"spans_url": this.telemetryData?.relicSpansURL}),
                ...(this.telemetryData?.relicMetricsURL &&{"metrics_url": this.telemetryData?.relicMetricsURL}),
                ...(this.telemetryData?.relicsDebug &&{"debug": this.telemetryData?.relicsDebug})
              }})
            },
            "reporting_period": this.telemetryData?.OTreportingPeriod,
            "sample_rate": this.telemetryData?.OTsampleRate
          },
            }
          ),
          ...(this.telemetryData?.newRelicNativeSDKActive &&{"telemetry/newrelic": {
            ...(this.telemetryData?.newRelicSDKDebug &&{"debug": this.telemetryData?.newRelicSDKDebug}),
            ...(this.telemetryData?.headersToPassArrayValue.length!=0 &&{"headers_to_pass": this.telemetryData?.headersToPassArrayValue}),
            ...(this.telemetryData?.newRelicLicense &&{"license": this.telemetryData?.newRelicLicense})
          }}),
          ...(this.telemetryData?.isMetricsAPiActive &&{"telemetry/metrics": {
            ...(this.telemetryData?.metricsDisableBackend && {"backend_disabled": this.telemetryData?.metricsDisableBackend}),
            ...(this.telemetryData?.metricCollecTime && {"collection_time": this.telemetryData?.metricCollecTime}),
            ...(this.telemetryData?.metricsDisableEndpoint && {"endpoint_disabled": this.telemetryData?.metricsDisableEndpoint}),
            ...(this.telemetryData?.metricsListenAddress && {"listen_address": this.telemetryData?.metricsListenAddress}),
            ...(this.telemetryData?.metricsDisableProxy && {"proxy_disabled": this.telemetryData?.metricsDisableProxy}),
            ...(this.telemetryData?.metricsDisableRouter && {"router_disabled": this.telemetryData?.metricsDisableRouter})
          }})
        },
        ...(this.serviceSettingData?.httpReadTimeout && {"read_timeout": this.serviceSettingData?.httpReadTimeout}),
        ...(this.serviceSettingData?.httpWriteTimeout && {"write_timeout": this.serviceSettingData?.httpWriteTimeout}),
        ...(this.serviceSettingData?.httpIdleTimeout && {"idle_timeout": this.serviceSettingData?.httpIdleTimeout}),
        ...(this.serviceSettingData?.httpReadHeaderTimeout && {"read_header_timeout": this.serviceSettingData?.httpReadHeaderTimeout}),
        ...(this.serviceSettingData?.isHttpClientSetAdv && {
        ...(this.serviceSettingData?.httpClientSetAdvConnTimeoutForm &&{"idle_connection_timeout": this.serviceSettingData?.httpClientSetAdvConnTimeoutForm}),
        ...(this.serviceSettingData?.httpClientSetAdvHeaderTimeoutForm &&{"response_header_timeout": this.serviceSettingData?.httpClientSetAdvHeaderTimeoutForm}),
        ...(this.serviceSettingData?.httpClientSetAdvContinueTimeoutForm &&{"expect_continue_timeout": this.serviceSettingData?.httpClientSetAdvContinueTimeoutForm}),
        ...(this.serviceSettingData?.httpClientSetAdvMaxIdleConnForm &&{"max_idle_connections": this.serviceSettingData?.httpClientSetAdvMaxIdleConnForm}),
        ...(this.serviceSettingData?.httpClientSetAdvMaxIdleConnPerHostForm &&{"max_idle_connections_per_host": this.serviceSettingData?.httpClientSetAdvMaxIdleConnPerHostForm}),
        ...(this.serviceSettingData?.httpClientSetAdvAllowInsecureConnsForm &&{"client_tls": {
          "allow_insecure_connections": this.serviceSettingData?.httpClientSetAdvAllowInsecureConnsForm
        }}),
        ...(this.serviceSettingData?.httpClientSetAdvDisableKeepAlivesForm &&{"disable_keep_alives": this.serviceSettingData?.httpClientSetAdvDisableKeepAlivesForm}),
        ...(this.serviceSettingData?.httpClientSetAdvDisableCompressionForm &&{"disable_compression": this.serviceSettingData?.httpClientSetAdvDisableCompressionForm}),
        ...(this.serviceSettingData?.httpClientSetAdvDialerTimeoutForm &&{"dialer_timeout": this.serviceSettingData?.httpClientSetAdvDialerTimeoutForm}),
        ...(this.serviceSettingData?.httpClientSetAdvDialerFallerDelayForm &&{"dialer_fallback_delay": this.serviceSettingData?.httpClientSetAdvDialerFallerDelayForm}),
        ...(this.serviceSettingData?.httpClientSetAdvDialerKeepAliveForm &&{"dialer_keep_alive": this.serviceSettingData?.httpClientSetAdvDialerKeepAliveForm})
        }),
        
      
    }

    console.log(body);
  if(this.cardId==undefined){
this.apiPageService.createKrakend(body).subscribe({
  next:(res:any)=>{
    console.log(res);
    this._snackBar.open(res.message, 'OK', {
      duration: 5000
    });
    this.router.navigate(['apicards'])
  }
})
  }else{
this.apiPageService.updateKrakend(this.cardId,body).subscribe({
  next:(res:any)=>{
    console.log(res);
    this._snackBar.open(res.message, 'OK', {
      duration: 5000
    });
    this.router.navigate(['apicards'])
  },
  error:(err:any)=>{
    console.log(err);
    this._snackBar.open(err?.error?.error, 'OK', {
      duration: 5000
    });
  }
})
  }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      // data: {name: this.name, animal: this.animal},
      position: {
        top: '60px',
        right: '10px'
      }
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'profile-dialog',
  templateUrl: 'profile-dialog.html',
  styleUrls: ['./profile-dialog.css']
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly keyClokService:KeycloakService
  ) {}
  logout(){
    localStorage.clear();
    this.keyClokService.logout();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
