import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/404/404.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.AuthRoutes),
  },
  { path: 'home', component: HomeComponent },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
