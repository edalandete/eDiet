import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreService } from 'src/app/core/services/store/store.service';
import { of } from 'rxjs';

import { SearchBarComponent } from './search-bar.component';
import { ComponentsHelper } from 'src/app/helper/components.helper';
import { Patient } from 'src/app/core/models/patient.model';


describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let storeService: StoreService;

  const patient : Patient = {
    _id: "sss",
    firstName: "aaaa",
    lastName: "bbbbb",
    fullName: "aaaa bbbbb",
    email: "mail",
    phone: 643555544,
    birthdate: "stirng",
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
        date: undefined,
        time: "string"
    },
    isActive: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [StoreService, ComponentsHelper]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    fixture.detectChanges();
  });

  describe("When a new term is introduced", () => {
    it("Then the search should been called", () => {
      const patients: Patient[] = [patient]
      const spyFn = spyOn(component.storeService,'searchPatients').and.returnValue(of());
      component.search("Bruce");
      expect(spyFn).toHaveBeenCalled();
    });

    it("Then search function should been called", () => {
      const searchValue = "Bruce";
      const spyFn = spyOn(component.searchTerms,'next');
      component.search(searchValue);
      expect(spyFn).toHaveBeenCalled();
    });

    it("Then transform function should been called", () => {
      const base = "img";
      const spyFn = spyOn(component.componentsHelper,'transform');
      component.transform(base);
      expect(spyFn).toHaveBeenCalled();
    })
  });
});
