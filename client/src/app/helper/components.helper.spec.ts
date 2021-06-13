import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { DomSanitizer } from "@angular/platform-browser";
import { SecurityContext } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ComponentsHelper } from "./components.helper";
import { Router } from '@angular/router';

describe('Given a ComponentsHelper', () => {
    let componentsHelper: ComponentsHelper;
    let sanitizer: DomSanitizer;
    let router: Router;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, RouterTestingModule],
        providers: [
        ]
      });
        componentsHelper = TestBed.inject(ComponentsHelper);
        sanitizer = TestBed.inject(DomSanitizer);
    });

    describe('When transform function is called with empty base', () => {
        it('Then the default image should appear', () => {
            const base: string = '';
            const result = componentsHelper.transform(base);
            const sanitizedValue = sanitizer.sanitize(SecurityContext.RESOURCE_URL, result);
            expect(sanitizedValue).toEqual('data:image/png;base64,'+environment.defaultProfileImage);
        })
    });

    describe('When transform function is called with filled base', () => {
        it('Then the default image should appear', () => {
            const base: string = '123';
            const result = componentsHelper.transform(base);
            const sanitizedValue = sanitizer.sanitize(SecurityContext.RESOURCE_URL, result);
            expect(sanitizedValue).toEqual('123');
        })
    });

    describe('When goToDetail function is called', ()=> {
      it('Should redirect to patient detail', ()=> {
        const spyFn = spyOn(router,'navigateByUrl');
        componentsHelper.goToDetail('patientId');
        expect(spyFn).toHaveBeenCalled();
      })
    })
});
