import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from './../../models/appointment.model';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { HelperService } from 'src/app/helper/services.helper';



@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private http: HttpClient, private helperService: HelperService) { }

  private appointmentsUrl = environment.appointmentsUrl;

  getAppointments(dieticianId: string, date: string, token: string): Observable<Appointment[]> {
    return this.http.post<Appointment[]>(`${this.appointmentsUrl}/day`,
    { dieticianId: dieticianId, date: date },
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })
      .pipe(
        tap(_ => this.helperService.log('fetched appointments')),
        catchError(this.helperService.handleError<Appointment[]>('getAppointments', []))
      );
  }
}
