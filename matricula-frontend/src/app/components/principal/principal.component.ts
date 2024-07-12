import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CursoEntidad } from '../../model/curso-entidad';
import { CursoService } from '../../service/curso.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit{
  cursosList=new Map<String, Set<string>>();
  cursoEntityList:CursoEntidad[]=[];

  constructor(private cursoServicio:CursoService){}

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

  getConcatenarNivelCurso(key: string): string {
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
}
