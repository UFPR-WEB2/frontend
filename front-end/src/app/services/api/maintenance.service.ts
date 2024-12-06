import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MaintenceRequest } from '../../models/maintence-request.model';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MaintenanceService {

    private apiUrl = `${environment.apiUrl}/manutencao`;

    constructor(private http: HttpClient) { }

    getMaintenanceRecords(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/records`);
    }

    getMaintenanceRecordById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/records/${id}`);
    }

    createMaintenance(maintenceRequest: MaintenceRequest): Observable<any> {
        console.log("API URL:", this.apiUrl);
    
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
    
        // Fazendo a requisição e lidando com erros
        return this.http.post<any>(this.apiUrl, maintenceRequest, { headers }).pipe(
            tap(response => console.log("Resposta da API:", response)),
            catchError(error => {
                console.error("Erro na chamada HTTP:", error);
                return throwError(() => new Error("Falha ao criar a solicitação de manutenção."));
            })
        );
    }
    

    updateMaintenanceRecord(id: number, record: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/records/${id}`, record);
    }

    deleteMaintenanceRecord(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/records/${id}`);
    }
}