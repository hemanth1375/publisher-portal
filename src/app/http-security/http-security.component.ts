import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from '../services/shared-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-http-security',
  templateUrl: './http-security.component.html',
  styleUrl: './http-security.component.css'
})
export class HttpSecurityComponent {

  formGroupHttpSecurity: FormGroup;

  onToggleChangeStaticResponse(event: any, id: any) {
    console.log('id', id);
    (this as any)[id] = event.checked;
  }

  corsAllowedOriginsArray: any[] = [];
  corsAllowedHeadersArray: any[] = [];
  corsExposeHeadersArray: any[] = [];
  corsMaxAgeArray: any[] = [];
  botDetectorAllowArray: any[] = [];
  botDetectorDenyArray: any[] = [];
  botDetectorPatternsArray: any[] = [];
  multipleIdentityProviderOriginsArray: any[] = [];
  ipFilterCIDRArray: any[] = [];
  ipFilterTrustedProxiesArray: any[] = [];
  ipFilterClientIPHeadersArray: any[] = [];
  httpSecurityAllowedHostsArray: any[] = [];

  objectMap: Map<string, string> = new Map();
entireJsonData:any;
ngOnInit(){
  this.sharedService.getEntireJsonData$().subscribe(data=>{
    this.entireJsonData=data;
    
  })
console.log(this.entireJsonData);
if(this.entireJsonData!=undefined){
  this.corsAllowedOriginsArray=this.entireJsonData?.extra_config["security/cors"]?.allow_origins;
  this.corsAllowedHeadersArray=this.entireJsonData?.extra_config["security/cors"]?.allow_headers;
    this.corsExposeHeadersArray=this.entireJsonData?.extra_config["security/cors"]?.expose_headers;
    this.botDetectorAllowArray=this.entireJsonData?.extra_config["security/bot-detector"]?.allow;
    this.botDetectorDenyArray=this.entireJsonData?.extra_config["security/bot-detector"]?.deny;
    this.botDetectorPatternsArray=this.entireJsonData?.extra_config["security/bot-detector"]?.patterns;
    this.multipleIdentityProviderOriginsArray=this.entireJsonData?.extra_config["plugin/http-server"]["jwk-aggregator"]?.origins;
    this.ipFilterCIDRArray= this.entireJsonData?.extra_config["plugin/http-server"]["ip-filter"]?.CIDR;
    this.ipFilterTrustedProxiesArray= this.entireJsonData?.extra_config["plugin/http-server"]["ip-filter"]?.trusted_proxies;
    this.ipFilterClientIPHeadersArray= this.entireJsonData?.extra_config["plugin/http-server"]["ip-filter"]?.client_ip_headers;
    this.httpSecurityAllowedHostsArray=this.entireJsonData?.extra_config["security/http"]?.allowed_hosts;
    this.objectMap=this.entireJsonData?.extra_config["security/http"]?.ssl_proxy_headers;
}

this.formGroupHttpSecurity.patchValue({
  corsAllowedOriginsForm: '',
      corsAllowedHeadersForm: '',
      corsExposeHeadersForm: '',
      corsAllowCredentialsForm:this.entireJsonData?.extra_config["security/cors"]?.allow_credentials,
      corsMaxAgeForm: this.entireJsonData?.extra_config["security/cors"]?.max_age,
      botDetectorAllowForm: '',
      botDetectorDenyForm:'',
      botDetectorPatternsForm: '',
      botDetectorCacheSizeForm: this.entireJsonData?.extra_config["security/bot-detector"]?.cache_size,
      botDetectorEmptyUsersForm: this.entireJsonData?.extra_config["security/bot-detector"]?.empty_user_agent_is_bot,
      multipleIdentityProviderOriginsForm: '',
      multipleIdentityProviderPortForm: this.entireJsonData?.extra_config["plugin/http-server"]["jwk-aggregator"]?.port,
      multipleIdentityProviderCacheForm: this.entireJsonData?.extra_config["plugin/http-server"]["jwk-aggregator"]?.cache,
      ipFilterCIDRForm: '',
      ipFilterClientIPHeadersForm: '',
      ipFilterTrustedProxiesForm: '',
      ipFilterAllowModeForm: this.entireJsonData?.extra_config["plugin/http-server"]["ip-filter"]?.allow,
      httpSecurityAllowedHostsForm: '',
      httpSecuritySSLOptForceSSLForm: this.entireJsonData?.extra_config["security/http"]?.ssl_redirect,
      httpSecuritySSLOptForm: this.entireJsonData?.extra_config["security/http"]?.ssl_host,
      httpSecuritySSLOptPortForm: this.entireJsonData?.extra_config["security/http"]?.ssl_port,
      httpSecuritySSLProxyHeaderForm: '',
      httpSecurityHeaderValueForm: '',
      httpSecurityHSTSForm: this.entireJsonData?.extra_config["security/http"]?.sts_seconds,
      httpSecurityIncSubdomainForm: this.entireJsonData?.extra_config["security/http"]?.sts_include_subdomains,
      httpSecurityClickjackProtectForm: this.entireJsonData?.extra_config["security/http"]?.frame_deny,
      httpSecurityHPKPForm: this.entireJsonData?.extra_config["security/http"]?.hpkp_public_key,
      httpSecuritySniffingForm: this.entireJsonData?.extra_config["security/http"]?.content_type_nosniff,
      httpSecurityXSSProtectionForm: this.entireJsonData?.extra_config["security/http"]?.browser_xss_filter,
      httpSecurityConSecPolicyForm: this.entireJsonData?.extra_config["security/http"]?.content_security_policy,
      basicAuthHtpasswdPathForm: this.entireJsonData?.extra_config["auth/basic"]?.htpasswd_path,
      corsAllowedOriginsFormArray: this.entireJsonData?.extra_config["security/cors"]?.allow_origins,
      corsAllowedHeadersFormArray: this.entireJsonData?.extra_config["security/cors"]?.allow_headers,
      corsExposeHeadersFormArray: this.entireJsonData?.extra_config["security/cors"]?.expose_headers,
      corsMaxAgeFormArray: [[]],
      botDetectorAllowFormArray: this.entireJsonData?.extra_config["security/bot-detector"]?.allow,
      botDetectorDenyFormArray: this.entireJsonData?.extra_config["security/bot-detector"]?.deny,
      botDetectorPatternsFormArray: this.entireJsonData?.extra_config["security/bot-detector"]?.patterns,
      multipleIdentityProviderOriginsFormArray: this.entireJsonData?.extra_config["plugin/http-server"]["jwk-aggregator"]?.origins,
      ipFilterCIDRFormArray: this.entireJsonData?.extra_config["plugin/http-server"]["ip-filter"]?.CIDR,
      ipFilterTrustedProxiesFormArray:  this.entireJsonData?.extra_config["plugin/http-server"]["ip-filter"]?.trusted_proxies,
      ipFilterClientIPHeadersFormArray: this.entireJsonData?.extra_config["plugin/http-server"]["ip-filter"]?.client_ip_headers,
      httpSecurityAllowedHostsFormArray:  this.entireJsonData?.extra_config["security/http"]?.allowed_hosts,
      objectMapValue: [[]]
})
}



