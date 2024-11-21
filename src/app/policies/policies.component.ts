import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.css'
})
export class PoliciesComponent implements OnInit,AfterViewInit {



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
      jwtReqPolicyArrayValue: [[]],
      isSpFilterActive:[false],
      isRequestSchValidatorFiltrActive:[false],
      isResponseSchValidatorFiltrActive:[false],
      reqJSONSchema:[''],
      resJSONSchema:['']

    })
  }
  ngAfterViewInit(): void {
    this.formGroupPolicies.valueChanges.subscribe(value => {
      console.log(value);
      
      this.policiesFormSubmitted.emit(value); // Emit form data on every change
    });
  }


  formGroupPolicies: FormGroup;
  @Input() formData: any;
  @Output() policiesFormSubmitted = new EventEmitter<any>();
  submitForm() {
    
  }
  ngOnInit(){
    console.log(this.formData);
    this.formGroupPolicies.patchValue({
      secReqPolicyArrayValue:this.formData?.extra_config?.["security/policies"]?.req?.policies,
      secReqErrorBody:this.formData?.extra_config?.["security/policies"]?.req?.error?.body,
      secReqErrorStCode:this.formData?.extra_config?.["security/policies"]?.req?.error?.status
    })
    
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


}
