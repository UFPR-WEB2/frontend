import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from '../../models/employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/cliente`;

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
