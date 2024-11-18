import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-openapi',
  templateUrl: './openapi.component.html',
  styleUrl: './openapi.component.css'
})
export class OpenapiComponent {

  formGroupOpenapi:FormGroup;
  @Input() formData: any;
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
  ngOnInit(){
    console.log(this.formData);
    this.formGroupOpenapi.patchValue({
      summary:this.formData?.extra_config?.["documentation/openapi"]?.summary,
      description:this.formData?.extra_config?.["documentation/openapi"]?.description,
    })
    
    this.formGroupOpenapi.valueChanges.subscribe(value => {
      console.log(value);
      
      this.openapiFormSubmitted.emit(value);
    });
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
