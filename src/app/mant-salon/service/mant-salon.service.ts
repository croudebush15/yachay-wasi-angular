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

  constructor(private http: HttpClient) { }

  getClassrooms(status: Boolean): Observable<any>{
    if (status) return this.http.get<any>(this.url + '/active'); 
    else return this.http.get<any>(this.url + "/inactive");  
  }

  getTeachers(): Observable<any>{
    return this.http.get<any>(this.url  + '/teacher');
  }
  
  createClassrooms(classroom: Classroom): Observable<any>{    
    return this.http.post<any>(this.url, classroom, {observe: 'response'});
  }

  editClassroom(classroom: Classroom): Observable<any>{
    return this.http.put<any>(this.url, classroom, {observe: 'response'});
  }

  removeClassroom(classroom: Classroom): Observable<any>{
    return this.http.delete<any>(this.url + "/" + classroom.id, {observe: 'response'});
  }
}
