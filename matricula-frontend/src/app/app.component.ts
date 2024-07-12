import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { CursoEntidad } from './model/curso-entidad';
import { CursoService } from './service/curso.service';
import { LoginService } from './service/login.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'matricula-frontend';
  mobileMenuOpen=false;
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  

  cursosList=new Map<String, Set<string>>();
  cursoEntityList:CursoEntidad[]=[];

  constructor(private cursoServicio:CursoService, private loginService:LoginService){}

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

  concaternarURL(idoma:string){
    return '/idioma#'+idoma;
  }


  isLogin(){
    return this.loginService.isLogget();
  }
  logOut(){
    window.location.href='/admin';
    this.loginService.logout();
  }
}
