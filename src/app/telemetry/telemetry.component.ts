import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from '../services/shared-data.service';

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

  constructor(private fb:FormBuilder,private sharedService:SharedDataService){
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
      metricsDisableEndpoint:[false],
      metricsDisableProxy:[false],
      metricsDisableRouter:[false],
      metricsDisableBackend:[false],
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
entireJsonData:any
  ngOnInit(){
    this.sharedService.getEntireJsonData$().subscribe(data=>{
      this.entireJsonData=data;
      
    })
console.log(this.entireJsonData);
this.tagsArray=this.entireJsonData?.extra_config?.["telemetry/opencensus"]?.exporters?.datadog?.tags;
this.headersToPassArray=this.entireJsonData?.extra_config?.["telemetry/newrelic"]?.headers_to_pass;
this.TelemertyFormGroup.patchValue({
  isLoggingActive:[false],
  logginngLevel:this.entireJsonData?.extra_config?.["telemetry/logging"]?.level,
  loggingPrefix:this.entireJsonData?.extra_config?.["telemetry/logging"]?.prefix,
  enableLogstash:[false],
  logMsgFormat:this.entireJsonData?.extra_config?.["telemetry/logging"]?.custom_format,
  logStdOut:this.entireJsonData?.extra_config?.["telemetry/logging"]?.stdout,
  logSysLog:this.entireJsonData?.extra_config?.["telemetry/logging"]?.syslog,
  logSysLogFacility:this.entireJsonData?.extra_config?.["telemetry/logging"]?.syslog_facility,
  isGelfActive:[false],
      GELFAdrress:[],
      enableTCP:[false],
      isOpenTelActive:[false],
      OTsampleRate:this.entireJsonData?.extra_config?.["telemetry/opentelemetry"]?.trace_sample_rate,
      OTreportingPeriod:this.entireJsonData?.extra_config?.["telemetry/opentelemetry"]?.metric_reporting_period,
      isMetricsAPiActive:[false],
      metricsDisableEndpoint:this.entireJsonData?.extra_config?.["telemetry/metrics"]?.endpoint_disabled,
      metricsDisableProxy:this.entireJsonData?.extra_config?.["telemetry/metrics"]?.proxy_disabled,
      metricsDisableRouter:this.entireJsonData?.extra_config?.["telemetry/metrics"]?.router_disabled,
      metricsDisableBackend:this.entireJsonData?.extra_config?.["telemetry/metrics"]?.backend_disabled,
      metricsListenAddress:this.entireJsonData?.extra_config?.["telemetry/metrics"]?.listen_address,
      metricCollecTime:this.entireJsonData?.extra_config?.["telemetry/metrics"]?.collection_time,
      openCensusActive:[true],
      otlp:this.entireJsonData?.extra_config?.["telemetry/opentelemetry"]?.exporters?.otlp,
      prometheus:this.entireJsonData?.extra_config?.["telemetry/opentelemetry"]?.exporters?.prometheus,
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
      zipkincollectorURL:this.entireJsonData?.extra_config?.["telemetry/opencensus"]?.exporters?.zipkin?.collector_url,
      zipkinServiceName:this.entireJsonData?.extra_config?.["telemetry/opencensus"]?.exporters?.zipkin?.service_name,
      jeagerEndpoint:this.entireJsonData?.extra_config?.["telemetry/opencensus"]?.exporters?.jeager?.endpoint,
      jeagerServiceName:this.entireJsonData?.extra_config?.["telemetry/opencensus"]?.exporters?.jeager?.service_name,
      influxDBaddress:this.entireJsonData?.extra_config?.["telemetry/opencensus"]?.exporters?.influxdb?.address,
      infulxDBdatabase:this.entireJsonData?.extra_config?.["telemetry/opencensus"]?.exporters?.influxdb?.db,
      influxwriteTimeout:this.entireJsonData?.extra_config?.["telemetry/opencensus"]?.exporters?.influxdb?.timeout,
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
      datadogNamespace:this.entireJsonData?.extra_config?.["telemetry/opencensus"]?.exporters?.datadog?.namespace,
      datadogService:this.entireJsonData?.extra_config?.["telemetry/opencensus"]?.exporters?.datadog?.service,
      datadogTraceAdd:this.entireJsonData?.extra_config?.["telemetry/opencensus"]?.exporters?.datadog?.trace_address,
      datadogStatusAdd:this.entireJsonData?.extra_config?.["telemetry/opencensus"]?.exporters?.datadog?.stats_address,
      datadogTag:[],
      tagsArrayValue:this.entireJsonData?.extra_config?.["telemetry/opencensus"]?.exporters?.datadog?.tags,
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
      newRelicLicense:this.entireJsonData?.extra_config?.["telemetry/newrelic"]?.license,
      newRelicSDKDebug:this.entireJsonData?.extra_config?.["telemetry/newrelic"]?.debug,
      headersToPass:[],
      headersToPassArrayValue:this.entireJsonData?.extra_config?.["telemetry/newrelic"]?.headers_to_pass
})
  }
  emitValue(){
    console.log(this.TelemertyFormGroup.value);
    
    this.sharedService.setTelemetryData(this.TelemertyFormGroup.value)
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
      name:[],
      port:[]
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
