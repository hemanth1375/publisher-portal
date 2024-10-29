import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-connectivity-options',
  templateUrl: './connectivity-options.component.html',
  styleUrl: './connectivity-options.component.css'
})
export class ConnectivityOptionsComponent {
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
      writeBufferSize:[null],
      maxWriteBufferSize:[null],
      pongWait:[null],
      inputHeaderArray:[[]]
          })
  }
  queryParams:any;
  parameterHeader:any;
  formGroup1: FormGroup;
  @Output() connectivityFormSubmitted = new EventEmitter<any>();
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
