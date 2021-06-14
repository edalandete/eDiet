import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HelperService } from 'src/app/helper/services.helper';

import { DieticianService } from './dietician.service';

describe('DieticianService', () => {
  let service: DieticianService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let helperServiceSpy: jasmine.SpyObj<HelperService>;

  beforeEach(() => {
    const postSpy = jasmine.createSpyObj('HttpClient', ['post']);
    const helperSpy = jasmine.createSpyObj('HelperService', ['log', 'handleError']);

    TestBed.configureTestingModule({
      providers: [
        DieticianService,
        { provide: HttpClient, useValue: postSpy },
        { provide: HelperService, useValue: helperSpy }
      ]
    });
    service = TestBed.inject(DieticianService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    helperServiceSpy = TestBed.inject(HelperService) as jasmine.SpyObj<HelperService>;

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When it is called with getAvailableHours function', ()=> {
    it('Then should been called once', () => {
      const availableHours: String[] = [];
      httpClientSpy.post.and.returnValue(of(availableHours));
      const dieticianId: string = "ssss";
      const date: string = "aaaa";
      service.getAvailableHours(dieticianId, date, "token").subscribe(()=>{
        expect(httpClientSpy.post.calls.count()).toBe(1);
      })
    })
  })
});
