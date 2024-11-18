import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-upstream-response-manipulation',
  templateUrl: './upstream-response-manipulation.component.html',
  styleUrl: './upstream-response-manipulation.component.css'
})
export class UpstreamResponseManipulationComponent implements OnInit, AfterViewInit{

  // contentReplacerKey: string = '';
  deniedAttributesArr:any[]=[];
  allowedAttributesArr:string[]=[];
  faltMapArr:any[]=[];
  items: any;
  formGroupResManipulation:FormGroup;
  objectMap: Map<string, string> = new Map();
  isKeyCreated: boolean = false; 
  @Input() formData: any;
  @Output() upstreamResponseFormSubmitted =new EventEmitter<any>();
  
  constructor(private formBuilder:FormBuilder){
    this.items = [
      { name: 'Deny' },
      { name: 'Allow' },
    ];

    this.formGroupResManipulation = this.formBuilder.group({
      isCollection:[false],
      rootObject:[{value:'', disabled:false}],
      deniedAttr:[[]],
      allowedAttr:[[]],
      deniedAttributesArrValue:[[]],
      allowedAttributesArrValue:[[]],
      wrappingGroup:[''],
      originalObj:[''],
      renamedObj:[''],
      objectMapValue:[[]],
      isCachingActive:[false],
      isSharedCacheActive:[false], 
      AdvResManipulationActive:[false],
      resManiWithGoTemplActive:[false],
      expression:[''],
      bodyEditor:['bodyeditor'],
      template:[''],
      contentType:[''],
      debug:[false],
      path:[''],
      contentReplacer: this.formBuilder.group({}),
      contentReplacerKey:[''],
      regexConReplacerActive:[true],
      operationType:[''],
      flatmapTargetObj:[''],
      flatmapOriginalObj:[''],
      flatmapFilterArr:[[]],
      martianActive:[true],
      martian:[''] 
    })

  }
  
  ngAfterViewInit(): void {
    this.formGroupResManipulation.valueChanges.subscribe(value => {
      console.log(value);
      
      this.upstreamResponseFormSubmitted.emit(value); // Emit form data on every change
    });
  }


  jsonData = {
    "students": [
      { "name": "Bill", "age": 23 },
      { "name": "Mary", "age": 16 },
      { "name": "Jessica", "age": 19 }
    ]
  };
  
  selectedItem: any;

  selectItem(item: any) {
    console.log(item);
    this.selectedItem = item;
  }


  updateMapControl() {
    // Convert Map to array of key-value pairs
    const mapArray = Array.from(this.objectMap.entries());
    this.formGroupResManipulation.get('objectMapValue')?.setValue(mapArray);
  }
  
  addToMap(key: string, value: string) {
    this.objectMap.set(key, value);
    this.updateMapControl();  // Sync form control with updated Map
  }
  
  removeFromMap(key: string) {
    this.objectMap.delete(key);
    this.updateMapControl();  // Sync form control with updated Map
  }

  getMapFromControl(): Map<string, string> {
    const mapArray = this.formGroupResManipulation.get('objectMapValue')?.value || [];
    return new Map(mapArray);
  }

  addParameter(fieldName: 'deniedAttr' | 'allowedAttr'|'renaming'| 'flatMap') {
    const fieldValue = this.formGroupResManipulation.get(fieldName)?.value;

    if (fieldName) {
      if(fieldName === 'deniedAttr'){
        this.deniedAttributesArr.push(fieldValue);
        this.formGroupResManipulation.get('deniedAttributesArrValue')?.setValue([...this.deniedAttributesArr]);
      }
      else if(fieldName ==='allowedAttr'){
        this.allowedAttributesArr.push(fieldValue);
        this.formGroupResManipulation.get('allowedAttributesArrValue')?.setValue([...this.allowedAttributesArr]);
      }else if(fieldName === 'renaming'){
        const originalObject = this.formGroupResManipulation.get('originalObj')?.value;
        const renamedObject = this.formGroupResManipulation.get('renamedObj')?.value;

        if (originalObject && renamedObject) {
          this.addToMap(originalObject, renamedObject)
        }
      }else if(fieldName === 'flatMap'){
        const obj = {
          "type": this.formGroupResManipulation.get('operationType')?.value,
          "args": [
            this.formGroupResManipulation.get('flatmapOriginalObj')?.value,
            this.formGroupResManipulation.get('flatmapTargetObj')?.value || undefined
          ].filter(value => value !== undefined) // Filter out undefined values
        };
        
      this.faltMapArr.push(obj);

      this.formGroupResManipulation.get('flatmapFilterArr')?.setValue([...this.faltMapArr])
      console.log(this.faltMapArr);
      this.formGroupResManipulation.get('operationType')?.reset()
      this.formGroupResManipulation.get('flatmapOriginalObj')?.reset()
      this.formGroupResManipulation.get('flatmapTargetObj')?.reset()
      
      }
      this.formGroupResManipulation.get(fieldName)?.reset();
    }
  }

