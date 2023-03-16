import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { 
    console.log("User service");
    let users: User[] = [new User("Avik", "Panja", "avikp", "12345")];
    localStorage.setItem("users", JSON.stringify(users));
  }
}
