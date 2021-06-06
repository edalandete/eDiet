import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HelperService } from 'src/app/helper/services.helper';
import { Patient } from '../../models/patient.model';
import { of } from 'rxjs'


import { PatientService } from './patient.service';

describe('Given a PatientService', () => {
  let service: PatientService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let helperServiceSpy: jasmine.SpyObj<HelperService>;

  beforeEach(() => {
    const getSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const helperSpy = jasmine.createSpyObj('HelperService', ['log', 'handleError']);

    TestBed.configureTestingModule({
      providers: [
        PatientService,
        { provide: HttpClient, useValue: getSpy },
        { provide: HelperService, useValue: helperSpy }
      ]
    });
    service = TestBed.inject(PatientService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    helperServiceSpy = TestBed.inject(HelperService) as jasmine.SpyObj<HelperService>;

  });

  describe('When it is called with getAppointments function', ()=> {
    it('Then should benn called once', () => {
      const patient: Patient[] = [];
      httpClientSpy.get.and.returnValue(of(patient));
      const patientId: string = "ssss";
      service.getPatient(patientId).subscribe(()=>{
        expect(httpClientSpy.get.calls.count()).toBe(1);
      })
    })
  })
});
