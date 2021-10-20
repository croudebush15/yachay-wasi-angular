import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { ClaseComponent } from './clase/clase.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { MantCursoComponent } from './mant-curso/mant-curso.component';
import { MantProfesorComponent } from './mant-profesor/mant-profesor.component';
import { MantSalonComponent } from './mant-salon/mant-salon.component';
import { PageComponent } from './page/page.component';





const routes: Routes = [

  { path: '', component: PageComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'clase', component: ClaseComponent },
  { path: 'profesores', component: MantProfesorComponent, canActivate:[AdminGuard] },
  { path: 'cursos', component: MantCursoComponent, canActivate:[AdminGuard] },
  { path: 'salones', component: MantSalonComponent, canActivate:[AdminGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'admin', component: MantProfesorComponent, canActivate:[AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
