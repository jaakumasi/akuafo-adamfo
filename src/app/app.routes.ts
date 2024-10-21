import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.AuthRoutes),
  },
  { path: 'home', component: HomeComponent },
];
