import { DataSource } from '@angular/cdk/collections';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import Swal from 'sweetalert2';
import { CursoEntidad } from '../../../model/curso-entidad';
import { EstudianteEntidad } from '../../../model/estudiante-entidad';
import { EMatricula, MatriculaEntidad } from '../../../model/matricula-entidad';
import { MatriculaService } from '../../../service/matricula.service';

@Component({
  selector: 'app-admin-matricula',
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
  templateUrl: './admin-matricula.component.html',
  styleUrl: './admin-matricula.component.css'
})
export class AdminMatriculaComponent {
  ELEMENT_DATA: MatriculaEntidad[] = []
  displayedColumns: string[] = ['id','name', 'symbol', 'cursos', 'archivo'];
  dataToDisplay = [this.ELEMENT_DATA];
  dataSource = new ExampleDataSource(this.ELEMENT_DATA);
  
  constructor(private matriculaServicio:MatriculaService, private dialog: MatDialog, private alertEntityService:AlertEntityService){}

  ngOnInit(): void {
    this.actualizarDatos();
  }

  actualizarDatos(){
    this.ELEMENT_DATA=[];
    this.matriculaServicio.getMatriculas().subscribe(t=>{
      t.forEach(entidad=>{
        if(entidad.estado==EMatricula.CONFIRMADA){
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
    this.alertEntityService.modalEstudiante(estudiante);
  }

  modalCurso(curso:CursoEntidad){
    this.alertEntityService.modalCurso(curso);
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
  mostrarImagenVoucher(url:string) {
    this.dialog.open(ModalImagenVoucher, {data: url});
  }

  NuevaMatricua(){
    this.dialog.open(ModalMatricular);
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
  selector: 'dialog-data-example-dialog',
  templateUrl: 'modal-imagen-voucher.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
})
export class ModalImagenVoucher {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}



import { JsonPipe } from '@angular/common';
import { signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';

import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AlertEntityService } from '../../../service/alert-entity.service';
import { CursoService } from '../../../service/curso.service';
import { EstudianteService } from '../../../service/estudiante.service';
import { ImageService } from '../../../service/image.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'modal-imagen-matricular.html',
  styleUrl: 'modal-imagen-matricular.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatDividerModule,
    JsonPipe,
    MatCheckboxModule
  ],
})
export class ModalMatricular {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  matcher = new MyErrorStateMatcher();

  estudinteControl = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')]),
    codigo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });


  protected loadImage(idFile: string, idImg: string, $event:any) {
    const input = document.getElementById(idFile) as HTMLInputElement;
    const preview = document.getElementById(idImg) as HTMLImageElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === 'string') {
          preview.src = e.target.result;
        }
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      preview.src = '';
    }

