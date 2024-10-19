import {Injectable} from "@angular/core";
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedRequest = req.clone({headers: req.headers.append('auth', 'abcdef')});
        console.log('Auth interceptor called modifiedRequest', modifiedRequest);
        console.log('Auth interceptor called', req);
        return next.handle(modifiedRequest).pipe(tap((event) => {
            if (event.type === HttpEventType.Response) {
                console.log('Response has arrived', event.body);
            }
        }));
    }
}
