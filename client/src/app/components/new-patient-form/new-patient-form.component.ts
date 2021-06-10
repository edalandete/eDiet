import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Patient } from 'src/app/core/models/patient.model';
import { StoreService } from 'src/app/core/services/store/store.service';
import { patientGoals } from 'src/assets/constants';
@Component({
  selector: 'app-new-patient-form',
  templateUrl: './new-patient-form.component.html',
  styleUrls: ['./new-patient-form.component.scss', './../../app.component.scss', './../patient-edit/patient-edit.component.scss']
})
export class NewPatientFormComponent implements OnInit {

  goals = patientGoals;
  image!:ArrayBuffer | string | null;

  newPatientForm: FormGroup = this.formBuilder.group({
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
    picture: [],
    perimeter: this.formBuilder.group({
      biceps: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      shoulders: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      back: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      wist: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
      quadriceps: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(2)]],
    })
  });

  constructor(
    private formBuilder: FormBuilder,
    public storeService: StoreService,
    ) { }

  ngOnInit(): void {
    this.detectFormChanges();
  }

  createPatient() {
    const patient: Patient = this.storeService.patient$.getValue();
    patient.fullName = `${patient.firstName} ${patient.lastName}`;
    patient.picture = typeof(this.image) === 'string' ? this.image : "";
    this.storeService.createPatient(patient).subscribe();
  }

  detectFormChanges(): void {
    this.newPatientForm.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((formValue)=> this.storeService.patient$.next(formValue))
    )
    .subscribe();
  }

  fileChangeEvent($event: any) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file:File = inputValue.files[0];
    const myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    }

    myReader.readAsDataURL(file);
  }

}
