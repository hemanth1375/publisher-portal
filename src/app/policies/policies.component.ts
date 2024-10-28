import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.css'
})
export class PoliciesComponent {



  constructor(private formBuilder: FormBuilder) {
    this.formGroupPolicies = this.formBuilder.group({
      requestPolicies: [null],
      requestPolicies1: [null],
      responsePolicies: [null]
    })
  }


  formGroupPolicies: FormGroup;

  @Output() formSubmitted = new EventEmitter<any>();
  submitForm() {
    if (this.formGroupPolicies.valid) {
      this.formSubmitted.emit(this.formGroupPolicies.value);
    }
  }

  parameterArray1: any = [];

  addParameterReqP1() {
    const queryParamsValue = this.formGroupPolicies.get('requestPolicies1')?.value;

    if (queryParamsValue) {
      this.parameterArray1.push(queryParamsValue);
      this.formGroupPolicies.get('requestPolicies1')?.reset();
    }
  }
  removeParameterReqP1(index: number) {
    this.parameterArray1.splice(index, 1);
  }

  parameterArray2: any = [];

  addParameterResP() {
    const queryParamsValue = this.formGroupPolicies.get('responsePolicies')?.value;

    if (queryParamsValue) {
      this.parameterArray2.push(queryParamsValue);
      this.formGroupPolicies.get('responsePolicies')?.reset();
    }
  }
  removeParameterResP(index: number) {
    this.parameterArray2.splice(index, 1);
  }



  parameterArray3: any = [];

  addParameterReqP() {
    const queryParamsValue = this.formGroupPolicies.get('requestPolicies')?.value;

    if (queryParamsValue) {
      this.parameterArray3.push(queryParamsValue);
      this.formGroupPolicies.get('requestPolicies')?.reset();
    }
  }
  removeParameterReqP(index: number) {
    this.parameterArray3.splice(index, 1);
  }


  isSpFilterEnabled = false; // Initially false

  onToggleChange(event: any) {
    this.isSpFilterEnabled = event.checked; // Capture toggle state
  }

  isRequestSchValidatorFiltrEnabled = false; //Initially False

  onToggleChange1(event: any) {
    this.isRequestSchValidatorFiltrEnabled = event.checked;
  }

  isResponseSchValidatorFiltrEnabled = false;

  onToggleChange2(event: any) {
    this.isResponseSchValidatorFiltrEnabled = event.checked;
  }

}
