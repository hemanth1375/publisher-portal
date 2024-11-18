import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-parameter-forwarding',
  templateUrl: './parameter-forwarding.component.html',
  styleUrl: './parameter-forwarding.component.css'
})
export class ParameterForwardingComponent {
  @Input() formData: any; 
  constructor(private formBuilder:FormBuilder){
    this.formGroup1=this.formBuilder.group({
      queryParams:[null],
      parameterHeader:[null],
      parameterArrays:[[]],
      parameterHeaderArrays:[[]]
    })
  }
  queryParams:any;
  parameterHeader:any;
  formGroup1: FormGroup;
  @Output() formSubmitted = new EventEmitter<any>();

  ngOnInit(){

    console.log(this.formData);
    this.parameterArray=this.formData?.input_query_strings;
    this.parameterHeaderArray=this.formData?.input_headers
    this.formGroup1.patchValue({
      parameterArrays:this.formData?.input_query_strings,
      parameterHeaderArrays:this.formData?.input_headers
    })
    



    this.formGroup1.valueChanges.subscribe(value => {
      console.log(value);
      
      this.formSubmitted.emit(value); // Emit form data on every change
    });
  }

  submitForm() {
    if (this.formGroup1.valid) {
      this.formSubmitted.emit(this.formGroup1.value);
    }
  }
  parameterArray:any=[];
  parameterHeaderArray:any=[];
  updateParametersArray() {
    this.formGroup1.get('parameterArrays')?.setValue([...this.parameterArray]);
  }
  addParameter() {
    const queryParamsValue = this.formGroup1.get('queryParams')?.value;
    
    if (queryParamsValue) {
      this.parameterArray.push(queryParamsValue);
      this.updateParametersArray();
      this.formGroup1.get('queryParams')?.reset();
    }
  }

removeParameterHeader(index: number) {
  this.parameterHeaderArray.splice(index, 1);
  this.updateParametersHeaderArray();
}
  updateParametersHeaderArray() {
    this.formGroup1.get('parameterHeaderArrays')?.setValue([...this.parameterArray]);
  }
  addParameterHeader() {
    const queryParamsValue = this.formGroup1.get('parameterHeader')?.value;
    
    if (queryParamsValue) {
      this.parameterHeaderArray.push(queryParamsValue);
      this.updateParametersHeaderArray();
      this.formGroup1.get('parameterHeader')?.reset();
    }
  }

removeParameter(index: number) {
  this.parameterArray.splice(index, 1);
  this.updateParametersArray();
}
  submit(){
    console.log(this.formGroup1.value.queryParams);
    
  }
}
