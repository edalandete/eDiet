import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';
import { Dietician } from '../../models/dietician.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const postSpy = jasmine.createSpyObj('HttpClient', ['post']);
    const test = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers : [
        AuthService,
        { provide: Router, useValue: test },
        { provide: HttpClient, useValue: postSpy },
      ]
    });
    service = TestBed.inject(AuthService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  describe('When it is called with login function', ()=> {
    it('Then should been called once', () => {
      const dietician: Dietician = {
        user: {
          _id: "string",
          firstName: "string",
          lastName: "string",
          email: "string",
          idCard: "string",
          password: "string",
          schedule: {
              monday: ["string"],
              tuesday: ["string"],
              wednesday: ["string"],
              thursday: ["string"],
              friday: ["string"],
          }
        },
        token: "string"
      };
      httpClientSpy.post.and.returnValue(of(dietician));
      const dieticianId: string = "ssss";
      service.login(dietician).subscribe(()=>{
        expect(httpClientSpy.post.calls.count()).toBe(1);
      })
    })
  })
  describe('When it is called with canActivate function', ()=> {

    it('The user is logged shoud return true ', () => {
      let store: any = {
        'dieticianId': 'gol'
      };
      const mockLocalStorage = {
        getItem: (key: string): string => {
          return key in store ? store[key] : null;
        }
      }

      spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
      let result = service.canActivate()
      expect(result).toBe(true);
    });

    it('The user is not logged shoud return false ', () => {
      let store: any = {

      };
      const mockLocalStorage = {
        getItem: (key: string): string => {
          return key in store ? store[key] : null;
        }
      }

      spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
      let result = service.canActivate()
      expect(result).toBe(false);
    });
  })
});
