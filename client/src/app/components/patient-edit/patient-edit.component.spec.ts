import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { StoreService } from 'src/app/core/services/store/store.service';
import { Patient } from 'src/app/core/models/patient.model';

import { PatientEditComponent } from './patient-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Diet } from 'src/app/core/models/diet.model';
import { ComponentsHelper } from 'src/app/helper/components.helper';

describe('Given a PatientEditComponent', () => {
  let component: PatientEditComponent;
  let fixture: ComponentFixture<PatientEditComponent>;
  let storeService: StoreService;
  let componentsHelper: ComponentsHelper;

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

  const diets : Diet [] = [];

  const storeServiceMock = {
    getPatientDetail: () => of(patient),
    updatePatient: () => of(patient),
    getDietsByType: () => of([]),
    updatedPatient$: new BehaviorSubject<Patient>(patient)
  };

  const componentsHelperMock = {
    goToDetail: () => {},
    transform: () => ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientEditComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        {provide: StoreService, useValue: storeServiceMock},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: ComponentsHelper, useValue: componentsHelperMock},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEditComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    componentsHelper = TestBed.inject(ComponentsHelper);
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
      const spyProp = spyOn(storeService.updatedPatient$, 'next');

      component.ngOnInit();
      component.detectFormChanges();
      expect(spyProp).toHaveBeenCalled();
    });

    it(`Then the text updatePatient to have been called` , () => {
      component.selectedDiet = diet;
      const spyFn = spyOn(storeService, 'updatePatient');
      component.ngOnInit();
      component.save();
      expect(spyFn).toHaveBeenCalled();
    });
  });

  describe("When cancel button is clicked", () => {
    it("Then the detail page is shown", () => {
      const spyFn = spyOn(component.componentsHelper,'goToDetail');
      component.goBack();
      expect(spyFn).toHaveBeenCalled();
    });
  });

  describe("When goal is changed", () => {
    it("Then diets of the goal are loaded", () => {
      const goal = "Hypertrophy";
      const diets : Diet [] = [
        {
        _id: 'kkfcvsv',
        type: 'brucewayneana',
        breakfast: "fjgkgk",
        midday: "klmvlgv",
        lunch: "ggbf",
        snack: "bjknvedv",
        dinner: "dbjnndvndjkv"
        }
      ];
      const spyFn = spyOn(component,'getDietsByType');
      component.goalChanged(goal);
      component.diets = diets;
      component.selectedDiet = diets[0]
      expect(component.diets.length).toBe(1);
    });

    it("And the goal has no diets", () => {
      const goal = "Hypertrophy";
      spyOn(component,'getDietsByType');
      component.goalChanged(goal);
      component.diets = diets;
      expect(component.selectedDiet).toBe(undefined);
    });
  });

  describe("When diet is changed", () => {
    it("Then the diet appears on the screen", () => {
      component.changeDiet(diet);
      component.selectedDiet = diet;
      expect(component.selectedDiet).toEqual(diet);
    });
  });

});
