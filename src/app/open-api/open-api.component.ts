import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-open-api',
  templateUrl: './open-api.component.html',
  styleUrl: './open-api.component.css'
})
export class OpenApiComponent {
  formGroupOpenAPI: FormGroup;


  constructor(private formBuilder: FormBuilder,private sharedService:SharedDataService) {
    this.formGroupOpenAPI = formBuilder.group({
      isOpenApiActive:[false],
      openApiHostForm: [null],
      openApiBasePathForm: [null],
      openApiDescriptionForm: [null],
      openApiVersionForm: [null],
      openApiContactNameForm: [null],
      openApiContactEmailForm: [null],
      openApiContactUrlForm: [null],
      openApiTermsOfServiceForm: [null],
      openApiLicenseNameForm: [null],
      openApiLicenseUrlForm: [null],
      openApiTagsForm: [null],
      openApiSchemesForm: [null],
      openApiTagsFormArray: [[]],
      openApiSchemesFormArray: [[]]
    })
  }
  entireJsonData:any;
  ngOnInit(){
    this.sharedService.getEntireJsonData$().subscribe(data=>{
      this.entireJsonData=data;
      
    })
console.log(this.entireJsonData);
this.formGroupOpenAPI.patchValue({
  openApiVersionForm: this.entireJsonData?.extra_config?.["documentation/openapi"]?.version,
      openApiContactNameForm: this.entireJsonData?.extra_config?.["documentation/openapi"]?.contact_name,
      openApiContactEmailForm: this.entireJsonData?.extra_config?.["documentation/openapi"]?.contact_email,
      openApiContactUrlForm: this.entireJsonData?.extra_config?.["documentation/openapi"]?.contact_url,
      openApiLicenseNameForm: this.entireJsonData?.extra_config?.["documentation/openapi"]?.license_name,
      openApiLicenseUrlForm:this.entireJsonData?.extra_config?.["documentation/openapi"]?.license_url
})
  }
  emitValue(){
    console.log(this.formGroupOpenAPI.value);
    
this.sharedService.setOpenApiData(this.formGroupOpenAPI.value)
  }
  openApiTagsArray: any[] = [];
  openApiSchemesArray: any[] = [];

  addParameter(fieldName: 'openApiTagsForm' | 'openApiSchemesForm') {
    const fieldValue = this.formGroupOpenAPI.get(fieldName)?.value;
    if (fieldName) {
      if (fieldName === 'openApiTagsForm') {
        this.openApiTagsArray.push(fieldValue);
        this.formGroupOpenAPI.get('openApiTagsFormArray')?.setValue([...this.openApiTagsArray]);
      } else if (fieldName === 'openApiSchemesForm') {
        this.openApiSchemesArray.push(fieldValue);
        this.formGroupOpenAPI.get('openApiSchemesFormArray')?.setValue([...this.openApiSchemesArray]);
      }
    }
    this.formGroupOpenAPI.get(fieldName)?.reset();
  }
  removeParameter(index: any, fieldName: 'openApiTagsForm' | 'openApiSchemesForm') {
    if (fieldName === "openApiTagsForm") {
      this.openApiTagsArray.splice(index, 1);
      this.formGroupOpenAPI.get('openApiTagsFormArray')?.setValue([...this.openApiTagsArray]);
    } else if (fieldName === "openApiSchemesForm") {
      this.openApiSchemesArray.splice(index, 1);
      this.formGroupOpenAPI.get('openApiSchemesFormArray')?.setValue([...this.openApiSchemesArray]);
    }
  }

  onToggleChangeStaticResponse(event: any, id: any) {
    console.log('id', id);
    (this as any)[id] = event.checked;
  }

}
