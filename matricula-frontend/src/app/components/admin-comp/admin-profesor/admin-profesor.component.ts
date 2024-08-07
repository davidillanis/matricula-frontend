import { DataSource } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { CursoEntidad } from '../../../model/curso-entidad';
import { ProfesorEntidad } from '../../../model/profesor-entidad';
import { AlertEntityService } from '../../../service/alert-entity.service';
import { ProfesorService } from '../../../service/profesor.service';


@Component({
  selector: 'app-admin-profesor',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatMenuModule],
  templateUrl: './admin-profesor.component.html',
  styleUrl: './admin-profesor.component.css'
})
export class AdminProfesorComponent {
  ELEMENT_DATA: ProfesorEntidad[] = []
  displayedColumns: string[] = ['nombre', 'nivel', 'capacidad', 'fechaInicio', 'fechaFin', 'accion'];
  dataToDisplay = [this.ELEMENT_DATA];
  dataSource = new ExampleDataSource(this.ELEMENT_DATA);

  constructor(private profesorServicio: ProfesorService, private alertServiceEntity:AlertEntityService) { }
  ngOnInit(): void {
    this.actualizarDatos();
  }

  actualizarDatos(){
    this.ELEMENT_DATA=[];
    this.profesorServicio.getProfesores().subscribe(t => {
      t.forEach(entidad => {
        this.ELEMENT_DATA.push(entidad);
      })
      this.dataSource.setData(this.ELEMENT_DATA);
    });
  }

  // ##### OTHER #####
  formatFecha(fecha: string) {
    let nuevo = '';
    for (let i = 0; i < fecha.length; i++) {
      if (i<fecha.length-1) {
        nuevo += fecha[i]+"-";
      } else {
        nuevo += fecha[i];
      }
    }
    return nuevo;
  }

  modalCurso(curso:CursoEntidad){
    this.alertServiceEntity.modalCurso(curso);
  }

  readonly dialog = inject(MatDialog);
  agregarNuevoProfesor(){
    this.dialog.open(AdminProfesorGuardar, {data: ProfesorEntidad.crearConValoresNulos()});
  }
  editarProfesor(idProfesor:number){
    this.profesorServicio.getProfesor(idProfesor).subscribe(entidad=>{
      this.dialog.open(AdminProfesorGuardar, {data: entidad});
    });
  }

  desabilitarProfesor(idProfesor:number, estado:boolean){
    this.profesorServicio.getProfesor(idProfesor).subscribe(entidad=>{
      entidad.habilitado=estado;
      this.profesorServicio.actualizarProfesor(entidad).subscribe(data=>{this.actualizarDatos()});
      if(estado){
        this.alertServiceEntity.alertaInfo("Se a habilitado el curso de "+entidad.nombre, 2000, "green", "white", 'top-right');
      }else{
        this.alertServiceEntity.alertaInfo("Se a deshabilitado el curso de "+entidad.nombre, 2000, "red", "white", 'top-right');
      }
    })
  }
}

class ExampleDataSource extends DataSource<ProfesorEntidad> {
  private _dataStream = new ReplaySubject<ProfesorEntidad[]>();

  constructor(initialData: ProfesorEntidad[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<ProfesorEntidad[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: ProfesorEntidad[]) {
    this._dataStream.next(data);
  }
}



import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'admin-profesor-guardar.html',
  styleUrl: 'admin-profesor-guardar.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProfesorGuardar {
  profesorForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public profesor: ProfesorEntidad,
    private fb: FormBuilder,
    private profesorServicio:ProfesorService,
    private alertEntityService:AlertEntityService
  ){
    this.profesorForm = this.fb.group({
      nombre: [profesor.nombre, [Validators.required, Validators.maxLength(45)]],
      apellido: [profesor.apellido, [Validators.required, Validators.maxLength(45)]],
      telefono: [profesor.telefono, [Validators.maxLength(15)]],
      correoElectronico: [profesor.correoElectronico, [Validators.required, Validators.email, Validators.maxLength(95)]],
      habilitado: [true]
    });
  }

  guardarDatos(){
    if (this.profesorForm.valid){
      this.profesor.nombre=this.profesorForm.value['nombre'];
      this.profesor.apellido=this.profesorForm.value['apellido'];
      this.profesor.telefono=this.profesorForm.value['telefono'];
      this.profesor.correoElectronico=this.profesorForm.value['correoElectronico'];
      this.profesor.habilitado=this.profesorForm.value['habilitado'];
      
      if(this.profesor.idProfesor!=0){
        this.profesorServicio.actualizarProfesor(this.profesor).subscribe();
      }else{
        this.profesorServicio.crearProfesor(this.profesor).subscribe();
      }
      this.alertEntityService.alertaInfo('Profesor agregado correctamente', 3600, 'green', 'white');
      location.reload();
    }else{
      this.alertEntityService.alertaInfo('Llene correctament los campos', 3600, 'red', 'white');
      
    }
  }
}