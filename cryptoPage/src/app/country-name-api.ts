import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryNameApi {
  private countryApi = 'https://api.salesvault.vc/api/countries';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.countryApi);
  }
}
