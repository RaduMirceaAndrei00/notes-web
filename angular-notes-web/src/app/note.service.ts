import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _httpClient: HttpClient) { }
  createNote (params: any, token: string) {
    const url = `http://localhost:8084/notes`;
    return this._httpClient.post<any>(url, params, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .pipe(map((result: any) => result))
    .pipe(catchError(err => throwError(err.error)));
  }

  getNotes (token: string){
    const url = `http://localhost:8084/notes`;
    return this._httpClient.get<any>(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .pipe(map((result: any) => result))
    .pipe(catchError(err => throwError(err.error)));
  }

  getNote (notes_id: any, token: string) {
    const url = `http://localhost:8084/notes/` + notes_id;
    return this._httpClient.get<any>(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .pipe(map((result: any) => result))
    .pipe(catchError(err => throwError(err.error)));
  }
  editNote (notes_id: any, params: any, token: string) {
    const url = `http://localhost:8084/notes/` + notes_id;
    return this._httpClient.put(url, params, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .pipe(catchError(err => throwError(err.error)));
  }
  deleteNote(notes_id: any, token: string) {
    const url = `http://localhost:8084/notes/` + notes_id;
    return this._httpClient.delete(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .pipe(catchError(err => throwError(err.error)));
  }
}
