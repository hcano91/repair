import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication-guard/authentication.guard'


export const appRoutes: Routes = [
    { path: '', 
        redirectTo:'login', 
        pathMatch:'full'
    },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard] },    
    // { path: 'hero/:id',      component: HeroDetailComponent },
    // {
    //   path: 'heroes',
    //   component: HeroListComponent,
    //   data: { title: 'Heroes List' }
    // },
    // { path: '',
    //   redirectTo: '/heroes',
    //   pathMatch: 'full'
    // },
    // { path: '**', component: PageNotFoundComponent }

  ];