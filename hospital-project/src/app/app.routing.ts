import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { Routes } from '@angular/router';
import { ResolveGuard } from './core/resolve.guard';


export const appRoutes: Routes = [
    { 
        path: '', 
        redirectTo:'dashboard', 
        pathMatch:'full'
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'dashboard', 
        component: DashboardComponent, 
        resolve: [ ResolveGuard ]
    }
];