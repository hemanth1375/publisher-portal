import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-api-monetization-and-governance',
  templateUrl: './api-monetization-and-governance.component.html',
  styleUrl: './api-monetization-and-governance.component.css'
})
export class ApiMonetizationAndGovernanceComponent {

  formGroupApiMonetization: FormGroup;

  isApiMonetization = false;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupApiMonetization = formBuilder.group({
      apiMonetizationAppIDForm: [null],
      apiMonetizationDebugForm: [false],
      apiMonetizationHeadersForm: [null],
      apiMonetizationClaimForm: [null],
      apiMonetizationHeadersFormArray: [[]]
    })

  }

  apiMonetizationHeadersArray: any[] = [];


  addParameter(fieldName: 'apiMonetizationHeadersForm') {
    const fieldValue = this.formGroupApiMonetization.get(fieldName)?.value;
    if (fieldName) {
      if (fieldName === 'apiMonetizationHeadersForm') {
        this.apiMonetizationHeadersArray.push(fieldValue);
        this.formGroupApiMonetization.get('apiMonetizationHeadersFormArray')?.setValue([...this.apiMonetizationHeadersArray]);
      }
    }
    this.formGroupApiMonetization.get(fieldName)?.reset();
  }
  removeParameter(index: any, fieldName: 'apiMonetizationHeadersForm') {
    if (fieldName === "apiMonetizationHeadersForm") {
      this.apiMonetizationHeadersArray.splice(index, 1);
      this.formGroupApiMonetization.get('apiMonetizationHeadersFormArray')?.setValue([...this.apiMonetizationHeadersArray]);
    }
  }


  onToggleChangeStaticResponse(event: any, id: any) {
    console.log('id', id);
    (this as any)[id] = event.checked;
  }

}