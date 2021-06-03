import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/core/models/appointment.model';
import { AppointmentService } from 'src/app/core/services/appointment/appointment.service';
import { DieticianService } from 'src/app/core/services/dietician/dietician.service';
import * as dayjs from 'dayjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', './../../app.component.scss']
})
export class DashboardComponent implements OnInit {

  appointments: Appointment[] = [];
  //Replace for loggedDietician
  dieticianId: string = environment.dieticianId;
  date: string = dayjs().format("YYYYMMDD"); 

  constructor(private appointmentService : AppointmentService, private dieticianService : DieticianService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.appointmentService.getAppointments(this.dieticianId, this.date)
      .subscribe(appointments => this.appointments = appointments);
  }

}
