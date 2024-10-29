import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-api-page',
  templateUrl: './api-page.component.html',
  styleUrl: './api-page.component.css'
})
export class ApiPageComponent {
showParent:any=true;
constructor(private router:Router,private route:ActivatedRoute){
  this.router.events.subscribe((event) => {
     
    if (event instanceof NavigationEnd) {
      console.log(this.router.url );
     
       // Check if the current route is 'recipe'
      if (this.router.url === '/apis') {
        this.showParent=true;
       
       
    }else if(this.router.url === '/apis/viewapi'){
 
    this.showParent=false;
    }
  }});
}
addEndpoint(){
  this.showParent=false;
this.router.navigate(['viewapi'],{relativeTo:this.route})
}
}