    if(idFile=='fileDNI'){
      this.cargarImagenDNI($event);
    }
    else if(idFile=='file'){
      this.cargarImagenVoucher($event);
    }
  }

  step = signal(0);

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update(i => i + 1);
  }

  prevStep() {
    this.step.update(i => i - 1);
  }



  // ------------------------------------------- LOGIC -------------------------------------------
  cursosList = new Map<String, Set<string>>();
  cursoEntityList: CursoEntidad[] = [];

  constructor(
    private cursoServicio: CursoService,
    private estudianteServicio: EstudianteService,
    private matriculaServicio: MatriculaService,
    private toastrServicio: ToastrService,
    private imagenService: ImageService
  ) { }

  ngOnInit(): void {

    this.cursoServicio.getCursos().forEach(t => {
      t.forEach(a => {
        this.cursoEntityList.push(a);
        let array = this.cursosList.get(a.nombreCurso);
        if (array != undefined) {
          array.add(a.nivel + "");
          this.cursosList.set(a.nombreCurso, array);
        }
        else {
          let niveles = new Set<string>();
          niveles.add(a.nivel + "");
          this.cursosList.set(a.nombreCurso, niveles);
        }

      })
    })
  }
  getCursosFiltroNombre(nombre: string) {
    return this.cursoEntityList.filter(c => c.nombreCurso == nombre);
  }


  cursosSolicitados: CursoEntidad[] = []
  agregarCurso(curso: CursoEntidad, isChecked: boolean) {
    if (isChecked) {
      //add
      this.cursosSolicitados.push(curso);
    } else {
      //delete
      const index = this.cursosSolicitados.findIndex(c => c.idCurso === curso.idCurso);
      if (index !== -1) {
        this.cursosSolicitados.splice(index, 1);
      }
    }

  }
  async solicitarMatriculEstudiante() {
    this.toastrServicio.toastrConfig.positionClass = "toast-bottom-right";

    //IMAGES AND PDF
    let urlVoucher = "";
    let urlDni = "";

    let urlPdfMatricula = "";
    let urlPdfDeclaracionJurada = "";
    let urlPDFCartaCompromiso = "";
    //await this.imagenService.usarApi2(document.getElementById('file')).then(t => { urlVoucher = t['data']['url']; });
    //await this.imagenService.usarApi2(document.getElementById('fileDNI')).then(t => { urlDni = t['data']['url']; });
    const bodyImg1 = new FormData();
    bodyImg1.append('myFile', this.fileTmpVoucher.fileRaw, this.fileTmpVoucher.fileName);
    const resImg1 = await this.imagenService.subirPDF(bodyImg1).toPromise();
    urlVoucher = resImg1['url'];

    const bodyImg2 = new FormData();
    bodyImg2.append('myFile', this.fileTmpDNI.fileRaw, this.fileTmpDNI.fileName);
    const resImg2 = await this.imagenService.subirPDF(bodyImg2).toPromise();
    urlDni = resImg2['url'];

    // ---- SUBIR PDF SERVIDOR

    const body1 = new FormData();
    body1.append('myFile', this.fileTmpMatricula.fileRaw, this.fileTmpMatricula.fileName);
    const res1 = await this.imagenService.subirPDF(body1).toPromise();
    urlPdfMatricula = res1['url'];

    const body2 = new FormData();
    body2.append('myFile', this.fileTmpDeclaracionJurada.fileRaw, this.fileTmpDeclaracionJurada.fileName);
    const res2 = await this.imagenService.subirPDF(body2).toPromise();
    urlPdfDeclaracionJurada = res2['url'];

    const body3 = new FormData();
    body3.append('myFile', this.fileTmpCartaCompromiso.fileRaw, this.fileTmpCartaCompromiso.fileName);
    const res3 = await this.imagenService.subirPDF(body3).toPromise();
    urlPDFCartaCompromiso = res3['url'];


    if (this.estudinteControl.valid) {

      let estudiante: EstudianteEntidad = new EstudianteEntidad(
        0,
        this.estudinteControl.value.codigo + "",
        this.estudinteControl.value.nombre + "",
        this.estudinteControl.value.apellido + "",
        this.estudinteControl.value.dni + "",
        this.estudinteControl.value.email + "",
        urlDni,
        null,
        this.estudinteControl.value.telefono + ""
      );
      this.estudianteServicio.getEstudianteByDNI(estudiante.dni).subscribe(
        t => {
          //exist student
          this.limpiarCampos(urlVoucher, t, urlPdfMatricula, urlPdfDeclaracionJurada, urlPDFCartaCompromiso, urlDni);
        },
        error => {
          //not exist student
          this.estudianteServicio.crearEstudiante(estudiante).subscribe(
            data => {
              this.limpiarCampos(urlVoucher, estudiante, urlPdfMatricula, urlPdfDeclaracionJurada, urlPDFCartaCompromiso, urlDni);
            },
            error => { console.log('data error', error); }
          );
        }
      );

    } else {
      this.toastrServicio.error('Algo salio mal', 'Error');
    }


    // Mostrar alerta de éxito
  }

  limpiarCampos(urlVoucher: string, estudiante: EstudianteEntidad, urlPdfMatricula:string, urlPdfDeclaracionJurada:string, urlPdfCartaCompromiso:string, urlDni:string) {
    //exist student
    if (this.cursosSolicitados.length > 0) {
      estudiante.urlDni=urlDni;

      this.estudianteServicio.getEstudianteByDNI(estudiante.dni).subscribe(entidad=>{
        this.estudianteServicio.actualizarEstudiante(entidad).subscribe();
        for (let c of this.cursosSolicitados) {
          this.matriculaServicio.crearMatricula(new MatriculaEntidad(0, new Date(), EMatricula.CONFIRMADA, urlVoucher, urlPdfMatricula, urlPdfDeclaracionJurada, urlPdfCartaCompromiso, entidad, c)).subscribe();
        }
      });

      this.toastrServicio.success('Solicitud enviada', 'Éxito');

      this.estudinteControl = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        apellido: new FormControl('', [Validators.required]),
        dni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')]),
        codigo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
        telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9}$')]),
        email: new FormControl('', [Validators.required, Validators.email]),
      });

      location.reload();
    } else {
      this.toastrServicio.error('No has agregado cursos', 'Error');
    }

  }


  ///  PDF
  private fileTmpMatricula: any;
  private fileTmpCartaCompromiso: any;
  private fileTmpDeclaracionJurada: any;
  private fileTmpDNI: any;
  private fileTmpVoucher: any;

  cargarPDFMatricula($event: any) {
    const [file] = $event.target.files;
    this.fileTmpMatricula = {
      fileRaw: file,
      fileName: file.name
    }
  }
  cargarPDFCartaCompromiso($event: any) {
    const [file] = $event.target.files;
    this.fileTmpCartaCompromiso = {
      fileRaw: file,
      fileName: file.name
    }
  }
  cargarPDFDeclaracionJurada($event: any) {
    const [file] = $event.target.files;
    this.fileTmpDeclaracionJurada = {
      fileRaw: file,
      fileName: file.name
    }
  }
  cargarImagenDNI($event: any){
    const [file] = $event.target.files;
    this.fileTmpDNI = {
      fileRaw: file,
      fileName: file.name
    }
  }

  cargarImagenVoucher($event: any){
    const [file] = $event.target.files;
    this.fileTmpVoucher = {
      fileRaw: file,
      fileName: file.name
    }
  }
}
