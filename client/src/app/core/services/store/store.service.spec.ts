import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppointmentService } from './../appointment/appointment.service';
import { PatientService } from './../patient/patient.service';

import { StoreService } from './store.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DieticianService } from '../dietician/dietician.service';
import { DietService } from '../diet/diet.service';
import { Patient } from '../../models/patient.model';

describe('StoreService', () => {
  let service: StoreService;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        StoreService,
        DietService,
        PatientService,
        DieticianService,
        AppointmentService
      ]
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTodayAppointments', () => {
    const spyFn = spyOn(service, 'getTodayAppointments').and.callThrough()
    service.getTodayAppointments("dieticianId", "date");
    expect(spyFn).toHaveBeenCalled()
  });

  it('should call getPatientDetail', () => {
    const spyFn = spyOn(service, 'getPatientDetail').and.callThrough()
    service.getPatientDetail("patientId");
    expect(spyFn).toHaveBeenCalled()
  });

  it('should call searchPatients', () => {
    const spyFn = spyOn(service, 'searchPatients').and.callThrough()
    service.searchPatients("termToSearch");
    expect(spyFn).toHaveBeenCalled()
  });

  it('should call updatePatient', () => {
    const spyFn = spyOn(service, 'updatePatient').and.callThrough()
    service.updatePatient(patient, "id");
    expect(spyFn).toHaveBeenCalled()
  });

  it('should call getDietsByType', () => {
    const spyFn = spyOn(service, 'getDietsByType').and.callThrough()
    service.getDietsByType("termToSearch");
    expect(spyFn).toHaveBeenCalled()
  });

  it('should call createPatient', () => {
    const spyFn = spyOn(service, 'createPatient').and.callThrough()
    service.createPatient(patient);
    expect(spyFn).toHaveBeenCalled()
  });

  it('should call login', () => {
    const spyFn = spyOn(service, 'login').and.callThrough()
    service.login();
    expect(spyFn).toHaveBeenCalled()
  });


});
