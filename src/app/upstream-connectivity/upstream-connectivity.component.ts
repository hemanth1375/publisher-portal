import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upstream-connectivity',
  templateUrl: './upstream-connectivity.component.html',
  styleUrl: './upstream-connectivity.component.css'
})
export class UpstreamConnectivityComponent implements OnInit,AfterViewInit{
  amqpRoutingKeysArray: any[] = [];

  objectMap: Map<string, string> = new Map();
  objectMap1: Map<string, string> = new Map();

  formGroupUpstreamConnectivity: FormGroup;

  @Input() formData: any;
  @Output() upstreamConnectivityFormSubmitted = new EventEmitter<any>();


  ngOnInit() {

    this.formGroupUpstreamConnectivity.get('bodyEditor')?.valueChanges.subscribe((value)=>{
      const bodyEditorControl = this.formGroupUpstreamConnectivity.get('template');
      const pathControl = this.formGroupUpstreamConnectivity.get('path');
      
      if(value === 'bodyeditor'){
        bodyEditorControl?.enable();
        pathControl?.disable();

      }else if(value === 'external'){
        bodyEditorControl?.disable();
        pathControl?.enable();
      }
    });

    this.formGroupUpstreamConnectivity.patchValue({
      restTogrpcReqNamingConventionForm: '',
      restTogrpcResNamingConventionForm: this.formData?.backend?.[0]?.extra_config?.["backend/grpc"].response_naming_convention,
      restTogrpcUseReqBodyForm: this.formData?.backend?.[0]?.extra_config?.["backend/grpc"].use_request_body,
      restTogrpcRemoveUnsetValForm: this.formData?.backend?.[0]?.extra_config?.["backend/grpc"].output_remove_unset_values,
      restTogrpcEnumsAsStrgsForm: this.formData?.backend?.[0]?.extra_config?.["backend/grpc"].output_enum_as_string,
      restTogrpcTimestmpAsStrgsForm: this.formData?.backend?.[0]?.extra_config?.["backend/grpc"].output_timestamp_as_string,
      restTogrpcDurationAsStrgsForm: this.formData?.backend?.[0]?.extra_config?.["backend/grpc"].output_duration_as_string,
      restTographQLOpTypeForm: this.formData?.backend?.[0]?.extra_config?.["backend/graphql"].type,
      restTographQLInlineQueryForm:this.formData?.backend?.[0]?.extra_config?.["backend/graphql"].query,
    })

    this.formGroupUpstreamConnectivity.patchValue({
      pathRestToSoapForm:this.formData?.backend?.[0]?.extra_config?.["backend/soap"]?.path
    })
    // this.formGroupUpstreamConnectivity.get('restToGraphqlOpTypeForm')?.setValue('query');
    
  }

  ngAfterViewInit(): void {
    this.formGroupUpstreamConnectivity.valueChanges.subscribe(value => {
      console.log(value);

      this.upstreamConnectivityFormSubmitted.emit(value); // Emit form data on every change
    });
  }

  updateMapControl() {
    // Convert Map to array of key-value pairs
    const mapArray = Array.from(this.objectMap.entries());
    this.formGroupUpstreamConnectivity.get('objectMapValue')?.setValue(mapArray);
  }
  updateMapControl1() {
    // Convert Map to array of key-value pairs
    const mapArray = Array.from(this.objectMap1.entries());
    this.formGroupUpstreamConnectivity.get('objectMapValue1')?.setValue(mapArray);
  }

  addToMap(key: string, value: string) {
    this.objectMap.set(key, value);
    this.updateMapControl();  // Sync form control with updated Map
  }

  addToMap1(key: string, value: string) {
    this.objectMap1.set(key, value);
    this.updateMapControl1();  // Sync form control with updated Map
  }

  removeFromMap(key: string) {
    this.objectMap.delete(key);
    this.updateMapControl();  // Sync form control with updated Map
  }

  removeFromMap1(key: string) {
    this.objectMap1.delete(key);
    this.updateMapControl1();  // Sync form control with updated Map
  }



