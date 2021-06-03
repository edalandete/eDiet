import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { Appointment } from './../../models/appointment.model';
import { Dietician } from '../../models/dietician.model';
import { DieticianService } from './../../services/dietician/dietician.service';
import { AppointmentService } from './../../services/appointment/appointment.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  appointments$ = new BehaviorSubject<Appointment[]>([]);

  constructor(
      private appointmentService: AppointmentService,
  ) { }

  getTodayAppointments(dieticianId: string, date: string):Observable<Appointment[]>{
    return this.appointmentService.getAppointments(dieticianId, date);
  }

}