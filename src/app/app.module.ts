import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InicioComponent } from './inicio/inicio/inicio.component';
import { InicioService } from './inicio/service/inicio-service.service';
import { MainNavComponent } from './common/main-nav/main-nav.component';
import { PerfilComponent } from './common/perfil/perfil.component';
import { MantProfesorComponent } from './mant-profesor/mant-profesor.component';
import { LogoPerfilComponent } from './common/logo-perfil/logo-perfil.component';
import { ClaseComponent } from './clase/clase.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageComponent } from './page/page.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { MantProfesorService } from './mant-profesor/service/mant-profesor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MantCursoComponent } from './mant-curso/mant-curso.component';
import { MantSalonComponent } from './mant-salon/mant-salon.component';
import { MantAlumnoComponent } from './mant-alumno/mant-alumno.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FooterComponent,
    HeaderComponent,
    MainNavComponent,
    PerfilComponent,
    MantProfesorComponent,
    LogoPerfilComponent,
    ClaseComponent,
    DashboardComponent,
    PageComponent,
    MantCursoComponent,
    MantSalonComponent,
    MantAlumnoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [
    InicioService,
    MantProfesorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
