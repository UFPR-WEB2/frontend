import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';  // Importe o catchError aqui
import { throwError } from 'rxjs';  // Importe o throwError aqui

export interface ICliente {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  cep: string;
  pais: string;
  estado: string;
  cidade: string;
  rua: string;
  numero: string;
  complemento?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/cliente';

  constructor(private http: HttpClient) {}

  cadastrarCliente(cliente: ICliente): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, cliente, { headers }).pipe(
      catchError((error) => {
        if (error.status === 409) {
          return throwError('Email já cadastrado. Tente outro.');
        } else if (error.status === 400) {
          return throwError('Erro ao cadastrar cliente. Revise os dados.');
        } else {
          return throwError('Erro desconhecido. Tente novamente.');
        }
      })
    );
  }

  listarClientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  buscarCliente(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  atualizarCliente(id: string, cliente: ICliente): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }

  deletarCliente(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
