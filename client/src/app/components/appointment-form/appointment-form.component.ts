import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { StoreService } from 'src/app/core/services/store/store.service';
import { Appointment } from 'src/app/core/models/appointment.model';
import { Patient } from 'src/app/core/models/patient.model';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss', './../../app.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  patient!: Patient

  newAppointmentForm: FormGroup = this.formBuilder.group({

  })

  constructor(
    private formBuilder: FormBuilder,
    public storeService: StoreService,
    ) { }

  ngOnInit(): void {
    this.patient = this.storeService.selectedPatient$.value;
    console.log(this.patient);
    this.detectFormChanges();
  }

  createAppointment() {
    const appointment: Appointment = this.storeService.appointment$.getValue();
    this.storeService.createAppointment(appointment).subscribe();

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
