import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-telemetry',
  templateUrl: './telemetry.component.html',
  styleUrl: './telemetry.component.css'
})
export class TelemetryComponent {
  tagsArray:any[]=[];
  globalTagsArray:any[]=[];
  headersToPassArray:any[]=[];
  objectMap: Map<string, string> = new Map();
  headerObjectMap:Map<string, string> = new Map();

  TelemertyFormGroup:FormGroup;

  constructor(private fb:FormBuilder){
    this.TelemertyFormGroup = this.fb.group({
      isLoggingActive:[false],
      logginngLevel:[],
      loggingPrefix:[],
      enableLogstash:[false],
      logMsgFormat:[],
      logStdOut:[false],
      logSysLog:[false],
      logSysLogFacility:[],
      isGelfActive:[false],
      GELFAdrress:[],
      enableTCP:[false],
      isOpenTelActive:[false],
      OTsampleRate:[],
      OTreportingPeriod:[],
      isMetricsAPiActive:[false],
      metricsDisableEndpoint:[],
      metricsDisableProxy:[],
      metricsDisableRouter:[],
      metricsDisableBackend:[],
      metricsListenAddress:[],
      metricCollecTime:[],
      openCensusActive:[true],
      otlp:this.fb.array([]),
      prometheus:this.fb.array([]),
      prometheusActive:[false],
      influxDBActive:[false],  
      jaegerActive:[false],
      zipkinActive:[false],
      loggerActive:[false],
      newRelicActive:[false],
      datadogActive:[true],
      googleStkActive:[false],
      awsActice:[false],
      openCensusAgentActive:[false],
      OCsampleRate:[],
      OCreportingPeriod:[],
      zipkincollectorURL:[],
      zipkinServiceName:[],
      jeagerEndpoint:[],
      jeagerServiceName:[],
      influxDBaddress:[],
      infulxDBdatabase:[],
      influxwriteTimeout:[],
      port:[],
      prometheusPort:[],
      useCredFromEnvActice:[],
      awsRegion:[],
      awsService:[],
      awsAccessKey:[],
      awsSecretKey:[],
      stkMetricsPrefix:[],
      stkProjectID:[],
      labelName:[],
      labelValue:[],
      objectMapValue:[[]],
      datadogNamespace:[],
      datadogService:[],
      datadogTraceAdd:[],
      datadogStatusAdd:[],
      datadogTag:[],
      tagsArrayValue:[[]],
      globalTag:[],
      globalTagsArrayValue:[[]],
      countPerBuckets:[false],
      relicServiceName:[],
      relicApiKey:[],
      relicSpansURL:[],
      relicMetricsURL:[],
      relicsDebug:[false],
      ocagentCollectorsAddress:[],
      ocagentServiceName:[],
      ocagentReconTime:[],
      ocagentInsecure:[],
      ocagentEnableCompression:[],
      headerKey:[],
      headerValue:[],
      headerObjectMapValue:[],
      newRelicNativeSDKActive:[false],
      newRelicLicense:[],
      newRelicSDKDebug:[false],
      headersToPass:[],
      headersToPassArrayValue:[[]]
    });
  
  }

 
  addParameter(fieldName: 'label' | 'datadogTag'| 'globalTag'|'header'|'headersToPass') {
    const fieldValue = this.TelemertyFormGroup.get(fieldName)?.value;

    if (fieldName) {
      if(fieldName === 'label'){
        const labelName = this.TelemertyFormGroup.get('labelName')?.value;
        const labelValue = this.TelemertyFormGroup.get('labelValue')?.value;

        if (labelName && labelValue) {
          this.addToMap(labelName, labelValue, fieldName)
        }
      }else if(fieldName ==='header'){
        const headerKey = this.TelemertyFormGroup.get('headerKey')?.value;
        const headerValue = this.TelemertyFormGroup.get('headerValue')?.value;

        if (headerKey && headerValue) {
          this.addToMap(headerKey, headerValue, fieldName)
        }

      }else if(fieldName === 'datadogTag'){
        this.tagsArray.push(fieldValue);
        this.TelemertyFormGroup.get('tagsArrayValue')?.setValue([...this.tagsArray])
      } else if(fieldName === 'globalTag'){
        this.globalTagsArray.push(fieldValue);
        this.TelemertyFormGroup.get('globalTagsArrayValue')?.setValue([...this.globalTagsArray])
      }else if(fieldName === 'headersToPass'){
        this.headersToPassArray.push(fieldValue)
        this.TelemertyFormGroup.get('headersToPassArrayValue')?.setValue([...this.headersToPassArray])
      }

      this.TelemertyFormGroup.get(fieldName)?.reset();
    }
  }

