import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink,],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  signupForm: FormGroup;
  showPopup: boolean = false;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        dob: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        language: ['', [Validators.required]],
        dialCode: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.minLength(7)]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/
            ),
          ],
        ],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: this.mustMatch('password', 'repeatPassword') }
    );
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
      if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }
      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl?.setErrors(null);
        return null;
      }
    };
  }

  openPopupSignUp() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.signupForm.reset();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      this.closePopup();
    }
  }
}
