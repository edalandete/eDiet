import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { Appointment } from './../../models/appointment.model';
import { Dietician } from '../../models/dietician.model';
import { DieticianService } from './../../services/dietician/dietician.service';
import { AppointmentService } from './../../services/appointment/appointment.service';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../patient/patient.service';
import { Diet } from '../../models/diet.model';
import { DietService } from '../diet/diet.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  appointments$ = new BehaviorSubject<Appointment[]>([]);
  patient$ = new BehaviorSubject<Patient>(<Patient>{});
  patients$ = new BehaviorSubject<Patient[]>([]);
  updatedPatient$ = new BehaviorSubject<Patient>(<Patient>{});
  dietsType$ = new BehaviorSubject<Diet[]>([]);


  constructor(
      private appointmentService: AppointmentService,
      private patientService: PatientService,
      private dietService: DietService
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

  updatePatient(patient: Patient, patientId: string):Observable<Patient> {
    return this.patientService.updatePatient(patient, patientId);
  }

  getDietsByType(type: string): Observable<Diet[]> {
    return this.dietService.getDietsByType(type);
  }

  createPatient(newPatient: Patient): Observable<Patient> {
    return this.patientService.createPatient(newPatient);
  }


}
