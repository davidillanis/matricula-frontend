import { MatriculaEntidad } from "./matricula-entidad";
import { ProfesorEntidad } from "./profesor-entidad";

export class CursoEntidad {
    idCurso: number;
    nombreCurso: string;
    descripcion?: string;
    creditos?: number;
    duracion?: string;
    horario?: string;
    nivel?: string;
    capacidad?: number;
    fechaInicio?: Date;
    fechaFinalizacion?: Date;
    habilitado: boolean;
    costoCurso?:number;
    costoLibro?:number;
    primeraMensualidad?:number;
    url?:string;
    matriculaEntidadList: MatriculaEntidad[] ;
    profesorEntidad: ProfesorEntidad ;

    constructor(
        idCurso: number,
        nombreCurso: string,
        habilitado: boolean,
        profesorEntidad: ProfesorEntidad,
        matriculaEntidadList: MatriculaEntidad[],
        descripcion?: string,
        creditos?: number,
        duracion?: string,
        horario?: string,
        nivel?: string,
        capacidad?: number,
        url?:string,
        costoCurso?:number,
        costoLibro?:number,
        primeraMensualidad?:number,
        fechaInicio?: Date,
        fechaFinalizacion?: Date,
    ) {
        this.idCurso = idCurso;
        this.nombreCurso = nombreCurso;
        this.descripcion = descripcion;
        this.creditos = creditos;
        this.duracion = duracion;
        this.horario = horario;
        this.nivel = nivel;
        this.capacidad = capacidad;
        this.costoLibro=costoLibro;
        this.costoCurso=costoCurso;
        this.primeraMensualidad=primeraMensualidad;
        this.url=url;
        this.fechaInicio = fechaInicio;
        this.fechaFinalizacion = fechaFinalizacion;
        this.matriculaEntidadList = matriculaEntidadList;
        this.profesorEntidad = profesorEntidad;
        this.habilitado=habilitado;
    }


    static crearConValoresNulos(): CursoEntidad {
        return new CursoEntidad(0,'', true,ProfesorEntidad.crearConValoresNulos(),[],'',0,'','','',0,'',0,0,0,new Date(),new Date());
    }
}
