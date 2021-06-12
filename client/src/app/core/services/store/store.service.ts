import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { Appointment } from './../../models/appointment.model';
import { Dietician } from '../../models/dietician.model';
import { AppointmentService } from './../../services/appointment/appointment.service';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../patient/patient.service';
import { Diet } from '../../models/diet.model';
import { DietService } from '../diet/diet.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  appointments$ = new BehaviorSubject<Appointment[]>([]);
  patient$ = new BehaviorSubject<Patient>(<Patient>{});
  selectedPatient$ = new BehaviorSubject<Patient>(<Patient>{});
  patients$ = new BehaviorSubject<Patient[]>([]);
  updatedPatient$ = new BehaviorSubject<Patient>(<Patient>{});
  dietsType$ = new BehaviorSubject<Diet[]>([]);
  dietician$ = new BehaviorSubject<Dietician>(<Dietician>{});
  appointment$ = new BehaviorSubject<Appointment>(<Appointment>{});

  constructor(
      private appointmentService: AppointmentService,
      private patientService: PatientService,
      private dietService: DietService,
      private authService: AuthService
  ) { }

  getTodayAppointments(dieticianId: string, date: string): Observable<Appointment[]> {
    return this.appointmentService.getAppointments(dieticianId, date, this.dietician$.value.token);
  }

  getPatientDetail(patientId: string): Observable<Patient> {
    return this.patientService.getPatient(patientId, this.dietician$.value.token);
  }

  searchPatients(term: string): Observable<Patient[]> {
    return this.patientService.searchPatients(term, this.dietician$.value.token);
  }

  updatePatient(patient: Patient, patientId: string): Observable<Patient> {
    return this.patientService.updatePatient(patient, patientId, this.dietician$.value.token);
  }

  getDietsByType(type: string): Observable<Diet[]> {
    return this.dietService.getDietsByType(type, this.dietician$.value.token);
  }

  createPatient(newPatient: Patient): Observable<Patient> {
    return this.patientService.createPatient(newPatient, this.dietician$.value.token);
  }

  login(): Observable<Dietician> {
    return this.authService.login(this.dietician$.getValue())
  }

  createAppointment(newAppointment: Appointment): Observable<Appointment> {
    return this.appointmentService.createAppointment(newAppointment, this.dietician$.value.token);
  }
}
