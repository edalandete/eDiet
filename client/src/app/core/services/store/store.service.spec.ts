import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppointmentService } from './../appointment/appointment.service';
import { PatientService } from './../patient/patient.service';

import { StoreService } from './store.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DieticianService } from '../dietician/dietician.service';
import { DietService } from '../diet/diet.service';

describe('StoreService', () => {
  let service: StoreService;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;
  let patientServiceSpy: jasmine.SpyObj<PatientService>;
  let dieticianServiceSpy: jasmine.SpyObj<DieticianService>;
  let dietServiceSpy: jasmine.SpyObj<DietService>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        StoreService,
        { provide: AppointmentService, useValue: appointmentServiceSpy },
        { provide: PatientService, useValue: patientServiceSpy },
        { provide: DieticianService, useValue: dieticianServiceSpy },
        { provide: DietService, useValue: dietServiceSpy }
      ]
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
