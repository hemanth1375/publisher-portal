import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upstream-auth',
  templateUrl: './upstream-auth.component.html',
  styleUrl: './upstream-auth.component.css'
})
export class UpstreamAuthComponent {

  isAuthActive=false;
  isGoogleCloudActive=false;
  isNtlmAuthActive=false;
  formGroupUpstreamAuth:FormGroup;
  @Input() formData: any;
  @Output() upstreamAuthFormSubmitted=new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder){
    this.formGroupUpstreamAuth=this.formBuilder.group({
      clientId:[null],
      clientSecret:[null],
      tokenUrl:[null],
      scopes:[null],
      parameters:[null],
      audience:[null],
      user:[null],
      password:[null]
    })
  }
  ngOnInit(){
    this.formGroupUpstreamAuth.valueChanges.subscribe(value => {
      console.log(value);
      
      this.upstreamAuthFormSubmitted.emit(value); // Emit form data on every change
    });
  }
  onToggleChangeStaticResponse(event: any, id:any) {
    console.log('id', id);
    (this as any)[id] = event.checked;  
  }
  saveForm(){
    if(this.formGroupUpstreamAuth.valid){
    this.upstreamAuthFormSubmitted.emit(this.formGroupUpstreamAuth.value)
    }
  }
}
