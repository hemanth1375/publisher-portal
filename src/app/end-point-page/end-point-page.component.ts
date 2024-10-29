import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-end-point-page',
  templateUrl: './end-point-page.component.html',
  styleUrl: './end-point-page.component.css'
})
export class EndPointPageComponent {

  formGroupEndPoint:FormGroup;
  @Output() endPointFormSubmitted = new EventEmitter<any>();

  constructor(private formBuilder:FormBuilder){
    this.formGroupEndPoint=formBuilder.group({
      endPointUri:[''],
      selectedMethod:[''],
      selectedOutput:['']
    })
  }
  submitForm(){
    console.log('done');
    
    if(this.formGroupEndPoint.valid){
    this.endPointFormSubmitted.emit(this.formGroupEndPoint.value)
    }
  }

}
