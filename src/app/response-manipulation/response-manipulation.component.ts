import { Component } from '@angular/core';

@Component({
  selector: 'app-response-manipulation',
  templateUrl: './response-manipulation.component.html',
  styleUrl: './response-manipulation.component.css'
})
export class ResponseManipulationComponent {
  isStaticResponseEnabled = false; // Initially false

  onToggleChangeStaticResponse(event: any) {
    this.isStaticResponseEnabled = event.checked; // Capture toggle state
  }
  isAdvanceResponseEnabled = false; // Initially false

  onToggleChangeAdvanceResponse(event: any) {
    this.isAdvanceResponseEnabled = event.checked; // Capture toggle state
  }
  isAdvanceResponseGoEnabled = false; // Initially false

  onToggleChangeResponseGo(event: any) {
    this.isAdvanceResponseGoEnabled = event.checked; // Capture toggle state
  }
  isAdvanceRegExpEnabled = false; // Initially false

  onToggleChangeRegExp(event: any) {
    this.isAdvanceRegExpEnabled = event.checked; // Capture toggle state
  }
}
