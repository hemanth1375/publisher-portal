import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upstream-policies',
  templateUrl: './upstream-policies.component.html',
  styleUrl: './upstream-policies.component.css'
})
export class UpstreamPoliciesComponent {


  parameterArraySecReqPolicy: any = [];
  parameterArraySecResPolicy: any = [];
  parameterArrayJwtValReqPolicy: any = [];

  formGroupUpstreamPolicies: FormGroup;

  @Output() upstreamPoliciesFormSubmitted = new EventEmitter<any>();

  @Input() formData: any;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupUpstreamPolicies = this.formBuilder.group({
      isSecPolicyActive: [false],
      isResSchValidatorActive: [false],
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
      responseSchema: [null]
    })
  }

  submitForm() {

  }

  ngOnInit() {

    if(this.formData){
      this.formGroupUpstreamPolicies.patchValue({
        isSecPolicyActive:!!this.formData?.backend?.[0]?.extra_config?.["security/policies"],
      isResSchValidatorActive:!!this.formData?.backend?.[0]?.extra_config?.["plugin/req-resp-modifier"]?.name.includes("response-schema-validator"),
      // securityReqPolicy: [null],
      // secReqErrorStCode: [null],
      // secReqErrorBody: [null],
      // secReqErrorContentType: [null],
      // securityResPolicy: [null],
      // secResErrorStCode: [null],
      // secResErrorBody: [null],
      // secResErrorContentType: [null],
      // jwtReqPolicy: [null],
      // enableDebug: [false],
      // autoJoinPolicies: [false],
      // disableMacros: [false],
      // resSchemaValErrorMsg: [null],
      // resSchemaValErrorStCode: [null],
      // secReqPolicyArrayValue: [[]],
      // secResPolicyArrayValue: [[]],
      // jwtReqPolicyArrayValue: [[]],
      // responseSchema: [null]
      })
    }

    this.formGroupUpstreamPolicies.valueChanges.subscribe(value => {
      console.log(value);

      this.upstreamPoliciesFormSubmitted.emit(value); // Emit form data on every change
    });


    this.formGroupUpstreamPolicies.get('resSchemaValErrorStCode')?.setValue(500)
  }

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




}
