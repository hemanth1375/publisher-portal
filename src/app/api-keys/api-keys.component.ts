import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrl: './api-keys.component.css'
})
export class ApiKeysComponent {

  apikeyFormGroup:FormGroup;

  constructor(private fb:FormBuilder){

    this.apikeyFormGroup = this.fb.group({
      isAPIKeyAuthActive:[false]
    })
  }

}
