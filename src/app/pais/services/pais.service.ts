import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  get httpParams(): HttpParams {
    return new HttpParams().set(
      'fields',
      'name,population,capital,cca2,flags,ccn3,cca3'
    );
  }

  buscarPais(termino: string): Observable<Pais[]> {
    const url = `${this.apiUrl}/name/${termino}`;

    return this.http.get<Pais[]>(url, { params: this.httpParams }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error('Archivo no encontrado'));
        }
        return throwError(() => new Error('Algo salió mal'));
      })
    );
  }

  buscarCapital(termino: string): Observable<Pais[]> {
    const url = `${this.apiUrl}/capital/${termino}`;

    return this.http.get<Pais[]>(url, { params: this.httpParams });
  }

  getPaisPorAlpha(id: string) {
    const url = `${this.apiUrl}/alpha/${id}`;

    return this.http.get<Pais>(url, { params: this.httpParams });
  }

  buscarRegion(region: string): Observable<Pais[]> {
    const url = `${this.apiUrl}/region/${region}`;

    return this.http.get<Pais[]>(url, { params: this.httpParams });
  }
}
