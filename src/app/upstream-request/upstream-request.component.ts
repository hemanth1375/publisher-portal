import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upstream-request',
  templateUrl: './upstream-request.component.html',
  styleUrl: './upstream-request.component.css'
})
export class UpstreamRequestComponent implements AfterViewInit {
  
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
      bodyEditorTextarea:[null],
      contentType:[null],
      path:[null],
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
      hostArrayValue:this.formData?.backend?.[0]?.host

    })
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
