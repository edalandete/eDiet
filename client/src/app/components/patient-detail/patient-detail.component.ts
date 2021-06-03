import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as dayjs from 'dayjs';
import { Patient } from 'src/app/core/models/patient.model';
import { StoreService } from 'src/app/core/services/store/store.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss', './../../app.component.scss']
})
export class PatientDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private storeService: StoreService) { }

  patient! : Patient
  lastVisit : String = '';
  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.storeService.getPatientDetail(id)
      .subscribe(patient => {
        this.patient = patient;
        this.lastVisit = dayjs(this.patient.lastVisit).format("DD/MM/YYYY");
      });
  }

}
