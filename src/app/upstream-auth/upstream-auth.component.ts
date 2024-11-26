import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upstream-auth',
  templateUrl: './upstream-auth.component.html',
  styleUrl: './upstream-auth.component.css'
})
export class UpstreamAuthComponent implements OnInit, AfterViewInit{

  formGroupUpstreamAuth: FormGroup;
  @Input() formData: any;
  @Output() upstreamAuthFormSubmitted = new EventEmitter<any>();
  objectMap: Map<string, string> = new Map();

  constructor(private formBuilder: FormBuilder) {
    this.formGroupUpstreamAuth = this.formBuilder.group({
      clientId: [null],
      clientSecret: [null],
      tokenUrl: [null],
      scopes: [null],
      audience: [null],
      user: [null],
      password: [null],
      isAuthActive:[false],
      isGoogleCloudActive:[false],
      isNtlmAuthActive:[false],
      objectMapValue:[[]],
      endpointValue:[],
      endpointKey:[]

      
    })
  }

  ngAfterViewInit(): void {
    this.formGroupUpstreamAuth.valueChanges.subscribe(value => {
      console.log(value);
      this.upstreamAuthFormSubmitted.emit(value); // Emit form data on every change
    });
  }

  addParameter(fieldName:'endpoint_params') {
    const fieldValue = this.formGroupUpstreamAuth.get(fieldName)?.value;

    if (fieldName) {
   
     if(fieldName === 'endpoint_params'){
        const endpointKey = this.formGroupUpstreamAuth.get('endpointKey')?.value;
        const endpointValue = this.formGroupUpstreamAuth.get('endpointValue')?.value;

        if (endpointKey && endpointValue) {
          this.addToMap(endpointKey, endpointValue)
        }
      }
  }
}

removeParameter(index: any, fieldName:'endpoint_params') {

  if(fieldName === 'endpoint_params'){
   this.removeFromMap(index);
  }

}

updateMapControl() {
  // Convert Map to array of key-value pairs
  const mapArray = Array.from(this.objectMap.entries());
  this.formGroupUpstreamAuth.get('objectMapValue')?.setValue(mapArray);
}

addToMap(key: string, value: string) {
  this.objectMap.set(key, value);
  this.updateMapControl();  // Sync form control with updated Map
}

removeFromMap(key: string) {
  this.objectMap.delete(key);
  this.updateMapControl();  // Sync form control with updated Map
}

getMapFromControl(): Map<string, string> {
  const mapArray = this.formGroupUpstreamAuth.get('objectMapValue')?.value || [];
  return new Map(mapArray);
}

  ngOnInit() {
    this.formGroupUpstreamAuth.patchValue({
      clientId: this.formData?.backend?.[0]?.extra_config?.["auth/client-credentials"]?.client_id,
      clientSecret: this.formData?.backend?.[0]?.extra_config?.["auth/client-credentials"]?.client_secret,
      tokenUrl: this.formData?.backend?.[0]?.extra_config?.["auth/client-credentials"]?.token_url,
      scopes: this.formData?.backend?.[0]?.extra_config?.["auth/client-credentials"]?.scopes,
      audience: this.formData?.backend?.[0]?.extra_config?.["auth/gcp"]?.audience,
      user: this.formData?.backend?.[0]?.extra_config?.["auth/ntlm"]?.user,
      password: this.formData?.backend?.[0]?.extra_config?.["auth/ntlm"]?.password,
      isAuthActive:!!this.formData?.backend?.[0]?.extra_config?.["auth/client-credentials"],
      isGoogleCloudActive:!!this.formData?.backend?.[0]?.extra_config?.["auth/gcp"],
      isNtlmAuthActive:!!this.formData?.backend?.[0]?.extra_config?.["auth/ntlm"],
      // objectMapValue:this.formData?.backend?.[0]?.extra_config?.["auth/client-credentials"]?.endpoint_params,
      endpointValue:'',
      endpointKey:'',
    })
  }

  saveForm() {
    if (this.formGroupUpstreamAuth.valid) {
      this.upstreamAuthFormSubmitted.emit(this.formGroupUpstreamAuth.value)
    }
  }

}



