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
    if (this.getToken() && sessionStorage.getItem('role') === "USER") {  
      return true;  
    } 
    else {
      this.router.navigateByUrl("/inicio");
      return false;
    }
  } 

  getToken(){  
    return !!sessionStorage.getItem("token");  
  }  

}
