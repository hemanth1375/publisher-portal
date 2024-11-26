import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upstream-request',
  templateUrl: './upstream-request.component.html',
  styleUrl: './upstream-request.component.css'
})
export class UpstreamRequestComponent implements AfterViewInit , OnInit{
  
  formGroupUpstreamRequest:FormGroup;
  @Input() formData: any;
  @Output() upstreamRequestFormSubmitted =new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder){
    this.formGroupUpstreamRequest=formBuilder.group({

      isStaticServerActive:[false],
      isBodymanipulationActive:[false],
      isMartianActive:[false],
      sanitization:[false],
      method:[null],
      endpointUrl:[null],
      decodeAs:[null],
      staticUrl:[null],
      directory_Listing:[false],
      bodyEditor:['bodyeditor'],
      template:[''],
      contentType:[''],
      debug:[false],
      path:[''],
      martianDslTextarea:[null],
      host:[null],
      hostArrayValue:[[]]
    })

  }
  ngAfterViewInit(): void {
  
    
    this.formGroupUpstreamRequest.valueChanges.subscribe(value => {
      console.log(value);
      
      this.upstreamRequestFormSubmitted.emit(value); 
    });
  }
  ngOnInit(){
    console.log(this.formData);
    if(this.formData){
      this.hostArray=this.formData?.backend?.[0]?.host
    }
    // this.hostArray=this.formData?.backend?.[0]?.host
    this.formGroupUpstreamRequest.patchValue({
      method:this.formData?.backend?.[0]?.method,
      endpointUrl:this.formData?.backend?.[0]?.url_pattern,
      decodeAs:this.formData?.backend?.[0]?.encoding,
      staticUrl:this.formData?.backend?.[0]?.path,
      directory_Listing:this.formData?.backend?.[0]?.directory_Listing,
      hostArrayValue:this.formData?.backend?.[0]?.host,
      isStaticServerActive:!!this.formData?.backend?.[0]?.extra_config?.['backend/static-filesystem'],
      isBodymanipulationActive:!!this.formData?.backend?.[0]?.extra_config?.['modifier/body-generator'],
      isMartianActive:!!this.formData?.backend?.[0]?.extra_config?.['modifier/martian'],
      sanitization:this.formData?.backend?.[0]?.disable_host_sanitize,
      // bodyEditor:'',
      template:this.formData?.backend?.[0]?.extra_config?.['modifier/body-generator']?.template,
      contentType:this.formData?.backend?.[0]?.extra_config?.['modifier/body-generator']?.content_type,
      debug:this.formData?.backend?.[0]?.extra_config?.['modifier/body-generator']?.debug,
      path:this.formData?.backend?.[0]?.extra_config?.['modifier/body-generator']?.path,
      martianDslTextarea:this.formData?.[0]?.extra_config?.['modifier/martian'],
      host:'',

    });

    this.formGroupUpstreamRequest.get('isCollection')?.valueChanges.subscribe((isChecked)=>{
      const rootObjectControl = this.formGroupUpstreamRequest.get('rootObject');

      if(isChecked){
        rootObjectControl?.disable();
      }else{
        rootObjectControl?.enable();
      }
    });

    this.formGroupUpstreamRequest.get('bodyEditor')?.valueChanges.subscribe((value)=>{
      const bodyEditorControl = this.formGroupUpstreamRequest.get('template');
      const pathControl = this.formGroupUpstreamRequest.get('path');
      
      if(value === 'bodyeditor'){
        bodyEditorControl?.enable();
        pathControl?.disable();

      }else if(value === 'external'){
        bodyEditorControl?.disable();
        pathControl?.enable();
      }
    });
  }


  hostArray:any=[];
  parameterHeaderArray:any=[];
  updateParametersArray() {
    this.formGroupUpstreamRequest.get('hostArrayValue')?.setValue([...this.hostArray]);
  }
  addParameter() {
    const queryParamsValue = this.formGroupUpstreamRequest.get('host')?.value;
    
    if (queryParamsValue) {
      this.hostArray.push(queryParamsValue);
      this.updateParametersArray();
      this.formGroupUpstreamRequest.get('host')?.reset();
    }
  }
  removeParameter(index: number) {
    this.hostArray.splice(index, 1);
    this.updateParametersArray();
  }
  saveForm(){
    if(this.formGroupUpstreamRequest.valid){
      console.log(this.formGroupUpstreamRequest.value);
      
      this.upstreamRequestFormSubmitted.emit(this.formGroupUpstreamRequest.value)
    }
  }
  onToggleChangeStaticResponse(event: any, id:any) {
    console.log('id', id);
    (this as any)[id] = event.checked;  
  }
}
