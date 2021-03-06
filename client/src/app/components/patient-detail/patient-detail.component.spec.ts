import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { DomSanitizer } from '@angular/platform-browser';
import { StoreService } from 'src/app/core/services/store/store.service';
import { PatientDetailComponent } from './patient-detail.component';
import { Patient } from 'src/app/core/models/patient.model';


describe('Given a PatientDetailComponent', () => {
  let component: PatientDetailComponent;
  let fixture: ComponentFixture<PatientDetailComponent>;

  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get(): string {
          return '133';
        }
      }
    }
  };

  const fakeDomSanitizier = {
    bypassSecurityTrustResourceUrl: () => '',
  }

  const patient : Patient = {
    _id: "sss",
    firstName: "aaaa",
    lastName: "bbbbb",
    fullName: "aaaa bbbbb",
    email: "mail",
    phone: 643555544,
    birthdate: "stirng",
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
        date: undefined,
        time: "string"
    },
    isActive: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDetailComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [StoreService,
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: DomSanitizer, useValue: fakeDomSanitizier}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('When the component is rendered', () => {
    it(`Then the text today should appear in the screen` , () => {
      const spyFn = spyOn(component.storeService,'getPatientDetail').and.returnValue(of(patient))
      component.ngOnInit();
      expect(spyFn).toHaveBeenCalled();
    });

    it(`Then update patient should be invoked` , () => {
      const spyFn = spyOn(component.storeService,'updatePatient').and.returnValue(of(patient))
      component.ngOnInit();
      component.patient = patient;
      component.updateSubscription(true);
      expect(spyFn).toHaveBeenCalled();
    });
  });
});
