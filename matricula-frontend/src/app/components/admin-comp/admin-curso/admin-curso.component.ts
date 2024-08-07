import { DataSource } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { CursoEntidad } from '../../../model/curso-entidad';
import { ProfesorEntidad } from '../../../model/profesor-entidad';
import { AlertEntityService } from '../../../service/alert-entity.service';
import { CursoService } from '../../../service/curso.service';
import { ProfesorService } from '../../../service/profesor.service';

@Component({
  selector: 'app-admin-curso',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatDividerModule, MatIconModule, MatDialogModule],
  templateUrl: './admin-curso.component.html',
  styleUrl: './admin-curso.component.css'
})
export class AdminCursoComponent {
  ELEMENT_DATA: CursoEntidad[] = [];
  displayedColumns: string[] = ['nombre', 'nivel', 'capacidad', 'fechaInicio', 'fechaFin', 'profesor', 'accion'];
  dataToDisplay = [this.ELEMENT_DATA];
  dataSource = new ExampleDataSource(this.ELEMENT_DATA);

  constructor(private cursoServicio: CursoService, private alertEntityService:AlertEntityService) { }
  ngOnInit(): void {
    this.actualizarDatos();
  }
  actualizarDatos(){
    this.ELEMENT_DATA = [];
    this.cursoServicio.getCursos().subscribe(t => {
      t.forEach(entidad => {  
        this.ELEMENT_DATA.push(entidad);
      })
      this.dataSource.setData(this.ELEMENT_DATA);
    });
  }

