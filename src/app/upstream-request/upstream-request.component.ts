import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upstream-request',
  templateUrl: './upstream-request.component.html',
  styleUrl: './upstream-request.component.css'
})
export class UpstreamRequestComponent implements AfterViewInit {
  isStaticServerActive=false;
  isBodymanipulationActive=false;
  isMartianActive=false;
  formGroupUpstreamRequest:FormGroup;
  @Input() formData: any;
  @Output() upstreamRequestFormSubmitted =new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder){
    this.formGroupUpstreamRequest=formBuilder.group({
      method:[null],
      endpointUrl:[null],
      decodeAs:[null],
      staticUrl:[null],
      directory_Listing:[false],
      bodyEditorTextarea:[null],
      contentType:[null],
      path:[null],
      martianDslTextarea:[null],
      
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
    this.formGroupUpstreamRequest.patchValue({
      method:this.formData?.backend?.[0]?.method,
      endpointUrl:this.formData?.backend?.[0]?.url_pattern,
      decodeAs:this.formData?.backend?.[0]?.encoding,
      staticUrl:this.formData?.backend?.[0].path,
      directory_Listing:this.formData?.backend?.[0].directory_Listing,

    })
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
