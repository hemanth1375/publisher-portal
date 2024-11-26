import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-throttling',
  templateUrl: './throttling.component.html',
  styleUrl: './throttling.component.css'
})
export class ThrottlingComponent {

  cidrArray: any[] = [];
  trustedProxiesArray: any[] = [];
  clientIPHeadersArray: any[] = [];

  formGroupThrottling: FormGroup;
  @Input() formData: any;
  @Output() throttlingFormSubmitted = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder) {
    this.formGroupThrottling = this.formBuilder.group({
      timeout: ['', Validators.pattern("^[0-9]+(ns|ms|us|µs|s|m|h)$")],
      cacheTtl: ['', Validators.pattern("^[0-9]+(ns|ms|us|µs|s|m|h)$")],
      cidr: [''],
      cidrArrayValue: [[]],
      trustedProxies: [''],
      trustedProxiesArrayValue: [[]],
      clientIpHeaders: [''],
      clientIPHeadersArrayValue: [[]],
      allowModeActive: [false],
      rateLimit: ['', Validators.required],
      every: ['', Validators.pattern("^[0-9]+(ns|ms|us|µs|s|m|h)$")],
      capacity: [''],
      defaultUserQuota: [''],
      clientCapacity: [''],
      address: [''],
      rate: ['', Validators.required],
      periods: ['', Validators.pattern("^[0-9]+(ns|ms|us|µs|s|m|h)$")],
      burst: ['', Validators.required],
      tokenizer: [''],
      tokenizerField: [''],
      isIpFilterEnabledActive: [false],
      isEndPointRateLimitEnabledActive: [false],
      isRedisRateLimitEnabledActive: [false]
    })
  }

  ngOnInit() {
    console.log(this.formData);
    if(this.formData){
      this.cidrArray=this.formData?.["plugin/req-resp-modifier"]?.["ip-filter"]?.CIDR;
      this.trustedProxiesArray=this.formData?.["plugin/req-resp-modifier"]?.["ip-filter"]?.trusted_proxies;
      this.clientIPHeadersArray=this.formData?.["plugin/req-resp-modifier"]?.["ip-filter"]?.client_ip_headers;
    }
    this.formGroupThrottling.patchValue({
      rateLimit: this.formData?.extra_config?.["qos/ratelimit/router"]?.max_rate,
      tokenizer: this.formData?.extra_config?.["plugin/http-server"]?.["redis-ratelimit"]?.tokenizer,
      burst: this.formData?.extra_config?.["plugin/http-server"]?.["redis-ratelimit"]?.burst,
      timeout: this.formData?.timeout,
      cacheTtl: this.formData?.cache_ttl,
      // cidr: [''],
      cidrArrayValue: this.formData?.extra_config?.["plugin/req-resp-modifier"]?.["ip-filter"]?.CIDR,
      // trustedProxies: [''],
      trustedProxiesArrayValue:  this.formData?.extra_config?.["plugin/req-resp-modifier"]?.["ip-filter"]?.trusted_proxies,
      clientIpHeaders: [''],
      clientIPHeadersArrayValue: this.formData?.extra_config?.["plugin/req-resp-modifier"]?.["ip-filter"]?.client_ip_headers,
      allowModeActive: this.formData?.extra_config?.["plugin/req-resp-modifier"]?.["ip-filter"]?.allow,
      every:this.formData?.extra_config?.["qos/ratelimit/router"]?.every,
      capacity: this.formData?.extra_config?.["qos/ratelimit/router"]?.capacity,
      defaultUserQuota: this.formData?.extra_config?.["qos/ratelimit/router"]?.client_max_rate,
      clientCapacity:this.formData?.extra_config?.["qos/ratelimit/router"]?.client_capacity,
      address: this.formData?.extra_config?.["plugin/http-server"]?.["redis-ratelimit"]?.host,
      rate:  this.formData?.extra_config?.["plugin/http-server"]?.["redis-ratelimit"]?.rate,
      periods:  this.formData?.extra_config?.["plugin/http-server"]?.["redis-ratelimit"]?.Period,
     
      tokenizerField:  this.formData?.extra_config?.["plugin/http-server"]?.["redis-ratelimit"]?.TokenizerField,
      isIpFilterEnabledActive: !!this.formData?.extra_config?.["plugin/req-resp-modifier"]?.name.includes("ip-filter"),
      isEndPointRateLimitEnabledActive: !!this.formData?.extra_config?.["qos/ratelimit/router"],
      isRedisRateLimitEnabledActive: !!this.formData?.extra_config?.["plugin/http-server"]?.name.includes("redis-ratelimit")
    })

    this.formGroupThrottling.get('rateLimit')?.setValue(0);
    this.formGroupThrottling.get('capacity')?.setValue(0);
    this.formGroupThrottling.get('defaultUserQuota')?.setValue(0);
    this.formGroupThrottling.get('clientCapacity')?.setValue(0);
    this.formGroupThrottling.get('rate')?.setValue(100);
    this.formGroupThrottling.get('periods')?.setValue('60s');
    // this.formGroupThrottling.get('burst')?.setValue(10);





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

  addParameter(fieldName: 'cidr' | 'trustedProxies' | 'clientIpHeaders') {
    const fieldValue = this.formGroupThrottling.get(fieldName)?.value;

    if (fieldName) {
      if (fieldName === 'cidr') {
        this.cidrArray.push(fieldValue);
        this.formGroupThrottling.get('cidrArrayValue')?.setValue([...this.cidrArray])

      } else if (fieldName === 'trustedProxies') {
        this.trustedProxiesArray.push(fieldValue);
        this.formGroupThrottling.get('trustedProxiesArrayValue')?.setValue([...this.trustedProxiesArray])


      } else if (fieldName === 'clientIpHeaders') {
        this.clientIPHeadersArray.push(fieldValue);
        this.formGroupThrottling.get('clientIPHeadersArrayValue')?.setValue([...this.clientIPHeadersArray])

      }

      this.formGroupThrottling.get(fieldName)?.reset();
    }
  }

  removeParameter(index: any, fieldName: 'cidr' | 'trustedProxies' | 'clientIpHeaders') {
    if (fieldName === 'cidr') {
      this.cidrArray.splice(index, 1);
      this.formGroupThrottling.get('cidrArrayValue')?.setValue([...this.cidrArray]);
    } else if (fieldName === 'trustedProxies') {
      this.trustedProxiesArray.splice(index, 1);
      this.formGroupThrottling.get('trustedProxiesArrayValue')?.setValue([...this.trustedProxiesArray]);

    } else if (fieldName === 'clientIpHeaders') {
      this.clientIPHeadersArray.splice(index, 1);
      this.formGroupThrottling.get('clientIPHeadersArrayValue')?.setValue([...this.clientIPHeadersArray])
    }

  }



}
