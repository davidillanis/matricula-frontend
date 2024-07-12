import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient:HttpClient) { }
  public async usarApi(fileInputParam: any) {
    const url: string = 'https://api.imgbb.com/1/upload';
    const apiKey: string = 'a3d1b74ce17fdaf5e53592b7bf47cbf2';

    const fileInput: any = fileInputParam;
    const file: File | null = fileInput.files?.[0] || null;

    if (!file) {
      return;
    }

    const formData: FormData = new FormData();
    formData.append('key', apiKey);
    formData.append('image', file);
    formData.append('name', this.randomKey());

    try {
      const response: Response = await fetch(url, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }

      const data: any = await response.json();
      return data;
    } catch (error) {
    }
  }

  private randomKey(){
    let key="";
    for(let i=0; i<9; i++){
      key+=Math.floor(Math.random() * 10);
    }
    return key;
  }

  public subirPDF(body:FormData):Observable<any>{
    return this.httpClient.post(`http://localhost:3000/upload`, body)
  }
}
