import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { SharedDataService } from '../services/shared-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
 
@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrl:'./api-keys.component.css'
})
export class ApiKeysComponent{


  apiKeysForm: FormGroup;
  keysArray:any[] = [];
  rolesArray:any[]=[];

  constructor(private fb: FormBuilder,private sharedService:SharedDataService,private _snackBar: MatSnackBar) {
    this.apiKeysForm = this.fb.group({
      isAPIKeyAuthActive:[false],
      APIKey:[],
      role:[],
      rolesArrayValue:[[]],
      description:[],
      keysArray:[[]]
    })
  }
  entireJsonData:any;
ngOnInit(){
  this.sharedService.getEntireJsonData$().subscribe(data=>{
    this.entireJsonData=data;
    
  })
  if(this.entireJsonData!=undefined){
    
    this.keysArray=this.entireJsonData?.extra_config?.["auth/api-keys"]?.keys
  }
  this.apiKeysForm.patchValue({
    isAPIKeyAuthActive: !!this.entireJsonData?.extra_config?.["auth/api-keys"],
    APIKey:'',
      role:[],
      rolesArrayValue:[[]],
      description:[],
      keysArray:this.entireJsonData?.extra_config?.["auth/api-keys"]?.keys
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

  emitValue(){
    console.log(this.apiKeysForm.value);
    if(this.apiKeysForm.valid){
      this._snackBar.open('Saved Successfully', 'OK', {
        duration: 5000
      });
      
  this.sharedService.setApikeysDataData(this.apiKeysForm.value);
    }
 
  }
  }
  
