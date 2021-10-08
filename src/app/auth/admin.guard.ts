import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private router: Router) {}  
  canActivate(): boolean {  
    console.log(sessionStorage.getItem('role'));
      if (sessionStorage.getItem('role') === "ADMIN") {  
          return true;  
      }  
      else this.router.navigateByUrl("/inicio");
      return false; 
  } 
}
