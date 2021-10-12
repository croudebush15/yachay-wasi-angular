import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  private url = `${environment.baseApiUrl}/login`;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>{
    return this.http.post<any>(this.url, {
        username: username,
        password: password
    })
  }

  getToken(){  
    return !!sessionStorage.getItem("token");  
  }  
}
