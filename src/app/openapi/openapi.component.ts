import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-openapi',
  templateUrl: './openapi.component.html',
  styleUrl: './openapi.component.css'
})
export class OpenapiComponent {

  formGroupOpenapi: FormGroup;

  @Input() formData: any;
  @Output() openapiFormSubmitted = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.formGroupOpenapi = this.formBuilder.group({
      summary: [''],
      description: [''],
      tags: [''],
      audiences: [''],
      example: [''],
      isDocumentationActive:[false],
      tagsArrayValue:[[]],
      audienceArrayValue:[[]]
    })
  }
  tagsArray:string[]=[];
  audienceArray:string[]=[];
  ngOnInit() {
    console.log(this.formData);
    if(this.formData!=undefined){
      this.tagsArray=this.formData?.extra_config?.["documentation/openapi"]?.tags
    }
    this.formGroupOpenapi.patchValue({
      summary: this.formData?.extra_config?.["documentation/openapi"]?.summary,
      description: this.formData?.extra_config?.["documentation/openapi"]?.description,
      tagsArrayValue:this.formData?.extra_config?.["documentation/openapi"]?.tags,
      // tags: [''],
      // audiences: [''],
      // example: [''],
      isDocumentationActive: !!this.formData?.extra_config?.["documentation/openapi"],
      audienceArrayValue:this.formData?.extra_config?.["documentation/openapi"]?.audience
    })

    this.formGroupOpenapi.valueChanges.subscribe(value => {
      console.log(value);

      this.openapiFormSubmitted.emit(value);
    });
  }
  addParameter(fieldName: 'audiences' | 'tags') {
    const fieldValue = this.formGroupOpenapi.get(fieldName)?.value;
console.log(fieldName);

    if (fieldName) {
      if(fieldName === 'audiences'){
        this.audienceArray.push(fieldValue);
        this.formGroupOpenapi.get('audienceArrayValue')?.setValue([...this.audienceArray]);
      
    }else if(fieldName === 'tags'){
      this.tagsArray.push(fieldValue);
      console.log(this.tagsArray);
      
      this.formGroupOpenapi.get('tagsArrayValue')?.setValue([...this.tagsArray]);
    }
    this.formGroupOpenapi.get(fieldName)?.reset();
  }
}
  removeParameter(index: number, fieldName:'audiences' | 'tags') {
    if(fieldName === "audiences"){
      this.audienceArray.splice(index,1);
      this.formGroupOpenapi.get('audienceArrayValue')?.setValue([...this.audienceArray]);
    }else if(fieldName === 'tags'){
      this.tagsArray.splice(index,1);
      this.formGroupOpenapi.get('tagsArrayValue')?.setValue([...this.tagsArray]);
    }
  }


  saveForm() {
    if (this.formGroupOpenapi.valid) {
      this.openapiFormSubmitted.emit(this.formGroupOpenapi.value)
    }
  }


}
