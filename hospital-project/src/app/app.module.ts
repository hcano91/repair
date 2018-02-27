import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

// Services
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthenticationService } from "./services/core/authentication.service";
import { UserService } from "./services/core/user.service";
import { SystemState } from "./services/core/systemState.service";
import { ErrorTranslationService } from "./services/core/errorTranslation.service";

// Routes
import { appRoutes } from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';

//Guards
import { ResolveGuard } from './core/resolve.guard';
import { PatientComponent } from './dashboard/patient/patient.component';
import { PatientListComponent } from './dashboard/patient-list/patient-list.component';
import { PatientConsultationListComponent } from './dashboard/patient-consultation-list/patient-consultation-list.component';
import { ConsultationComponent } from './dashboard/consultation/consultation.component';
import { PregnancyComponent } from './dashboard/consultation/pregnancy/pregnancy.component';
import { ProvideConsultationFormDirective } from './directives/provide-consultation-form.directive';
import { DiseaseHistoryComponent } from './dashboard/consultation/disease-history/disease-history.component';
import { ActualTreatmentComponent } from './dashboard/consultation/actual-treatment/actual-treatment.component';
import { SubjectiveAnalysisComponent } from './dashboard/consultation/subjective-analysis/subjective-analysis.component';
import { ObjectiveAnalysisComponent } from './dashboard/consultation/objective-analysis/objective-analysis.component';
import { AuxiliaryStudiesComponent } from './dashboard/consultation/auxiliary-studies/auxiliary-studies.component';
import { RadiographyComponent } from './dashboard/consultation/radiography/radiography.component';
import { DiagnosisComponent } from './dashboard/consultation/diagnosis/diagnosis.component';
import { IllnessActivityComponent } from './dashboard/consultation/illness-activity/illness-activity.component';
import { PrescribingTreatmentComponent } from './dashboard/consultation/prescribing-treatment/prescribing-treatment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PatientComponent,
    PatientListComponent,
    PatientConsultationListComponent,
    ConsultationComponent,
    PregnancyComponent,
    ProvideConsultationFormDirective,
    DiseaseHistoryComponent,
    ActualTreatmentComponent,
    SubjectiveAnalysisComponent,
    ObjectiveAnalysisComponent,
    AuxiliaryStudiesComponent,
    RadiographyComponent,
    DiagnosisComponent,
    IllnessActivityComponent,
    PrescribingTreatmentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthenticationService, UserService, SystemState, ErrorTranslationService, ResolveGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
