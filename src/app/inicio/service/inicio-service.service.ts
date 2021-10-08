import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  private baseApiUrl = "https://yachay-wasi.herokuapp.com";
  //private baseApiUrl = "http://localhost:8082";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>{
    const url = `${this.baseApiUrl}/login`;
    return this.http.post<any>(url, {
        username: username,
        password: password
    })
  }

  getToken(){  
    return !!sessionStorage.getItem("token");  
  }  
}
