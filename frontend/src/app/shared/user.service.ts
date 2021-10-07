import { Injectable } from '@angular/core';

import { User } from './user.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

const base = 'http://127.0.0.1:3000/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  checkUser(email: string): Observable<User> {
    return this.http.get<User>(base + email);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(base + user._id, user);
  }

  newUser(user: User): Observable<User> {
    return this.http.post<User>(base, user);
  }
}
