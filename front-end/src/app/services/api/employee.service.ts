import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from '../../models/employee.model';
import { environment } from '../../environments/environment';

export class Employee {
  id: number;
  nome: string;
  email: string;
  dataNascimento: string;
  ativo: string;

  constructor(id: number, name: string, email: string, birthDate: string, status: string) {
    this.id = id;
    this.nome = name;
    this.email = email;
    this.dataNascimento = birthDate;
    this.ativo = status;
  }
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/employee`;

  constructor(private http: HttpClient) {}

  cadastrarFuncionario(funcionario: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, funcionario, {withCredentials: true});
  }

  listarFuncionarios(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + `/active`);
  }

  buscarFuncionario(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  atualizarFuncionario(id: number, funcionario: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, funcionario, {withCredentials: true});
  }

  deletarFuncionario(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
}
