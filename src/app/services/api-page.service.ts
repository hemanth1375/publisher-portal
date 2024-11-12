import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiPageService {

  constructor(private http:HttpClient) { }

  // getEndpoints(){
  //   const url="http://localhost:3001/endpoints";
  //   return this.http.get(url);
  // }
  getEndpoints(){
    const url="http://localhost:8082/krakend/getKrakendJson?krakendId=53";
    const headers={
      'Authorization':'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzWnlZVVVzRmVRZDVIMkFrdFlLSk1iUlZCcXVwQnJOZHVHMHR5Rk54WTlJIn0.eyJleHAiOjE3MzEwNDgyMjcsImlhdCI6MTczMTA0NzMyNywiYXV0aF90aW1lIjoxNzMxMDQ2MjYyLCJqdGkiOiI4MGZjYWVlOC1mYWNlLTQ5NzEtYjI0NS1kZDAyOWExYjg2NzEiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6WyJtYXN0ZXItcmVhbG0iLCJhY2NvdW50Il0sInN1YiI6IjIwZjI0ZTY1LTM0NTYtNDYwZS1iZTBlLWU4ZTcyOWM1YjRhNCIsInR5cCI6IkJlYXJlciIsImF6cCI6Im1hc3NpbGFwaWdhdGV3YXkiLCJzaWQiOiJiZjMzZTYxNi1lZTdhLTRkNjEtYjE1Zi02NDVhOTllYmFmNmQiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiY3JlYXRlLXJlYWxtIiwiZGVmYXVsdC1yb2xlcy1tYXN0ZXIiLCJvZmZsaW5lX2FjY2VzcyIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJtYXN0ZXItcmVhbG0iOnsicm9sZXMiOlsidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJ2aWV3LXJlYWxtIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4ifQ.v7vCSs4Y9idOz5p75wukdLxbQUwqZbgxnPhNSxD-ijIu40Aj3IVBs-4ZGsa-RJO4BVzmqXevM3_qSbxLBZLCwshiH1BBgFwT1iFoTsx6o4k4JhyWa85NcSgmcScb9BvS4gDsez5_-_O1BW9yAPHs8-wUjRL8s9H-BswK5PvWTSv_VaTrLCoEGPxiHVuN69TbZwzE-P9FMHbYSxVNOyxdL0HaL6KBUFotbedO76xTslI8RM8uwkRVzwHv2PN_85rN_JXiCi-tSzc9Ydt_zHksVC7i7PXuJDCWcxyEaEZIe8mQGRPUA-PK8IJJ4ivj-FGlc6FJPBg2Y7Bc0YhKPb0Gvg'
    }
    const options={headers:headers}
    return this.http.get(url,options);
  }
  private dataSubject: ReplaySubject<string> = new ReplaySubject<string>(1);

  setData(data: any): void {
    this.dataSubject.next(data);
  }

  getData$(): Observable<any> {
    return this.dataSubject.asObservable();
  }
  createKrakend(body:any){
    const url="http://localhost:8082/krakend/saveKrakendJson";
    const headers={
      'userId':'ce35be92-d176-4b5a-8932-6181e26c0e33',
      'Authorization':'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzWnlZVVVzRmVRZDVIMkFrdFlLSk1iUlZCcXVwQnJOZHVHMHR5Rk54WTlJIn0.eyJleHAiOjE3MzEzMzQ5MTcsImlhdCI6MTczMTMzNDAxNywiYXV0aF90aW1lIjoxNzMxMzM0MDE3LCJqdGkiOiJkYjZjYWFjMS03NWNmLTQ5ZTQtYTU4My1mNGQ5MThhNTIwNzAiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6WyJtYXN0ZXItcmVhbG0iLCJhY2NvdW50Il0sInN1YiI6IjIwZjI0ZTY1LTM0NTYtNDYwZS1iZTBlLWU4ZTcyOWM1YjRhNCIsInR5cCI6IkJlYXJlciIsImF6cCI6Im1hc3NpbGFwaWdhdGV3YXkiLCJzaWQiOiIwN2UzYmZkZC1kNjYzLTQ1NDEtOWVjMS0wOWMzN2Q1MDdlNmUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiY3JlYXRlLXJlYWxtIiwiZGVmYXVsdC1yb2xlcy1tYXN0ZXIiLCJvZmZsaW5lX2FjY2VzcyIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJtYXN0ZXItcmVhbG0iOnsicm9sZXMiOlsidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJ2aWV3LXJlYWxtIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4ifQ.QNteqe9lvoAb9wbjR7Vwf-tqqwb8wxmX1Er-hl7BakB9FaXC4k1SIAjoav1H9_FFC6whCZqUtlLpc1HYEMI2A0wLqVKIMnDhVBRdAiHjGZiIPRfciflJJr72n543WLX0Ux_uGeXPJdWoR_mTnJ_PCBsuowqsLSpI3iKeJGnRi78Zhbtz_apExFVzfpIofachd-JvAuS6TTm1QIntGcBWAqMCJRt6OmYopmkewcfJGr6EJf5i6gyhvEOHqZ5_Z9xuTZ2iBAuxNcH9w4CDm9tWfEHxsVafkXHhP0XvTXGrAaLf4chkaa2O-XrgzQPTGNopNuDf05vMi2sccjMRucKTVg'
    }
    const options={headers:headers}
    return this.http.post(url,body,options)
  }
}
