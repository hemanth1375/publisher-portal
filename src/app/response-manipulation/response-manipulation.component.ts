import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-response-manipulation',
  templateUrl: './response-manipulation.component.html',
  styleUrl: './response-manipulation.component.css'
})
export class ResponseManipulationComponent implements OnInit, AfterViewInit {
  // Initially false

  isKeyCreated: boolean = false; 

  formGroupResponseManipulation: FormGroup;
  @Input() formData: any;
  @Output() responseManipulationFormSubmitted = new EventEmitter<any>();

  jsonData = {
    "students": [
      { "name": "Bill", "age": 23 },
      { "name": "Mary", "age": 16 },
      { "name": "Jessica", "age": 19 }
    ]
  };


  constructor(private formBuilder: FormBuilder) {
    this.formGroupResponseManipulation = this.formBuilder.group({
      response: [null],
      strategy: [null],
      expression: [null],

      contentReplacerKey:[''],
      contentReplacer: this.formBuilder.group({}),
      regexConReplacerActive:[false],

      isStaticResponseActive: [false],
      isAdvanceResponseActive: [false],
     
      isAdvanceResponseGoActive: [false],

      bodyEditor:['bodyeditor'],
      template:[''],
      contentType:[''],
      debug:[false],
      path:[''],
    })
  }

  createContentReplacerKey() {
    if (this.formGroupResponseManipulation.get('contentReplacerKey')?.value) {
      const contentReplacerGroup = this.formGroupResponseManipulation.get('contentReplacer') as FormGroup;

      // Create a new FormGroup with find, replace, and regexp
      const nestedFormGroup = this.formBuilder.group({
        find: [''],    // Default empty value for find
        replace: [''], // Default empty value for replace
        regexp: [false] // Default checkbox unchecked
      });

      // Add the new group to contentReplacer with the entered key
      contentReplacerGroup.addControl(this.formGroupResponseManipulation.get('contentReplacerKey')?.value, nestedFormGroup);

      // Reset the key input and set flag to show nested controls
      this.isKeyCreated = true;
    }
  }


  resetFields() {
    const key = this.formGroupResponseManipulation.get('contentReplacerKey')?.value;
    if (key) {
      const contentReplacerGroup = this.formGroupResponseManipulation.get('contentReplacer') as FormGroup;
      contentReplacerGroup.removeControl(key);
      this.formGroupResponseManipulation.get('contentReplacerKey')?.reset();
      this.isKeyCreated = false;
    }
  }


  ngAfterViewInit(): void {
    this.formGroupResponseManipulation.valueChanges.subscribe(value => {
      console.log(value);

      this.responseManipulationFormSubmitted.emit(value); // Emit form data on every change
    });
  }


  ngOnInit() {
    console.log(this.formData);
    this.formGroupResponseManipulation.patchValue({
      response: this.formData?.extra_config?.proxy?.static?.data,
      strategy: this.formData?.extra_config?.proxy?.static?.strategy
    });

    this.formGroupResponseManipulation.get('bodyEditor')?.valueChanges.subscribe((value)=>{
      const bodyEditorControl = this.formGroupResponseManipulation.get('template');
      const pathControl = this.formGroupResponseManipulation.get('path');
      
      if(value === 'bodyeditor'){
        bodyEditorControl?.enable();
        pathControl?.disable();

      }else if(value === 'external'){
        bodyEditorControl?.disable();
        pathControl?.enable();
      }
    })

  }


  saveForm() {
    if (this.formGroupResponseManipulation.valid) {
      this.responseManipulationFormSubmitted.emit(this.formGroupResponseManipulation.value)
    }
  }

}
