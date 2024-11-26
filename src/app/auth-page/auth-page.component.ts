import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {

  @Input() formData: any;

  scopesArray:string[]=[];
  audienceArray:string[]=[];
  rolesArray :string[]=[];
  keysToSignArray:string[]=[];
  fingerprintsArray:string[]=[];

  @Output() authPageFormSubmitted=new EventEmitter<any>();

  formGroup1: FormGroup;

  constructor(private formBuilder:FormBuilder){
    this.formGroup1=this.formBuilder.group({
      isTokenValidationActive:[false],
      isTokenSigningActive:[false],
      isBasicAuthActive:[false],
      isCustomChiperSuiteActive:[false],
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
      fingerprintArrayValue:[[]],
      isRolesKeyActive:[false],
      isCachingActive:[false],
      isJwkSecActive:[false],
      isfullSerializationActive:[false],
      isDisableJWKSecActive:[false],
    })

  
  }
 
  ngOnInit(){
    console.log(this.formData);
    
    this.formGroup1.valueChanges.subscribe(value => {
      console.log(value);
      
      this.authPageFormSubmitted.emit(value); // Emit form data on every change
    });
    this.formGroup1.patchValue({
      isTokenValidationActive: !!this.formData?.extra_config?.["auth/validator"],
      isTokenSigningActive:!!this.formData?.extra_config?.["auth/signer"],
      isBasicAuthActive:!!this.formData?.extra_config?.["auth/basic"],
      // isCustomChiperSuiteActive:false,
      algorithm:this.formData?.extra_config?.["auth/validator"]?.alg,
      jwkUri:this.formData?.extra_config?.["auth/validator"]?.jwk_url,
      // selectedMatcher:[null],
      // scopesKey:[null],
      issuer:this.formData?.extra_config?.["auth/validator"]?.issuer,
      rolesKey:this.formData?.extra_config?.["auth/validator"]?.roles_key,
      // cookieName:[null],
      // customChiperSuite:[null],
      // tokenSignJwkUri:[null],
      tokenSignAlgorithm:this.formData?.extra_config?.["auth/signer"]?.alg,
      keyId:this.formData?.extra_config?.["auth/signer"]?.kid,
      // audience:[null],
      // roles:[null],
      // scopesToValidate:[null],
      keysToSign:[null],
      fingerprint:[null],
      audienceArrayValue:this.formData?.extra_config?.["auth/validator"]?.audience,
      rolesArrayValue:this.formData?.extra_config?.["auth/validator"]?.roles,
      // scopesToValidateArrayValue:[[]],
      keysToSignArrayValue:this.formData?.extra_config?.["auth/signer"]?.keys_to_sign,
      // fingerprintArrayValue:[[]],
      isRolesKeyActive:this.formData?.extra_config?.["auth/validator"]?.roles_key_is_nested,
      isCachingActive:this.formData?.extra_config?.["auth/validator"]?.cache,
      // isJwkSecActive:[false],
      // isfullSerializationActive:[false],
       isDisableJWKSecActive:this.formData?.extra_config?.["auth/validator"]?.disable_jwk_security,
    })
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
