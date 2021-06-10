import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HelperService } from 'src/app/helper/services.helper';
import { Patient } from '../../models/patient.model';
import { of } from 'rxjs'


import { PatientService } from './patient.service';

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

describe('Given a PatientService', () => {
  let service: PatientService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let helperServiceSpy: jasmine.SpyObj<HelperService>;

  beforeEach(() => {
    const getSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
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

  describe('When it is called with getPatient function', ()=> {
    it('Then should benn called once', () => {
      httpClientSpy.get.and.returnValue(of(patient));
      const patientId: string = "ssss";
      service.getPatient(patientId).subscribe(()=>{
        expect(httpClientSpy.get.calls.count()).toBe(1);
      })
    })
  });

  describe('When it is called with searchPatients function', ()=> {
    it('Then should benn called once', () => {
      const patients: Patient[] = [];
      httpClientSpy.get.and.returnValue(of(patients));
      const term: string = "ssss";
      service.searchPatients(term).subscribe(()=>{
        expect(httpClientSpy.get.calls.count()).toBe(1);
      })
    })
  });

  describe('When it is called with updatePatient function', ()=> {
    it('Then should benn called once', () => {
      httpClientSpy.put.and.returnValue(of(patient));
      const term: string = "ssss";
      service.updatePatient(patient, patient._id).subscribe(()=>{
        expect(httpClientSpy.put.calls.count()).toBe(1);
      })
    })
  });

  describe('When it is called with createPatient function', ()=> {
    it('Then should benn called once', () => {
      httpClientSpy.post.and.returnValue(of(patient));
      const term: string = "ssss";
      service.createPatient(patient).subscribe(()=>{
        expect(httpClientSpy.post.calls.count()).toBe(1);
      })
    })
  });
});
