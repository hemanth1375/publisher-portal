import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiPageService } from '../services/api-page.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-end-point-page',
  templateUrl: './end-point-page.component.html',
  styleUrl: './end-point-page.component.css'
})
export class EndPointPageComponent implements OnInit ,AfterViewInit {
  @Input() formData: any; // Input to receive data from the parent

  formGroupEndPoint:FormGroup;
  @Output() endPointFormSubmitted = new EventEmitter<any>();
  receivedData: any;
  private unsubscribe = new Subject<void>();

  constructor(private formBuilder:FormBuilder,private apiPageService:ApiPageService){
    this.formGroupEndPoint=this.formBuilder.group({
      endPointUri:[''],
      selectedMethod:[''],
      selectedOutput:['']
    })
  }

  ngAfterViewInit(): void {
    this.formGroupEndPoint&&this.formGroupEndPoint?.valueChanges.subscribe((value:any) => {
      console.log(value);
      
      this.endPointFormSubmitted.emit(value); // Emit form data on every change
    });
  }
  ngOnInit(){
   
    console.log(this.formData);
    this.formGroupEndPoint.patchValue({
      endPointUri:this.formData?.endpoint
    })
    // this.apiPageService.getData$().subscribe(data => {
    //   this.receivedData = data;
    //   console.log(this.receivedData);
    //   this.formGroupEndPoint.get('endPointUri')?.setValue(this.receivedData.endpoint);
    // });
    
  }
  submitForm(){
    console.log('done');
    
    if(this.formGroupEndPoint.valid){
    this.endPointFormSubmitted.emit(this.formGroupEndPoint.value)
    }
  }

}