  updateMapControl() {
    // Convert Map to array of key-value pairs
    const mapArray = Array.from(this.objectMap.entries());
    this.formGroupHttpSecurity.get('objectMapValue')?.setValue(mapArray);
  }

  addToMap(key: string, value: string) {
    this.objectMap.set(key, value);
    this.updateMapControl();  // Sync form control with updated Map
  }
  removeFromMap(key: string) {
    this.objectMap.delete(key);
    this.updateMapControl();  // Sync form control with updated Map
  }





  addParameter(fieldName: 'corsAllowedOriginsForm' | 'corsAllowedHeadersForm' | 'corsExposeHeadersForm' | 'corsMaxAgeForm' | 'botDetectorAllowForm' | 'botDetectorDenyForm' | 'botDetectorPatternsForm' | 'multipleIdentityProviderOriginsForm' | 'ipFilterCIDRForm' | 'ipFilterTrustedProxiesForm' | 'ipFilterClientIPHeadersForm' | 'httpSecurityAllowedHostsForm' | 'httpSecurityHeaderAndHearValue') {
    const fieldValue = this.formGroupHttpSecurity.get(fieldName)?.value;

    if (fieldName) {
      if (fieldName === 'corsAllowedOriginsForm') {
        this.corsAllowedOriginsArray.push(fieldValue);
        this.formGroupHttpSecurity.get('corsAllowedOriginsFormArray')?.setValue([...this.corsAllowedOriginsArray]);
      }
      else if (fieldName === 'corsAllowedHeadersForm') {
        console.log(this.corsAllowedHeadersArray);
        
        this.corsAllowedHeadersArray.push(fieldValue);
        this.formGroupHttpSecurity.get('corsAllowedHeadersFormArray')?.setValue([...this.corsAllowedHeadersArray]);
      } else if (fieldName === 'corsExposeHeadersForm') {
        this.corsExposeHeadersArray.push(fieldValue);
        this.formGroupHttpSecurity.get('corsExposeHeadersFormArray')?.setValue([...this.corsExposeHeadersArray]);
      } else if (fieldName === 'corsMaxAgeForm') {
        this.corsMaxAgeArray.push(fieldValue);
        this.formGroupHttpSecurity.get('corsMaxAgeFormArray')?.setValue([...this.corsMaxAgeArray]);
      }
      else if (fieldName === 'botDetectorAllowForm') {
        this.botDetectorAllowArray.push(fieldValue);
        this.formGroupHttpSecurity.get('botDetectorAllowFormArray')?.setValue([...this.botDetectorAllowArray]);
      } else if (fieldName === 'botDetectorDenyForm') {
        this.botDetectorDenyArray.push(fieldValue);
        this.formGroupHttpSecurity.get('botDetectorDenyFormArray')?.setValue([...this.botDetectorDenyArray]);
      } else if (fieldName === 'botDetectorPatternsForm') {
        this.botDetectorPatternsArray.push(fieldValue);
        this.formGroupHttpSecurity.get('botDetectorPatternsFormArray')?.setValue([...this.botDetectorPatternsArray]);
      } else if (fieldName === 'multipleIdentityProviderOriginsForm') {
        this.multipleIdentityProviderOriginsArray.push(fieldValue);
        this.formGroupHttpSecurity.get('multipleIdentityProviderOriginsFormArray')?.setValue([...this.multipleIdentityProviderOriginsArray]);
      } else if (fieldName === 'ipFilterCIDRForm') {
        this.ipFilterCIDRArray.push(fieldValue);
        this.formGroupHttpSecurity.get('ipFilterCIDRFormArray')?.setValue([...this.ipFilterCIDRArray]);
      } else if (fieldName === 'ipFilterTrustedProxiesForm') {
        this.ipFilterTrustedProxiesArray.push(fieldValue);
        this.formGroupHttpSecurity.get('ipFilterTrustedProxiesFormArray')?.setValue([...this.ipFilterTrustedProxiesArray]);
      } else if (fieldName === 'ipFilterClientIPHeadersForm') {
        this.ipFilterClientIPHeadersArray.push(fieldValue);
        this.formGroupHttpSecurity.get('ipFilterClientIPHeadersFormArray')?.setValue([...this.ipFilterClientIPHeadersArray]);
      } else if (fieldName === 'httpSecurityAllowedHostsForm') {
        this.httpSecurityAllowedHostsArray.push(fieldValue);
        this.formGroupHttpSecurity.get('httpSecurityAllowedHostsFormArray')?.setValue([...this.httpSecurityAllowedHostsArray]);
      } else if (fieldName === 'httpSecurityHeaderAndHearValue') {
        console.log("clicked");

        const originalObject = this.formGroupHttpSecurity.get('httpSecuritySSLProxyHeaderForm')?.value;
        const renamedObject = this.formGroupHttpSecurity.get('httpSecurityHeaderValueForm')?.value;

        if (originalObject && renamedObject) {
          this.addToMap(originalObject, renamedObject)
          console.log(this.objectMap);

        }
      }

    }
    this.formGroupHttpSecurity.get(fieldName)?.reset();

  }

