import { Injectable } from '@angular/core';
import { IReport } from '../interfaces/IReport';
import { Reports } from '../mocks/mock.reports';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ReportsService {
  private reportsUrl = 'api/Reports';

  constructor(
    private http: HttpClient
  ) {}

  public getReports(): Observable<IReport[]> {
    return this.http.get<IReport[]>(this.reportsUrl)
          .pipe(
            tap(_ => this.log('fetched reports from server')),
          );
  }

  private log(message: string) {
    console.log(message);
  }
}
