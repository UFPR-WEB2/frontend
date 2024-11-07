import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ICliente {
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
  private apiUrl = 'https://localhost:8080/api/cliente';

  constructor(private http: HttpClient) {}

  cadastrarCliente(cliente: ICliente): Observable<any> {
    return this.http.post(`${this.apiUrl}`, cliente);
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