  removeParameter(index: any, fieldName: 'corsAllowedOriginsForm' | 'corsAllowedHeadersForm' | 'corsExposeHeadersForm' | 'corsMaxAgeForm' | 'botDetectorAllowForm' | 'botDetectorDenyForm' | 'botDetectorPatternsForm' | 'multipleIdentityProviderOriginsForm' | 'ipFilterCIDRForm' | 'ipFilterTrustedProxiesForm' | 'ipFilterClientIPHeadersForm' | 'httpSecurityAllowedHostsForm' | 'httpSecurityHeaderAndHearValue') {
    if (fieldName === "corsAllowedOriginsForm") {
      this.corsAllowedOriginsArray.splice(index, 1);
      this.formGroupHttpSecurity.get('corsAllowedOriginsFormArray')?.setValue([...this.corsAllowedOriginsArray]);
    } else if (fieldName === "corsAllowedHeadersForm") {
      this.corsAllowedHeadersArray.splice(index, 1);
      this.formGroupHttpSecurity.get('corsAllowedHeadersFormArray')?.setValue([...this.corsAllowedHeadersArray]);
    } else if (fieldName === "corsExposeHeadersForm") {
      this.corsExposeHeadersArray.splice(index, 1);
      this.formGroupHttpSecurity.get('corsExposeHeadersFormArray')?.setValue([...this.corsExposeHeadersArray]);
    } else if (fieldName === "corsMaxAgeForm") {
      this.corsMaxAgeArray.splice(index, 1);
      this.formGroupHttpSecurity.get('corsMaxAgeFormArray')?.setValue([...this.corsMaxAgeArray]);
    } else if (fieldName === "botDetectorAllowForm") {
      this.botDetectorAllowArray.splice(index, 1);
      this.formGroupHttpSecurity.get('botDetectorAllowFormArray')?.setValue([...this.botDetectorAllowArray]);
    } else if (fieldName === "botDetectorDenyForm") {
      this.botDetectorDenyArray.splice(index, 1);
      this.formGroupHttpSecurity.get('botDetectorDenyFormArray')?.setValue([...this.botDetectorDenyArray]);
    } else if (fieldName === "botDetectorPatternsForm") {
      this.botDetectorPatternsArray.splice(index, 1);
      this.formGroupHttpSecurity.get('botDetectorPatternsFormArray')?.setValue([...this.botDetectorPatternsArray]);
    } else if (fieldName === "multipleIdentityProviderOriginsForm") {
      this.multipleIdentityProviderOriginsArray.splice(index, 1);
      this.formGroupHttpSecurity.get('multipleIdentityProviderOriginsFormArray')?.setValue([...this.multipleIdentityProviderOriginsArray]);
    } else if (fieldName === "ipFilterCIDRForm") {
      this.ipFilterCIDRArray.splice(index, 1);
      this.formGroupHttpSecurity.get('ipFilterCIDRFormArray')?.setValue([...this.ipFilterCIDRArray]);
    } else if (fieldName === "ipFilterTrustedProxiesForm") {
      this.ipFilterTrustedProxiesArray.splice(index, 1);
      this.formGroupHttpSecurity.get('ipFilterTrustedProxiesFormArray')?.setValue([...this.ipFilterTrustedProxiesArray]);
    } else if (fieldName === "ipFilterClientIPHeadersForm") {
      this.ipFilterClientIPHeadersArray.splice(index, 1);
      this.formGroupHttpSecurity.get('ipFilterClientIPHeadersFormArray')?.setValue([...this.ipFilterClientIPHeadersArray]);
    } else if (fieldName === "httpSecurityAllowedHostsForm") {
      this.httpSecurityAllowedHostsArray.splice(index, 1);
      this.formGroupHttpSecurity.get('httpSecurityAllowedHostsFormArray')?.setValue([...this.httpSecurityAllowedHostsArray]);
    } else if (fieldName == "httpSecurityHeaderAndHearValue") {
      this.removeFromMap(index);
    }
  }





