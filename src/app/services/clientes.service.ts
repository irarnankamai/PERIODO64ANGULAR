import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../domain/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
 private baseUrl: string = 'http://localhost:8080/demojakarta/rs/cliente'; 

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  saveCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.baseUrl, cliente);
  }

  deleteCliente(cedula: string): Observable<any> {
    const url = `${this.baseUrl}?id=${cedula}`;
    return this.http.delete<any>(url);
  }

  getCliente(cedula: string): Observable<Cliente> {
    const url = `${this.baseUrl}/${cedula}`;
    return this.http.get<Cliente>(url);
  }

  
}
