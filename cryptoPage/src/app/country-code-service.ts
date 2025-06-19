import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryCodeService {
  private dialCodeUrl = 'https://api.salesvault.vc/api/countries/dial-codes';
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.dialCodeUrl);
  }
}
