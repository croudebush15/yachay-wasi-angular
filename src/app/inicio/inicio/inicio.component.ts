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
  loginError: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: InicioService
    ) { }

    ngOnInit() {
        sessionStorage.clear();
        this.loginError = false;
    }

    login() {
        this.service.login(this.model.username, this.model.password).subscribe(user => {
            if (user) {
                sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('role', user.role);
                if (user.role === "ADMIN") this.router.navigate(['admin']); 
                else this.router.navigate(['dashboard']); 
                //console.log(sessionStorage.getItem("user"));              
            } else {
                this.loginError = true;
            }
        });
    }

}
