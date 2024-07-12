import { MatriculaEntidad } from "./matricula-entidad";

export class EstudianteEntidad {
    idEstudiante: number;
    codigoEstudiante: string;
    nombre: string;
    apellido: string;
    telefono?: string;
    dni: string;
    correoElectronico: string;
    urlDni:string;
    matriculaEntidadList: MatriculaEntidad[]|null;

    constructor(
        idEstudiante: number,
        codigoEstudiante: string,
        nombre: string,
        apellido: string,
        dni: string,
        correoElectronico: string,
        urlDni:string,
        matriculaEntidadList: MatriculaEntidad[]|null,
        telefono?: string
    ) {
        this.idEstudiante = idEstudiante;
        this.codigoEstudiante = codigoEstudiante;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.dni = dni;
        this.urlDni=urlDni;
        this.correoElectronico = correoElectronico;
        this.matriculaEntidadList = matriculaEntidadList;
    }

    static crearConValoresNulos(): EstudianteEntidad {
        return new EstudianteEntidad(0,'','','','','','',[],'');
    }
}
