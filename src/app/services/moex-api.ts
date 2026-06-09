import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoexApiService {
  private readonly baseUrl = 'https://iss.moex.com/iss';

  constructor(private http: HttpClient) { }


  getSecurityPrice(securityId: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/engines/stock/markets/shares/boards/TQBR/securities/${securityId}.json`
    );
  }


  getSecurities(query: string = ''): Observable<any> {
    return this.http.get(`${this.baseUrl}/securities.json?q=${query}`);
  }


  getCandles(securityId: string, from: string, till: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/engines/stock/markets/shares/securities/${securityId}/candles.json?from=${from}&till=${till}&interval=60`
    );
  }


  getOrderBook(securityId: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/engines/stock/markets/shares/boards/TQBR/securities/${securityId}/orderbook.json`
    );
  }
}