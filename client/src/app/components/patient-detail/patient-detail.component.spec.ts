import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { DomSanitizer } from '@angular/platform-browser';
import { StoreService } from 'src/app/core/services/store/store.service';
import { PatientDetailComponent } from './patient-detail.component';


describe('PatientDetailComponent', () => {
  let component: PatientDetailComponent;
  let fixture: ComponentFixture<PatientDetailComponent>;

  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get(): string {
          return '133';
        }
      }
    }
  } ;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDetailComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [StoreService, {provide: ActivatedRoute, useValue: fakeActivatedRoute}, DomSanitizer]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
