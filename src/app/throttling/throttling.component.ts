import { Component } from '@angular/core';

@Component({
  selector: 'app-throttling',
  templateUrl: './throttling.component.html',
  styleUrl: './throttling.component.css'
})
export class ThrottlingComponent {

  isIpFilterEnabled = false; // Initially false

  onToggleChange(event: any) {
    this.isIpFilterEnabled = event.checked; // Capture toggle state
  }
  // end point rate limit
  isEndPointRateLimitEnabled=false;
  onToggleChangeEndPoint(event: any){
this.isEndPointRateLimitEnabled=event.checked;
  }
  isRedisRateLimitEnabled=false;
  onToggleChangeRedis(event: any){
this.isRedisRateLimitEnabled=event.checked;
  }
}
