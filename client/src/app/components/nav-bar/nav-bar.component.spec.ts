import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  const mockLocalStorage = {
    removeItem: () => '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarComponent ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('When its called a logout function', () => {
    const spyFn = spyOn(component,'logout');
    component.logout = function() {
      spyFn();
    }

    component.logout();
    const spyFn2 = spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem)
    expect(spyFn2).toHaveBeenCalled();
  })
});
