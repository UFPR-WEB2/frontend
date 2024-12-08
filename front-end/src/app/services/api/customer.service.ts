import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICustomer } from '../../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = `${environment.apiUrl}/cliente`;

  constructor(private http: HttpClient) {}

  cadastrarCliente(cliente: ICustomer): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, cliente, { headers }).pipe(
      catchError((error) => {
        if (error.status === 409) {
          return throwError(
            () => new Error('Email já cadastrado. Tente outro.')
          );
        } else if (error.status === 400) {
          return throwError(
            () => new Error('Erro ao cadastrar cliente. Revise os dados.')
          );
        } else {
          return throwError(
            () => new Error('Erro desconhecido. Tente novamente.')
          );
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

  atualizarCliente(id: string, cliente: ICustomer): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }

  deletarCliente(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
