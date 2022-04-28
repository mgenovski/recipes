import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces';

export interface CreateUserDto { name: string, email: string, password: string }

@Injectable()
export class UserService {

  currentUser!: IUser;

  get isLogged() {
    return !!localStorage.getItem('accessToken');
  }

  constructor(private httpClient: HttpClient) {

  }

  login$(userData: { email: string, password: string }): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${environment.apiUrl}/users/login`, userData, { observe: 'response' })
      .pipe(
        tap(response => {}),
        map(response => response.body as any),
        tap(user => this.currentUser = user)
      )
  }

  register$(email: string, password: string, name: string): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${environment.apiUrl}/users/register`, {email, password, name, favorites: []}, { observe: 'response' })
      .pipe(
        tap(response => {}),
        map(response => response.body as any),
        tap(user => this.currentUser = user)
      )
  }

  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true })
      .pipe(tap(user => this.currentUser = user))
  }

  logout(): void {
    localStorage.clear();
  }

}