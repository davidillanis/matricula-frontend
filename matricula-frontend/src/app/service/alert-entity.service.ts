import { Injectable } from '@angular/core';
import { ProfesorEntidad } from '../model/profesor-entidad';
import Swal, { SweetAlertPosition } from 'sweetalert2';
import { EstudianteEntidad } from '../model/estudiante-entidad';
import { CursoEntidad } from '../model/curso-entidad';

@Injectable({
  providedIn: 'root'
})
export class AlertEntityService {

  constructor() { }

  modalProfesor(profesor:ProfesorEntidad){
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
        <h1>Datos del Profesor</h1>
        <table>
            <tr>
                <th>Codigo Profesor</th>
                <td>${profesor.idProfesor}</td>
            </tr>
            <tr>
                <th>Nombre</th>
                <td>${profesor.nombre}</td>
            </tr>
            <tr>
                <th>Apellido</th>
                <td>${profesor.apellido}</td>
            </tr>
            <tr>
                <th>Teléfono</th>
                <td>${profesor.telefono}</td>
            </tr>
            <tr>
                <th>Correo Electrónico</th>
                <td>${profesor.correoElectronico}</td>
            </tr>
            <tr>
                <th>Disponible</th>
                <td>${profesor.habilitado}</td>
            </tr>
        </table>
    </div>
      `,
      showCancelButton: true,
      focusConfirm: false,
    });
  }

  modalEstudiante(estudiante:EstudianteEntidad){
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
          
          height: 50vh;
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
          <tr>
              <th>Disponible</th>
              <td>${curso.habilitado}</td>
          </tr>
      </table>
  </div>
      `,
      showCancelButton: false,
      focusConfirm: false,
      customClass: {
          popup: 'swal-wide'
      }
  });
  }

  /**
     * alert success
     * @param title alert title
     * @param text body of alert
     * @param buttonEnable control if visible the button
     * @param timer time of live of the alert
     */
  async alertaSuccess(title: string, text: string, buttonEnable: boolean = true, timer: number = 1500) {
    return  Swal.fire({
      icon: "success",
      title: title,
      text: text,
      showConfirmButton: buttonEnable,
      timer: timer
    });
  }
  /**
   * method for notification alerts
   * @param text text of alert info,
   * @param time alert duration time
   * @param colorText color of text
   * @param backgroundColor backgound color
   * @param postition this postition in web
   */
  async alertaInfo(text: string, time: number = 1200, colorText: string = "#229954", backgroundColor: string = "default", postition: SweetAlertPosition = "bottom-end"): Promise<void> {
    await Swal.fire({
      toast: true,
      
      position: postition,
      color: colorText,
      showConfirmButton: false,
      timer: time,
      background: backgroundColor,
      customClass: {
        popup: 'small-toast',
        icon: 'small-icon',
      },
      html: `
      <div class="small-toast-content">
        <h3>`
        + text +
        `<\h3>
      </div>
    `
    });
  }

  /**
   * alert Error
   * @param title alert title
   * @param body body of the alert error
   * @param footer footer, accept HTML
   */
  alertaError(title: string, body: string, footer: string = '<a href="#">Why do I have this issue?</a>'): void {
    Swal.fire({
      icon: "error",
      title: title,
      text: body,
      footer: footer
    });
  }
}
