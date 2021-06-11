import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs'
import { HelperService } from 'src/app/helper/services.helper';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from './appointment.service';

describe('Given an AppointmentService', () => {
  let service: AppointmentService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let helperServiceSpy: jasmine.SpyObj<HelperService>;


  beforeEach(() => {
    const postSpy = jasmine.createSpyObj('HttpClient', ['post']);
    const helperSpy = jasmine.createSpyObj('HelperService', ['log', 'handleError']);

    TestBed.configureTestingModule({
      providers: [
        AppointmentService,
        { provide: HttpClient, useValue: postSpy },
        { provide: HelperService, useValue: helperSpy }
      ]
    });
    service = TestBed.inject(AppointmentService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    helperServiceSpy = TestBed.inject(HelperService) as jasmine.SpyObj<HelperService>;

  });

  describe('When it is called with getAppointments function', ()=> {
    it('Then should been called once', () => {
      const appointments: Appointment[] = [];
      httpClientSpy.post.and.returnValue(of(appointments));
      const dieticianId: string = "ssss";
      const date: string = "aaaa";
      service.getAppointments(dieticianId, date, "token").subscribe(()=>{
        expect(httpClientSpy.post.calls.count()).toBe(1);
      })
    })
  })
});
