import {HttpInterceptor, HttpRequest, HttpHandler, HttpEventType, HttpParams} from '@angular/common/http';
import {exhaustMap, take, tap} from 'rxjs/operators';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {User} from "../Model/user";

export class AuthInterceptorService implements HttpInterceptor {

    authService: AuthService = inject(AuthService);

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(take(1), exhaustMap((user: User) => {
            if (!user) {
                return next.handle(req);
            }
            const modifiedRequest = req.clone(
                {params: new HttpParams().set('auth', user.token)}
            );
            return next.handle(modifiedRequest);
        }));
    }
}
