import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upstream-connectivity',
  templateUrl: './upstream-connectivity.component.html',
  styleUrl: './upstream-connectivity.component.css'
})
export class UpstreamConnectivityComponent {
  amqpRoutingKeysArray: any[] = [];
  objectMap: Map<string, string> = new Map();

  formGroupUpstreamConnectivity: FormGroup;

  isRestToSoapActive = false;
  isHttpClientSetting = false;
  isRestToGraphql = false;
  isAMQPconsumer = false;
  isAWSlambda = false;
  isrestToGRPC = false;
  isPublicSubscriber = false;
  isPublicPublisher = false;
  isAMQPproducer = false;



  @Input() formData: any;
  @Output() upstreamCoonectivityFormSubmitted = new EventEmitter<any>();


  ngOnInit() {
    // this.formGroupUpstreamConnectivity.get('restToGraphqlOpTypeForm')?.setValue('query');
    this.formGroupUpstreamConnectivity.valueChanges.subscribe(value => {
      console.log(value);

      this.upstreamCoonectivityFormSubmitted.emit(value); // Emit form data on every change
    });
  }





  updateMapControl() {
    // Convert Map to array of key-value pairs
    const mapArray = Array.from(this.objectMap.entries());
    this.formGroupUpstreamConnectivity.get('objectMapValue')?.setValue(mapArray);
  }

  addToMap(key: string, value: string) {
    this.objectMap.set(key, value);
    this.updateMapControl();  // Sync form control with updated Map
  }
  removeFromMap(key: string) {
    this.objectMap.delete(key);
    this.updateMapControl();  // Sync form control with updated Map
  }





  addParameter(fieldName: 'amqpConsumerRoutingKeysForm' | 'restToGraphQLMap' | 'inputMappingFieldAndMapAs') {


    const fieldValue = this.formGroupUpstreamConnectivity.get(fieldName)?.value;

    if (fieldName) {
      if (fieldName === 'amqpConsumerRoutingKeysForm') {
        this.amqpRoutingKeysArray.push(fieldValue);
        this.formGroupUpstreamConnectivity.get('amqpConsumerRoutingKeysFormArray')?.setValue([...this.amqpRoutingKeysArray]);
      }
      else if (fieldName === 'restToGraphQLMap') {
        console.log("clicked");

        const originalObject = this.formGroupUpstreamConnectivity.get('restTographQLVariableForm')?.value;
        const renamedObject = this.formGroupUpstreamConnectivity.get('restTographQLValueForm')?.value;

        if (originalObject && renamedObject) {
          this.addToMap(originalObject, renamedObject)
          console.log(this.objectMap);

        }
      } else if (fieldName === 'inputMappingFieldAndMapAs') {
        console.log("clicked");

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
      this.removeFromMap(index);
    } else if (fieldName === "inputMappingFieldAndMapAs") {
      this.removeFromMap(index);
    }
  }




  constructor(private formBuilder: FormBuilder) {
    this.formGroupUpstreamConnectivity = formBuilder.group({
      contentTypeRestToSoap: [null],
      enableDebugRestToSoap: [false],
      pathRestToSoapForm: [null],
      connectvWebProxyForm: [null],
      donotFollowRedirectsForm: [false],
      restTographQLOpTypeForm: [null],
      restToGraphqlOpNameForm: [null],
      restTographQLQueryPathForm: [null],
      restTographQLInlineQueryForm: [null],
      restTographQLVariableForm: [''],
      restTographQLValueForm: [''],
      objectMapValue: [[]],
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
      restTogrpcUseReqBodyForm: [null],
      restTogrpcAllowInsecureConForm: [null],
      restTogrpcRemoveUnsetValForm: [null],
      restTogrpcEnumsAsStrgsForm: [null],
      restTogrpcTimestmpAsStrgsForm: [null],
      restTogrpcDurationAsStrgsForm: [null],
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
