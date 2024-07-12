import { Injectable } from '@angular/core';
import { ServerConfig } from '../util/dto/server-config';
import { HttpClient } from '@angular/common/http';
import { MatriculaEntidad } from '../model/matricula-entidad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  private apiUrl = ServerConfig.concatBackendAPI('/api/tuition');

  constructor(private httpClient:HttpClient) { }

  getMatriculas(): Observable<MatriculaEntidad[]> {
    let url=this.apiUrl+"/list";
    return this.httpClient.get<MatriculaEntidad[]>(url);
  }
  getMatricula(id: number): Observable<MatriculaEntidad> {
    let url=`${this.apiUrl}/byId/${id}`;
    return this.httpClient.get<MatriculaEntidad>(url);
  }
  crearMatricula(matricula: MatriculaEntidad): Observable<MatriculaEntidad> {
    let url=this.apiUrl+"/create";
    return this.httpClient.post<MatriculaEntidad>(url, matricula);
  }
  actualizarMatricula(matricula: MatriculaEntidad): Observable<MatriculaEntidad> {
    let url=this.apiUrl+"/update";
    return this.httpClient.put<MatriculaEntidad>(url, matricula);
  }
  eliminarMatricula(id: number): Observable<Boolean> {
    let url=`${this.apiUrl}/delete/${id}`;
    return this.httpClient.delete<Boolean>(url);
  }
}
