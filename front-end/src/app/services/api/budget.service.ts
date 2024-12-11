import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBudget } from '../../models/budget.model';
import { IBudgetRequest } from '../../models/budget-request.model';
import { IBudgetResponse } from '../../models/budget-response.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private apiUrl = `${environment.apiUrl}/orcamentos`;

  constructor(private http: HttpClient) {}

  createBudget(budgetRequest: IBudgetRequest): Observable<IBudgetResponse> {
    return this.http.post<IBudgetResponse>(this.apiUrl, budgetRequest, { withCredentials: true });
  }

  getBudgetById(id: number): Observable<IBudgetResponse> {
    return this.http.get<IBudgetResponse>(`${this.apiUrl}/${id}`);
  }

  getBudgetByMaintenanceId(maintenanceId: number): Observable<IBudgetResponse> {
    return this.http.get<IBudgetResponse>(
      `${this.apiUrl}/manutencao/${maintenanceId}`
    );
  }

  getAllBudgets(): Observable<IBudgetResponse[]> {
    return this.http.get<IBudgetResponse[]>(this.apiUrl);
  }

  updateBudget(
    id: number,
    budgetRequest: IBudgetRequest
  ): Observable<IBudgetResponse> {
    return this.http.put<IBudgetResponse>(
      `${this.apiUrl}/${id}`,
      budgetRequest
    );
  }

  deleteBudget(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  approveBudget(id: number | undefined): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/aprovar/${id}`, {}, { withCredentials: true });
  }

  rejectBudget(id: number | null, updateRequest: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/rejeitar/${id}`, updateRequest, { withCredentials: true });
  }

  redeemBudget(id: number | undefined): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/resgatar/${id}`, {}, { withCredentials: true });
  }
}
