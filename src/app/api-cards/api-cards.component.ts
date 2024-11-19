import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApicardsService } from '../services/apicards.service';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { filter } from 'rxjs';

@Component({
  selector: 'app-api-cards',
  templateUrl: './api-cards.component.html',
  styleUrl: './api-cards.component.css'
})
export class ApiCardsComponent {

  constructor(private router:Router,private apiCardsService:ApicardsService,private readonly keycloak:KeycloakService){

  }
  apiCards:any;
userId:any=localStorage.getItem('userid');
  ngOnInit(){
    if(this.userId){
      this.getApiCards(this.userId)
    }else{
      this.keycloak.keycloakEvents$.pipe(filter((e:any) => e.type === KeycloakEventType.OnAuthSuccess))
      .subscribe({
        next:()=>{
    const token:any=this.keycloak.getKeycloakInstance().token
          console.log(this.keycloak.getKeycloakInstance().token);
       
         
          this.keycloak.getKeycloakInstance().loadUserInfo().then((user:any)=>{
          console.log(user);
           this.getApiCards(user.sub)
          })
          console.log(this.keycloak.getKeycloakInstance().token);
          console.log(this.keycloak.isLoggedIn());
        }})
    }
    sessionStorage.clear();
    

  
  }
  getApiCards(userId:any){
    this.apiCardsService.getCards(userId).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.apiCards=res.cards;
      }
    })
  }
  goToApiPage(id:any){
    this.apiCardsService.setData(id);
    sessionStorage.setItem('id',id)
    this.router.navigate([`dashboard`],{state:{id:id}})
  }
  createJson(){
this.router.navigate(['dashboard'])
  }
  downloadKrakendFile(id:any){
    const hrefEl:any=document.createElement('a');
    hrefEl.href=`http://localhost:8082/krakend/krakendFile?krakendId=${id}`
    hrefEl.target="self"
    hrefEl.click();
  }
}
