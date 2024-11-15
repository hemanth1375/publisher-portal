import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  
  private entireJsonData: ReplaySubject<string> = new ReplaySubject<string>(1);

  setEntireJsonData(data: any): void {
    this.entireJsonData.next(data);
  }

  getEntireJsonData$(): Observable<string> {
    return this.entireJsonData.asObservable();
  }
  private serviceSettingsData: ReplaySubject<string> = new ReplaySubject<string>(1);

  setServiceSettingData(data: string): void {
    this.serviceSettingsData.next(data);
  }

  getServiceSettingData$(): Observable<string> {
    return this.serviceSettingsData.asObservable();
  }
  private httpSecurityData: ReplaySubject<string> = new ReplaySubject<string>(1);

  setHttpSecurityData(data: string): void {
    this.httpSecurityData.next(data);
  }

  getHttpSecurityData$(): Observable<string> {
    return this.httpSecurityData.asObservable();
  }
}
