import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { StoreService } from 'src/app/core/services/store/store.service';
import { Patient } from 'src/app/core/models/patient.model';

import { PatientEditComponent } from './patient-edit.component';
import { FormBuilder } from '@angular/forms';

describe('Given a PatientEditComponent', () => {
  let component: PatientEditComponent;
  let fixture: ComponentFixture<PatientEditComponent>;

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
    birthdate: new Date(),
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientEditComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [StoreService, {provide: ActivatedRoute, useValue: fakeActivatedRoute}, FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('When the component is rendered', () => {
    it(`Then the text getPatientDetail to have been called` , () => {
      const spyFn = spyOn(component.storeService,'getPatientDetail').and.returnValue(of(patient))
      component.ngOnInit();
      expect(spyFn).toHaveBeenCalled();
    });

    it(`Then the text updatePatient to have been called` , () => {
      const spyFn = spyOn(component.storeService,'updatePatient');
      component.save();
      expect(spyFn).toHaveBeenCalled();
    });

    it(`Then the text detectFormChanges to have been called` , () => {
      const spyFn = spyOn(component.editPatientForm, 'value');
      component.ngOnInit();
      expect(spyFn).toHaveBeenCalled();
    });

    // Finish test when end edit component
    // it(`Then the text detectFormChanges to have been called` , () => {
    //   const spyFn = spyOn(component.storeService., 'value');
    //   component.goalChanged(e);
    //   expect(spyFn).toHaveBeenCalled();
    // });

  });

});
