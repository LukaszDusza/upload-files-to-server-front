import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { BookTable } from './objects/BookTable';
import { Book } from './objects/book';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getTable(url: string): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(url);
  }

}


