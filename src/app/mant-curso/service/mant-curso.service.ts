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

  getCourses(status: boolean): Observable<any>{
    if (status) return this.http.get<any>(this.url + '/active'); 
    else return this.http.get<any>(this.url + "/inactive");  
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

  restoreCourse(course: Course): Observable<any>{
    return this.http.post<any>(this.url + "/restore", course, {observe: 'response'});
  }
}
