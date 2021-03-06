import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Attendance } from 'src/app/common/model/attendance';
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
  selectedSession: Lesson | undefined;
  showMessage: boolean = false;
  message = "";

  constructor(private studentService: ListaAlumnosService,
    private attendanceService: AsistenciaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {    
    this.getStudents();
    this.isLoading = false; 
    this.showMessage = true;
       
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
    setTimeout(() => {
      this.attendanceService.getLessonsForClassroom(this.idClassroom).subscribe(res => {
        this.lessons = res.body;
        this.lessons.forEach((lesson, index)=> {
          lesson.lessonNumber = index;
       });
       //this.getCurrentSession();
      });         
    }, 100);     
  }

  getCurrentSession(){
    //console.log("Current session gotten");
    let today = new Date();
    this.selectedSession = this.lessons.find(lesson => lesson.date > today) || new Lesson();     
    if (this.selectedSession.date === null) this.getCurrentSession();   
  }

  selectSession(session: Lesson){
    this.selectedSession = session;
  }

  markAttentance(sessionAttendanceMarked: Lesson){
    this.selectedSession!.attendances  = sessionAttendanceMarked.attendances;
    this.showMessage = true;
    this.message = "Guardando..."
    this.attendanceService.markAttendanceLesson(sessionAttendanceMarked).subscribe(res => {      
      this.message = "Asistencia guardada."
    },
    error => {
      if (error.status !== '200')
        this.showMessage = true;
        this.message = "Error: no se pudo guardar la asistencia."
    });
    setTimeout(() => 
    {
      this.showMessage = false;
    }, 5000);
    
  }

}
