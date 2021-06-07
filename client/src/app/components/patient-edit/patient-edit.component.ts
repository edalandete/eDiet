import { Component, OnChanges, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Patient } from 'src/app/core/models/patient.model';
import { StoreService } from 'src/app/core/services/store/store.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss', './../../app.component.scss']
})
export class PatientEditComponent implements OnInit {

  patient! : Patient
  id = String(this.route.snapshot.paramMap.get('id'));
  goals: string[] = [
    "Hypertrophy", "Loss Weight", "Maintenance"
  ];
  editPatientForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(9)]],
    goal: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]]

  })
  constructor(private route: ActivatedRoute, public storeService: StoreService, private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    this.getPatient();
    this.detectFormChanges();

  }

  goalChanged(event: any): void {
    console.log(event.target.value)
  }

  save() {
    this.storeService.updatePatient(this.id)
  }


  getPatient(): void {
    this.storeService.getPatientDetail(this.id)
      .subscribe(patient=> this.editPatientForm.patchValue(patient));
  }

  detectFormChanges(): void {
    this.editPatientForm.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((formValue)=> this.storeService.updatedPatient$.next(formValue))
    )
    .subscribe();
  }

}
