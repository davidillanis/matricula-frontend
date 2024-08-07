import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoEntidad } from '../model/curso-entidad';
import { ServerConfig } from '../util/dto/server-config';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = ServerConfig.concatBackendAPI('/api/course');

  constructor(private httpClient:HttpClient) { }

  getCursos(): Observable<CursoEntidad[]> {
    let url=this.apiUrl+"/list";
    return this.httpClient.get<CursoEntidad[]>(url);
  }
  getCurso(id: number): Observable<CursoEntidad> {
    let url=`${this.apiUrl}/byId/${id}`;
    return this.httpClient.get<CursoEntidad>(url);
  }
  crearCurso(curso: CursoEntidad): Observable<CursoEntidad> {
    let url=this.apiUrl+"/create";
    return this.httpClient.post<CursoEntidad>(url, curso);
  }
  actualizarCurso(curso: CursoEntidad): Observable<CursoEntidad> {
    let url=this.apiUrl+"/update";
    return this.httpClient.put<CursoEntidad>(url, curso);
  }
  eliminarCurso(id: number): Observable<Boolean> {
    let url=`${this.apiUrl}/delete/${id}`;
    return this.httpClient.delete<Boolean>(url);
  }
}
