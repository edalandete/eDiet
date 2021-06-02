import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { NewPatientFormComponent } from './components/new-patient-form/new-patient-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardComponent,
    PatientDetailComponent,
    LoginComponent,
    AppointmentFormComponent,
    NewPatientFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
