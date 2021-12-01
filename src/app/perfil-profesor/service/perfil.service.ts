import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private url = `${environment.baseApiUrl}/user`;

  constructor(private http: HttpClient) { }

  getUser(): Observable<any>{    
    return this.http.get<any>(this.url, {observe: 'response'});
  }
}
