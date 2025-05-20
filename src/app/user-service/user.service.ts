import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { NewUser, User } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiBaseUrl: string = 'http://localhost:8080/api';
  
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  saveUser(newUser: NewUser): Observable<string> {
    return this.http.post<string>(this.apiBaseUrl + '/users/user/register', newUser, this.httpOptions
  )};

  setAdminUser(userId: string, isAdmin: boolean): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + '/users/user/admin/apply',
      {userId: userId, hasRoleAdmin: isAdmin}, this.httpOptions
  )};

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiBaseUrl + '/users/list', this.httpOptions
  )};

}
