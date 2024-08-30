import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getItems(param: any): Observable<any> {
    return this.http.get(this.apiUrl + param);
  }
  getOne(param: any): Observable<any> {
    return this.http.get(param);
  }
}
