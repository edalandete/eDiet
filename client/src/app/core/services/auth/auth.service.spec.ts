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
  let routerDeclarationSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const postSpy = jasmine.createSpyObj('HttpClient', ['post']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers : [
        AuthService,
        RouterTestingModule,
        { provide: HttpClient, useValue: postSpy },
      ]
    });
    service = TestBed.inject(AuthService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    routerDeclarationSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
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
    it('And the user is logged', () => {
      spyOn(service, 'canActivate').and.returnValue(true)

      const result = service.canActivate()
      expect(result).toBe(true);
    });

    it('And the user is not logged', () => {
      spyOn(service, 'canActivate').and.returnValue(false)

      const result = service.canActivate()
      expect(result).toBe(false);
    });
  })
});
