import { CommonModule } from '@angular/common';
import { Component, viewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Signup } from '../signup/signup';
import { ViewChild } from '@angular/core';
import { SignupService } from '../../signup-service';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, Signup],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  @ViewChild(Signup) signupComponent!: Signup;

  loginForm: FormGroup;
  showPopup: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private logInServie: SignupService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.authService.showLogin$.subscribe((show) => {
      this.showPopup = show;
    });
  }

  openPopup() {
    this.authService.openLogin();
  }
  openSignUpPopUp() {
    this.authService.closeAll();
    this.authService.openSignup();
  }
  closePopup() {
    this.authService.closeAll();
    this.loginForm.reset();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;

      const formData = {
        emailOrUsername: formValue.username,
        password: formValue.password,
        twoFactorCode: null,
        rememberMe: null,
      };
      this.logInServie.logIn(formData).subscribe({
        next: (response) => {
          window.location.href = 'https://salesvault.vc/';
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.closePopup();
    }
  }
}
