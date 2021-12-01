import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private lessonsUrl = `${environment.baseApiUrl}/lesson`;

  constructor(private http: HttpClient) { }

  getLessonsForClassroom(idClassroom: string): Observable<any>{    
    return this.http.get<any>(this.lessonsUrl + "/" + idClassroom, {observe: 'response'});
  }
}
