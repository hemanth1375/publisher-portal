import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicardsService {

  
  constructor(private http:HttpClient) { }
  getCards(){
    const url="http://localhost:8082/krakend/getKrakendJsonCards?pageNo=0&pageSize=10";
    const headers={
      'userId':'ce35be92-d176-4b5a-8932-6181e26c0e33'
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
