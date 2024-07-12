import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { MatriculaComponent } from './components/matricula/matricula.component';
import { IdiomaComponent } from './components/idioma/idioma.component';
import { HorarioComponent } from './components/horario/horario.component';
import { AdministradorComponent } from './components/administrador/administrador.component';

export const routes: Routes = [
    {path:'menu', component:PrincipalComponent},
    {path:'login', component:LoginComponent},
    {path:'matricula', component:MatriculaComponent},
    {path:'idioma', component:IdiomaComponent},
    {path:'horario', component:HorarioComponent},
    {path:'admin', component:AdministradorComponent},
    {path:'', redirectTo:'menu', pathMatch:'full'}
];
