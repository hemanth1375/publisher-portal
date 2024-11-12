import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiPageService } from '../services/api-page.service';

@Component({
  selector: 'app-service-settings',
  templateUrl: './service-settings.component.html',
  styleUrl: './service-settings.component.css'
})
export class ServiceSettingsComponent {

  formGroupService:FormGroup;
  @Input() formData: any;
  @Output() serviceSettingsFormSubmitted=new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder,private apiPageService:ApiPageService){
    this.formGroupService=this.formBuilder.group({
      name:[null],
      port:[null],
      host:[null]
    })
  }
  ngOnInit(){
    this.formGroupService.valueChanges.subscribe(value => {
      console.log(value);
      
      this.serviceSettingsFormSubmitted.emit(value); // Emit form data on every change
    });
  }
  submitForm(){
    const body={
      "$schema": "string",
      "version": 0,
      // "name": this.formGroupService.value.get('name'),
      "port": 0,
      "host": [
        "string"
      ]
    }
this.apiPageService.createKrakend(body).subscribe({
  next:(res:any)=>{
    console.log(res);
    
  }
})
  }

}
