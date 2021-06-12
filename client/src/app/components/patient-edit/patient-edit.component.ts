import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import { Patient } from 'src/app/core/models/patient.model';
import { StoreService } from 'src/app/core/services/store/store.service';
import { ComponentsHelper } from './../../helper/components.helper';
import { Diet } from 'src/app/core/models/diet.model';
import { patientGoals } from 'src/assets/constants';
import { DATE_FORMAT_DDMMYYYY_SLASH } from 'src/assets/constants';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss', './../../app.component.scss', './../patient-detail/patient-detail.component.scss']
})
export class PatientEditComponent implements OnInit {

  currentPatient! : Patient;
  selectedDiet? : Diet;
  picture : any = '';
  id = String(this.route.snapshot.paramMap.get('id'));
  goals = patientGoals;

  diets!: Diet[];

  editPatientForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(9)]],
    idCard: ['', [Validators.required, Validators.maxLength(9)]],
    birthdate: ['', [Validators.required]],
    goal: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    height: ['', [Validators.required]],
    bmi: ['', [Validators.required]],
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
    public router: Router,
    public storeService: StoreService,
    private formBuilder: FormBuilder,
    private componentsHelper: ComponentsHelper,
  ) { }

  ngOnInit(): void {
    this.getPatient();
    this.detectFormChanges();

  }

  goalChanged(event: any): void {
    this.getDietsByType();
    this.selectedDiet = this.diets.length ? this.diets[0] : undefined;
  }

  changeDiet(event: any) {
    this.selectedDiet = this.diets.find(diet => diet._id === event.target.value);
  }

  save() {
    const patient: Patient = this.storeService.updatedPatient$.getValue();
    patient.fullName = `${patient.firstName} ${patient.lastName}`;
    patient.weight = [...this.currentPatient.weight, patient.weight.toString()];
    patient.diet = this.selectedDiet ? this.selectedDiet : patient.diet;
    patient.lastVisit = new Date();
    this.storeService.updatePatient(patient, this.id)?.subscribe();
  }

  cancel() {
    this.router.navigateByUrl(`/detail/${this.id}`);
  }

  formatDate(date: Date): string {
    return dayjs(date).format(DATE_FORMAT_DDMMYYYY_SLASH);
  }

  transform(base : string){
    return this.componentsHelper.transform(base);
  }

  getPatient(): void {
    this.storeService.getPatientDetail(this.id)
      .subscribe(patient => {
        this.currentPatient = patient;
        patient.birthdate = dayjs(patient.birthdate).format(DATE_FORMAT_DDMMYYYY_SLASH);
        this.picture = this.transform(patient.picture);
        this.editPatientForm.patchValue(patient);
        this.editPatientForm.controls['weight'].setValue(patient?.weight[patient.weight.length-1]);
        this.getDietsByType();
      });
  }

  getDietsByType(): void {
    this.storeService.getDietsByType(this.editPatientForm.controls['goal'].value)
      .subscribe(goalDiets => {
        debugger;
        this.diets = goalDiets;
        this.selectedDiet = this.diets.find(diet => diet._id === this.currentPatient.diet?._id);
        if (!this.selectedDiet) this.selectedDiet = this.diets.length ? this.diets[0] : undefined;
      })
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
