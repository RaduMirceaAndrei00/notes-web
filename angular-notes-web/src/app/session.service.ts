import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const JWT_KEY = '@jwt';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public jwt$ = new BehaviorSubject<string | undefined>(undefined);
  
  constructor() {
    const token = localStorage.getItem(JWT_KEY);
    if (token)
      this.jwt$.next(token);
   }

  setJwt (value: string) {
    this.jwt$.next(value);
    localStorage.setItem(JWT_KEY, value);
  }

  logout () {
    localStorage.removeItem(JWT_KEY);
    this.jwt$.next(undefined);
  }

  isLoggedIn () {
    return localStorage.getItem(JWT_KEY) !== null;
  }
}
