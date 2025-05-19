import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface IInvestimento {
  nome: string;
  tipo: string;
  valor: number;
  usuarioId: number;
  data: Date;
}

export interface ICreateInvestimentoResponse {
  id: number;
  nome: string;
  tipo: string;
  valor: number;
  data: Date;
  usuarioId: number;
}

export interface IGetInvestimentoResponse {
  content: ICreateInvestimentoResponse[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

@Injectable({ providedIn: 'root' })
export class InvestimentoService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createInvestimento(
    investimento: IInvestimento
  ): Observable<ICreateInvestimentoResponse> {
    try {
      const token = this.authService.getToken();
      return this.http.post<ICreateInvestimentoResponse>(
        `${environment.apiUrl}/investimento`,
        investimento,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  getInvestimentos(data: {
    page: number;
    size: number;
    sort?: string;
    tipo?: string;
    usuarioId: number;
    startDate?: string;
    endDate?: string;
  }): Observable<IGetInvestimentoResponse> {
    let params = new HttpParams();
    params = params.append('page', data.page.toString());
    params = params.append('size', data.size.toString());
    params = params.append('usuarioId', data.usuarioId.toString());
    if (data.sort) {
      params = params.append('sort', data.sort);
    }
    if (data.tipo) {
      params = params.append('tipo', data.tipo);
    }
    if (data.startDate) {
      params = params.append('startDate', data.startDate);
    }
    if (data.endDate) {
      params = params.append('endDate', data.endDate);
    }
    try {
      const token = this.authService.getToken();
      return this.http.get<IGetInvestimentoResponse>(
        `${environment.apiUrl}/investimento/listar`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          params: params,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  updateInvestimento(
    investimento: ICreateInvestimentoResponse
  ): Observable<ICreateInvestimentoResponse> {
    try {
      const token = this.authService.getToken();
      return this.http.put<ICreateInvestimentoResponse>(
        `${environment.apiUrl}/investimento/${investimento.id}`,
        investimento,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  excluirInvestimento(
    investimentoId: number
  ): Observable<ICreateInvestimentoResponse> {
    try {
      const token = this.authService.getToken();
      return this.http.delete<ICreateInvestimentoResponse>(
        `${environment.apiUrl}/investimento/${investimentoId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
