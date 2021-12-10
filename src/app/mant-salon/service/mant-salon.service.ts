import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from 'src/app/common/model/classroom';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MantSalonService {

  private url = `${environment.baseApiUrl}/classroom`;
  private studentsUrl = `${environment.baseApiUrl}/student/classroom`;
  private registerUrl = `${environment.baseApiUrl}/register`;

  constructor(private http: HttpClient) { }

  getClassrooms(status: Boolean): Observable<any>{
    if (status) return this.http.get<any>(this.url + '/active'); 
    else return this.http.get<any>(this.url + "/inactive");  
  }

  getTeachers(): Observable<any>{
    return this.http.get<any>(this.url  + '/teacher');
  }

  getStudentsInClassroom(classroom: Classroom): Observable<any>{    
    return this.http.post<any>(this.studentsUrl, classroom, {observe: 'response'});
  }
  
  createClassrooms(classroom: Classroom, quantityLessons: number, startDate: string): Observable<any>{    
    return this.http.post<any>(this.url, {classroom, quantityLessons, startDate}, {observe: 'response'});
  }

  editClassroom(classroom: Classroom): Observable<any>{
    return this.http.put<any>(this.url, classroom, {observe: 'response'});
  }

  removeClassroom(classroom: Classroom): Observable<any>{
    return this.http.delete<any>(this.url + "/" + classroom.id, {observe: 'response'});
  }

  restoreClassroom(classroom: Classroom): Observable<any>{
    return this.http.post<any>(this.url + "/restore", classroom, {observe: 'response'});
  }

  registerStudentsInClassroom(idStudents: number[], idClassroom: number): Observable<any>{
    return this.http.post<any>(this.registerUrl, {idStudents, idClassroom}, {observe: 'response'});
  }
}
