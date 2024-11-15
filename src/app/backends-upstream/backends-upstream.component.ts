import { AfterViewInit, Component, ComponentFactoryResolver, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ViewapiPageService } from '../services/viewapi-page.service';

@Component({
  selector: 'app-backends-upstream',
  templateUrl: './backends-upstream.component.html',
  styleUrl: './backends-upstream.component.css'
})
export class BackendsUpstreamComponent {
  // trail
  // @ViewChild('childContainer', { read: ViewContainerRef, static: true })
  // childContainer!: ViewContainerRef;

  // Provide a method to get the ViewContainerRef

  // trail end
  // child logic related
  @ViewChild('childContainer', { read: ViewContainerRef, static: true })
  childContainer!: ViewContainerRef;
  childData: Array<any> = [];

  getChildContainer(): ViewContainerRef {
    return this.childContainer;
  }

  //isolated logic
  
  upstreamAuthData:any;
  upstreamPoliciesData:any;
  upstreamRequestData:any;
  upstreamThrottlingData:any;
  upstreamResponseData:any;
  selectedItem: any;

  @Input() formData:any
  @Output() backendUpStreamSubmitted = new EventEmitter<any>();


onFormChange(form:any,updatedData:any){
  switch(form){
    case 'upstreamRequest': this.upstreamRequestData = updatedData;break;
    case 'upstreamResponse': this.upstreamResponseData = updatedData;break;
    case 'upstreamAuth': this.upstreamAuthData = updatedData;break;
    case 'upstreamThrottling': this.upstreamThrottlingData = updatedData;break;
    case 'upstreamPolicies': this.upstreamPoliciesData = updatedData;break;
  }
}

  addChild() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BackendsUpstreamComponent);
    const componentRef = this.childContainer.createComponent(componentFactory);
    // componentRef.instance.onFormSubmit
    componentRef.instance.backendUpStreamSubmitted.subscribe((data: any) => {
      console.log(data);
      this.childData.push(data);
      console.log(this.childData);

    });
  }

  // child end
  isIpFilterEnabled = false; // Initially false

  onToggleChange(event: any) {
    this.isIpFilterEnabled = event.checked; // Capture toggle state
  }


  items: any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private dataService: ViewapiPageService) {
    this.items = [
      { name: 'Request' },
      { name: 'Response Manipulation' },
      { name: 'Throttling' },
      { name: 'Connectivity' },
      { name: 'Autentication' },
      { name: 'Policies' }
    ];
  }

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
    // console.log(this.entireFormData);
    // this.childData.push(this.entireFormData)
    // console.log(this.childData);
    const obj = {
      'upstreamAuthData':this.upstreamAuthData,
      'upstreamPoliciesData':this.upstreamPoliciesData,
      'upstreamRequestData':this.upstreamRequestData,
      'upstreamThrottlingData':this.upstreamThrottlingData,
      'upstreamResponseData':this.upstreamResponseData
    }

    this.backendUpStreamSubmitted.emit(obj)
  }

  // sendData() {
  //   this.backendUpStreamSubmitted.emit(this.entireFormData)
  //   this.dataService.sendBackendData(this.entireFormData);
  // }

}
