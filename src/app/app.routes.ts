import { Routes } from '@angular/router';
import { NotAuthGuard } from './shared/guardgads/not-auth.guard';

export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES),
        canActivate: [NotAuthGuard],
        canMatch: [NotAuthGuard],
    },
    {
        path: '',
        loadChildren: () => import('./store-front/storee-front-routes').then(m => m.default)
    }

];