  removeParameter(index: any, fieldName:'deniedAttr' | 'allowedAttr' | 'renaming'| 'flatMap') {
    if(fieldName === "deniedAttr"){
      this.deniedAttributesArr.splice(index,1);
      this.formGroupResManipulation.get('deniedAttributesArrValue')?.setValue([...this.deniedAttributesArr]);
    }else if(fieldName === 'allowedAttr'){
      this.allowedAttributesArr.splice(index,1);
      this.formGroupResManipulation.get('allowedAttributesArrValue')?.setValue([...this.allowedAttributesArr]);
    }
    else if(fieldName === 'renaming'){
     this.removeFromMap(index);
    }
    else if(fieldName ==='flatMap'){
      this.faltMapArr.splice(index,1)
      this.formGroupResManipulation.get('flatmapFilterArr')?.setValue([...this.faltMapArr])
    }
    
  }

  createContentReplacerKey() {
    if (this.formGroupResManipulation.get('contentReplacerKey')?.value) {
      const contentReplacerGroup = this.formGroupResManipulation.get('contentReplacer') as FormGroup;

      // Create a new FormGroup with find, replace, and regexp
      const nestedFormGroup = this.formBuilder.group({
        find: [''],    // Default empty value for find
        replace: [''], // Default empty value for replace
        regexp: [false] // Default checkbox unchecked
      });

      // Add the new group to contentReplacer with the entered key
      contentReplacerGroup.addControl(this.formGroupResManipulation.get('contentReplacerKey')?.value, nestedFormGroup);

      // Reset the key input and set flag to show nested controls
      this.isKeyCreated = true;
    }
  }

  resetFields() {
    const key = this.formGroupResManipulation.get('contentReplacerKey')?.value;
    if (key) {
      const contentReplacerGroup = this.formGroupResManipulation.get('contentReplacer') as FormGroup;
      contentReplacerGroup.removeControl(key);
      this.formGroupResManipulation.get('contentReplacerKey')?.reset();
      this.isKeyCreated = false;
    }
  }


  ngOnInit(): void {

    this.formGroupResManipulation.patchValue({
      isCollection:this.formData?.backend?.[0]?.is_collection,
      wrappingGroup:this.formData?.backend?.[0]?.group
    })
   

    this.selectedItem = this.items[0];
    this.formGroupResManipulation.get('path')?.disable();

    this.formGroupResManipulation.get('isCollection')?.valueChanges.subscribe((isChecked)=>{
      const rootObjectControl = this.formGroupResManipulation.get('rootObject');

      if(isChecked){
        rootObjectControl?.disable();
      }else{
        rootObjectControl?.enable();
      }
    });

    this.formGroupResManipulation.get('bodyEditor')?.valueChanges.subscribe((value)=>{
      const bodyEditorControl = this.formGroupResManipulation.get('template');
      const pathControl = this.formGroupResManipulation.get('path');
      
      if(value === 'bodyeditor'){
        bodyEditorControl?.enable();
        pathControl?.disable();

      }else if(value === 'external'){
        bodyEditorControl?.disable();
        pathControl?.enable();
      }
    })
  }

    

 
}
