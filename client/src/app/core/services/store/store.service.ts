import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { Appointment } from './../../models/appointment.model';
import { Dietician } from '../../models/dietician.model';
import { DieticianService } from './../../services/dietician/dietician.service';
import { AppointmentService } from './../../services/appointment/appointment.service';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../patient/patient.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  appointments$ = new BehaviorSubject<Appointment[]>([]);
  patient$ = new BehaviorSubject<Patient>(<Patient>{});
  patients$ = new BehaviorSubject<Patient[]>([]);

  constructor(
      private appointmentService: AppointmentService,
      private patientService: PatientService
  ) { }

  getTodayAppointments(dieticianId: string, date: string):Observable<Appointment[]>{
    return this.appointmentService.getAppointments(dieticianId, date);
  }

  getPatientDetail(patientId: string):Observable<Patient>{
    return this.patientService.getPatient(patientId);
  }

  searchPatients(term: string): Observable<Patient[]> {
    return this.patientService.searchPatients(term);
  }


}