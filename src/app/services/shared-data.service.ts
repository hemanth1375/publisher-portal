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
  private openApiData: ReplaySubject<string> = new ReplaySubject<string>(1);

  setOpenApiData(data: string): void {
    this.openApiData.next(data);
  }

  getOpenApiData$(): Observable<string> {
    return this.openApiData.asObservable();
  }
  private telemetryData: ReplaySubject<string> = new ReplaySubject<string>(1);

  setTelemetryData(data: string): void {
    this.telemetryData.next(data);
  }

  getTelemetryData$(): Observable<string> {
    return this.telemetryData.asObservable();
  }
  private apikeysData: ReplaySubject<string> = new ReplaySubject<string>(1);

  setApikeysDataData(data: string): void {
    this.apikeysData.next(data);
  }

  getApikeysData$(): Observable<string> {
    return this.apikeysData.asObservable();
  }
  private apiMonetizationData: ReplaySubject<string> = new ReplaySubject<string>(1);

  setApiMonetizationDataData(data: string): void {
    this.apiMonetizationData.next(data);
  }

  getApiMonetizationDataData$(): Observable<string> {
    return this.apiMonetizationData.asObservable();
  }
}