  removeParameter(index: any, fieldName:'label' | 'datadogTag' | 'globalTag' |'header'| 'headersToPass') {
    if(fieldName === 'label'){
     this.removeFromMap(index,fieldName);
    }else if(fieldName === 'datadogTag'){
      this.tagsArray.splice(index,1);
      this.TelemertyFormGroup.get('tagsArrayValue')?.setValue([...this.tagsArray]);
    }else if(fieldName === 'globalTag'){
      this.globalTagsArray.splice(index, 1);
      this.TelemertyFormGroup.get('globalTagsArrayValue')?.setValue([...this.globalTagsArray])
    }else if(fieldName === 'headersToPass'){
      this.headersToPassArray.splice(index,1);
      this.TelemertyFormGroup.get('headersToPassArrayValue')?.setValue([...this.headersToPassArray])
    }

  }

  
  updateMapControl(which:any) {

    // Convert Map to array of key-value pairs
    if(which ==='label'){
      const mapArray:any = Array.from(this.objectMap.entries());
      this.TelemertyFormGroup.get('objectMapValue')?.setValue(mapArray);
    }else if(which ==='header'){
      const mapArray:any = Array.from(this.headerObjectMap.entries());
      this.TelemertyFormGroup.get('headerObjectMapValue')?.setValue(mapArray);
    }
   
  }
  
  addToMap(key: string, value: string, which:any) {

    if(which ==='label'){
      this.objectMap.set(key, value);
      this.updateMapControl(which);
    }else if(which ==='header'){
      this.headerObjectMap.set(key, value);
      this.updateMapControl(which);
    }
     // Sync form control with updated Map
  }
  
  removeFromMap(key: string, which:any) {
    if(which ==='label'){
      this.objectMap.delete(key);
      this.updateMapControl(which);
    }else if(which ==='header'){
      this.headerObjectMap.delete(key);
      this.updateMapControl(which);
    }
      // Sync form control with updated Map
  }

  getMapFromControl(): Map<string, string> {
    const mapArray = this.TelemertyFormGroup.get('objectMapValue')?.value || [];
    return new Map(mapArray);
  }

  createOtlpConfigGroup(): FormGroup {
    return this.fb.group({
      name: ['otlp_exporter', Validators.required],
      host: ['otlp.yourprovider.net', Validators.required],
      port: [4317, Validators.required],
      use_http: [false],
      disable_metrics: [false],
      disable_traces: [false],
    });
  }

  createPrometheusConfigGroup():FormGroup{
    return this.fb.group({
      promethusName:[],
      promethusPort:[]
    })
  }

  get otlpArray():FormArray {
    return this.TelemertyFormGroup.get('otlp') as FormArray;
  }

  get prometheusArray():FormArray {
    return this.TelemertyFormGroup.get('prometheus') as FormArray;
  }

  addOtlpConfig() {
    this.otlpArray.push(this.createOtlpConfigGroup());
  }
  
  addPromethusConfig() {
    this.prometheusArray.push(this.createPrometheusConfigGroup());
  }

  removePromethusConfig(index: number) {
    this.prometheusArray.removeAt(index);
  }

  removeOtlpConfig(index: number) {
    this.otlpArray.removeAt(index);
  }


}
