import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PasswordResetRequest } from '../../models/password-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const credentialsJson = JSON.stringify(credentials);

    return this.http.post<any>(`${this.apiUrl}/login`, credentialsJson, { headers, observe: 'response', withCredentials: true });

  }

  getSession(): Observable<any> {
    return this.http.post(`${this.apiUrl}/getSession`, {}, { observe: 'response', withCredentials: true });
  
  }

  requestPasswordReset(request: PasswordResetRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/password-reset`, request);
  }
}
