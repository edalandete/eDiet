import { Component, OnChanges, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import { Patient } from 'src/app/core/models/patient.model';
import { StoreService } from 'src/app/core/services/store/store.service';
import { ComponentsHelper } from './../../helper/components.helper';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss', './../../app.component.scss', './../patient-detail/patient-detail.component.scss']
})
export class PatientEditComponent implements OnInit {

  patient! : Patient;
  picture : any = '';
  id = String(this.route.snapshot.paramMap.get('id'));
  goals: string[] = [
    "Hypertrophy", "Loss Weight", "Maintenance"
  ];
  editPatientForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(9)]],
    idCard: ['', [Validators.required, Validators.maxLength(9)]],
    birthdate: ['', [Validators.required]],
    goal: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
    perimeter: this.formBuilder.group({
      biceps: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      shoulders: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      back: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      wist: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      quadriceps: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
    })

  })
  constructor(
    private route: ActivatedRoute,
    public storeService: StoreService,
    private formBuilder: FormBuilder,
    private componentsHelper: ComponentsHelper
  ) { }

  ngOnInit(): void {
    this.getPatient();
    this.detectFormChanges();

  }

  goalChanged(event: any): void {
    console.log(event.target.value)
  }

  save() {
    const patient: Patient = this.storeService.updatedPatient$.getValue();
    patient.fullName = `${patient.firstName} ${patient.lastName}`;
    this.storeService.updatePatient(patient, this.id).subscribe();
  }

  formatDate(date: Date): string {
    return dayjs(date).format("DD/MM/YYYY");
  }

  transform(base : string){
    return this.componentsHelper.transform(base);
  }


  getPatient(): void {
    this.storeService.getPatientDetail(this.id)
      .subscribe(patient => {
        patient.birthdate = dayjs(patient.birthdate).format("DD/MM/YYYY");
        this.picture = this.transform(patient.picture);
        this.editPatientForm.patchValue(patient);
      }
      )
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
