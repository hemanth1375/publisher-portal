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
  private dataSubjectBackend = new Subject<string>();
  dataBackend$ = this.dataSubjectBackend.asObservable();

  sendBackendData(data: string) {
    this.dataSubjectBackend.next(data);
  }
  addEndPoint(id:any,obj:any){
    const url=`http://localhost:8082/krakend/addendpoints?krakendId=${id}`
    const headers={
      // 'Authorization':'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzWnlZVVVzRmVRZDVIMkFrdFlLSk1iUlZCcXVwQnJOZHVHMHR5Rk54WTlJIn0.eyJleHAiOjE3MzEzOTQ1MDQsImlhdCI6MTczMTM5MzYwNCwiYXV0aF90aW1lIjoxNzMxMzkzNjA0LCJqdGkiOiI2ZTc2MDFiYS05YjdjLTQzYzAtYTc2OC0zYjJjMzVkYWUxZTQiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6WyJtYXN0ZXItcmVhbG0iLCJhY2NvdW50Il0sInN1YiI6IjIwZjI0ZTY1LTM0NTYtNDYwZS1iZTBlLWU4ZTcyOWM1YjRhNCIsInR5cCI6IkJlYXJlciIsImF6cCI6Im1hc3NpbGFwaWdhdGV3YXkiLCJzaWQiOiI4N2E0Y2NmNS1kZWMzLTQ3ZDQtOWRkMy1hNmUwMmFiNzhjNjAiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiY3JlYXRlLXJlYWxtIiwiZGVmYXVsdC1yb2xlcy1tYXN0ZXIiLCJvZmZsaW5lX2FjY2VzcyIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJtYXN0ZXItcmVhbG0iOnsicm9sZXMiOlsidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJ2aWV3LXJlYWxtIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4ifQ.PcZ-WLCzMTL1rhBPdxVMNbhcHXOcdP2IdKkhNzuTVyvtMBfYCyfobJBMqZ6jFRRce_BMBnAE-rhg3DYAeCQh1W1FJI1FtZF100jXUY7Y5Bvki130EEaQlzLsknycPdjd5K_qgpwCFVZLPvB9rQrjfurGJuxicC9pL0TDo08xjoUou-m3RnGQUECFGD--YvR3IO3uwbz13lZ_Itt2IzbhI3Y0v-kZK4v37qRB4mTv4KvqCQPaaTrf4OuQQhFDOe1xGdcOeUUsR18lKufoO5v1QOp3VUEoeKoixdGK10qcsL6jiK8xjX2cu_3gNhGO8i9dGYQ1sjfXRHCoP0dC-7NiEw'
    }
    const options={headers:headers}
    return this.http.post(url,obj);
  }
}
