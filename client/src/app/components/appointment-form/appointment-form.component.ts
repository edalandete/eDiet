import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { StoreService } from 'src/app/core/services/store/store.service';
import { Appointment } from 'src/app/core/models/appointment.model';
import { Patient } from 'src/app/core/models/patient.model';
import * as dayjs from 'dayjs';
import { DATE_FORMAT_YYYYMMDD } from 'src/assets/constants';
import { ComponentsHelper } from 'src/app/helper/components.helper';
@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss', './../../app.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  patient!: Patient
  availableHours: string[] = [];
  selectedHour?: string = '';

  newAppointmentForm: FormGroup = this.formBuilder.group({
    dieticianId: [localStorage.getItem('dieticianId'), [Validators.required]],
    patient: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
  })

  constructor(
    private formBuilder: FormBuilder,
    public storeService: StoreService,
    public componentsHelper: ComponentsHelper
    ) { }

  ngOnInit(): void {
    this.patient = this.storeService.selectedPatient$.value;
    this.newAppointmentForm.controls['patient'].setValue(this.patient._id)
    this.detectFormChanges();
  }

  createAppointment() {
    const day = dayjs(this.newAppointmentForm.controls['date'].value).format(DATE_FORMAT_YYYYMMDD);
    const appointment: Appointment = this.storeService.appointment$.getValue();
    appointment.date = day;

    this.storeService.createAppointment(appointment).subscribe(() => this.componentsHelper.goToDetail(this.patient._id));

  }

  get today() { return dayjs().format('YYYY-MM-DD'); }

  cancel() {
    this.componentsHelper.goToDetail(this.patient._id);
  }

  onDateChange() {
    const selectedDate = dayjs(this.newAppointmentForm.controls['date'].value).format(DATE_FORMAT_YYYYMMDD);
    const dieticianId = this.newAppointmentForm.controls['dieticianId'].value;
    this.storeService.getAvailableHours(dieticianId, selectedDate)
    .subscribe(availableHours => {
      this.availableHours = availableHours;
    });
  }

  changeTime(event: any) {
    this.selectedHour = this.availableHours.find(hour => hour === event.target.value);
  }

  detectFormChanges(): void {
    this.newAppointmentForm.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((formValue)=> this.storeService.appointment$.next(formValue))
    )
    .subscribe();
  }

}
