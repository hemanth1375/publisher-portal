import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upstream-throttling',
  templateUrl: './upstream-throttling.component.html',
  styleUrl: './upstream-throttling.component.css'
})
export class UpstreamThrottlingComponent implements OnInit, AfterViewInit {


  formGroupUpstreamThrottling: FormGroup;
  @Input() formData: any;
  @Output() upstreamThrottlingFormSubmitted = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.formGroupUpstreamThrottling = formBuilder.group({
      isCircuitBreakerActive: [false],
      isProxyRateLimitActive: [false],
      circuitBreakerName: [null],
      maxError: ['', Validators.required],
      interval: ['', Validators.required],
      timeout: ['', Validators.required],
      maxRateLimit: ['', Validators.required],
      every: ['', Validators.pattern("^[0-9]+(ns|ms|us|µs|s|m|h)$")],
      capacity: ['', Validators.required],
      logStatusChange: [false]
    })
  }

  ngAfterViewInit(): void {
    this.formGroupUpstreamThrottling.valueChanges.subscribe(value => {
      console.log(value);

      this.upstreamThrottlingFormSubmitted.emit(value); // Emit form data on every change
    });
  }

  ngOnInit() {
    this.formGroupUpstreamThrottling.patchValue({
      circuitBreakerName: this.formData?.backend?.[0]?.extra_config?.["qos/circuit-breaker"]?.name,
      maxError: this.formData?.backend?.[0]?.extra_config?.["qos/circuit-breaker"]?.max_errors,
      interval: [null],
      timeout: this.formData?.backend?.[0]?.extra_config?.["qos/circuit-breaker"]?.timeout,
      maxRateLimit: this.formData?.backend?.[0]?.extra_config?.["qos/ratelimit/proxy"]?.max_rate,
      every: [null],
      capacity: this.formData?.backend?.[0]?.extra_config?.["qos/ratelimit/proxy"]?.capacity,
      logStatusChange: this.formData?.backend?.[0]?.extra_config?.["qos/circuit-breaker"]?.log_status_change,
      isCircuitBreakerActive: this.formData?.backend?.[0]?.extra_config?.["qos/circuit-breaker"],
      isProxyRateLimitActive: this.formData?.backend?.[0]?.extra_config?.["qos/ratelimit/proxy"],
    })
    this.formGroupUpstreamThrottling.get('maxError')?.setValue(1);
    this.formGroupUpstreamThrottling.get('interval')?.setValue(60);
    this.formGroupUpstreamThrottling.get('timeout')?.setValue(10);
    this.formGroupUpstreamThrottling.get('maxRateLimit')?.setValue(10);

    this.formGroupUpstreamThrottling.get('capacity')?.setValue(10);




  }

  onToggleChangeStaticResponse(event: any, id: any) {
    console.log('id', id);
    (this as any)[id] = event.checked;
  }

  saveForm() {
    if (this.formGroupUpstreamThrottling.valid) {
      console.log(this.formGroupUpstreamThrottling.value);

      this.upstreamThrottlingFormSubmitted.emit(this.formGroupUpstreamThrottling.value)
    }
  }
}
