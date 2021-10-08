import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { MantProfesorComponent } from './mant-profesor/mant-profesor.component';
import { PageComponent } from './page/page.component';





const routes: Routes = [

  { path: '', component: PageComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'admin', component: MantProfesorComponent, canActivate:[AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
