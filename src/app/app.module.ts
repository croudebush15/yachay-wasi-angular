import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
    PageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    InicioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
