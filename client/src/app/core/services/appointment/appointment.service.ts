import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from './../../models/appointment.model';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private http: HttpClient) { }
  
  private appointmentsUrl = environment.appointmentsUrl;
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAppointments(dieticianId: string, date: string): Observable<Appointment[]> {
    return this.http.post<Appointment[]>(`${this.appointmentsUrl}/day`, { dieticianId: dieticianId, date: date }, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched appointments')),
        catchError(this.handleError<Appointment[]>('getAppointments', []))
      );
  } 

  private log(message: string) {
    console.log(`AppointmentService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); 
  
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }

}
