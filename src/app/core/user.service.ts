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
    return !!this.currentUser;
  }

  constructor(private httpClient: HttpClient) {
    console.log('UserService#constructor')
  }

  login$(userData: { email: string, password: string }): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${environment.apiUrl}/users/login`, userData, { observe: 'response' })
      .pipe(
        tap(response => console.log(response)),
        map(response => response.body as any),
        tap(user => this.currentUser = user)
      )
  }

  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true })
      .pipe(tap(user => this.currentUser = user))
  }

  logout(): void {
  }

  register$(userData: CreateUserDto): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiUrl}/register`, userData, { withCredentials: true })
  }
}