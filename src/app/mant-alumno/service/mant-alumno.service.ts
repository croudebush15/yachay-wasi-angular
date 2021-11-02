import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/common/model/student';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MantAlumnoService {

  private url = `${environment.baseApiUrl}/student`;

  constructor(private http: HttpClient) { }

  getStudents(status: boolean): Observable<any>{
    if (status) return this.http.get<any>(this.url + '/active'); 
    else return this.http.get<any>(this.url + "/inactive");  
  }
  
  createStudent(student: Student): Observable<any>{    
    return this.http.post<any>(this.url, student, {observe: 'response'});
  }

  editStudent(student: Student): Observable<any>{
    return this.http.put<any>(this.url, student, {observe: 'response'});
  }

  removeStudent(student: Student): Observable<any>{
    return this.http.delete<any>(this.url + "/" + student.id, {observe: 'response'});
  }

  restoreStudent(student: Student): Observable<any>{
    return this.http.post<any>(this.url + "/restore", student, {observe: 'response'});
  }
}
