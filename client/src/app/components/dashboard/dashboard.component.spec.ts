import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreService } from 'src/app/core/services/store/store.service';
import { BehaviorSubject, of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { Appointment } from 'src/app/core/models/appointment.model';
import { Dietician } from 'src/app/core/models/dietician.model';


describe('Given a DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
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

    getTodaysAppointments: () => of([]),
    dietician$: new BehaviorSubject<Dietician>(dietician)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [StoreService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    fixture.detectChanges();
  });

  describe('When the component is rendered', () => {
    it(`Then the text today should appear in the screen` , () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Today');
    });
    it(`Then the text today should appear in the screen` , () => {
      const appointments : Appointment[] = [];
      const spyFn = spyOn(component.storeService,'getTodayAppointments').and.returnValue(of(appointments))
      component.ngOnInit();
      expect(spyFn).toHaveBeenCalled();
    });

  });
});
