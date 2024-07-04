import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelos
import { Cliente, ClienteID, ClienteOp } from '../Modelos/cliente';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer kevin' // Asumiendo que estás usando el token "kevin"
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Ajusta esto a la URL de tu API Spring Boot

  constructor(private http: HttpClient) { }

  // Obtener todos los clientes
  getClientes(): Observable<ClienteID[]> {
    return this.http.get<ClienteID[]>(`${this.apiUrl}/Client/`, httpOptions);
  }

  // Obtener un cliente por ID
  getCliente(id: number): Observable<ClienteID> {
    return this.http.get<ClienteID>(`${this.apiUrl}/Client/${id}`, httpOptions);
  }

  // Agregar un nuevo cliente
  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/Client/`, cliente, httpOptions);
  }

  // Eliminar un cliente
  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Client/${id}`, httpOptions);
  }

  // Actualizar un cliente
  updateCliente(id: number, cliente: ClienteOp): Observable<any> {
    return this.http.put(`${this.apiUrl}/Client/${id}`, cliente, httpOptions);
  }
}