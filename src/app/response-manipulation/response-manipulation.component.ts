import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-response-manipulation',
  templateUrl: './response-manipulation.component.html',
  styleUrl: './response-manipulation.component.css'
})
export class ResponseManipulationComponent implements OnInit,AfterViewInit {
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
  ngAfterViewInit(): void {
    this.formGroupResponseManipulation.valueChanges.subscribe(value => {
      console.log(value);
      
      this.responseManipulationFormSubmitted.emit(value); // Emit form data on every change
    });
  }
  ngOnInit(){
   console.log(this.formData);
   this.formGroupResponseManipulation.patchValue({
    response:this.formData?.extra_config?.proxy?.static?.data,
    strategy:this.formData?.extra_config?.proxy?.static?.strategy
   })
   
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
