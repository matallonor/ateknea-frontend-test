import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'environments/environment';

import { User } from 'app/shared/models/user';

@Injectable()
export class UserService {

  usersUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  get headers(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getAllUsers(): Observable<User[]> {
    const options = { headers: this.headers };
    const url = `${this.usersUrl}/list`;
    return this.http.get<any>(url, options).pipe(
      map(res => this.extractUsers(res)),
      catchError(this.handleError('getAllUsers', []))
    );
  }

  getUser(userId: number): Observable<User> {
    const options = { headers: this.headers };
    const url = `${this.usersUrl}/${userId}`;
    return this.http.get<any>(url, options).pipe(
      map(res => new User().fromJSON(res)),
      catchError(this.handleError('getUser', new User()))
    );
  }

  createUser(user: User): Observable<User> {
    const options = { headers: this.headers };
    const url = `${this.usersUrl}`;
    const data = JSON.stringify(user);
    console.log(data);
    return this.http.post<any>(url, data, options).pipe(
      map(res => {
        const u =  new User().fromJSON(res);
        console.log('USER:::::', u);
        return u;
      }),
      catchError(this.handleError('createUser', new User()))
    );
  }

  removeUser(id: string): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      map(res => new User().fromJSON(res)),
      catchError(this.handleError('removeUser', new User()))
    );
  }

  updateUser(user: User): Observable<User> {
    const options = { headers: this.headers };
    const url = `${this.usersUrl}/${user._id}`;
    const data = JSON.stringify(user);
    return this.http.put<any>(url, data, options).pipe(
      map(res => new User().fromJSON(res)),
      catchError(this.handleError('updateUser', new User()))
    );
  }

  private extractUsers(json: any): User[] {
    const users: User[] = [];
    for (const user of json) {
      users.push(new User().fromJSON(user));
    }
    return users;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      if (error.status === 400) {
        throw new Error('The fields are not valid');
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
