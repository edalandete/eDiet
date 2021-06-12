import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { StoreService } from 'src/app/core/services/store/store.service';
import { Appointment } from 'src/app/core/models/appointment.model';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss', './../../app.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  newAppointmentForm: FormGroup = this.formBuilder.group({

  })

  constructor(
    private formBuilder: FormBuilder,
    public storeService: StoreService,
    ) { }

  ngOnInit(): void {
    this.detectFormChanges();
  }

  createAppointment() {

  }

  detectFormChanges(): void {
    this.newAppointmentForm.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((formValue)=> this.storeService.patient$.next(formValue))
    )
    .subscribe();
  }

}
