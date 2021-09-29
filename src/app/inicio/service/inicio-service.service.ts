import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  private baseApiUrl = "https://yachay-wasi.herokuapp.com";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean>{
    const url = `${this.baseApiUrl}/login`;
    return this.http.post<boolean>(url, {
        username: username,
        password: password
    })
  }

  getToken(){  
    return !!sessionStorage.getItem("token");  
  }  
}
