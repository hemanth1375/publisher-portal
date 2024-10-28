import { Component } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {

  isTokenValidationActive=false;
  isTokenSigningActive=false;
  isBasicAuthActive=false;
  isCustomChiperSuiteActive = false;

  scopesArray:string[]=[];
  audienceArray:string[]=[];
  rolesArray :string[]=[];
  keysToSignArray:string[]=[];
  fingerprintsArray:string[]=[];

  formGroup1: FormGroup;
  formgroup2:FormGroup;
  constructor(private formBuilder:FormBuilder){
    this.formGroup1=this.formBuilder.group({
      audience:[null],
      roles:[null],
      scopesToValidate:[null],
      keysToSign:[null],
      fingerprint:[null]
      
    })

    this.formgroup2 = this.formBuilder.group({

    })
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
      }
      else if(fieldName ==='roles'){
        this.rolesArray.push(fieldValue);
      }
      else if(fieldName ==='scopesToValidate'){
        this.scopesArray.push(fieldValue);
      }
      else if(fieldName ==='fingerprint'){
        this.fingerprintsArray.push(fieldValue);
      } else if(fieldName ==='keysToSign'){
        this.keysToSignArray.push(fieldValue);
      }

      this.formGroup1.get(fieldName)?.reset();
    }
  }
 
  removeParameter(index: number, fieldName:'audience' | 'roles' | 'scopesToValidate' | 'fingerprint' | 'keysToSign') {
    if(fieldName === "audience"){
      this.audienceArray.splice(index,1);
    }else if(fieldName === 'roles'){
      this.rolesArray.splice(index,1);
    }else if(fieldName === 'scopesToValidate'){
      this.scopesArray.splice(index,1);
    }else if(fieldName === 'fingerprint'){
      this.fingerprintsArray.splice(index,1);
    }else if(fieldName === 'keysToSign'){
      this.keysToSignArray.splice(index,1);
    }
    
  }

  submit(){
    console.log("submitted")  
  }

}
