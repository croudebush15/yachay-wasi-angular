import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { InicioService } from '../inicio/service/inicio-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private service: InicioService, private router: Router) {}  
  canActivate(): boolean {  
      if (!this.service.getToken()) {  
          this.router.navigateByUrl("/inicio");  
      }  
      return this.service.getToken();  
  } 
  
}
