import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorStateMatcher, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CursoEntidad } from '../../model/curso-entidad';
import { EstudianteEntidad } from '../../model/estudiante-entidad';
import { EMatricula, MatriculaEntidad } from '../../model/matricula-entidad';
import { CursoService } from '../../service/curso.service';
import { EstudianteService } from '../../service/estudiante.service';
import { ImageService } from '../../service/image.service';
import { MatriculaService } from '../../service/matricula.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-matricula',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
  templateUrl: './matricula.component.html',
  styleUrl: './matricula.component.css'
})
export class MatriculaComponent {
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
    email: new FormControl("", [Validators.required, Validators.email]),
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
    return this.cursoEntityList.filter(c => c.nombreCurso == nombre && c.habilitado);
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
          //exist student¡
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
  }

  async limpiarCampos(urlVoucher: string, estudiante: EstudianteEntidad, urlPdfMatricula:string, urlPdfDeclaracionJurada:string, urlPdfCartaCompromiso:string, urlDni:string) {
    //exist student
    if (this.cursosSolicitados.length > 0) {
      estudiante.urlDni=urlDni;
      this.estudianteServicio.getEstudianteByDNI(estudiante.dni).subscribe(entidad=>{
        this.estudianteServicio.actualizarEstudiante(entidad).subscribe();
        for (let c of this.cursosSolicitados) {
          this.matriculaServicio.crearMatricula(new MatriculaEntidad(0, new Date(), EMatricula.PENDIENTE, urlVoucher, urlPdfMatricula, urlPdfDeclaracionJurada, urlPdfCartaCompromiso, entidad, c)).subscribe();
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

      //location.reload();
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

