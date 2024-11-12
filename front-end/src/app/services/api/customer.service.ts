import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:9090/api/cliente'; //colocar o 8080 padrao ou a que cada usa

  constructor(private http: HttpClient) {}

  cadastrarCliente(cliente: ICliente): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
    });
  
    return this.http.post(`${this.apiUrl}`, cliente, { headers });
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
