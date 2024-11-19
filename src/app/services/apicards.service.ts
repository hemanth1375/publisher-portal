import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, ReplaySubject } from 'rxjs';
import { urls } from '../../urls';

@Injectable({
  providedIn: 'root'
})
export class ApicardsService {

  
  constructor(private http:HttpClient,private readonly keycloak:KeycloakService) { }
  
   
   userId:any
  getCards(userId:any){
  //  const userId:any=localStorage.getItem('userid');
  //  this.keycloak.getKeycloakInstance().loadUserInfo().then((user:any)=>{
  //   console.log(user);
  //  this.userId=user.sub
  //   })
    const url=urls.getJsonCards+"?pageNo=0&pageSize=10";
    const headers={
      'userId':userId
    }
    const options={headers:headers}
    return this.http.post(url,null,options)
  }
  
  private dataSubject: ReplaySubject<string> = new ReplaySubject<string>(1);

  setData(data: string): void {
    this.dataSubject.next(data);
  }

  getData$(): Observable<string> {
    return this.dataSubject.asObservable();
  }
  downloadFile(){

  }
}