  readonly dialog = inject(MatDialog);
  agregarNuevoCurso(){
    this.dialog.open(DialogContentExampleDialog, {data: CursoEntidad.crearConValoresNulos()});
  }
  editarCurso(idCurso:number){
    this.cursoServicio.getCurso(idCurso).subscribe(entidad=>{
      entidad.fechaInicio=this.formatFechaDate(entidad.fechaInicio+"");
      entidad.fechaFinalizacion=this.formatFechaDate(entidad.fechaFinalizacion+"");
      this.dialog.open(DialogContentExampleDialog, {data: entidad});
    });
  }
  desabilitarCurso(idCurso:number, estado:boolean){
    this.cursoServicio.getCurso(idCurso).subscribe(entidad=>{
      entidad.habilitado=estado;
      this.cursoServicio.actualizarCurso(entidad).subscribe(entidad2=>this.actualizarDatos());
      if(estado){
        this.alertEntityService.alertaInfo("Se a habilitado el curso de "+entidad.nombreCurso+"-"+entidad.nivel, 2000, "green", "white", 'top-right');
      }else{
        this.alertEntityService.alertaInfo("Se a deshabilitado el curso de "+entidad.nombreCurso+"-"+entidad.nivel, 2000, "red", "white", 'top-right');
      }
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
  formatFechaDate(str: string): Date {
    const partes: string[] = str.split(',');  
    if (partes.length !== 3) {
      console.error('El formato de entrada no es válido');
      return new Date();
    }
    const año: number = parseInt(partes[0], 10);
    const mes: number = parseInt(partes[1], 10) - 1; // Restar 1 al mes porque en JavaScript los meses van de 0 a 11
    const dia: number = parseInt(partes[2], 10);
    if (isNaN(año) || isNaN(mes) || isNaN(dia)) {
      console.error('Uno o más valores no son números válidos');
      return new Date();
    }
    return new Date(año, mes, dia);
  }

  modalProfesor(profesor:ProfesorEntidad){
    this.alertEntityService.modalProfesor(profesor);
  }
}

class ExampleDataSource extends DataSource<CursoEntidad> {
  private _dataStream = new ReplaySubject<CursoEntidad[]>();

  constructor(initialData: CursoEntidad[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<CursoEntidad[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: CursoEntidad[]) {
    this._dataStream.next(data);
  }
}


import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ImageService } from '../../../service/image.service';
@Component({
  selector: 'admin-curso-guardar',
  styleUrl: 'admin-curso-guardar.css',
  templateUrl: 'admin-curso-guardar.html',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog implements OnInit{
  cursoForm: FormGroup;
  profesorList:ProfesorEntidad[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public curso: CursoEntidad, 
    private fb: FormBuilder,
    private profesorService:ProfesorService,
    private cursoService:CursoService,
    private alertEntityService:AlertEntityService,
    private imagenService:ImageService
  ) {
    this.cursoForm = this.fb.group({
      nombreCurso: [curso.nombreCurso, [Validators.required, Validators.maxLength(45)]],
      descripcion: [curso.descripcion, [Validators.maxLength(1000)]],
      creditos: [curso.creditos, Validators.required],
      duracion: [curso.duracion, [Validators.maxLength(45)]],
      horario: [curso.horario, [Validators.maxLength(95)]],
      nivel: [curso.nivel, [Validators.maxLength(45)]],
      capacidad: [curso.capacidad, Validators.required],
      url: [curso.url, [Validators.maxLength(255)]],
      costoCurso: [curso.costoCurso, Validators.required],
      costoLibro: [curso.costoLibro, Validators.required],
      primeraMensualidad: [curso.primeraMensualidad, Validators.required],
      fechaInicio: [curso.fechaInicio, Validators.required],
      fechaFinalizacion: [curso.fechaFinalizacion, Validators.required],
      profesorEntidad: [curso.profesorEntidad.idProfesor, Validators.required]
    });
  }
  ngOnInit(): void {
    this.profesorService.getProfesores().forEach(t=>{
      t.forEach(entidad=>{
        if(entidad.habilitado){
          this.profesorList.push(entidad)
        }
      })
    });
  }

  async guardarDatos() {
    if (this.cursoForm.valid && this.cursoForm.value['profesorEntidad']!=0) {
      this.curso.nombreCurso=this.cursoForm.value['nombreCurso'];
      this.curso.descripcion=this.cursoForm.value['descripcion'];
      this.curso.creditos=this.cursoForm.value['creditos'];
      this.curso.duracion=this.cursoForm.value['duracion'];
      this.curso.horario=this.cursoForm.value['horario'];
      this.curso.nivel=this.cursoForm.value['nivel'];
      this.curso.capacidad=this.cursoForm.value['capacidad'];
      this.curso.fechaInicio=this.cursoForm.value['fechaInicio'];
      this.curso.fechaFinalizacion=this.cursoForm.value['fechaFinalizacion'];
      this.curso.costoCurso=this.cursoForm.value['costoCurso'];
      this.curso.primeraMensualidad=this.cursoForm.value['primeraMensualidad'];

      if( this.fileImagenCurso!=undefined){
        const body1 = new FormData();
        body1.append('myFile', this.fileImagenCurso.fileRaw, this.fileImagenCurso.fileName);
        const res1 = await this.imagenService.subirPDF(body1).toPromise();
        this.curso.url = res1['url'];
      }
      
      //this.curso.matriculaEntidadList=this.cursoForm.value['nombreCurso'];
      let entidad=ProfesorEntidad.crearConValoresNulos();
      entidad.idProfesor=this.cursoForm.value['profesorEntidad'];
      this.curso.profesorEntidad=entidad;
      
      if(this.curso.idCurso==0){
        this.cursoService.crearCurso(this.curso).subscribe();
      }else{
        this.cursoService.actualizarCurso(this.curso).subscribe();
      }
      this.alertEntityService.alertaInfo('Curso agregado correctamente', 3600, 'green', 'white');
      location.reload();
    }else{
      this.alertEntityService.alertaInfo('Llene correctament los campos', 3600, 'red', 'white');
    }
  }

  modalProfesor(idProfesor:number){
    this.profesorService.getProfesor(idProfesor).subscribe(entidad=>this.alertEntityService.modalProfesor(entidad));
  }

  private fileImagenCurso: any;
  cargarImagenCurso($event: any) {
    const [file] = $event.target.files;
    this.fileImagenCurso = {
      fileRaw: file,
      fileName: file.name
    }
  }
}