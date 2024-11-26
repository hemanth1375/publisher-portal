import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connectivity-options',
  templateUrl: './connectivity-options.component.html',
  styleUrl: './connectivity-options.component.css'
})
export class ConnectivityOptionsComponent {
  @Input() formData: any;

  parameterArray: any = [];

  constructor(private formBuilder: FormBuilder) {
    this.formGroup1 = this.formBuilder.group({
      inputHeader: [null],
      concurrentCalls: [null],
      backoffStrategy: [null],
      readBufferSize: ['', Validators.required],
      writeWait: ['', Validators.pattern("^[0-9]+(ns|ms|us|µs|s|m|h)$")],
      maxRetries: ['', Validators.required],
      messageBufferSize: ['', Validators.required],
      writeBufferSize: ['', Validators.required],
      maxWriteBufferSize: ['', Validators.required],
      pongWait: ['', Validators.pattern("^[0-9]+(ns|ms|us|µs|s|m|h)$")],
      inputHeaderArray: [[]],
      connectEvent: [false],
      disconnectEvent: [false],
      returnErr: [false],
      isWebSocketActive: [false], // Initially false
      isSequencialActive: [false],
    })
  }
  queryParams: any;
  parameterHeader: any;
  formGroup1: FormGroup;
  @Output() connectivityFormSubmitted = new EventEmitter<any>();
  ngOnInit() {
    console.log(this.formData);
    if (this.formData != undefined) {
      this.parameterArray = this.formData?.extra_config?.websocket.input_headers
    }
    this.formGroup1.patchValue({
      writeBufferSize: this.formData?.extra_config?.websocket.write_buffer_size,
      inputHeader: '',
      concurrentCalls: this.formData?.concurrent_calls,
      backoffStrategy: this.formData?.extra_config?.websocket.backoff_strategy,
      readBufferSize: this.formData?.extra_config?.websocket.read_buffer_size,
      writeWait: this.formData?.extra_config?.websocket.write_wait,
      maxRetries: this.formData?.extra_config?.websocket.max_retries,
      messageBufferSize: this.formData?.extra_config?.websocket.message_buffer_size,
      maxWriteBufferSize: this.formData?.extra_config?.websocket.max_message_size,
      pongWait: this.formData?.extra_config?.websocket.pong_wait,
      inputHeaderArray: this.formData?.extra_config?.websocket.input_headers,
      connectEvent: this.formData?.extra_config?.websocket.connect_event,
      disconnectEvent: this.formData?.extra_config?.websocket.disconnect_event,
      returnErr: this.formData?.extra_config?.websocket.return_error_details,
      isWebSocketActive: !!this.formData?.extra_config?.websocket,
      isSequencialActive: !!this.formData?.extra_config?.proxy?.sequential,
    })
    this.formGroup1.valueChanges.subscribe(value => {
      console.log(value);

      this.connectivityFormSubmitted.emit(value); // Emit form data on every change
    });

    this.formGroup1.get('readBufferSize')?.setValue(1024);
    this.formGroup1.get('writeBufferSize')?.setValue(1024);
    this.formGroup1.get('messageBufferSize')?.setValue(256);
    this.formGroup1.get('maxWriteBufferSize')?.setValue(512);
    this.formGroup1.get('pongWait')?.setValue('60s');
    this.formGroup1.get('writeWait')?.setValue('10s');
    this.formGroup1.get('maxRetries')?.setValue(0);
    this.formGroup1.get('concurrentCalls')?.setValue(1);







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
  submit() {
    console.log(this.formGroup1.value.queryParams);

  }

}
