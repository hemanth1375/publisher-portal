import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upstream-request',
  templateUrl: './upstream-request.component.html',
  styleUrl: './upstream-request.component.css'
})
export class UpstreamRequestComponent {
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
      bodyEditorTextarea:[null],
      contentType:[null],
      path:[null],
      martianDslTextarea:[null],
      
    })

  }
  ngOnInit(){
    this.formGroupUpstreamRequest.valueChanges.subscribe(value => {
      console.log(value);
      
      this.upstreamRequestFormSubmitted.emit(value); // Emit form data on every change
    });
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
