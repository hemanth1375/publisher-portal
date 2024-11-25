import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      isCircuitBreakerActive:[false],
      isProxyRateLimitActive:[false],
      circuitBreakerName: [null],
      maxError: [null],
      interval: [null],
      timeout: [null],
      maxRateLimit: [null],
      every: [null],
      capacity: [null],
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
      logStatusChange: this.formData?.backend?.[0]?.extra_config?.["qos/circuit-breaker"]?.log_status_change
    })
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
