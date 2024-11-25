import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upstream-auth',
  templateUrl: './upstream-auth.component.html',
  styleUrl: './upstream-auth.component.css'
})
export class UpstreamAuthComponent {

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
      parameters: [null],
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
    console.log(this.formData);

    this.formGroupUpstreamAuth.valueChanges.subscribe(value => {
      console.log(value);

      this.upstreamAuthFormSubmitted.emit(value); // Emit form data on every change
    });
  }

  saveForm() {
    if (this.formGroupUpstreamAuth.valid) {
      this.upstreamAuthFormSubmitted.emit(this.formGroupUpstreamAuth.value)
    }
  }

}



