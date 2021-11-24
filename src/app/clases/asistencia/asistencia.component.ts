import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Classroom } from 'src/app/common/model/classroom';
import { Student } from 'src/app/common/model/student';
import { ListaAlumnosService } from '../service/lista-alumnos.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  isLoading: boolean = false;
  idClassroom: string = "";
  currentClassroom: Classroom = new Classroom();
  students: Student[] = [];
  sessions = ["1","2","3"];
  selectedSession: string = "";

  constructor(private service: ListaAlumnosService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getCurrentSession();
    this.getStudents();
    this.isLoading = false;
  }

  getStudents(){
    this.isLoading = true;
    this.idClassroom = this.route.snapshot.paramMap.get('id') || "";
    if(this.idClassroom === "") this.router.navigate(['dashboard']); 

    setTimeout(() => {
      this.service.getClassroom(this.idClassroom).pipe(
        switchMap((classroom) => this.service.getStudentsInClassroom(classroom.body))
      ).subscribe(res => {
        this.students = res.body;        
      });
    }, 500);        
  }

  getCurrentSession(){
    this.selectedSession = "1";
  }

  selectSession(session: string){
    this.selectedSession = session;
  }

}
