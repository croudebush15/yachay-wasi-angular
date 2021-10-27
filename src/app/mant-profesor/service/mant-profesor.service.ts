import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/common/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MantProfesorService {

  private url = `${environment.baseApiUrl}/user`;

  constructor(private http: HttpClient) { }

  getUsers(status: boolean): Observable<any>{
    if (status) return this.http.get<any>(this.url + 's'); 
    else return this.http.get<any>(this.url + "s/inactive");    
  }
  
  createUser(user: User): Observable<any>{
    user.teacher.status = true;
    user.teacher.role = "USER";
    return this.http.post<any>(this.url, user, {observe: 'response'});
  }

  editUser(user: User): Observable<any>{
    return this.http.put<any>(this.url, user, {observe: 'response'});
  }

  removeUser(user: User): Observable<any>{
    return this.http.delete<any>(this.url + "/" + user.id, {observe: 'response'});
  }

  restoreUser(user: User): Observable<any>{
    return this.http.post<any>(this.url + "/restore", user, {observe: 'response'});
  }
}