  addParameter(fieldName: 'amqpConsumerRoutingKeysForm' | 'restToGraphQLMap' | 'inputMappingFieldAndMapAs' ) {


    const fieldValue = this.formGroupUpstreamConnectivity.get(fieldName)?.value;

    if (fieldName) {
      if (fieldName === 'amqpConsumerRoutingKeysForm') {
        this.amqpRoutingKeysArray.push(fieldValue);
        this.formGroupUpstreamConnectivity.get('amqpConsumerRoutingKeysFormArray')?.setValue([...this.amqpRoutingKeysArray]);
      }
      else if (fieldName === 'restToGraphQLMap') {
      
        const originalObject = this.formGroupUpstreamConnectivity.get('restTographQLVariable')?.value;
        const renamedObject = this.formGroupUpstreamConnectivity.get('restTographQLValue')?.value;

        if (originalObject && renamedObject) {
          this.addToMap1(originalObject, renamedObject)
          console.log(this.objectMap);

        }
      } else if (fieldName === 'inputMappingFieldAndMapAs') {

        const originalObject = this.formGroupUpstreamConnectivity.get('restTogprcInputMappingFieldForm')?.value;
        const renamedObject = this.formGroupUpstreamConnectivity.get('restTogprcInputMappingMapAsForm')?.value;

        if (originalObject && renamedObject) {
          this.addToMap(originalObject, renamedObject)
          console.log(this.objectMap);

        }
      }
    }
    this.formGroupUpstreamConnectivity.get(fieldName)?.reset();
  }

  removeParameter(index: any, fieldName: 'amqpConsumerRoutingKeysForm' | 'restToGraphQLMap' | 'inputMappingFieldAndMapAs') {
    if (fieldName === "amqpConsumerRoutingKeysForm") {
      this.amqpRoutingKeysArray.splice(index, 1);
      this.formGroupUpstreamConnectivity.get('amqpConsumerRoutingKeysFormArray')?.setValue([...this.amqpRoutingKeysArray]);
    } else if (fieldName == "restToGraphQLMap") {
      this.removeFromMap1(index);
    } else if (fieldName === "inputMappingFieldAndMapAs") {
      this.removeFromMap(index);
    }
  }




  constructor(private formBuilder: FormBuilder) {
    this.formGroupUpstreamConnectivity = formBuilder.group({
      isRestToSoapActive:[false],
      isHttpClientSettingActive:[false],
      isRestToGraphqlActive:[false],
      isAMQPconsumerActive:[false], 
      isAWSlambdaActive:[false],
      isrestToGRPCActive:[false],
      isPublicSubscriberActive:[false],
      isPublicPublisherActive:[false],
      isAMQPproducerActive:[false],
    
      bodyEditor:['bodyeditor'],
      template:[''],
      contentType:[''],
      debug:[false],
      path:[''],

      connectvWebProxyForm: [null],
      donotFollowRedirectsForm: [false],
      restTographQLOpTypeForm: [null],
      restToGraphqlOpNameForm: [null],
      restTographQLQueryPathForm: [null],
      restTographQLInlineQueryForm: [null],
      restTographQLVariable: [''],
      restTographQLValue: [''],

      objectMapValue: [[]],
      objectMapValue1: [[]],
      
    
      amqpConsumerQueueNameForm: [null],
      amqpConsumerExchangeForm: [null],
      amqpConsumerBackOffStratgyForm: [null],
      amqpConsumerRoutingKeysForm: [],
      amqpConsumerRoutingKeysFormArray: [[]],
      amqpConsumerPrefetchCntForm: [null],
      amqpConsumerDurableForm: [null],
      amqpConsumerNoLocalForm: [null],
      awsLambdaFunctionNameForm: [null],
      awsLambdaFunctionParamNameForm: [null],
      awsLambdaRegionForm: [null],
      awsLambdaMaxRetriesForm: [null],
      awsLambdaEndpointForm: [null],
      restTogrpcReqNamingConventionForm: [null],
      restTogrpcResNamingConventionForm: [null],
      restTogrpcUseReqBodyForm: [false],
      restTogrpcAllowInsecureConForm: [null],
      restTogrpcRemoveUnsetValForm: [false],
      restTogrpcEnumsAsStrgsForm: [false],
      restTogrpcTimestmpAsStrgsForm: [false],
      restTogrpcDurationAsStrgsForm: [false],
      restTogrpcDisableQueryParamForm: [null],
      restTogprcInputMappingFieldForm: [null],
      restTogprcInputMappingMapAsForm: [null],
      publicSubSubscriptionTypeForm: [null],
      publicSubSubscriptionURLForm: [null],
      publicPubSubscriptionTypeForm: [null],
      publicPubTopicURLForm: [null],
      amqpProducerQueueNameForm: [null],
      amqpProducerExchangeForm: [null],
      amqpProducerBackoffStrategyForm: [null],
      amqpProducerDurableForm: [null]


    })
  }


  onToggleChangeStaticResponse(event: any, id: any) {
    console.log('id', id);
    (this as any)[id] = event.checked;
  }
}