  constructor(private formBuilder: FormBuilder,private sharedService:SharedDataService,private _snackBar: MatSnackBar ) {
    this.formGroupHttpSecurity = this.formBuilder.group({
      isCorsActive:[false],
      isBotDetectorActive:[false], 
      isMultipleIdentityProviderActive:[false] ,
      isIpFilterActive:[false],
      isHttpSecurityActive:[false],
      isBasicAuthActive:[false],
      corsAllowedOriginsForm: [null],
      corsAllowedHeadersForm: [null],
      corsExposeHeadersForm: [null],
      corsAllowCredentialsForm: [false],
      corsMaxAgeForm: [null],
      botDetectorAllowForm: [null],
      botDetectorDenyForm: [null],
      botDetectorPatternsForm: [null],
      botDetectorCacheSizeForm: [null],
      botDetectorEmptyUsersForm: [false],
      multipleIdentityProviderOriginsForm: [null],
      multipleIdentityProviderPortForm: [null],
      multipleIdentityProviderCacheForm: [false],
      ipFilterCIDRForm: [null],
      ipFilterClientIPHeadersForm: [null],
      ipFilterTrustedProxiesForm: [null],
      ipFilterAllowModeForm: [false],
      httpSecurityAllowedHostsForm: [null],
      httpSecuritySSLOptForceSSLForm: [false],
      httpSecuritySSLOptForm: [null],
      httpSecuritySSLOptPortForm: [null],
      httpSecuritySSLProxyHeaderForm: [null],
      httpSecurityHeaderValueForm: [null],
      httpSecurityHSTSForm: [null],
      httpSecurityIncSubdomainForm: [false],
      httpSecurityClickjackProtectForm: [false],
      httpSecurityHPKPForm: [null],
      httpSecuritySniffingForm: [false],
      httpSecurityXSSProtectionForm: [false],
      httpSecurityConSecPolicyForm: [null],
      basicAuthHtpasswdPathForm: [null],
      corsAllowedOriginsFormArray: [[]],
      corsAllowedHeadersFormArray: [[]],
      corsExposeHeadersFormArray: [[]],
      corsMaxAgeFormArray: [[]],
      botDetectorAllowFormArray: [[]],
      botDetectorDenyFormArray: [[]],
      botDetectorPatternsFormArray: [[]],
      multipleIdentityProviderOriginsFormArray: [[]],
      ipFilterCIDRFormArray: [[]],
      ipFilterTrustedProxiesFormArray: [[]],
      ipFilterClientIPHeadersFormArray: [[]],
      httpSecurityAllowedHostsFormArray: [[]],
      objectMapValue: [[]]
    })
  }
  emitValue(){
    console.log(this.formGroupHttpSecurity.value);
    if(this.formGroupHttpSecurity.valid){
      this._snackBar.open('Saved Successfully', 'OK', {
        duration: 5000
      });
      
  this.sharedService.setHttpSecurityData(this.formGroupHttpSecurity.value)
    }
 
  }

} 
