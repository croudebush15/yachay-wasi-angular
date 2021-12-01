import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Classroom } from 'src/app/common/model/classroom';
import { Lesson } from 'src/app/common/model/lesson';
import { Student } from 'src/app/common/model/student';
import { AsistenciaService } from '../service/asistencia.service';
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
  lessons: Lesson[] = [];
  sessions = ["1","2","3"];
  selectedSession: number = 0;

  constructor(private studentService: ListaAlumnosService,
    private attendanceService: AsistenciaService,
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
    //if(this.idClassroom === "") this.router.navigate(['dashboard']); 

    setTimeout(() => {
      this.studentService.getClassroom(this.idClassroom).pipe(
        switchMap((classroom) => this.studentService.getStudentsInClassroom(classroom.body))
      ).subscribe(res => {
        this.students = res.body;        
      });
      this.getLessons();
    }, 500);        
  }

  getLessons(){
    this.attendanceService.getLessonsForClassroom(this.idClassroom).subscribe(res => {
      this.lessons = res.body;
    });
  }

  getCurrentSession(){
    this.selectedSession = 1;
  }

  selectSession(session: string){
    //this.selectedSession = session;
  }

}
