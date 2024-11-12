import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiPageService } from '../services/api-page.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-end-point-page',
  templateUrl: './end-point-page.component.html',
  styleUrl: './end-point-page.component.css'
})
export class EndPointPageComponent implements OnInit {
  @Input() formData: any; // Input to receive data from the parent

  formGroupEndPoint:FormGroup;
  @Output() endPointFormSubmitted = new EventEmitter<any>();
  receivedData: any;
  private unsubscribe = new Subject<void>();

  constructor(private formBuilder:FormBuilder,private apiPageService:ApiPageService){
    this.formGroupEndPoint=formBuilder.group({
      endPointUri:[''],
      selectedMethod:[''],
      selectedOutput:['']
    })
  }
  ngOnInit(){
    this.formGroupEndPoint.valueChanges.subscribe(value => {
      console.log(value);
      
      this.endPointFormSubmitted.emit(value); // Emit form data on every change
    });
    this.apiPageService.getData$().subscribe(data => {
      this.receivedData = data;
      console.log(this.receivedData);
      this.formGroupEndPoint.get('endPointUri')?.setValue(this.receivedData.endpoint);
    });
    
  }
  submitForm(){
    console.log('done');
    
    if(this.formGroupEndPoint.valid){
    this.endPointFormSubmitted.emit(this.formGroupEndPoint.value)
    }
  }

}
