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
}
