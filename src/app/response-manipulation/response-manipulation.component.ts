import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-response-manipulation',
  templateUrl: './response-manipulation.component.html',
  styleUrl: './response-manipulation.component.css'
})
export class ResponseManipulationComponent {
  isStaticResponseEnabled = false; // Initially false
  formGroupResponseManipulation:FormGroup;
  @Input() formData: any;
  @Output() responseManipulationFormSubmitted=new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder){
    this.formGroupResponseManipulation=this.formBuilder.group({
      response:[''],
      strategy:[''],
      expression:[''],
      serverResponse:[''],
      expressionExample:[''],
      returnResponse:[''],
      find:[''],
      replace:[''],
      path:[''],
      responseBody:[''],
      contentType:[''],
      pathGo:['']
    })
  }
  ngOnInit(){
    this.formGroupResponseManipulation.valueChanges.subscribe(value => {
      console.log(value);
      
      this.responseManipulationFormSubmitted.emit(value); // Emit form data on every change
    });
  }
  saveForm(){
if(this.formGroupResponseManipulation.valid){
  this.responseManipulationFormSubmitted.emit(this.formGroupResponseManipulation.value)
}
  }
  onToggleChangeStaticResponse(event: any) {
    this.isStaticResponseEnabled = event.checked; // Capture toggle state
  }
  isAdvanceResponseEnabled = false; // Initially false

  onToggleChangeAdvanceResponse(event: any) {
    this.isAdvanceResponseEnabled = event.checked; // Capture toggle state
  }
  isAdvanceResponseGoEnabled = false; // Initially false

  onToggleChangeResponseGo(event: any) {
    this.isAdvanceResponseGoEnabled = event.checked; // Capture toggle state
  }
  isAdvanceRegExpEnabled = false; // Initially false

  onToggleChangeRegExp(event: any) {
    this.isAdvanceRegExpEnabled = event.checked; // Capture toggle state
  }
}
