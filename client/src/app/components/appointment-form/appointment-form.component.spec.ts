import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { Patient } from 'src/app/core/models/patient.model';
import { StoreService } from 'src/app/core/services/store/store.service';
import { ReactiveFormsModule } from '@angular/forms';

import { AppointmentFormComponent } from './appointment-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Appointment } from 'src/app/core/models/appointment.model';
import { PatientDetailComponent } from '../patient-detail/patient-detail.component';

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
  const hours: string [] = ["10:00"];

  const appointment: Appointment = {
    _id: "fgff",
    dieticianId: "fkdvmlkf",
    patient: patient,
    date: "22/05/2021",
    time: "10:00"
  }

  const storeServiceMock = {
    createPatient: () => of(),
    selectedPatient$: new BehaviorSubject<Patient>(patient),
    getAvailableHours: () => of(hours)
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentFormComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule.withRoutes(
        [{path: 'detail/123', component: PatientDetailComponent}])],
      providers: [StoreService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentFormComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    fixture.detectChanges();
  });

  it("And the go back button is pressed", () => {
    const spyFn = spyOn(component.componentsHelper,'goToDetail');
    component.cancel();
    expect(spyFn).toHaveBeenCalled();
  });

  it("And the selected date is changed", () => {
    const spyFn = spyOn(component.storeService,'getAvailableHours').and.returnValue(of(hours));
    component.onDateChange();
    expect(spyFn).toHaveBeenCalled();
  });

  it("And the appointment is created", () => {
    component.patient._id = '123';
    const spyFn = spyOn(component.storeService,'createAppointment').and.returnValue(of(appointment));;
    component.createAppointment();
    expect(spyFn).toHaveBeenCalled();
  });

  it("And the time is changed", () => {
    component.patient._id = '123';
    const spyFn = spyOn(component.availableHours,'find').and.returnValue("10:00");;
    component.changeTime("event");
    expect(component.selectedHour).toBe("10:00");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
