import { CursoEntidad } from "./curso-entidad";
import { EstudianteEntidad } from "./estudiante-entidad";

export enum EMatricula {
    PENDIENTE = 'PENDIENTE',
    CONFIRMADA = 'CONFIRMADA',
    RECHAZADA = 'RECHAZADA'
}

export class MatriculaEntidad {
    idMatricula: number;
    fechaSolicitud: Date;
    estado: EMatricula;
    urlVoucher: string;
    urlPdfMatricula:string;
    urlPdfDeclaracionJurada:string;
    urlPDFCartaCompromiso:string;
    estudianteEntidad: EstudianteEntidad;
    cursoEntidad: CursoEntidad;

    constructor(
        idMatricula: number,
        fechaSolicitud: Date,
        estado: EMatricula,
        urlVoucher:string,
        urlPdfMatricula:string,
        urlPdfDeclaracionJurada:string,
        urlPDFCartaCompromiso:string,
        estudianteEntidad: EstudianteEntidad,
        cursoEntidad: CursoEntidad
    ) {
        this.idMatricula = idMatricula;
        this.fechaSolicitud = fechaSolicitud;
        this.estado = estado;
        this.urlVoucher=urlVoucher;
        this.urlPdfMatricula=urlPdfMatricula;
        this.urlPdfDeclaracionJurada=urlPdfDeclaracionJurada;
        this.urlPDFCartaCompromiso=urlPDFCartaCompromiso;
        this.estudianteEntidad = estudianteEntidad;
        this.cursoEntidad = cursoEntidad;
    }

    static crearConValoresNulos(): MatriculaEntidad {
        return new MatriculaEntidad(0,new Date(),EMatricula.PENDIENTE,'','','','',EstudianteEntidad.crearConValoresNulos(),CursoEntidad.crearConValoresNulos()
        );
    }
}
