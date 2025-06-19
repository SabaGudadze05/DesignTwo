import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private showLoginSource = new BehaviorSubject<boolean>(false);
  private showSignupSource = new BehaviorSubject<boolean>(false);

  showLogin$ = this.showLoginSource.asObservable();
  showSignup$ = this.showSignupSource.asObservable();

  openLogin() {
    this.showLoginSource.next(true);
    this.showSignupSource.next(false);
  }

  openSignup() {
    this.showSignupSource.next(true);
    this.showLoginSource.next(false);
  }

  closeAll() {
    this.showLoginSource.next(false);
    this.showSignupSource.next(false);
  }
}
