import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewapiPageService {

  constructor(private http:HttpClient) { }

  createEndPoint(obj:any){
    const url="http://localhost:8082/saveKrakendJson";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers:headers};
    return this.http.post(url,obj,options);
  }
  private dataSubject = new Subject<string>();
  data$ = this.dataSubject.asObservable();

  sendData(data: string) {
    this.dataSubject.next(data);
  }
}
