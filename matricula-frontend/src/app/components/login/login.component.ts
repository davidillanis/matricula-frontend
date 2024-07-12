import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { AlertEntityService } from '../../service/alert-entity.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService:LoginService, private alertEntityService:AlertEntityService){}


  login(user:string, pass:string){
    this.loginService.login(user, pass).subscribe(status=>{
      if(status){
        this.alertEntityService.alertaSuccess("Login", 'Inicio de sesion correctamente', true, 1600).then(()=>{
          window.location.href='/admin';
        });
      }else{
        this.alertEntityService.alertaError("Error", "Las Credenciales no son correctas", '');
      }
    });
    
  }
}
