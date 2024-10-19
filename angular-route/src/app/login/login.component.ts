import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../Services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    @ViewChild('username')
    username: ElementRef;

    @ViewChild('password')
    password: ElementRef;

    authService: AuthService = inject(AuthService);
    router: Router = inject(Router);
    activeRoute: ActivatedRoute = inject(ActivatedRoute);

    ngOnInit() {
      this.activeRoute.queryParamMap.subscribe((query) => {
       const logOut = Boolean(query.get('logOut'));

       if (logOut) {
         this.authService.logOut();
         alert('Log Out successfully');
       }
      })
    }

  onLogin() {
        const username = this.username.nativeElement.value;
        const password = this.password.nativeElement.value;

        const user = this.authService.logIn(username, password);

        if (user === undefined) {
          alert('The login credential is not correct');
        } else {
          alert('Welcome ' + user.username + ' Login Successfully');
          this.router.navigate(['/Courses']);
        }
    }

}
