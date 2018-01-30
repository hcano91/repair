import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


// Services
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthenticationService } from "./services/authentication.service"

// Routes
import { appRoutes } from './app.routing';

export const firebaseConfig = {
  apiKey: "AIzaSyBAlY1tLGPLFKnCts9XnzMR9vNBPQrZPjo",
  authDomain: "repair-5a4b5.firebaseapp.com",
  databaseURL: "https://repair-5a4b5.firebaseio.com",
  projectId: "repair-5a4b5",
  storageBucket: "repair-5a4b5.appspot.com",
  messagingSenderId: "896016622141"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
