import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { environment } from '../environments/environment'

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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthenticationService, UserService, SystemState, ErrorTranslationService, ResolveGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
