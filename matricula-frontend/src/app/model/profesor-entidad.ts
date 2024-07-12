import { CursoEntidad } from "./curso-entidad";

export class ProfesorEntidad {
    idProfesor: number;
    nombre: string;
    apellido: string;
    telefono?: string;
    correoElectronico: string;
    habilitado: boolean;
    cursoEntidadList: CursoEntidad[];

    constructor(
        idProfesor: number,
        nombre: string,
        apellido: string,
        correoElectronico: string,
        habilitado:boolean,
        cursoEntidadList: CursoEntidad[],
        telefono?: string
    ) {
        this.idProfesor = idProfesor;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correoElectronico = correoElectronico;
        this.habilitado=habilitado;
        this.cursoEntidadList = cursoEntidadList;
    }


    static crearConValoresNulos(): ProfesorEntidad {
        return new ProfesorEntidad(0,'','','', true, [], '');
    }
}
