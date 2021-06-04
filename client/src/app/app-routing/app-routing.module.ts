import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppointmentFormComponent } from '../components/appointment-form/appointment-form.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { NewPatientFormComponent } from '../components/new-patient-form/new-patient-form.component';
import { PatientDetailComponent } from '../components/patient-detail/patient-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'createAppointment', component: AppointmentFormComponent},
  { path: 'createPatient', component: NewPatientFormComponent},
  { path: 'logout', component: LoginComponent},
  { path: 'detail/:id', component: PatientDetailComponent },


];



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }