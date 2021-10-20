import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/common/model/course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MantCursoService {

  private url = `${environment.baseApiUrl}/course`;

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any>{
    return this.http.get<any>(this.url);
  }
  
  createCourse(course: Course): Observable<any>{    
    return this.http.post<any>(this.url, course, {observe: 'response'});
  }

  editCourse(course: Course): Observable<any>{
    return this.http.put<any>(this.url, course, {observe: 'response'});
  }

  removeCourse(course: Course): Observable<any>{
    return this.http.delete<any>(this.url + "/" + course.id, {observe: 'response'});
  }
}
