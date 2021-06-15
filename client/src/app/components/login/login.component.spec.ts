import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Dietician } from 'src/app/core/models/dietician.model';
import { StoreService } from 'src/app/core/services/store/store.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let storeService: StoreService;

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

  const storeServiceMock = {
    login: () => of(dietician),
    dietician$: new BehaviorSubject<Dietician>(dietician)
  };

  const routerMock = {
    navigateByUrl: () => null,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        {provide: StoreService, useValue: storeServiceMock},
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Then the function login to have been called` , () => {
    const spyFn = spyOn(storeService,'login').and.returnValue(of(dietician));
    component.ngOnInit();
    component.login();
    expect(spyFn).toHaveBeenCalled();
  });

  it(`Then the function login to have been called` , () => {
    const spyFn = spyOn(storeService,'login').and.returnValue(throwError('User name or Password is Incorrect'));

    storeService.login().subscribe(()=>{
      expect(spyFn).toBe('User name or Password is Incorrect');
    })
    component.ngOnInit();
    component.login();
  });
});
