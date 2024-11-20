import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApicardsService } from '../services/apicards.service';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-api-cards',
  templateUrl: './api-cards.component.html',
  styleUrl: './api-cards.component.css'
})
export class ApiCardsComponent {

  constructor(private router:Router,private apiCardsService:ApicardsService,private readonly keycloak:KeycloakService, private http:HttpClient,private _snackBar: MatSnackBar){

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
    const url=`http://localhost:8082/krakend/krakendFile?krakendId=${id}`
    // const hrefEl:any=document.createElement('a');
    // hrefEl.href=`http://localhost:8082/krakend/krakendFile?krakendId=${id}`
    // hrefEl.target="self"
    // hrefEl.click();
    this.http.get(url).subscribe({
      next: (res:any) => {
        console.log(res);
        this._snackBar.open(res.message, 'OK', {
          duration: 5000
        });
        // const hrefEl = document.createElement('a');
        // const objectUrl = URL.createObjectURL(blob);
        // hrefEl.href = objectUrl;
        // hrefEl.download = `krakendFile_${id}`; // Optional: Set a default filename
        // hrefEl.click();
        // URL.revokeObjectURL(objectUrl); // Clean up the object URL
        // this._snackBar.open('saved successfully', 'OK', {
        //   duration: 5000
        // });
      },
      error: (err) => {
        console.error('Error downloading the file', err);
         this._snackBar.open(err.error.error, 'OK', {
          duration: 5000
        });
      },
  })}
}
