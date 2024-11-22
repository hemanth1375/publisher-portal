import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-throttling',
  templateUrl: './throttling.component.html',
  styleUrl: './throttling.component.css'
})
export class ThrottlingComponent {

  cidrArray:any[]= [];
  trustedProxiesArray:any[]=[];
  clientIPHeadersArray:any[]=[];

  formGroupThrottling: FormGroup;
  @Input() formData: any;
  @Output() throttlingFormSubmitted = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder) {
    this.formGroupThrottling = this.formBuilder.group({
      timeout: [''],
      cacheTtl: [''],
      cidr: [''],
      cidrArrayValue:[[]],
      trustedProxies: [''],
      trustedProxiesArrayValue:[[]],
      clientIpHeaders: [''],
      clientIPHeadersArrayValue:[[]],
      allowModeActive:[false],
      rateLimit: [''],
      every: [''],
      capacity: [''],
      defaultUserQuota: [''],
      clientCapacity: [''],
      address: [''],
      rate: [''],
      periods: [''],
      burst: [''],
      tokenizer: [''],
      tokenizerField: [''],
      isIpFilterEnabledActive:[false],
      isEndPointRateLimitEnabledActive:[false],
      isRedisRateLimitEnabledActive:[false]
    })
  }
  
  ngOnInit() {
    console.log(this.formData);
    this.formGroupThrottling.patchValue({
      rateLimit: this.formData?.extra_config?.["qos/ratelimit/router"]?.max_rate
    })
  }

  ngAfterViewInit() {
    this.formGroupThrottling.valueChanges.subscribe(value => {
      console.log(value);

      this.throttlingFormSubmitted.emit(value); // Emit form data on every change
    });
  }

  saveForm() {
    if (this.formGroupThrottling.valid) {
      this.throttlingFormSubmitted.emit(this.formGroupThrottling.value)
    }
  }

  addParameter(fieldName: 'cidr' | 'trustedProxies'| 'clientIpHeaders') {
    const fieldValue = this.formGroupThrottling.get(fieldName)?.value;

    if (fieldName) {
      if(fieldName === 'cidr'){
        this.cidrArray.push(fieldValue);
        this.formGroupThrottling.get('cidrArrayValue')?.setValue([...this.cidrArray])

      }else if(fieldName ==='trustedProxies'){
        this.trustedProxiesArray.push(fieldValue);
        this.formGroupThrottling.get('trustedProxiesArrayValue')?.setValue([...this.trustedProxiesArray])


      }else if(fieldName === 'clientIpHeaders'){
        this.clientIPHeadersArray.push(fieldValue);
        this.formGroupThrottling.get('clientIPHeadersArrayValue')?.setValue([...this.clientIPHeadersArray])

      }

      this.formGroupThrottling.get(fieldName)?.reset();
    }
  }

  removeParameter(index: any, fieldName:'cidr' | 'trustedProxies'| 'clientIpHeaders') {
    if(fieldName === 'cidr'){
      this.cidrArray.splice(index,1);
      this.formGroupThrottling.get('cidrArrayValue')?.setValue([...this.cidrArray]);
    }else if(fieldName === 'trustedProxies'){
      this.trustedProxiesArray.splice(index,1);
      this.formGroupThrottling.get('trustedProxiesArrayValue')?.setValue([...this.trustedProxiesArray]);

    }else if(fieldName === 'clientIpHeaders'){
      this.clientIPHeadersArray.splice(index, 1);
      this.formGroupThrottling.get('clientIPHeadersArrayValue')?.setValue([...this.clientIPHeadersArray])
    }

  }

 

}
