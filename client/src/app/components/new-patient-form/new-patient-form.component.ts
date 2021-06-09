import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/core/services/store/store.service';
import { ComponentsHelper } from 'src/app/helper/components.helper';
import { patientGoals } from 'src/assets/constants';
@Component({
  selector: 'app-new-patient-form',
  templateUrl: './new-patient-form.component.html',
  styleUrls: ['./new-patient-form.component.scss', './../../app.component.scss']
})
export class NewPatientFormComponent implements OnInit {

  goals = patientGoals;

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
    private componentsHelper: ComponentsHelper
    ) { }

  ngOnInit(): void {
    console.log(this.goals);
  }

}
