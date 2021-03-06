import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private _httpClient: HttpClient) { }
  create (params: any) {
    const url = `http://localhost:8084/users/register`;
    return this._httpClient.post(url, params).pipe(catchError(err => throwError(err.error)));
  }

  authenticate (params: any) {
    const url = `http://localhost:8084/users/login`;
    return this._httpClient.post(url, params).pipe(catchError(err => throwError(err.error)));
  }

  recoverPassword (params: any) {
    const url = `http://localhost:8084/users/forgotPassword`;
    return this._httpClient.post(url, params).pipe(catchError(err => throwError(err.error)));
  }

  activate (code: string) {
    const url = `http://localhost:8084/users/activation/` + code;
    return this._httpClient.get(url).pipe(catchError(err => throwError(err.error)));
  }
  
  changePassword (params: any, code: string) {
    const url = `http://localhost:8084/users/forgotPassword/` + code;
    return this._httpClient.put(url, params).pipe(catchError(err => throwError(err.error)));
  }

}
