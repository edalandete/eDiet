import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/core/models/appointment.model';
import {   StoreService } from 'src/app/core/services/store/store.service';
import * as dayjs from 'dayjs';
import { environment } from 'src/environments/environment';
import { DATE_FORMAT_YYYYMMDD } from 'src/assets/constants';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', './../../app.component.scss']
})
export class DashboardComponent implements OnInit {

  appointments: Appointment[] = [];
  dieticianId: string = "";
  date: string = dayjs().format(DATE_FORMAT_YYYYMMDD);

  constructor(public storeService : StoreService) { }

  ngOnInit(): void {
    this.dieticianId = this.storeService.dietician$.value.user._id;
    this.getAppointments();
  }

  getAppointments(): void {
    this.storeService.getTodayAppointments(this.dieticianId, this.date)
      .subscribe(appointments => this.appointments = appointments);
  }
}
