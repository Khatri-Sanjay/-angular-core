import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonModule, NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm: UntypedFormGroup = new UntypedFormGroup({});
  showPassword = false;
  passwordLength: number = 6;
  submitted = false;

  title = 'Login'

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.buildForm()
  }

  onPasswordToggle() {
    this.showPassword = !this.showPassword;
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      password: [ '', Validators.compose([Validators.required, Validators.minLength(this.passwordLength)])],
      otp: [],
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onPasswordReset() {
    this.router.navigate(['/auth/forgot-password']);
  }

  onUserLogin(data: any) {

  }

  resendOTP() {}
}
