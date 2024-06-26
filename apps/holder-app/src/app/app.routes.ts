import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { ScannerComponent } from './scanner/scanner.component';
import { LoginComponent } from './login/login.component';
import {
  CredentialsListComponent,
  CredentialsShowComponent,
  HistoryListComponent,
  HistoryShowComponent,
  SettingsComponent,
} from '@my-wallet/holder-shared';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/credentials',
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'scan',
        component: ScannerComponent,
      },
      {
        path: 'credentials',
        component: CredentialsListComponent,
      },
      {
        path: 'credentials/:id',
        component: CredentialsShowComponent,
      },
      {
        path: 'history',
        component: HistoryListComponent,
      },
      {
        path: 'history/:id',
        component: HistoryShowComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
