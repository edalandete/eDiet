import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { HelperService } from 'src/app/helper/services.helper';
import { Diet } from './../../models/diet.model';

@Injectable({
  providedIn: 'root'
})
export class DietService {
  constructor(private http: HttpClient, private helperService: HelperService) { }

  private dietsUrl = environment.dietsUrl;

  getDietsByType(type: string, token: string): Observable<Diet[]> {
    return this.http.get<Diet[]>(`${this.dietsUrl}/type/${type}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      tap(patients => patients.length ?
         this.helperService.log(`found diets matching "${type}"`) :
         this.helperService.log(`no diets matching "${type}"`)),
      catchError(this.helperService.handleError<Diet[]>('diets', []))
    );
  }
}
