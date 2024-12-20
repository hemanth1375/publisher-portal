import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { filter } from 'rxjs';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'publisher-portal';
  showSidebar:any;
  constructor(private router:Router, private readonly keycloak:KeycloakService,private mainSer:MainService){

  }
ngOnInit(){
  this.router.events.subscribe(() => {
    this.showSidebar = this.router.url !== '/apicards';
  });
  this.keycloak.keycloakEvents$.pipe(filter((e:any) => e.type === KeycloakEventType.OnAuthSuccess))
  .subscribe({
    next:()=>{
const token:any=this.keycloak.getKeycloakInstance().token
      console.log(this.keycloak.getKeycloakInstance().token);
      localStorage.setItem('token',token)
     
      this.keycloak.getKeycloakInstance().loadUserInfo().then((user:any)=>{
      console.log(user);
      this.getUserDetails(user.sub)
      localStorage.setItem('userid',user.sub)
      })
      console.log(this.keycloak.getKeycloakInstance().token);
      console.log(this.keycloak.isLoggedIn());
    }})
}
getUserDetails(id:any){
this.mainSer.getUserDetails(id).subscribe({
        next:(res)=>{
          console.log(res);
          
        }
});
}
// for reloading page

@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any): void {
  $event.returnValue = 'Are you sure you want to leave? Changes you made may not be saved.';
  this.router.navigateByUrl('/apicards');
}
}
