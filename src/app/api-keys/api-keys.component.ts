import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrl:'./api-keys.component.css'
})
export class ApiKeysComponent{


  apiKeysForm: FormGroup;
  keysArray:any[] = [];
  rolesArray:any[]=[];

  constructor(private fb: FormBuilder) {
    this.apiKeysForm = this.fb.group({
      isAPIKeyAuthActive:[false],
      APIKey:[],
      role:[],
      rolesArrayValue:[[]],
      description:[],
      keysArray:[[]]
    })
  }

  
  addParameter(fieldName: 'role'){
    const fieldValue = this.apiKeysForm.get(fieldName)?.value;
    
    if(fieldName){
      if(fieldName ==='role'){
        this.rolesArray.push(fieldValue);
        this.apiKeysForm.get('rolesArrayValue')?.setValue([...this.rolesArray])
      }
    }

    this.apiKeysForm.get(fieldName)?.reset();
  }

  removeParameter(index:any, fieldName:'role'){
    this.rolesArray.splice(index,1);
    this.apiKeysForm.get('rolesArrayValue')?.setValue([...this.rolesArray]);
  } 


  addKey(){
    this.keysArray.push(this.apiKeysForm.value)
    this.apiKeysForm.get('keysArray')?.setValue([...this.keysArray]);
    console.log(this.keysArray);
    this.apiKeysForm.get('APIKey')?.reset();
    this.apiKeysForm.get('role')?.reset();
    this.apiKeysForm.get('description')?.reset();
  }

  }
  
