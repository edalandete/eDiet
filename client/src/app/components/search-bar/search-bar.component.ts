import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Patient } from 'src/app/core/models/patient.model';
import { StoreService } from 'src/app/core/services/store/store.service';
import { ComponentsHelper } from './../../helper/components.helper';

 
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss', './../../app.component.scss']
})
export class SearchBarComponent implements OnInit {
  patients$!: Observable<Patient[]>;
  private searchTerms = new Subject<string>();

  constructor(private storeService: StoreService, private componentsHelper: ComponentsHelper) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  transform(base : string){
    return this.componentsHelper.transform(base);
  }

  ngOnInit(): void {
    this.patients$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.storeService.searchPatients(term)),
    );
  }
}
