import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreService } from 'src/app/core/services/store/store.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPatientFormComponent } from './new-patient-form.component';
import { Patient } from 'src/app/core/models/patient.model';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NewPatientFormComponent', () => {
  let component: NewPatientFormComponent;
  let fixture: ComponentFixture<NewPatientFormComponent>;
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
    createPatient: () => of(patient),
    patient$: new BehaviorSubject<Patient>(patient)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPatientFormComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        {provide: StoreService, useValue: storeServiceMock},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPatientFormComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Then the function create patient to have been called` , () => {
    const spyFn = spyOn(storeService,'createPatient').and.returnValue(of(patient));
    component.ngOnInit();
    component.createPatient();
    expect(spyFn).toHaveBeenCalled();
  });

  it("Then fileChangeEvent function should been called", () => {
    const base = "img";
    const spyFn = spyOn(component, 'readThis');
    component.fileChangeEvent(base);
    expect(spyFn).toHaveBeenCalled();
  })


});
