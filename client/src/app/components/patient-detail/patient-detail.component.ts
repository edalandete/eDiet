import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as dayjs from 'dayjs';
import { Patient } from 'src/app/core/models/patient.model';
import { StoreService } from 'src/app/core/services/store/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss', './../../app.component.scss']
})
export class PatientDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private domSanitizer: DomSanitizer, private storeService: StoreService) { }

  patient! : Patient
  lastVisit : String = '';
  nextVisit: String = '';
  birthDate : String = '';
  picture : any = '';


  ngOnInit(): void {
    this.getPatient();
  }

  transform(base : string){
    debugger;
    if(base) return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+base);
    else return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+environment.defaultProfileImgae)
  }

  getPatient(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.storeService.getPatientDetail(id)
      .subscribe(patient => {
        this.patient = patient;
        this.lastVisit = dayjs(this.patient.lastVisit).format("DD/MM/YYYY");
        this.birthDate = dayjs(this.patient.birthdate).format("DD/MM/YYYY");
        this.nextVisit = dayjs(this.patient.appointment?.date).format("DD/MM/YYYY");
        this.picture = this.transform(this.patient.picture);
      });
  }

}
