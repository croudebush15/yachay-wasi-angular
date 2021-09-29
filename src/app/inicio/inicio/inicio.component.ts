import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InicioService } from '../service/inicio-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  model: any = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: InicioService
    ) { }

    ngOnInit() {
        sessionStorage.setItem('token', '');
    }

    login() {
        this.service.login(this.model.username, this.model.password).subscribe(isValid => {
            if (isValid) {
                sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
                console.log(sessionStorage.getItem("token"));
                this.router.navigate(['']);                
            } else {
                alert("Ingreso inválido.");
                //TODO: mostrar error al ingreso invalido
            }
        });
    }

}
