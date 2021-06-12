import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NewPatientFormComponent } from './components/new-patient-form/new-patient-form.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { PatientEditComponent } from './components/patient-edit/patient-edit.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AuthService } from './core/services/auth/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthService] },
  { path: 'search', component: SearchBarComponent, canActivate: [AuthService] },
  { path: 'createAppointment', component: AppointmentFormComponent, canActivate: [AuthService]},
  { path: 'createPatient', component: NewPatientFormComponent, canActivate: [AuthService]},
  { path: 'logout', redirectTo: '/login'},
  { path: 'detail/:id', component: PatientDetailComponent, canActivate: [AuthService] },
  { path: 'editPatient/:id', component: PatientEditComponent, canActivate: [AuthService] },
  { path: '**', component: LoginComponent },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})

export class AppRoutingModule { }
