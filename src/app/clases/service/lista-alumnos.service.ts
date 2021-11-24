import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from 'src/app/common/model/classroom';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaAlumnosService {

  private classroomUrl = `${environment.baseApiUrl}/classroom`;
  private studentsUrl = `${environment.baseApiUrl}/student/classroom`;

  constructor(private http: HttpClient) { }

  getStudentsInClassroom(classroom: Classroom): Observable<any>{    
    return this.http.post<any>(this.studentsUrl, classroom, {observe: 'response'});
  }

  getClassroom(id: string): Observable<any>{    
    return this.http.get<any>(this.classroomUrl + "/" + id, {observe: 'response'});
  }
}
