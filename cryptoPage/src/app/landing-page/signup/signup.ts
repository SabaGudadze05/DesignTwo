import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { CountryCodeService } from '../../country-code-service';
import { CountryNameApi } from '../../country-name-api';
import { SignupService } from '../../signup-service';
import { AuthService } from '../../auth-service';
import { HttpClientModule } from '@angular/common/http';

interface country {
  name: string;
  dial_code?: string;
  code: string;
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class Signup implements OnInit {
  signupForm: FormGroup;
  showPopup: boolean = false;
  isLanguageDropdownOpen: boolean = false;
  isDialCodeDropdownOpen: boolean = false;
  isCountryDropdownOpen: boolean = false;
  selectedLanguage: string | null = null;
  selectedDialCode: string | null = null;
  selectedCountry: string | null = null;

  constructor(
    private fb: FormBuilder,
    private CountryCodeAPI: CountryCodeService,
    private CountryAPI: CountryNameApi,
    private SignupRequest: SignupService,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        dob: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        country: ['', [Validators.required]],
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
        source: [window.location.origin],
      },
      { validators: this.mustMatch('password', 'repeatPassword') }
    );

    this.authService.showSignup$.subscribe((show) => {
      this.showPopup = show;
    });
  }
  countryDialCode: country[] = [];
  countryName: country[] = [];
  ngOnInit(): void {
    this.CountryCodeAPI.getData().subscribe({
      next: (response) => {
        this.countryDialCode = response;
      },
      error: (err) => {
        console.log('Error fetching data:', err);
      },
    });
    this.CountryAPI.getData().subscribe({
      next: (response) => {
        this.countryName = response;
      },
      error: (err) => {
        console.log('Error fetching data', err);
      },
    });
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
    this.authService.openSignup();
  }

  closePopup() {
    this.showPopup = false;
    this.isLanguageDropdownOpen = false;
    this.isDialCodeDropdownOpen = false;
    this.isCountryDropdownOpen = false;
    this.selectedLanguage = null;
    this.selectedDialCode = null;
    this.selectedCountry = null;
    this.signupForm.reset();
    this.authService.closeAll();
  }

  closePopupOnOverlay(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('popup-overlay')) {
      this.closePopup();
    }
  }

  toggleLanguageDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
    this.isDialCodeDropdownOpen = false;
    this.isCountryDropdownOpen = false;
  }

  toggleDialCodeDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isDialCodeDropdownOpen = !this.isDialCodeDropdownOpen;
    this.isLanguageDropdownOpen = false;
    this.isCountryDropdownOpen = false;
  }

  toggleCountryDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isCountryDropdownOpen = !this.isCountryDropdownOpen;
    this.isLanguageDropdownOpen = false;
    this.isDialCodeDropdownOpen = false;
  }

  selectLanguage(language: any) {
    this.selectedLanguage = language;
    this.signupForm.controls['language'].setValue(language);
    this.isLanguageDropdownOpen = false;
  }

  selectDialCode(code: any) {
    this.selectedDialCode = code;
    this.signupForm.controls['dialCode'].setValue(code);
    this.isDialCodeDropdownOpen = false; // Ensure dropdown closes on selection
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
    this.signupForm.controls['country'].setValue(country);
    this.isCountryDropdownOpen = false; // Ensure dropdown closes on selection
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
      const formData = {
        firstName: formValue.name,
        lastName: formValue.lastName,
        username:formValue.username,
        email: formValue.email,
        password: formValue.password,
        telephone: this.selectedDialCode + formValue.phone,
        country: this.selectCountry,
        language: this.selectLanguage,
        dateOfBirth: formValue.dob,
        source: window.location.hostname,
      };

      this.SignupRequest.createClient(formData).subscribe({
        next: (response) => {
          
            console.log("success    ", response)
            this.closePopup();
            this.authService.openLogin();
          
        },
        error: (err) => {
          console.error('Signup error:', err);
        },
      });
    }
  }

  logIn() {
    this.closePopup();
    this.authService.openLogin();
  }
}
