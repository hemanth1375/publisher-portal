import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-openapi',
  templateUrl: './openapi.component.html',
  styleUrl: './openapi.component.css'
})
export class OpenapiComponent {

  formGroupOpenapi:FormGroup;
  @Output() openapiFormSubmitted=new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder){
    this.formGroupOpenapi=this.formBuilder.group({
      summary:[''],
      description:[''],
      tags:[''],
      audiences:[''],
      example:['']
    })
  }
  saveForm(){
if(this.formGroupOpenapi.valid){
this.openapiFormSubmitted.emit(this.formGroupOpenapi.value)
}
  }
  isDocumentationEnabled=false;
  onToggleChangeOpenDocumentation(event: any) {
    this.isDocumentationEnabled = event.checked; // Capture toggle state
  }
}
