import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout';


export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {  
                path: 'register',
                loadComponent: () => import('./pages/register-page/register-page').then(m => m.RegisterPageComponent)
            },
            {
                path: 'login',
                loadComponent: () => import('./pages/login-page/login-page').then(m => m.LoginPageComponent)
            },
            {
                path: '**',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    }
  
];

export default AUTH_ROUTES;