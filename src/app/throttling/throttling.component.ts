import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-throttling',
  templateUrl: './throttling.component.html',
  styleUrl: './throttling.component.css'
})
export class ThrottlingComponent {

  formGroupThrottling:FormGroup;
  @Output() throttlingFormSubmitted =new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder){
    this.formGroupThrottling=this.formBuilder.group({
      timeout:[''],
      cacheTtl:[''],
      cidr:[''],
      trustedProxies:[''],
      clientIpHeaders:[''],
      rateLimit:[''],
      every:[''],
      capacity:[''],
      defaultUserQuota:[''],
      clientCapacity:[''],
      address:[''],
      rate:[''],
      periods:[''],
      burst:[''],
      tokenizer:[''],
      tokenizerField:['']
    })
  }
  saveForm(){
    if(this.formGroupThrottling.valid){
      this.throttlingFormSubmitted.emit(this.formGroupThrottling.value)
    }
  }

  isIpFilterEnabled = false; // Initially false

  onToggleChange(event: any) {
    this.isIpFilterEnabled = event.checked; // Capture toggle state
  }
  // end point rate limit
  isEndPointRateLimitEnabled=false;
  onToggleChangeEndPoint(event: any){
this.isEndPointRateLimitEnabled=event.checked;
  }
  isRedisRateLimitEnabled=false;
  onToggleChangeRedis(event: any){
this.isRedisRateLimitEnabled=event.checked;
  }
}
