import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upstream-throttling',
  templateUrl: './upstream-throttling.component.html',
  styleUrl: './upstream-throttling.component.css'
})
export class UpstreamThrottlingComponent {

  isCircuitBreakerActive=false;
  isProxyRateLimitActive=false;
  formGroupUpstreamThrottling:FormGroup;
  @Input() formData: any;
  @Output() upstreamThrottlingFormSubmitted =new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder){
this.formGroupUpstreamThrottling=formBuilder.group({
  circuitBreakerName:[null],
  maxError:[null],
  interval:[null],
  timeout:[null],
  maxRateLimit:[null],
  every:[null],
  capacity:[null]
})
  }
  ngOnInit(){
    this.formGroupUpstreamThrottling.valueChanges.subscribe(value => {
      console.log(value);
      
      this.upstreamThrottlingFormSubmitted.emit(value); // Emit form data on every change
    });
}
  onToggleChangeStaticResponse(event: any, id:any) {
    console.log('id', id);
    (this as any)[id] = event.checked;  
  }
  saveForm(){
    if(this.formGroupUpstreamThrottling.valid){
      console.log(this.formGroupUpstreamThrottling.value);
      
      this.upstreamThrottlingFormSubmitted.emit(this.formGroupUpstreamThrottling.value)
    }
  }
}
