import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-connectivity-options',
  templateUrl: './connectivity-options.component.html',
  styleUrl: './connectivity-options.component.css'
})
export class ConnectivityOptionsComponent {
  @Input() formData: any;
  isWebSocketEnabled = false; // Initially false
  

  onToggleChangeWebSocketResponse(event: any) {
    this.isWebSocketEnabled = event.checked; // Capture toggle state
  }
  isSequencialproxy = false;
  onToggleChangeSequencialproxy(event: any) {
    this.isSequencialproxy = event.checked; // Capture toggle state
  }

  parameterArray:any=[];
 
  constructor(private formBuilder:FormBuilder){
    this.formGroup1=this.formBuilder.group({
      inputHeader:[null],
      concurrentCalls:[null],
      backoffStrategy:[null],
      readBufferSize:[null],
      writeWait:[null],
      maxRetries:[null],
      messageBufferSize:[null],
      writeBufferSize:[null],
      maxWriteBufferSize:[null],
      pongWait:[null],
      inputHeaderArray:[[]],
      connectEvent:[false],
      disconnectEvent:[false],
      returnErr:[false],
          })
  }
  queryParams:any;
  parameterHeader:any;
  formGroup1: FormGroup;
  @Output() connectivityFormSubmitted = new EventEmitter<any>();
  ngOnInit(){
    console.log(this.formData);
    this.formGroup1.patchValue({
      writeBufferSize:this.formData?.extra_config?.websocket.write_buffer_size,
      inputHeader:'',
      concurrentCalls:'',
      backoffStrategy:this.formData?.extra_config?.websocket.backoff_strategy,
      readBufferSize:this.formData?.extra_config?.websocket.read_buffer_size,
      writeWait:this.formData?.extra_config?.websocket.write_wait,
      maxRetries:this.formData?.extra_config?.websocket.max_retries,
      messageBufferSize:this.formData?.extra_config?.websocket.message_buffer_size,
      maxWriteBufferSize:this.formData?.extra_config?.websocket.max_message_size,
      pongWait:this.formData?.extra_config?.websocket.pong_wait,
      inputHeaderArray:this.formData?.extra_config?.websocket.input_headers,
      connectEvent:this.formData?.extra_config?.websocket.connect_event,
      disconnectEvent:this.formData?.extra_config?.websocket.disconnect_event
    })
    this.formGroup1.valueChanges.subscribe(value => {
      console.log(value);
      
      this.connectivityFormSubmitted.emit(value); // Emit form data on every change
    });
  }
  saveForm() {
    if (this.formGroup1.valid) {
      this.connectivityFormSubmitted.emit(this.formGroup1.value);
    }
  }
 
  addParameter() {
    const queryParamsValue = this.formGroup1.get('inputHeader')?.value;
   
    if (queryParamsValue) {
      this.parameterArray.push(queryParamsValue);
      this.formGroup1.get('inputHeaderArray')?.setValue([...this.parameterArray]);
      this.formGroup1.get('inputHeader')?.reset();
    }
  }
 
removeParameter(index: number) {
  this.parameterArray.splice(index, 1);
  this.formGroup1.get('inputHeaderArray')?.setValue([...this.parameterArray]);
}
  submit(){
    console.log(this.formGroup1.value.queryParams);
   
  }

}
