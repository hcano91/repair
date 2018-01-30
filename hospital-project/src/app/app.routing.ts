import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';


export const appRoutes: Routes = [
    { path: '', 
        redirectTo:'login', 
        pathMatch:'full'
    },
    { path: 'home', component: LoginComponent },    
    { path: 'login', component: LoginComponent },
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