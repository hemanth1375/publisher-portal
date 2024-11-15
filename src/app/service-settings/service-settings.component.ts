import { Component, EventEmitter, HostListener, Injectable, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiPageService } from '../services/api-page.service';
import { ApicardsService } from '../services/apicards.service';
import { SharedDataService } from '../services/shared-data.service';


@Component({
  selector: 'app-service-settings',
  templateUrl: './service-settings.component.html',
  styleUrl: './service-settings.component.css'
})
export class ServiceSettingsComponent {

  formGroupService:FormGroup;
  objectMap: Map<string, string> = new Map();
  regExpObjectMap: Map<string, string> = new Map();
  @Input() formData: any;
  @Output() serviceSettingsFormSubmitted=new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder,private apiPageService:ApiPageService,private apiCardsService:ApicardsService, private sharedService:SharedDataService){
    this.formGroupService=this.formBuilder.group({
      name:[null],
      port:[null],
      host:[null],
      hostArrayValue:[[]],
      directory:[],
      directoryArrayValue:[[]],
      virtualHost:[],
      virtualHostArrayValue:[[]],
      backendTimeout:[null],
      defaultCache:[null],
      disablegZip:[true],
      httpReadTimeout:[null],
      httpWriteTimeout:[null],
      httpIdleTimeout:[null],
      httpReadHeaderTimeout:[null],
      defaultOutputEncoding:[null],
      nonRestfulResource:[null],
      serverSequential:[null],
      enableDebugOptions:[null],
      sharedCacheDuration:[null],
      privateKey:[null],
      publicKey:[null],
      literalReplacement:[null],
      literalMatch:[null],
      regexpMatch:[null],
      endpointReplacement:[null],
      databasePath:[null],
      staticServerPath:[null],
      staticServerPrefix:[null],
      directoryList:[true],
      rateLimit:[null],
      every:[null], 
      capacity:[null],
      defaultUserQuota:[null],
      clientCapacity:[null],
      literalMatchObjectMapValue:[[]],
      regExpMatchObjectMapValue:[[]],
    })
  }
  isEnableHttpsActive=false;
  isUrlRewriteActive=false;
  isVirtualHostActive=false;
  isGeoIpActive=false;
  isStaticServerActive=false;
  isRateLimitingActive=false;
  onToggleChangeStaticResponse(event: any, id:any) {
    console.log('id', id);
    (this as any)[id] = event.checked;  
  }
hostArray:any=[];
directoryArray:any=[];
virtualHostArray:any=[];

updateMapControl() {
  // Convert Map to array of key-value pairs
  const mapArray = Array.from(this.objectMap.entries());
  this.formGroupService.get('literalMatchObjectMapValue')?.setValue(mapArray);
}

addToMap(key: any, value: string) {
  this.objectMap.set(key, value);
  this.updateMapControl();  // Sync form control with updated Map
}

removeFromMap(key: any) {
  this.objectMap.delete(key);
  this.updateMapControl();  // Sync form control with updated Map
}

// regexp add
updateMapControlRegExp() {
  // Convert Map to array of key-value pairs
  const mapArray = Array.from(this.regExpObjectMap.entries());
  this.formGroupService.get('regExpMatchObjectMapValue')?.setValue(mapArray);
}

addToMapRegExp(key: any, value: string) {
  this.regExpObjectMap.set(key, value);
  this.updateMapControlRegExp();  // Sync form control with updated Map
}

