import { MaintenceRequest } from './../../models/maintence-request.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

//dataConserto; dataCriacao; dataFinalizacao; descricaoConserto; descricaoDefeito; descricaoEquipamento; id; nomeCategoria; nomeCliente; nomeFuncionario; nomeFuncionario; orientacaoCliente
export class MaintenanceResponse {
  dataConserto?: string;
  dataCriacao?: string;
  dataFinalizacao?: string;
  descricaoConserto?: string;
  descricaoDefeito?: string;
  descricaoEquipamento?: string;
  id?: number;
  nomeCategoria?: string;
  nomeCliente?: string;
  nomeFuncionario?: string;
  orientacaoCliente?: string;
  nomeStatus?: string;

  constructor(
    dataConserto?: string,
    dataCriacao?: string,
    dataFinalizacao?: string,
    descricaoConserto?: string,
    descricaoDefeito?: string,
    descricaoEquipamento?: string,
    id?: number,
    nomeCategoria?: string,
    nomeCliente?: string,
    nomeFuncionario?: string,
    orientacaoCliente?: string,
    status?: string
  ) {
    this.dataConserto = dataConserto;
    this.dataCriacao = dataCriacao;
    this.dataFinalizacao = dataFinalizacao;
    this.descricaoConserto = descricaoConserto;
    this.descricaoDefeito = descricaoDefeito;
    this.descricaoEquipamento = descricaoEquipamento;
    this.id = id;
    this.nomeCategoria = nomeCategoria;
    this.nomeCliente = nomeCliente;
    this.nomeFuncionario = nomeFuncionario;
    this.orientacaoCliente = orientacaoCliente;
    this.nomeStatus = status;
  }
}

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private apiUrl = `${environment.apiUrl}/manutencao`;

  constructor(private http: HttpClient) {}

  getAllMaintenance(): Observable<MaintenanceResponse[]> {
    return this.http.get<MaintenanceResponse[]>(this.apiUrl, {
      withCredentials: true,
    });
  }

  getMaintenanceRecords(): Observable<MaintenanceResponse[]> {
    return this.http.get<MaintenanceResponse[]>(`${this.apiUrl}/records`, {
      withCredentials: true,
    });
  }

  getMaintenanceRecordById(id: number | null): Observable<MaintenanceResponse> {
    return this.http.get<MaintenanceResponse>(`${this.apiUrl}/records/${id}`, {
      withCredentials: true,
    });
  }

  getMaintenanceById(id: number | null): Observable<MaintenanceResponse> {
    return this.http.get<MaintenanceResponse>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  createMaintenance(maintenceRequest: MaintenceRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Fazendo a requisição e lidando com erros
    return this.http
      .post<any>(this.apiUrl, maintenceRequest, {
        headers,
        withCredentials: true,
      })
      .pipe(
        tap((response) => console.log('Resposta da API:', response)),
        catchError((error) => {
          console.error('Erro na chamada HTTP:', error);
          return throwError(
            () => new Error('Falha ao criar a solicitação de manutenção.')
          );
        })
      );
  }

  updateMaintenanceRecord(id: number, record: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/records/${id}`, record, {
      withCredentials: true,
    });
  }

  deleteMaintenanceRecord(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/records/${id}`, {
      withCredentials: true,
    });
  }

  getOpenMaintenances(): Observable<MaintenanceResponse[]> {
    return this.http.get<MaintenanceResponse[]>(`${this.apiUrl}/emAberto`, {
      withCredentials: true,
    });
  }

  //ABCDE
  // Aqui falta: passar um dto correto que satisfaça a funcao correta do back.
  // Precisa salvar: responsavel pela manutencao, data e hora, descricao do conserto e orientacao ao cliente
  performMaintenance(id: number): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/perform/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  finishMaintenance(id: number): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/finish/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  payMaintenance(id: number): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/pay/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
