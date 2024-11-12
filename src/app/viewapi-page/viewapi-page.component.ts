import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ViewapiPageService } from '../services/viewapi-page.service';
import { OpenapiComponent } from '../openapi/openapi.component';
import { Router } from '@angular/router';
import { BackendsUpstreamComponent } from '../backends-upstream/backends-upstream.component';
import { ApiPageService } from '../services/api-page.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-viewapi-page',
  templateUrl: './viewapi-page.component.html',
  styleUrl: './viewapi-page.component.css'
})
export class ViewapiPageComponent {
  // throttle
  isIpFilterEnabled = false; // Initially false
  receivedData: any;
  private unsubscribe = new Subject<void>();


  constructor(private viewapiPageService:ViewapiPageService,private dataService: ViewapiPageService,private router:Router,private componentFactoryResolver: ComponentFactoryResolver,private apiPageService:ApiPageService){

  }
  collectedData1: string[] = [];
  
  sendData() {
    this.dataService.sendData(this.entireFormData);
    this.router.navigate(['apis'])
  }
  onToggleChange(event: any) {
    this.isIpFilterEnabled = event.checked; // Capture toggle state
  }
  items = [
    { name: 'EndPoint' },
    { name: 'Parameter Forwarding' },
    { name: 'Auth' },
    { name: 'Throttling' },
    { name: 'Policies' },
    { name: 'Response Manipulation' },
    { name: 'connectivity Options' },
    { name: 'Open Api' },
    { name: 'Backends(Upstream)' }
  ];
  selectedItem: any;

  selectItem(item: any) {
    console.log(item);

    this.selectedItem = item;
  }
  ngOnInit() {
    this.apiPageService.getData$().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.receivedData = data;
      console.log(this.receivedData);
      
    });
    //  this.addChildComponents(this.receivedData.backend.length);
    this.selectedItem = this.items[8];
    this.dataService.dataBackend$.subscribe(data => {
      this.collectedData1.push(data);
      console.log('Data received from child:', data);
      console.log(this.collectedData1);
      
    });
  }
  ngOnDestroy(){
    this.collectedData1=[];
  }
  onFormSubmit(formData: any) {
    console.log("Form data received from child:", formData);
    // Handle the form data, e.g., submit it to a service or API.
  }
  entireFormData: any = {
    endPoint: null,
    parameterForwarding: null,
    throttling: null,
    responseManipulation: null,
    connectivityOptions: null,
    policies: null,
    auth: null,
    openApi: null,
    backend:null
  };
  @ViewChild('childContainer', { read: ViewContainerRef, static: true })
  childContainer!: ViewContainerRef;
  childData: Array<any> = [];
  // addChildComponents(count: number) {
    
  //   for (let i = 0; i < count; i++) {
  //     const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BackendsUpstreamComponent);
  //     const componentRef = this.childContainer.createComponent(componentFactory);
  
      
  //     componentRef.instance.backendUpStreamSubmitted.subscribe((data: any) => {
  //       console.log(`Data from component instance:`, data);
  //       this.childData.push(data);
  //     });
  //   }
  // }
  // addChild() {
  //   const count = 1; // Replace with the actual number you get from the API or other logic
  //   this.addChildComponents(count);
  // }
  addChild() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BackendsUpstreamComponent);
    const componentRef = this.childContainer.createComponent(componentFactory);
    // componentRef.instance.onFormSubmit
    componentRef.instance.backendUpStreamSubmitted.subscribe((data: any) => {
      console.log(data);
      componentRef.instance.childData.push(data)
      // this.childData.push(data);
      console.log(componentRef.instance.childData);
    });
  }
  // @ViewChild(BackendsUpstreamComponent, { static: true }) childComponent!: BackendsUpstreamComponent;
  
  // childData: Array<any> = [];

  // constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  // addChild() {
  //   console.log(this.childComponent);
    
  //   const childContainer = this.childComponent.getChildContainer();
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BackendsUpstreamComponent);
  //   const componentRef = childContainer.createComponent(componentFactory);

  //   componentRef.instance.backendUpStreamSubmitted.subscribe((data: any) => {
  //     this.childData.push(data);
  //     console.log(this.childData);
  //   });
  // }
  collectData(formName: string, data: any) {
    this.entireFormData[formName] = data;
    this.entireFormData['backend']=this.collectedData1
    console.log("Form data collected:", this.entireFormData);
  }
  submitForm() {
    
    console.log(this.entireFormData);

    // this.viewapiPageService.createEndPoint(resultantFormData).subscribe({
    //   next: (res) => {
    //     console.log(res);

    //   }
    // })
  }
}
