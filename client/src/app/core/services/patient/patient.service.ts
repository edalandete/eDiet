import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { HelperService } from 'src/app/helper/services.helper';
import { Patient } from '../../models/patient.model';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient, private helperService: HelperService) { }

  private patientsUrl = environment.patientsUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPatient(patientId: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.patientsUrl}/${patientId}`)
    .pipe(
      tap(_ => this.helperService.log('fetched patient')),
      catchError(this.helperService.handleError<Patient>(`error fetching patient with id ${patientId}`))
    );
  }


}
