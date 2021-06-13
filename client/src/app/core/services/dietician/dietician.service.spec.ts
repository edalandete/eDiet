import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HelperService } from 'src/app/helper/services.helper';

import { DieticianService } from './dietician.service';

describe('DieticianService', () => {
  let service: DieticianService;

  beforeEach(() => {
    const postSpy = jasmine.createSpyObj('HttpClient', ['post']);
    const helperSpy = jasmine.createSpyObj('HelperService', ['log', 'handleError']);

    TestBed.configureTestingModule({
      providers: [
        DieticianService,
        { provide: HttpClient, useValue: postSpy },
        { provide: HelperService, useValue: helperSpy }
      ]
    });
    service = TestBed.inject(DieticianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
