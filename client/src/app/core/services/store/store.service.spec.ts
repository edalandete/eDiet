import { TestBed } from '@angular/core/testing';
import { AppointmentService } from './../appointment/appointment.service';
import { PatientService } from './../patient/patient.service';

import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;
  let patientServiceSpy: jasmine.SpyObj<PatientService>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StoreService,
        { provide: AppointmentService, useValue: appointmentServiceSpy },
        { provide: PatientService, useValue: patientServiceSpy }
      ]
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
