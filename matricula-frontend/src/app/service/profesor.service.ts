import { Injectable } from '@angular/core';
import { ServerConfig } from '../util/dto/server-config';
import { HttpClient } from '@angular/common/http';
import { ProfesorEntidad } from '../model/profesor-entidad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = ServerConfig.concatBackendAPI('/api/teacher');

  constructor(private httpClient:HttpClient) { }

  getProfesores(): Observable<ProfesorEntidad[]> {
    let url=this.apiUrl+"/list";
    return this.httpClient.get<ProfesorEntidad[]>(url);
  }
  getProfesor(id: number): Observable<ProfesorEntidad> {
    let url=`${this.apiUrl}/byId/${id}`;
    return this.httpClient.get<ProfesorEntidad>(url);
  }
  crearProfesor(profesor: ProfesorEntidad): Observable<ProfesorEntidad> {
    let url=this.apiUrl+"/create";
    return this.httpClient.post<ProfesorEntidad>(url, profesor);
  }
  actualizarProfesor(profesor: ProfesorEntidad): Observable<ProfesorEntidad> {
    let url=this.apiUrl+"/update";
    return this.httpClient.put<ProfesorEntidad>(url, profesor);
  }
  eliminarProfesor(id: number): Observable<Boolean> {
    let url=`${this.apiUrl}/delete/${id}`;
    return this.httpClient.delete<Boolean>(url);
  }
}
