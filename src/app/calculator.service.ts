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
          // as I don't have an error handling service, I just log the error in the console.
          // but normally I have to display this error to the user in the appropriate place, e.g: toast.
          console.error(`I caught ${err.message}`);
          return EMPTY;
        })
      );
  }
}
