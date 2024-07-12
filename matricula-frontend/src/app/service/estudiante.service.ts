import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from '../util/dto/server-config';
import { EstudianteEntidad } from '../model/estudiante-entidad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = ServerConfig.concatBackendAPI('/api/student');

  constructor(private httpClient:HttpClient) { }

  getEstudiantes(): Observable<EstudianteEntidad[]> {
    let url=this.apiUrl+"/list";
    return this.httpClient.get<EstudianteEntidad[]>(url);
  }
  getEstudiante(id: number): Observable<EstudianteEntidad> {
    let url=`${this.apiUrl}/byId/${id}`;
    return this.httpClient.get<EstudianteEntidad>(url);
  }
  getEstudianteByDNI(dni: string): Observable<EstudianteEntidad> {
    let url=`${this.apiUrl}/byDni/${dni}`;
    return this.httpClient.get<EstudianteEntidad>(url);
  }
  crearEstudiante(curso: EstudianteEntidad): Observable<EstudianteEntidad> {
    let url=this.apiUrl+"/create";
    return this.httpClient.post<EstudianteEntidad>(url, curso);
  }
  actualizarEstudiante(curso: EstudianteEntidad): Observable<EstudianteEntidad> {
    let url=this.apiUrl+"/update";
    return this.httpClient.put<EstudianteEntidad>(url, curso);
  }
  eliminarEstudiante(id: number): Observable<Boolean> {
    let url=`${this.apiUrl}/delete/${id}`;
    return this.httpClient.delete<Boolean>(url);
  }
}
