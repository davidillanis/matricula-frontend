import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { AdminCursoComponent } from '../admin-comp/admin-curso/admin-curso.component';
import { AdminMatriculaComponent } from '../admin-comp/admin-matricula/admin-matricula.component';
import { AdminProfesorComponent } from '../admin-comp/admin-profesor/admin-profesor.component';
import { AdminSolicitudComponent } from '../admin-comp/admin-solicitud/admin-comp-solicitud.component';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [
    MatSidenavModule, 
    MatIconModule, 
    MatButtonModule, 
    MatListModule, 
    MatButtonToggleModule, 
    AdminCursoComponent, 
    AdminMatriculaComponent,
    AdminProfesorComponent,
    AdminSolicitudComponent
  ],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent implements OnInit{

  constructor(
    private loginService:LoginService,
    private router:Router,
    private activatedRoute: ActivatedRoute
  ){}
  ngOnInit(): void {
    if(!this.loginService.isLogget()){
      this.router.navigate(["/menu"]);
    }
    this.activatedRoute.fragment.subscribe(fragment=>{
      if(fragment=='solicitud'){
        this.adminSolicitud=true;
        this.adminMatricula=false;
        this.adminCurso=false;
        this.adminProfesor=false;
      }
      if(fragment=='matricula'){
        this.adminSolicitud=false;
        this.adminMatricula=true;
        this.adminCurso=false;
        this.adminProfesor=false;
      }
      if(fragment=='curso'){
        this.adminSolicitud=false;
        this.adminMatricula=false;
        this.adminCurso=true;
        this.adminProfesor=false;
      }
      if(fragment=='profesor'){
        this.adminSolicitud=false;
        this.adminMatricula=false;
        this.adminCurso=false;
        this.adminProfesor=true;
      }
    });
  }

  //logica de boton menu
  protected isOpen=true;
  cambiarEstadoNav(){
    this.isOpen=this.isOpen?false:true;
  }

  //logica del los botones obcion
  protected adminSolicitud:boolean=true;
  protected adminMatricula:boolean=false;
  protected adminCurso:boolean=false;
  protected adminProfesor:boolean=false;
  cambiarObcionNav(obcion:number){
    if(obcion==1){
      this.router.navigate(['/admin'], {fragment:'solicitud'});
    }
    if(obcion==2){
      this.router.navigate(['/admin'], {fragment:'matricula'});
    }
    if(obcion==3){
      this.router.navigate(['/admin'], {fragment:'curso'});
    }
    if(obcion==4){
      this.router.navigate(['/admin'], {fragment:'profesor'});
    }
  }


}
