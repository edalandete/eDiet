import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as dayjs from 'dayjs';
import { Patient } from 'src/app/core/models/patient.model';
import { StoreService } from 'src/app/core/services/store/store.service';
import { ComponentsHelper } from './../../helper/components.helper';
import { DATE_FORMAT_DDMMYYYY_SLASH } from 'src/assets/constants';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss', './../../app.component.scss']
})
export class PatientDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public storeService: StoreService,
    private componentsHelper: ComponentsHelper
  ) { }

  patient! : Patient
  lastVisit : String = '';
  nextVisit: String = '';
  birthDate : String = '';
  picture : any = '';


  ngOnInit(): void {
    this.getPatient();
  }

  transform(base : string){
    return this.componentsHelper.transform(base);
  }

  getPatient(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.storeService.getPatientDetail(id)
      .subscribe(patient => {
        this.patient = patient;
        this.lastVisit = dayjs(this.patient.lastVisit).format(DATE_FORMAT_DDMMYYYY_SLASH);
        this.birthDate = dayjs(this.patient.birthdate).format(DATE_FORMAT_DDMMYYYY_SLASH);
        this.nextVisit = dayjs(this.patient.appointment?.date).format(DATE_FORMAT_DDMMYYYY_SLASH);
        this.picture = this.transform(this.patient.picture);
      });
  }

}
