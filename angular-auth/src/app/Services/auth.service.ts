import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthResponse} from "../Model/auth-response";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "../Model/user";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    static SIGN_UP = environment.SIGN_UP_API;
    static SIGN_IN = environment.SIGN_IN_API;

    private tokenExpireTime: any;

    http: HttpClient = inject(HttpClient);
    router: Router = inject(Router);

    user = new BehaviorSubject<User>(null);

    protected getSignUP() {
        return AuthService.SIGN_UP;
    }

    protected getSignIn() {
        return AuthService.SIGN_IN;
    }

    signUp(email: any, password: any) {
        let headers = new HttpHeaders();
        headers = headers.set('content-type', 'application/json');
        const data = {email: email, password: password, returnSecureToken: true};
        return this.http.post<AuthResponse>(
            this.getSignUP() + environment.API_KEY,
            data,
            {headers: headers}
        ).pipe(catchError(err => {
            console.log('err message::', err);
            let errorMessage = 'An unknown error occurred';
            if (!err.error || !err.error.error) {
                return throwError(() => errorMessage);
            }

            switch (err?.error?.error?.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'Email already Exist';
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMessage = 'This operation cannot perform';
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMessage = 'Too many attempts try later';
                    break;
            }
            return throwError(() => errorMessage);
        }), tap( (res) => {
            const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
            const expiresIn = new Date(expiresInTs);
            const user = new User(res.email, res.localId, res.idToken, expiresIn);
            this.user.next(user);
            this.autoLogOut(+res.expiresIn * 1000);

            localStorage.setItem('user', JSON.stringify(user));
        }));
    }

    logIn(email: string, password: string) {
        let headers = new HttpHeaders();
        headers = headers.set('content-type', 'application/json');
        const data = {email: email, password: password, returnSecureToken: true};
        return this.http.post<AuthResponse>(
            this.getSignIn() + environment.API_KEY,
            data,
            {headers: headers}
        ).pipe(catchError(err => {
            console.log('err message::', err);
            let errorMessage = 'An unknown error occurred';
            if (!err.error || !err.error.error) {
                return throwError(() => errorMessage);
            }

            switch (err?.error?.error?.message) {
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'Email not found';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Invalid Password';
                    break;
                case 'USER_DISABLED':
                    errorMessage = 'User is disable';
                    break;
            }
            return throwError(() => errorMessage);
        }), tap( (res) => {
            const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
            const expiresIn = new Date(expiresInTs);
            const user = new User(res.email, res.localId, res.idToken, expiresIn);
            this.user.next(user);
            this.autoLogOut(+res.expiresIn * 1000);

            localStorage.setItem('user', JSON.stringify(user));
        }));
    }

    logOut() {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.clear();
        if (this.tokenExpireTime) {
            this.tokenExpireTime = null;
        }
    }

    autoLogin() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            return;
        }

        const loggedUser = new User(user.email, user.id, user._token, user._expiresIn);

        if (loggedUser.token) {
            this.user.next(loggedUser);

            const timerValue = new Date(user._expiresIn).getTime() - new Date().getTime()
            this.autoLogOut(timerValue);
        }

    }

    autoLogOut(expireTime: number) {
        this.tokenExpireTime = setTimeout(() => {
            this.logOut();
        }, expireTime);
    }

}
