import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { ClaseComponent } from './clase/clase.component';
import { AsistenciaAlumnosComponent } from './clases/asistencia-alumnos/asistencia-alumnos.component';
import { AsistenciaComponent } from './clases/asistencia/asistencia.component';
import { ListaComponent } from './clases/lista/lista.component';
import { ReporteComponent } from './clases/reporte/reporte.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { MantAlumnoComponent } from './mant-alumno/mant-alumno.component';
import { MantCursoComponent } from './mant-curso/mant-curso.component';
import { MantProfesorComponent } from './mant-profesor/mant-profesor.component';
import { MantSalonComponent } from './mant-salon/mant-salon.component';
import { PageComponent } from './page/page.component';
import { PerfilProfesorComponent } from './perfil-profesor/perfil-profesor.component';

const routes: Routes = [
  { path: '', component: PageComponent },
  { path: 'inicio', component: InicioComponent },  
  { path: 'profesores', component: MantProfesorComponent, canActivate:[AdminGuard] },
  { path: 'cursos', component: MantCursoComponent, canActivate:[AdminGuard] },
  { path: 'salones', component: MantSalonComponent, canActivate:[AdminGuard] },
  { path: 'alumnos', component: MantAlumnoComponent, canActivate:[AdminGuard] },
  { path: 'admin', component: MantProfesorComponent, canActivate:[AdminGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'clase/:id', component: ClaseComponent, canActivate:[AuthGuard] },
  { path: 'lista/:id', component: ListaComponent, canActivate:[AuthGuard] },
  { path: 'asistencia/:id', component: AsistenciaComponent, canActivate:[AuthGuard] },
  // { path: 'asistencia-alumnos', component: AsistenciaAlumnosComponent, canActivate:[AuthGuard] },
  { path: 'reporte', component: ReporteComponent, canActivate:[AuthGuard] },
  { path: 'perfil-profesor', component: PerfilProfesorComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
