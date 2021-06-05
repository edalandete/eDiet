import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Patient } from 'src/app/core/models/patient.model';
import { StoreService } from 'src/app/core/services/store/store.service';
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss', './../../app.component.scss']
})
export class SearchBarComponent implements OnInit {
  patients$!: Observable<Patient[]>;
  private searchTerms = new Subject<string>();

  constructor(private storeService: StoreService, private domSanitizer: DomSanitizer) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  transform(base : string){
    if(base) return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+base);
    else return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+environment.defaultProfileImgae)
  }


  ngOnInit(): void {
    this.patients$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.storeService.searchPatients(term)),
    );
  }
}
