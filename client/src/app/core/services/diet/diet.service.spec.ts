import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HelperService } from 'src/app/helper/services.helper';
import { of } from 'rxjs'
import { Diet } from '../../models/diet.model';

import { DietService } from './diet.service';

describe('DietService', () => {
  let service: DietService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let helperServiceSpy: jasmine.SpyObj<HelperService>;

  beforeEach(() => {
    const postSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const helperSpy = jasmine.createSpyObj('HelperService', ['log', 'handleError']);

    TestBed.configureTestingModule({
      providers: [
        DietService,
        { provide: HttpClient, useValue: postSpy },
        { provide: HelperService, useValue: helperSpy }
      ]
    });
    service = TestBed.inject(DietService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    helperServiceSpy = TestBed.inject(HelperService) as jasmine.SpyObj<HelperService>;
  });

  describe('When it is called with getAppointments function', ()=> {
    it('Then should been called once', () => {
      const diets: Diet[] = [{
        _id: "dietid",
        type: "Hypertrophy",
        breakfast: "breakfast",
        midday:"sandwitch",
        lunch:"salad",
        snack: "penauts",
        dinner: "meat"

      }];
      httpClientSpy.get.and.returnValue(of(diets));
      const dietType: string = "Hypertrophy";
      service.getDietsByType(dietType, "token").subscribe(()=>{
        expect(httpClientSpy.get.calls.count()).toBe(1);
      })
    })
  });

  it('Then should been called once', () => {
    const diets: Diet[] = [];
    httpClientSpy.get.and.returnValue(of(diets));
    const dietType: string = "Hypertrophy";
    service.getDietsByType(dietType, "token").subscribe(()=>{
      expect(httpClientSpy.get.calls.count()).toBe(1);
    })
  });
});
