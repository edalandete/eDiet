import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreService } from 'src/app/core/services/store/store.service';
import { of } from 'rxjs';

import { SearchBarComponent } from './search-bar.component';
import { ComponentsHelper } from 'src/app/helper/components.helper';
import { Patient } from 'src/app/core/models/patient.model';


describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [HttpClientTestingModule],
      providers: [StoreService, ComponentsHelper]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("When a new term is introduced", () => {
    it("Then the search should been called", () => {
      const spyFn = spyOn(component.storeService,'searchPatients').and.returnValue(of())
      component.ngOnInit();
      expect(spyFn).toHaveBeenCalled();
    })
  })
});