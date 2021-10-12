import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MantProfesorService {

  private url = `${environment.baseApiUrl}/users`;

  constructor(private http: HttpClient) { }

  getClassrooms(): Observable<any>{
    return this.http.get<any>(this.url);
  }
}
