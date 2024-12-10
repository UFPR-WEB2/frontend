import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRepair } from '../../models/repair.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RepairService {
  private apiUrl = `${environment.apiUrl}/repair`;

  constructor(private http: HttpClient) {}

  getAllRepairs(): Observable<IRepair[]> {
    return this.http.get<IRepair[]>(this.apiUrl);
  }

  getRepairById(id: number): Observable<IRepair> {
    return this.http.get<IRepair>(`${this.apiUrl}/${id}`);
  }

  createRepair(repair: IRepair): Observable<IRepair> {
    console.log(this.apiUrl)
    return this.http.post<IRepair>(this.apiUrl, repair, {withCredentials: true});
  }

  updateRepair(id: number, repair: IRepair): Observable<IRepair> {
    return this.http.put<IRepair>(`${this.apiUrl}/${id}`, repair);
  }

  deleteRepair(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
