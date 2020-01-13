import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _httpClient: HttpClient) { }

  editPassword (params: any, token: string) {
    const url = `http://localhost:8084/users/changePassword`;
    return this._httpClient.put(url, params, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .pipe(catchError(err => throwError(err.error)));
  }
  getProfile (token: string) {
    const url = `http://localhost:8084/user`;
    return this._httpClient.get<any>(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .pipe(map((result:any) => result))
    .pipe(catchError(err => throwError(err.error)));
  }
  editProfile (params: any, token: string) {
    const url = `http://localhost:8084/users/editAccount`;
    return this._httpClient.put(url, params, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .pipe(catchError(err => throwError(err.error)));
  }
}
