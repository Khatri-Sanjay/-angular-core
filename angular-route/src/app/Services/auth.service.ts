import {inject, Injectable} from '@angular/core';
import {UserService} from "./user.service";
import {User} from "../Models/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isLogged: boolean = false;

    userService: UserService = inject(UserService);


    logIn(username: string, password: string) {
        let user = this.userService.users.find(
            (user: User) => user.username === username && user.password === password
        );

        if (user === undefined) {
          this.isLogged = false;
        } else {
          this.isLogged = true;
        }
        return user;
    }

    logOut() {
      this.isLogged = false;
    }

    IsAuthenticate() {
      return this.isLogged;
    }
}
