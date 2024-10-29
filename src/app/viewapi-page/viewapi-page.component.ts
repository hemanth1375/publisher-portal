import { Component } from '@angular/core';

@Component({
  selector: 'app-viewapi-page',
  templateUrl: './viewapi-page.component.html',
  styleUrl: './viewapi-page.component.css'
})
export class ViewapiPageComponent {
  // throttle
  isIpFilterEnabled = false; // Initially false

  onToggleChange(event: any) {
    this.isIpFilterEnabled = event.checked; // Capture toggle state
  }
  items = [
    {name:'EndPoint'},
    { name: 'Parameter Forwarding'},
    { name: 'Auth' },
    { name: 'Throttling'},
    { name: 'Policies'},
    { name: 'Response Manipulation'},
    { name: 'connectivity Options'},
    { name: 'Open Api'}
  ];
  selectedItem: any;

  selectItem(item: any) {
    console.log(item);
    
    this.selectedItem = item;
  }
  ngOnInit() {
    this.selectedItem = this.items[0];
  }
  onFormSubmit(formData: any) {
    console.log("Form data received from child:", formData);
    // Handle the form data, e.g., submit it to a service or API.
  }
  entireFormData:any = {
    endPoint:null,
    parameterForwarding: null,
    throttling: null,
    responseManipulation: null,
    connectivityOptions:null,
    policies:null,
    auth:null,
    openApi: null
  };

  collectData(formName: string, data: any) {
    this.entireFormData[formName] = data;
    console.log("Form data collected:", this.entireFormData);
  }
  submitForm(){
    console.log(this.entireFormData);
    
  }
}
