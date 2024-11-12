import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upstream-policies',
  templateUrl: './upstream-policies.component.html',
  styleUrl: './upstream-policies.component.css'
})
export class UpstreamPoliciesComponent {

  @Input() formData: any;
  constructor(private formBuilder: FormBuilder) {
    this.formGroupUpstreamPolicies = this.formBuilder.group({
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


  formGroupUpstreamPolicies: FormGroup;

  @Output() upstreamPoliciesFormSubmitted = new EventEmitter<any>();
  submitForm() {
    
  }
  ngOnInit(){
    this.formGroupUpstreamPolicies.valueChanges.subscribe(value => {
      console.log(value);
      
      this.upstreamPoliciesFormSubmitted.emit(value); // Emit form data on every change
    });
  }

  parameterArraySecReqPolicy: any = [];
  parameterArraySecResPolicy: any = [];
  parameterArrayJwtValReqPolicy: any = [];


  addParameter(fieldName: 'securityReqPolicy' | 'securityResPolicy' | 'jwtReqPolicy') {
    const fieldValue = this.formGroupUpstreamPolicies.get(fieldName)?.value;
    if (fieldName) {
      if (fieldName === 'securityReqPolicy') {
        this.parameterArraySecReqPolicy.push(fieldValue);
        this.formGroupUpstreamPolicies.get('secReqPolicyArrayValue')?.setValue([...this.parameterArraySecReqPolicy]);
      }
      else if (fieldName === 'securityResPolicy') {
        this.parameterArraySecResPolicy.push(fieldValue);
        this.formGroupUpstreamPolicies.get('secResPolicyArrayValue')?.setValue([...this.parameterArraySecResPolicy]);
      }
      else if (fieldName === 'jwtReqPolicy') {
        this.parameterArrayJwtValReqPolicy.push(fieldValue);
        this.formGroupUpstreamPolicies.get('jwtReqPolicyArrayValue')?.setValue([...this.parameterArrayJwtValReqPolicy]);
      }
      this.formGroupUpstreamPolicies.get(fieldName)?.reset();
    }

  }

  removeParameter(index: number, fieldName: 'securityReqPolicy' | 'securityResPolicy' | 'jwtReqPolicy') {
    if (fieldName === 'securityReqPolicy') {
      this.parameterArraySecReqPolicy.splice(index, 1);
      this.formGroupUpstreamPolicies.get('secReqPolicyArrayValue')?.setValue([...this.parameterArraySecReqPolicy]);
    }
    else if (fieldName === 'securityResPolicy') {
      this.parameterArraySecResPolicy.splice(index, 1);
      this.formGroupUpstreamPolicies.get('secResPolicyArrayValue')?.setValue([...this.parameterArraySecResPolicy]);
    }
    else if (fieldName === 'jwtReqPolicy') {
      this.parameterArrayJwtValReqPolicy.splice(index, 1);
      this.formGroupUpstreamPolicies.get('jwtReqPolicyArrayValue')?.setValue([...this.parameterArrayJwtValReqPolicy]);
    }
  }

  saveForm() {
    console.log(this.formGroupUpstreamPolicies.value);
    if (this.formGroupUpstreamPolicies.valid) {
      this.upstreamPoliciesFormSubmitted.emit(this.formGroupUpstreamPolicies.value);
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