removeFromMapRegExp(key: any) {
  this.regExpObjectMap.delete(key);
  this.updateMapControlRegExp();  // Sync form control with updated Map
}

  addParameter(fieldName: 'host' | 'directory' | 'virtualHost' | 'literalMatch' |'regExpMatch') {
    const fieldValue = this.formGroupService.get(fieldName)?.value;

    if (fieldName) {
      if(fieldName === 'host'){
        this.hostArray.push(fieldValue);
        this.formGroupService.get('hostArrayValue')?.setValue([...this.hostArray]);
      }
      else if(fieldName === 'directory'){
        this.directoryArray.push(fieldValue);
        this.formGroupService.get('directoryArrayValue')?.setValue([...this.directoryArray]);
      } else if(fieldName === 'virtualHost'){
        this.virtualHostArray.push(fieldValue);
        this.formGroupService.get('virtualHostArrayValue')?.setValue([...this.virtualHostArray]);
      }else if(fieldName === 'literalMatch'){
        const originalObject = this.formGroupService.get('literalMatch')?.value;
        const renamedObject = this.formGroupService.get('literalReplacement')?.value;

        if (originalObject && renamedObject) {
          this.addToMap(originalObject, renamedObject)
        }
      }else if(fieldName === 'regExpMatch'){
        const originalObject = this.formGroupService.get('regexpMatch')?.value;
        const renamedObject = this.formGroupService.get('endpointReplacement')?.value;

        if (originalObject && renamedObject) {
          this.addToMapRegExp(originalObject, renamedObject)
        }
      }
      this.formGroupService.get('literalMatch')?.reset();
      this.formGroupService.get('literalReplacement')?.reset();
      this.formGroupService.get('regexpMatch')?.reset();
      this.formGroupService.get('endpointReplacement')?.reset();
      this.formGroupService.get(fieldName)?.reset();
    }
  }

  removeParameter(index: any, fieldName:'host'| 'directory'| 'virtualHost' | 'literalMatch' | 'regExpMatch') {
    if(fieldName === "host"){
      this.hostArray.splice(index,1);
      this.formGroupService.get('hostArrayValue')?.setValue([...this.hostArray]);
    }
    else if(fieldName === "directory"){
      this.directoryArray.splice(index,1);
      this.formGroupService.get('directoryArrayValue')?.setValue([...this.directoryArray]);
    }
    else if(fieldName === 'virtualHost'){
      this.virtualHostArray.splice(index,1);
      this.formGroupService.get('virtualHostArrayValue')?.setValue([...this.virtualHostArray]);
    }else if(fieldName === 'literalMatch'){
      this.removeFromMap(index);
     }else if(fieldName === 'regExpMatch'){
      this.removeFromMapRegExp(index);
     }
    
  }

  apiData:any;
  entireJsondata:any;
  ngOnInit(){

    this.sharedService.getEntireJsonData$().subscribe(data=>{
      this.entireJsondata=data;
      
    })
console.log(this.entireJsondata);
console.log(this.entireJsondata?.extra_config["server/static-filesystem"]?.prefix);

this.hostArray=this.entireJsondata?.host
this.formGroupService.patchValue({
  name:this.entireJsondata?.name,
  port:this.entireJsondata?.port,
  hostArrayValue:this.entireJsondata?.host,
  backendTimeout:this.entireJsondata?.timeout,
  defaultCache:this.entireJsondata?.cache_ttl,
  directoryArrayValue:this.entireJsondata?.extra_config?.grpc?.catalog,
  staticServerPrefix:this.entireJsondata?.extra_config["server/static-filesystem"]?.prefix,
  staticServerPath:this.entireJsondata?.extra_config["server/static-filesystem"]?.path,
  directoryList:this.entireJsondata?.extra_config["server/static-filesystem"]?.directory_listing,
  disableZip:this.entireJsondata?.extra_config?.router?.disable_gzip,
  databasePath:this.entireJsondata?.extra_config["plugin/http-server"]?.geoip.citydb_path,
  // literalMatchObjectMapValue:this.entireJsondata["plugin/http-server"]["url-rewrite"]?.literal,
  // regExpMatchObjectMapValue:this.entireJsondata["plugin/http-server"]["url-rewrite"]?.regexp,
  publicKey:this.entireJsondata?.tls?.public_key,
  privateKey:this.entireJsondata?.tls?.private_key,
  httpReadTimeout:this.entireJsondata?.read_timeout,
  httpWriteTimeout:this.entireJsondata?.write_timeout,
  httpIdleTimeout:this.entireJsondata?.idle_timeout,
  httpReadHeaderTimeout:this.entireJsondata?.read_header_timeout

})

    this.formGroupService.valueChanges.subscribe(value => {
      console.log(value);
      
      this.serviceSettingsFormSubmitted.emit(value); 
    });
    this.apiCardsService.getData$().subscribe(data => {
      this.apiData = data;

    });
    console.log(this.apiData);
  }

  submitForm(){
    const body={
      "$schema": "string",
      "version": 0,
      "name": this.formGroupService.get('name')?.value,
      "port": 0,
      "host": [
        "string"
      ]
    }
this.apiPageService.createKrakend(body).subscribe({
  next:(res:any)=>{
    console.log(res);
    
  }
})
  }
  emitValue(){
    // this.serviceSettingsFormSubmitted.emit(this.formGroupService.value);
    console.log(this.formGroupService.value);
    // this.formGroupService.get('literalMatchObjectMapValue')?.value.map((item:any,index:any)=>{
    //  return item
      
    // })
    // const val=this.formGroupService.get('literalMatchObjectMapValue')?.value;
    
    
    this.sharedService.setServiceSettingData(this.formGroupService.value)
  }

}
