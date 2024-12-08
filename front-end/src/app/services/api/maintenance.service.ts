import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MaintenceRequest } from '../../models/maintence-request.model';
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

    constructor(dataConserto?: string, dataCriacao?: string, dataFinalizacao?: string, descricaoConserto?: string, descricaoDefeito?: string, descricaoEquipamento?: string, id?: number, nomeCategoria?: string, nomeCliente?: string, nomeFuncionario?: string, orientacaoCliente?: string, status?: string) {
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
    providedIn: 'root'
})
export class MaintenanceService {

    private apiUrl = `${environment.apiUrl}/manutencao`;

    constructor(private http: HttpClient) { }

    getMaintenanceRecords(): Observable<MaintenanceResponse[]> {
        return this.http.get<MaintenanceResponse[]>(`${this.apiUrl}/records`, {withCredentials: true} );
    }

    getMaintenanceRecordById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/records/${id}`);
    }

    createMaintenance(maintenceRequest: MaintenceRequest): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
    
        // Fazendo a requisição e lidando com erros
        return this.http.post<any>(this.apiUrl, maintenceRequest, { headers, withCredentials: true}).pipe(
            tap(response => console.log("Resposta da API:", response)),
            catchError(error => {
                console.error("Erro na chamada HTTP:", error);
                return throwError(() => new Error("Falha ao criar a solicitação de manutenção."));
            })
        );
    }
    

    updateMaintenanceRecord(id: number, record: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/records/${id}`, record, {withCredentials: true});
    }

    deleteMaintenanceRecord(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/records/${id}`, {withCredentials: true});
    }
}