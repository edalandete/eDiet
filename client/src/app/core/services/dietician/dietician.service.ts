import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HelperService } from 'src/app/helper/services.helper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DieticianService {

  private dieticiansUrl = environment.dieticiansUrl;

  getAvailableHours(dieticianId: string, date: string, token: string): Observable<String[]> {
    return this.http.post<String[]>(`${this.dieticiansUrl}/day`,
    { dieticianId: dieticianId, date: date },
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })
      .pipe(
        tap(_ => this.helperService.log('fetched available hours')),
        catchError(this.helperService.handleError<String[]>('getAvailableHours', []))
      );
  }

  constructor(
    private http: HttpClient,
    private helperService: HelperService) { }
}
