import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadChildren: () => import('./store-front/storee-front-routes').then(m => m.default)
    }
];
