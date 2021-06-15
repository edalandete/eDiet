import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { Patient } from 'src/app/core/models/patient.model';
import { StoreService } from 'src/app/core/services/store/store.service';
import { ReactiveFormsModule } from '@angular/forms';

import { AppointmentFormComponent } from './appointment-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppointmentFormComponent', () => {
  let component: AppointmentFormComponent;
  let fixture: ComponentFixture<AppointmentFormComponent>;
  let storeService: StoreService;

  const patient : Patient = {
    _id: "sss",
    firstName: "aaaa",
    lastName: "bbbbb",
    fullName: "aaaa bbbbb",
    email: "mail",
    phone: 643555544,
    birthdate: new Date().toISOString(),
    idCard: "11111111H",
    bmi: "22",
    picture: "fffff",
    height: "string",
    weight: ["string"],
    perimeter: {
        biceps: "string",
        shoulders: "string",
        wist: "string",
        back: "string",
        quadriceps: "string",
    },
    goal: "string",
    lastVisit: new Date,
    diet: {
        _id: "string",
        type: "string",
        breakfast: "string",
        midday: "string",
        lunch: "string",
        snack: "string",
        dinner: "string",
    },
    appointment: {
        _id: "string",
        dieticianId: "string",
        patient: {
            _id: "string",
            firstName: "string",
            lastName: "string"
        },
        date: "string",
        time: "string"
    },
    isActive: true,
  };

  const storeServiceMock = {
    createPatient: () => of(),
    selectedPatient$: new BehaviorSubject<Patient>(patient)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentFormComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        {provide: StoreService, useValue: storeServiceMock},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentFormComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
