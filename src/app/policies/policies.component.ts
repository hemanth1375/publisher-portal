import { Component } from '@angular/core';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.css'
})
export class PoliciesComponent {
  isSpFilterEnabled = false; // Initially false

  onToggleChange(event: any) {
    this.isSpFilterEnabled = event.checked; // Capture toggle state
  }

  isRequestSchValidatorFiltrEnabled = false; //Initially False

  onToggleChange1(event: any) {
    this.isRequestSchValidatorFiltrEnabled = event.checked;
  }

  isResponseSchValidatorFiltrEnabled = false;

  onToggleChange2(event: any) {
    this.isResponseSchValidatorFiltrEnabled = event.checked;
  }

}
