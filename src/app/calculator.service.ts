import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ICombinations } from './model/combinations';

const shopId = 5;
const shopUrl = `http://localhost:3000/shop/${shopId}/search-combination`;

@Injectable()
export class CalculatorService {
  private readonly httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'tokenTest123',
    }),
  };

  constructor(private http: HttpClient) {}

  searchCards(amount: number): Observable<ICombinations> {
    return this.http
      .get<any>(`${shopUrl}/?amount=${amount}`, this.httpOptions)
      .pipe(
        catchError((err) => {
          console.error(`I caught ${err.message}`);
          return EMPTY;
        })
      );
  }
}
