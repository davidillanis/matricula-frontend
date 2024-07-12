import { Component, Inject, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { EMatricula, MatriculaEntidad } from '../../../model/matricula-entidad';
import { MatriculaService } from '../../../service/matricula.service';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EstudianteEntidad } from '../../../model/estudiante-entidad';
import { CursoEntidad } from '../../../model/curso-entidad';

@Component({
  selector: 'app-admin-solicitud',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatTableModule,
    MatDividerModule,
    MatIconModule,
    MatDialogTitle, 
    MatDialogContent,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './admin-solicitud.component.html',
  styleUrl: './admin-solicitud.component.css'
})
export class AdminSolicitudComponent implements OnInit{
  ELEMENT_DATA: MatriculaEntidad[] = []
  displayedColumns: string[] = ['id','name', 'symbol', 'cursos', 'archivo', 'accion'];
  dataToDisplay = [this.ELEMENT_DATA];
  dataSource = new ExampleDataSource(this.ELEMENT_DATA);
  
  constructor(private matriculaServicio:MatriculaService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.actualizarDatos();
  }

  actualizarDatos(){
    this.ELEMENT_DATA=[];
    this.matriculaServicio.getMatriculas().subscribe(t=>{
      t.forEach(entidad=>{
        if(entidad.estado==EMatricula.PENDIENTE){
          this.ELEMENT_DATA.push(entidad);
        }
      })
      this.dataSource.setData(this.ELEMENT_DATA);
    });
  }

  aceptarSolicitud(idMatricula:number) {
    Swal.fire({
      title: "Desea Aceptar la Solicitud?",
      showCancelButton: true,
      icon:'question',
      confirmButtonText: "Confimar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.matriculaServicio.getMatricula(idMatricula).subscribe(entidad=>{
          entidad.estado=EMatricula.CONFIRMADA;
          this.matriculaServicio.actualizarMatricula(entidad).subscribe(()=>{
            this.actualizarDatos();
            Swal.fire("Solicitud aceptada!", "", "success");
          });
        })
      }
    });
  }

  rechazarSolicitud(idMatricula:number) {
    Swal.fire({
      title: "Desea Rechazar la Solicitud?",
      showCancelButton: true,
      icon:'info',
      confirmButtonText: "Confimar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.matriculaServicio.getMatricula(idMatricula).subscribe(entidad=>{
          entidad.estado=EMatricula.CONFIRMADA;
          this.matriculaServicio.actualizarMatricula(entidad).subscribe(()=>{
            this.actualizarDatos();
            Swal.fire("La solicitud fue Rechazada!", "", "warning");
          });
        })
      }
    });
  }

  modalEstudiante(estudiante:EstudianteEntidad){
    console.log(estudiante);
    Swal.fire({
      html: `
<style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 800px;
            margin: 50px auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
        }
        h1 {
            text-align: center;
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        tr:hover {
            background-color: #f1f1f1;
        }
        .urlDni {
            color: #007BFF;
            text-decoration: none;
        }
        .urlDni:hover {
            text-decoration: underline;
        }
    </style>
    <div class="container">
        <h1>Datos del Estudiante</h1>
        <table>
            <tr>
                <th>Codigo Estudiante</th>
                <td>${estudiante.codigoEstudiante}</td>
            </tr>
            <tr>
                <th>Nombre</th>
                <td>${estudiante.nombre}</td>
            </tr>
            <tr>
                <th>Apellido</th>
                <td>${estudiante.apellido}</td>
            </tr>
            <tr>
                <th>Teléfono</th>
                <td>${estudiante.telefono}</td>
            </tr>
            <tr>
                <th>DNI</th>
                <td>${estudiante.dni}</td>
            </tr>
            <tr>
                <th>Correo Electrónico</th>
                <td>${estudiante.correoElectronico}</td>
            </tr>
            <tr>
                <th>URL DNI</th>
                <td><a href="${estudiante.urlDni}" target="_blank" class="urlDni">Ver DNI</a></td>
            </tr>
        </table>
    </div>
      `,
      showCancelButton: true,
      focusConfirm: false,
    });
  }

  modalCurso(curso:CursoEntidad){
    Swal.fire({
      html: `
  <style>
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
      }
      .container {
          max-width: 800px;
          margin: 50px auto;
          background-color: #fff;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
      }
      h1 {
          text-align: center;
          color: #333;
      }
      table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
      }
      table, th, td {
          border: 1px solid #ddd;
      }
      th, td {
          padding: 12px;
          text-align: left;
      }
      th {
          background-color: #f2f2f2;
      }
      tr:nth-child(even) {
          background-color: #f9f9f9;
      }
      tr:hover {
          background-color: #f1f1f1;
      }
      .url {
          color: #007BFF;
          text-decoration: none;
      }
      .url:hover {
          text-decoration: underline;
      }
  </style>
  <div class="container">
      <img src="${curso.url}" alt="" height="70px">
      <table>
          <tr>
              <th>Nombre del Curso</th>
              <td>${curso.nombreCurso}</td>
          </tr>
          <tr>
              <th>Créditos</th>
              <td>${curso.creditos}</td>
          </tr>
          <tr>
              <th>Nivel</th>
              <td>${curso.nivel}</td>
          </tr>
          <tr>
              <th>Capacidad</th>
              <td>${curso.capacidad}</td>
          </tr>
          <tr>
              <th>Costo del Curso</th>
              <td>${curso.costoCurso}</td>
          </tr>
          <tr>
              <th>Costo del Libro</th>
              <td>${curso.costoLibro}</td>
          </tr>
          <tr>
              <th>Primera Mensualidad</th>
              <td>${curso.primeraMensualidad}</td>
          </tr>
      </table>
  </div>
      `,
      showCancelButton: true,
      focusConfirm: false,
      customClass: {
          popup: 'swal-wide'
      }
  });
  }


  // ##### OTHER #####
  formatFecha(fecha:string){
    let nuevo='';
    for(let i=0; i<fecha.length; i++){
      if(i<fecha.length-1){
        nuevo+=fecha[i]+"-";
      }
      else{
        nuevo+=fecha[i];
      }
    }
    return nuevo;
  }
  openDialog(url:string) {
    this.dialog.open(DialogDataExampleDialog, {data: url});
  }

}


class ExampleDataSource extends DataSource<MatriculaEntidad> {
  private _dataStream = new ReplaySubject<MatriculaEntidad[]>();

  constructor(initialData: MatriculaEntidad[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<MatriculaEntidad[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: MatriculaEntidad[]) {
    this._dataStream.next(data);
  }
}



@Component({
  selector: 'modal-imagen-voucher-solicitud',
  templateUrl: 'modal-imagen-voucher-solicitud.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
