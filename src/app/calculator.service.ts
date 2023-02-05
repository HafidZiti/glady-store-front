import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ICombinations } from './model/combinations';

const shopUrl = `http://localhost:3000/shop/`;

@Injectable()
export class CalculatorService {
  private readonly httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'tokenTest123',
    }),
  };

  constructor(private http: HttpClient) {}

  searchCards(amount: number, shopId: number): Observable<ICombinations> {
    return this.http.get<any>(
      `${shopUrl}${shopId}/search-combination/?amount=${amount}`,
      this.httpOptions
    );
  }
}
