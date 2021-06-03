import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.storeService.getPatientDetail(id)
      .subscribe(patient => this.patient = patient);
  }

}
