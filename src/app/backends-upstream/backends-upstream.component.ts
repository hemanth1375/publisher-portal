import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-backends-upstream',
  templateUrl: './backends-upstream.component.html',
  styleUrl: './backends-upstream.component.css'
})
export class BackendsUpstreamComponent {
  isIpFilterEnabled = false; // Initially false

  @Output() backendUpStreamSubmitted =new EventEmitter<any>();
  onToggleChange(event: any) {
    this.isIpFilterEnabled = event.checked; // Capture toggle state
  }
  items: any;
  constructor() {
    this.items = [
      { name: 'Request' },
      { name: 'Response Manipulation' },
      { name: 'Throttling' },
      { name: 'Connectivity' },
      { name: 'Autentication' },
      { name: 'Policies' }
    ];
  }
  // items = [
  //   { name: 'Request' },
  //   { name: 'Response Manipulation' },
  //   { name: 'Throttling' },
  //   { name: 'Connectivity' },
  //   { name: 'Autentication' },
  //   { name: 'Policies' }
  // ];
  // items: any;
  // ngAfterViewInit(): void {
  //   this.items = [
  //     { name: 'Request' },
  //     { name: 'Response Manipulation' },
  //     { name: 'Throttling' },
  //     { name: 'Connectivity' },
  //     { name: 'Autentication' },
  //     { name: 'Policies' }
  //   ];
  //   this.selectedItem = this.items[8];

  // }

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
  entireFormData: any = {
    request: null,
    throttling: null,
    responseManipulation: null,
    connectivity: null,
    auth: null,
    policies: null
  };

  collectData(formName: string, data: any) {
    this.entireFormData[formName] = data;
    console.log("Form data collected:", this.entireFormData);
   
  }
  submitForm() {
    console.log(this.entireFormData);
    this.backendUpStreamSubmitted.emit(this.entireFormData)
  }
}
