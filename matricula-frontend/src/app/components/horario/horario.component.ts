import { Component } from '@angular/core';
import { CursoEntidad } from '../../model/curso-entidad';
import { CursoService } from '../../service/curso.service';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})
export class HorarioComponent {
  cursosList=new Map<String, Set<string>>();
  cursoEntityList:CursoEntidad[]=[];

  constructor(private cursoServicio:CursoService){}

  ngOnInit(): void {
    
    this.cursoServicio.getCursos().forEach(t=>{
      t.forEach(a=>{
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
       
      })
    })
  }

  getCursosFiltroNombre(nombre:string){
    return this.cursoEntityList.filter(c=>c.nombreCurso==nombre);
  }
}
