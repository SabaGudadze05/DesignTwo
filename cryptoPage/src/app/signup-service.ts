import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// export interface SignupPayload {
//   firstName: string;
//   lastName: string;
//   email: string;
//   username: string;
//   password: string;
//   telephone: string | null;
//   country: string | null;
//   language: string | null;
//   dateOfBirth: string | null;
//   source: string | null;
// }
@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private signUpUrl =
    'https://api.salesvault.vc/identity/api/clients/create-client-via-web';
  private logInUrl = ' https://api.salesvault.vc/identity/api/auth/login';
  constructor(private http: HttpClient) {}

  createClient(data: any): Observable<any> {
    return this.http.post(this.signUpUrl, data);
  }

  logIn(loginData: {
    emailOrUsername: string;
    password: string;
    twoFactorCode: null;
    rememberMe: null;
  }): Observable<any> {
    return this.http.post(this.logInUrl, loginData);
  }
}
