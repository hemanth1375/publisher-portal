import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.css'
})
export class PoliciesComponent {



  constructor(private formBuilder: FormBuilder) {
    this.formGroupPolicies = this.formBuilder.group({
      securityReqPolicy: [null],
      secReqErrorStCode: [null],
      secReqErrorBody: [null],
      secReqErrorContentType: [null],
      securityResPolicy: [null],
      secResErrorStCode: [null],
      secResErrorBody: [null],
      secResErrorContentType: [null],
      jwtReqPolicy: [null],
      enableDebug: [false],
      autoJoinPolicies: [false],
      disableMacros: [false],
      resSchemaValErrorMsg: [null],
      resSchemaValErrorStCode: [null],
      secReqPolicyArrayValue: [[]],
      secResPolicyArrayValue: [[]],
      jwtReqPolicyArrayValue: [[]]
    })
  }


  formGroupPolicies: FormGroup;
  @Input() formData: any;
  @Output() policiesFormSubmitted = new EventEmitter<any>();
  submitForm() {
    
  }
  ngOnInit(){
    this.formGroupPolicies.valueChanges.subscribe(value => {
      console.log(value);
      
      this.policiesFormSubmitted.emit(value); // Emit form data on every change
    });
  }

  parameterArraySecReqPolicy: any = [];
  parameterArraySecResPolicy: any = [];
  parameterArrayJwtValReqPolicy: any = [];


  addParameter(fieldName: 'securityReqPolicy' | 'securityResPolicy' | 'jwtReqPolicy') {
    const fieldValue = this.formGroupPolicies.get(fieldName)?.value;
    if (fieldName) {
      if (fieldName === 'securityReqPolicy') {
        this.parameterArraySecReqPolicy.push(fieldValue);
        this.formGroupPolicies.get('secReqPolicyArrayValue')?.setValue([...this.parameterArraySecReqPolicy]);
      }
      else if (fieldName === 'securityResPolicy') {
        this.parameterArraySecResPolicy.push(fieldValue);
        this.formGroupPolicies.get('secResPolicyArrayValue')?.setValue([...this.parameterArraySecResPolicy]);
      }
      else if (fieldName === 'jwtReqPolicy') {
        this.parameterArrayJwtValReqPolicy.push(fieldValue);
        this.formGroupPolicies.get('jwtReqPolicyArrayValue')?.setValue([...this.parameterArrayJwtValReqPolicy]);
      }
      this.formGroupPolicies.get(fieldName)?.reset();
    }

  }

  removeParameter(index: number, fieldName: 'securityReqPolicy' | 'securityResPolicy' | 'jwtReqPolicy') {
    if (fieldName === 'securityReqPolicy') {
      this.parameterArraySecReqPolicy.splice(index, 1);
      this.formGroupPolicies.get('secReqPolicyArrayValue')?.setValue([...this.parameterArraySecReqPolicy]);
    }
    else if (fieldName === 'securityResPolicy') {
      this.parameterArraySecResPolicy.splice(index, 1);
      this.formGroupPolicies.get('secResPolicyArrayValue')?.setValue([...this.parameterArraySecResPolicy]);
    }
    else if (fieldName === 'jwtReqPolicy') {
      this.parameterArrayJwtValReqPolicy.splice(index, 1);
      this.formGroupPolicies.get('jwtReqPolicyArrayValue')?.setValue([...this.parameterArrayJwtValReqPolicy]);
    }
  }

  saveForm() {
    console.log(this.formGroupPolicies.value);
    if (this.formGroupPolicies.valid) {
      this.policiesFormSubmitted.emit(this.formGroupPolicies.value);
    }
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
