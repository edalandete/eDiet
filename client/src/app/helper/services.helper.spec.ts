import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HelperService } from './services.helper';

describe('Given a HelperService', () => {
    let helperService: HelperService;
    let router: Router;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, RouterTestingModule],
        providers: [
        ]
      });
        helperService = TestBed.inject(HelperService);
    });

    describe('When log function is called with a message', () => {
        it('Then message is printed', () => {
            const message = "mesage to print"
            const spyFn = spyOn(helperService, 'log').and.callThrough()
            helperService.log(message);
            expect(spyFn).toHaveBeenCalled();
        })
    });

    describe('When handleError function is called with a message', () => {
      it('Then message is printed', () => {
          const spyFn = spyOn(helperService, 'handleError').and.callThrough()
          helperService.handleError();
          expect(spyFn).toHaveBeenCalled();
      })
  });
});
