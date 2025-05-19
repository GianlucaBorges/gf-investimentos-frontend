import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IAuthResponse {
  token: string;
  id: number;
  email: string;
  nome: string;
}

export interface IAuthCadastroResponse {
  id: number;
  email: string;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(data: { email: string; senha: string }): Observable<IAuthResponse> {
    try {
      return this.http
        .post<IAuthResponse>(`${environment.apiUrl}/auth/login`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .pipe(
          tap((response) => {
            if (!this.isBrowser()) {
              return;
            }
            localStorage.setItem('token', 'Bearer ' + response.token);
            localStorage.setItem('userId', response.id.toString());
            localStorage.setItem('email', response.email);
            localStorage.setItem('nome', response.nome);
          })
        );
    } catch (error) {
      throw error;
    }
  }

  cadastro(data: {
    nome: string;
    email: string;
    senha: string;
  }): Observable<IAuthCadastroResponse> {
    try {
      return this.http.post<IAuthCadastroResponse>(
        `${environment.apiUrl}/user/cadastrar`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  logOut() {
    if (!this.isBrowser()) {
      return;
    }
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('nome');
  }

  estaLogado(): boolean {
    if (!this.isBrowser()) {
      return false;
    }
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const nome = localStorage.getItem('nome');

    return token !== null && userId !== null && email !== null && nome !== null;
  }

  getToken(): string | null {
    if (!this.isBrowser()) {
      return null;
    }
    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    if (!this.isBrowser()) {
      return null;
    }
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  getEmail(): string | null {
    if (!this.isBrowser()) {
      return null;
    }
    return localStorage.getItem('email');
  }

  getNome(): string | null {
    if (!this.isBrowser()) {
      return null;
    }
    return localStorage.getItem('nome');
  }
}
