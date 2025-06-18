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

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  openPopup() {
    this.showPopup = true;
  }
  openSignUpPopUp() {
    this.closePopup();
    this.signupComponent.openPopupSignUp();
  }
  closePopup() {
    this.showPopup = false;
    this.loginForm.reset();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      this.closePopup();
    }
  }
}
