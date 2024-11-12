import { AfterViewInit, Component, ComponentFactoryResolver, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
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
  getChildContainer(): ViewContainerRef {
    return this.childContainer;
  }
  // trail end
  // child
  @ViewChild('childContainer', { read: ViewContainerRef, static: true })
  childContainer!: ViewContainerRef;
  childData: Array<any> = [];

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

  @Output() backendUpStreamSubmitted =new EventEmitter<any>();
  onToggleChange(event: any) {
    this.isIpFilterEnabled = event.checked; // Capture toggle state
  }
  items: any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,private dataService:ViewapiPageService) {
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
    this.childData.push(this.entireFormData)
    console.log(this.childData);
    
    this.backendUpStreamSubmitted.emit(this.entireFormData)
  }

  sendData() {
    this.backendUpStreamSubmitted.emit(this.entireFormData)
    this.dataService.sendBackendData(this.entireFormData);
  }

}
