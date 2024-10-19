import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService{
    users: User[] = [
        new User(1, 'John Smith', 'js', '123456'),
        new User(2, 'Merry Jane', 'mj', '123456'),
        new User(3, 'Mark Vought', 'mv', '123456'),
        new User(4, 'Sarah King', 'sk', '123456'),
        new User(5, 'Sanjay Khatri', 'sanju', '123456')
    ]
}
