import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./pages/cadastro/cadastro.component').then(
        (m) => m.CadastroComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'cadastro-investimento',
        pathMatch: 'full',
      },
      {
        path: 'cadastro-investimento',
        loadComponent: () =>
          import(
            './pages/cadastro-investimento/cadastro-investimento.component'
          ).then((m) => m.CadastroInvestimentoComponent),
      },
      {
        path: 'lista-investimento',
        loadComponent: () =>
          import(
            './pages/lista-investimento/lista-investimento.component'
          ).then((m) => m.ListaInvestimentoComponent),
      },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
