import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../Services/auth.service";
import {Router} from "@angular/router";
import {CounterService} from "../Services/counter.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    loginForm: FormGroup = new FormGroup({});

    isLoginMode = true;
    isLoading = false;

    errorMessage: string;

    authService: AuthService = inject(AuthService);
    router: Router = inject(Router);
    counterService: CounterService = inject(CounterService);

    constructor(
        private formBuilder: FormBuilder
    ) {
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    ngOnInit() {
        this.counterService.increment('LoginComponent');
      this.buildForm();
    }

    buildForm() {
      this.loginForm = this.formBuilder.group({
        email: '',
        password: ''
      });
    }

    onSubmit() {
        this.isLoading = true;
        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;
        console.log(this.loginForm.value);
        if (this.isLoginMode) {
            this.authService.logIn(email, password).subscribe({
                next: (res) => {
                    console.log('res', res);
                    this.isLoading = false;
                    this.router.navigate(['/dashboard/overview']);
                },
                error: (err) => {
                    this.isLoading = false;
                    this.errorMessage = err;
                    console.log('err', err);
                    this.hideSnackBar();
                }
            });
        } else {
            this.authService.signUp(email, password).subscribe({
                next: (res) => {
                    console.log('res', res);
                    this.isLoading = false;
                    this.isLoginMode = !this.isLoginMode;
                },
                error: (err) => {
                    this.isLoading = false;
                    this.errorMessage = err;
                    console.log('err', err);
                    this.hideSnackBar();
                }
            })
        }
    }

    hideSnackBar() {
        setTimeout(() => {
            this.errorMessage = null;
        }, 3000);
    }

}
