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
  
  upstreamAuthData:any;
  upstreamPoliciesData:any;
  upstreamRequestData:any;
  upstreamThrottlingData:any;
  upstreamResponseData:any;
  upstreamConnectivityData:any;
  selectedItem: any;

  @Input() formData:any
  @Output() backendUpStreamSubmitted = new EventEmitter<any>();


onFormChange(form:any,updatedData:any){
  switch(form){
    case 'upstreamRequest': this.upstreamRequestData = updatedData;break;
    case 'upstreamResponse': this.upstreamResponseData = updatedData;break;
    case 'upstreamAuth': this.upstreamAuthData = updatedData;break;
    case 'upstreamThrottling': this.upstreamThrottlingData = updatedData;break;
    case 'upstreamPolicies': this.upstreamPoliciesData = updatedData;break;
    case 'upstreamConnectivity': this.upstreamConnectivityData = updatedData;break;
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
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private dataService: ViewapiPageService,private router:Router,private _snackBar: MatSnackBar) {
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
  isUpdate:boolean=false;
  ngOnInit() {
    this.selectedItem = this.items[0];
    console.log(this.formData);
    if(this.formData?.backend?.[0].id){
this.isUpdate=true;
    }else{
      this.isUpdate=false;
    }
    this.upstreamRequestData=this.formData;
    this.upstreamAuthData=this.formData;
    this.upstreamPoliciesData=this.formData;
    this.upstreamResponseData=this.formData;
    this.upstreamThrottlingData=this.formData;
    this.upstreamConnectivityData=this.formData;
    
    
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
      'upstreamAuthData':this.upstreamAuthData,
      'upstreamPoliciesData':this.upstreamPoliciesData,
      'upstreamRequestData':this.upstreamRequestData,
      'upstreamThrottlingData':this.upstreamThrottlingData,
      'upstreamResponseData':this.upstreamResponseData,
      'upstreamConnectivityData':this.upstreamConnectivityData
    }
    const renamingObj = this.upstreamResponseData?.objectMapValue?.reduce((acc:any, [key, value]:any) => {
      acc[key] = value;
      return acc;
    }, {});
    const inputMapObj = this.upstreamConnectivityData?.objectMapValue?.reduce((acc:any, [key, value]:any) => {
      acc[key] = value;
      return acc;
    }, {});
console.log(obj);
console.log(this.formData?.backend?.[0]?.id);
console.log(this.formData?.backend?.[0]?.extra_config?.id);


const body= {
  "id": this.formData?.backend?.[0]?.id ? this.formData?.backend?.[0]?.id: null,
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
    "id": this.formData?.backend?.[0]?.extra_config?.id ? this.formData?.backend?.[0]?.extra_config?.id: null,
    "qos/circuit-breaker": {
      "interval": this.upstreamAuthData?.interval,
      "name": this.upstreamAuthData?.circuitBreakerName,
      "timeout":  this.upstreamAuthData?.timeout,
      "max_errors": this.upstreamAuthData?.maxError,
      "log_status_change": this.upstreamAuthData?.logStatusChange
    },
    "plugin/req-resp-modifier": {
      "name": [
        "content-replacer"
      ],
      "content-replacer": this.upstreamResponseData?.contentReplacer
    },
    "qos/ratelimit/proxy": {
      "max_rate": this.upstreamAuthData?.maxRateLimit,
      "capacity": this.upstreamAuthData?.capacity
    },
    "qos/http-cache": {
      "shared": this.upstreamResponseData?.isSharedCacheActive
    },
    "backend/graphql": {
      "type": this.upstreamConnectivityData?.restTographQLOpTypeForm,
      "query": this.upstreamConnectivityData?.restTographQLInlineQueryForm,
      "variables": {}
    },
    "backend/soap": {
      "@comment": null,
      "path": this.upstreamConnectivityData?.pathRestToSoapForm
    },
    "backend/grpc": {
      "input_mapping": inputMapObj,
      "response_naming_convention": this.upstreamConnectivityData?.restTogrpcResNamingConventionForm,
      "output_enum_as_string": this.upstreamConnectivityData?.restTogrpcEnumsAsStrgsForm,
      "output_timestamp_as_string": this.upstreamConnectivityData?.restTogrpcTimestmpAsStrgsForm,
      "output_duration_as_string": this.upstreamConnectivityData?.restTogrpcDurationAsStrgsForm,
      "client_tls": {
        "allow_insecure_connections": true
      },
      "output_remove_unset_values": this.upstreamConnectivityData?.restTogrpcRemoveUnsetValForm,
      "use_request_body": this.upstreamConnectivityData?.restTogrpcUseReqBodyForm
    },
    "backend/static-filesystem": {
      "directory_listing": this.upstreamRequestData?.directory_Listing,
      "path": this.upstreamRequestData?.staticUrl
    }
  },
  "target": null,
  "method": this.upstreamRequestData?.method,
  "deny": [
    ''
  ],
  "@comment": null,
  "@test_with": null,
  "disable_host_sanitize": true
}

if(this.formData?.backend?.[0].id){
  const id=this.formData?.backend?.[0].id
  this.dataService.updatebackend(id,body).subscribe({
    next:(res:any)=>{
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
