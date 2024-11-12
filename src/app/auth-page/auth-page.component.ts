import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {

  @Input() formData: any;

  isTokenValidationActive=false;
  isTokenSigningActive=false;
  isBasicAuthActive=false;
  isCustomChiperSuiteActive = false;

  scopesArray:string[]=[];
  audienceArray:string[]=[];
  rolesArray :string[]=[];
  keysToSignArray:string[]=[];
  fingerprintsArray:string[]=[];

  @Output() authPageFormSubmitted=new EventEmitter<any>();

  formGroup1: FormGroup;
  formgroup2:FormGroup;
  constructor(private formBuilder:FormBuilder){
    this.formGroup1=this.formBuilder.group({
      algorithm:[null],
      jwkUri:[null],
      selectedMatcher:[null],
      scopesKey:[null],
      issuer:[null],
      rolesKey:[null],
      cookieName:[null],
      customChiperSuite:[null],
      tokenSignJwkUri:[null],
      tokenSignAlgorithm:[null],
      keyId:[null],
      audience:[null],
      roles:[null],
      scopesToValidate:[null],
      keysToSign:[null],
      fingerprint:[null],
      audienceArrayValue:[[]],
      rolesArrayValue:[[]],
      scopesToValidateArrayValue:[[]],
      keysToSignArrayValue:[[]],
      fingerprintArrayValue:[[]]
      
    })

    this.formgroup2 = this.formBuilder.group({

    })
  }

  ngOnInit(){
    this.formGroup1.valueChanges.subscribe(value => {
      console.log(value);
      
      this.authPageFormSubmitted.emit(value); // Emit form data on every change
    });
  }
  changeStatus(){
    this.isCustomChiperSuiteActive = !this.isCustomChiperSuiteActive
    console.log(this.isCustomChiperSuiteActive);
    
  } 
  
  onToggleChangeStaticResponse(event: any, id:any) {
    console.log('id', id);
    (this as any)[id] = event.checked;  
  }
 
  addParameter(fieldName: 'audience' | 'roles' | 'scopesToValidate' | 'fingerprint' | 'keysToSign') {
    const fieldValue = this.formGroup1.get(fieldName)?.value;

    if (fieldName) {
      if(fieldName === 'audience'){
        this.audienceArray.push(fieldValue);
        this.formGroup1.get('audienceArrayValue')?.setValue([...this.audienceArray]);
      }
      else if(fieldName ==='roles'){
        this.rolesArray.push(fieldValue);
        this.formGroup1.get('rolesArrayValue')?.setValue([...this.rolesArray]);
      }
      else if(fieldName ==='scopesToValidate'){
        this.scopesArray.push(fieldValue);
        this.formGroup1.get('scopesToValidateArrayValue')?.setValue([...this.scopesArray]);
      }
      else if(fieldName ==='fingerprint'){
        this.fingerprintsArray.push(fieldValue);
        this.formGroup1.get('fingerprintArrayValue')?.setValue([...this.fingerprintsArray]);
      } else if(fieldName ==='keysToSign'){
        this.keysToSignArray.push(fieldValue);
        this.formGroup1.get('keysToSignArrayValue')?.setValue([...this.keysToSignArray]);
      }

      this.formGroup1.get(fieldName)?.reset();
    }
  }
 
  removeParameter(index: number, fieldName:'audience' | 'roles' | 'scopesToValidate' | 'fingerprint' | 'keysToSign') {
    if(fieldName === "audience"){
      this.audienceArray.splice(index,1);
      this.formGroup1.get('audienceArrayValue')?.setValue([...this.audienceArray]);
    }else if(fieldName === 'roles'){
      this.rolesArray.splice(index,1);
      this.formGroup1.get('rolesArrayValue')?.setValue([...this.rolesArray]);
    }else if(fieldName === 'scopesToValidate'){
      this.scopesArray.splice(index,1);
      this.formGroup1.get('scopesToValidateArrayValue')?.setValue([...this.scopesArray]);
    }else if(fieldName === 'fingerprint'){
      this.fingerprintsArray.splice(index,1);
      this.formGroup1.get('fingerprintArrayValue')?.setValue([...this.fingerprintsArray]);
    }else if(fieldName === 'keysToSign'){
      this.keysToSignArray.splice(index,1);
      this.formGroup1.get('keysToSignArrayValue')?.setValue([...this.keysToSignArray]);
    }
    
  }

  saveForm(){
    console.log("submitted") 
    console.log(this.formGroup1.value);
    this.authPageFormSubmitted.emit(this.formGroup1.value)
     
  }

}
