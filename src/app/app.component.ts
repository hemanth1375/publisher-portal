import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'publisher-portal';
  showSidebar:any;
  constructor(private router:Router){

  }
ngOnInit(){
  this.router.events.subscribe(() => {
    this.showSidebar = this.router.url !== '/apicards';
  });
}

// for reloading page

// @HostListener('window:beforeunload', ['$event'])
// unloadNotification($event: any): void {
//   $event.returnValue = 'Are you sure you want to leave? Changes you made may not be saved.';
// }
}
