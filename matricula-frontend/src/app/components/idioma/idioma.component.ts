import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../service/curso.service';
import { CursoEntidad } from '../../model/curso-entidad';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AlertEntityService } from '../../service/alert-entity.service';

@Component({
  selector: 'app-idioma',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './idioma.component.html',
  styleUrl: './idioma.component.css'
})
export class IdiomaComponent implements OnInit{
  cursosList=new Map<String, Set<string>>();
  cursoEntityList:CursoEntidad[]=[];

  constructor(private cursoServicio:CursoService, private alertEntityService:AlertEntityService){}

  ngOnInit(): void {
    
    this.cursoServicio.getCursos().forEach(t=>{
      t.forEach(a=>{
        if(a.habilitado){
          this.cursoEntityList.push(a);
          let array=this.cursosList.get(a.nombreCurso);
          if(array!=undefined){
            array.add(a.nivel+"");
            this.cursosList.set(a.nombreCurso, array);
          }
          else{
            let niveles=new Set<string>();
            niveles.add(a.nivel+"");
            this.cursosList.set(a.nombreCurso, niveles);
          }
        }
      })
    })
  }

  getConcatenatedLevels(key: string): string {
    const niveles = this.cursosList.get(key);
    return niveles ? Array.from(niveles).join('-') : '';
  }

  getImageUrl(course:string){
    let url;
    for(let c of this.cursoEntityList){
      if(c.nombreCurso+""==course){
        url=c.url+"";
        break;
      }
    }

    return url;
  }

  getCursosFiltroNombre(nombre:string){
    return this.cursoEntityList.filter(c=>c.nombreCurso==nombre);
  }

  formatFecha(fecha:string){
    let nuevo='';
    for(let i=0; i<fecha.length; i++){
      if(fecha[i]!=','){
        nuevo+=fecha[i];
      }else{
        nuevo+='-';
      }
    }
    return nuevo;
  }

  modalCurso(idCurso:number){
    this.cursoServicio.getCurso(idCurso).subscribe(entidad=>{
      this.alertEntityService.modalCurso(entidad);
    })
  }
}
