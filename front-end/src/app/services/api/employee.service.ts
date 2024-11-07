import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface IEmployee {
  nome: string;
  email: string;
  dataNascimento: string;
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
export class EmployeeService {
  private apiUrl = 'https://localhost:8080/api/cliente';

  constructor(private http: HttpClient) {}

  cadastrarFuncionario(funcionario: IEmployee): Observable<any> {
    return this.http.post(`${this.apiUrl}`, funcionario);
  }

  listarFuncionarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  buscarFuncionario(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  atualizarFuncionario(id: string, funcionario: IEmployee): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, funcionario);
  }

  deletarFuncionario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
