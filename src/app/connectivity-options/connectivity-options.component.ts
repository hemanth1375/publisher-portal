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
          })
  }
  queryParams:any;
  parameterHeader:any;
  formGroup1: FormGroup;
  @Output() formSubmitted = new EventEmitter<any>();
  submitForm() {
    if (this.formGroup1.valid) {
      this.formSubmitted.emit(this.formGroup1.value);
    }
  }
 
  addParameter() {
    const queryParamsValue = this.formGroup1.get('inputHeader')?.value;
   
    if (queryParamsValue) {
      this.parameterArray.push(queryParamsValue);
      this.formGroup1.get('inputHeader')?.reset();
    }
  }
 
removeParameter(index: number) {
  this.parameterArray.splice(index, 1);
}
  submit(){
    console.log(this.formGroup1.value.queryParams);
   
  }

}
