import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MaintenanceService {

    private apiUrl = 'https://api.example.com/maintenance';

    constructor(private http: HttpClient) { }

    getMaintenanceRecords(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/records`);
    }

    getMaintenanceRecordById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/records/${id}`);
    }

    createMaintenanceRecord(record: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/records`, record);
    }

    updateMaintenanceRecord(id: number, record: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/records/${id}`, record);
    }

    deleteMaintenanceRecord(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/records/${id}`);
    }
}