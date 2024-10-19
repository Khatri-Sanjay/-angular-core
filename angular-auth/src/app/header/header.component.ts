import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../Services/auth.service";
import {User} from "../Model/user";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {CounterService} from "../Services/counter.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  counterService: CounterService = inject(CounterService);

  isLoggedIn = false;

  private userSubscription: Subscription;

  ngOnInit() {
    this.counterService.increment('HeaderComponent');
    this.userSubscription = this.authService.user.subscribe((user: User) => {
      this.isLoggedIn = user ? true : false;
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
    localStorage.clear();
  }

}
