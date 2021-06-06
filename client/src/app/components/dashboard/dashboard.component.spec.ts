import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreService } from 'src/app/core/services/store/store.service';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { Appointment } from 'src/app/core/models/appointment.model';


describe('Given a DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [HttpClientTestingModule],
      providers: [StoreService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
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
