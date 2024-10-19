import { Injectable } from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [
    new User('sanjay', 'khatri', 'khatrisanjay804@gmail.com', '1234567890', 'Male', '9876543210'),
    new User('sanju', 'khatri', 'khatrisanjay804@gmail.com', '1234567890', 'Male', '9876543210'),
  ];

  getAllUsers() {
    return this.users;
  }

  createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    gender: string,
    contact: string
  ) {
    let user = new User(firstName,lastName,email,password,gender,contact);
    this.users.push(user);
  }
}
