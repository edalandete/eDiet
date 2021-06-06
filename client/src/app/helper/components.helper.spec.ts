import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from "@angular/platform-browser";
import { SecurityContext } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ComponentsHelper } from "./components.helper";

describe('Given a ComponentsHelper', () => {
    let componentsHelper: ComponentsHelper;
    let sanitizer: DomSanitizer;

    beforeEach(() => {
        componentsHelper = TestBed.inject(ComponentsHelper);
        sanitizer = TestBed.inject(DomSanitizer);
    });
    
    describe('When transform function is called with empty base', () => {
        it('Then the default image should appear', () => {
            const base: string = '';
            const result = componentsHelper.transform(base);
            const sanitizedValue = sanitizer.sanitize(SecurityContext.RESOURCE_URL, result);
            expect(sanitizedValue).toEqual('data:image/png;base64,'+environment.defaultProfileImgae);
        })
    });
    describe('When transform function is called with filled base', () => {
        it('Then the default image should appear', () => {
            const base: string = '123';
            const result = componentsHelper.transform(base);
            const sanitizedValue = sanitizer.sanitize(SecurityContext.RESOURCE_URL, result);
            expect(sanitizedValue).toEqual('data:image/png;base64,123');
        })
    });

});