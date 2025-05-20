import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserAuth } from '../models/user-auth';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiBaseUrl: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  private loggedAction = new BehaviorSubject(false);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getLoggedAction = this.loggedAction.asObservable();

  login(user: string, password: string) {
  return this.http.post<any>(this.apiBaseUrl + '/users/user/login', 
    {username: user, password:password}, this.httpOptions)
    .pipe(
      map(userData => {
        sessionStorage.setItem('username', user);
        sessionStorage.setItem('name', userData.name);
        let tokenStr = "Bearer " + userData.token;
        sessionStorage.setItem("token", tokenStr);
        sessionStorage.setItem("isAdmin", userData.isAdmin.toString());
        return userData;
      })
    )};

  logout() {
    sessionStorage.clear();
    this.setLoggedAction(false);
    this.router.navigate(['/login']);
  }

  getUserAutenticated(): UserAuth {
    let user: UserAuth = {
      username: sessionStorage.getItem('username'),
      name: sessionStorage.getItem('name'),
      isAdmin: 'true' === sessionStorage.getItem('isAdmin')
    };
    return user;
  }

  isLoggedIn(): boolean { 
    return sessionStorage.getItem('username') !== null && sessionStorage.getItem('isAdmin') !== null;
  }

  setLoggedAction(loggedIn: boolean): void {
    this.loggedAction.next(loggedIn);
  }

}
