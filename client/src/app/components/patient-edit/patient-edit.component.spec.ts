import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { StoreService } from 'src/app/core/services/store/store.service';
import { Patient } from 'src/app/core/models/patient.model';

import { PatientEditComponent } from './patient-edit.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Diet } from 'src/app/core/models/diet.model';

describe('Given a PatientEditComponent', () => {
  let component: PatientEditComponent;
  let fixture: ComponentFixture<PatientEditComponent>;
  let storeService: StoreService;

  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get(): string {
          return '133';
        }
      }
    }
  };

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

  const diet : Diet = {
    _id: 'kkfcvsv',
    type: 'brucewayneana',
    breakfast: "fjgkgk",
    midday: "klmvlgv",
    lunch: "ggbf",
    snack: "bjknvedv",
    dinner: "dbjnndvndjkv"
  }

  const storeServiceMock = {
    getPatientDetail: () => of(patient),
    updatePatient: () => of(patient),
    getDietsByType: () => of([]),
    updatedPatient$: new BehaviorSubject<Patient>(patient)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientEditComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        {provide: StoreService, useValue: storeServiceMock},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},                ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEditComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    fixture.detectChanges();
  });

  describe('When the component is rendered', () => {
    it(`Then the text getPatientDetail to have been called` , () => {
      const spyFn = spyOn(component.storeService,'getPatientDetail').and.returnValue(of(patient))
      component.ngOnInit();
      expect(spyFn).toHaveBeenCalled();
    });

    it(`Then the text updatePatient to have been called` , () => {
      const spyFn = spyOn(storeService,'updatePatient');
      component.ngOnInit();
      component.save();
      expect(spyFn).toHaveBeenCalled();
    });

    it(`Then the text detectFormChanges to have been called` , () => {
      const spyProp = spyOnProperty(storeService, 'updatedPatient$', 'get').and.returnValue({ 'username': 'username'});

      component.ngOnInit();
      component.detectFormChanges();
      expect(spyProp).toHaveBeenCalledWith({ 'username': 'username'});
    });

    it(`Then the text detectFormChanges to have been called` , () => {
      component.selectedDiet = diet;
      const spyFn = spyOn(storeService, 'updatePatient');
      component.ngOnInit();
      component.save();
      expect(spyFn).toHaveBeenCalled();
    });

  });

});
