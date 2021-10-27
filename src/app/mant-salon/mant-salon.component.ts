import { Component, OnInit, ViewChild } from '@angular/core';
import { faPen, faTimes, faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import { Classroom } from '../common/model/classroom';
import { Course } from '../common/model/course';
import { modalType } from '../common/model/modal';
import { Teacher } from '../common/model/teacher';
import { MantCursoService } from '../mant-curso/service/mant-curso.service';
import { MantSalonService } from './service/mant-salon.service';
declare var $:any; 

@Component({
  selector: 'app-mant-salon',
  templateUrl: './mant-salon.component.html',
  styleUrls: ['./mant-salon.component.css']
})
export class MantSalonComponent implements OnInit {

  @ViewChild('modal') myModal: any;

  faTimes = faTimes;
  faPen = faPen; 
  faTrashRestore = faTrashRestore;

  isLoading: boolean = false;
  isError: boolean = false;
  editModal: boolean = false;
  modal: modalType = modalType.create;
  allModalTypes = modalType;
  headers = ["NRC","Día de Semana","Nombre Curso","Nombre Profesor","Hora Inicio","Hora Fin","Editar"]; 
  scheduleInicio = ["7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"];
  schedulFin = ["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
  daysOfWeek = ["lun","mar","mie","jue","vie"];
  classrooms: Classroom[] = [];
  newClassroom: Classroom = new Classroom();
  courses: Course[] = [];
  teachers: Teacher[] = [];
  selectedCourse: number = 0;
  selectedTeacher: number = 0;
  selectedButton: boolean = true;

  constructor(private service: MantSalonService, 
              private courseService: MantCursoService) { }

  ngOnInit(): void {
    this.isLoading = true;
    window.scroll(0,0);
    this.getClassrooms();    
  }

  getClassrooms(){
    this.isLoading = true;
    setTimeout(() => {
      this.service.getClassrooms(this.selectedButton).subscribe(res => {
        this.classrooms = res;
        this.isLoading = false;
      });
    }, 500);  
    this.courseService.getCourses(true).subscribe(res => {
      this.courses = res;
    });
    this.service.getTeachers().subscribe(res => {
      this.teachers = res;
    });
  }

  submit(){
    this.isError = false;
    switch(this.modal){
      case modalType.create:
        this.createClassroom();
        break;
      case modalType.edit:
        this.editClassroom();
        break;
      case modalType.restore:
        this.retoreClassroom();
        break;
      default:
        alert("Error: Tipo de formulario invalido.")
    }
  }

  createClassroom(){
    if(this.selectedCourse !== 0 || this.selectedTeacher !== 0){
      let selectedCourseObject = this.courses.find(course=>course.id == this.selectedCourse);
      let selectedTeacherObject = this.teachers.find(teacher=>teacher.idTeacher == this.selectedTeacher);
      if (selectedCourseObject !== undefined || selectedTeacherObject !== undefined) {
        this.newClassroom.course = selectedCourseObject || new Course();
        this.newClassroom.teacher = selectedTeacherObject || new Teacher();
        this.service.createClassrooms(this.newClassroom).subscribe(res => {
          this.getClassrooms();
          this.closeModal();  
          return;    
        },
        error => {
          if (error.status !== '200')
            this.isError = true; 
        });
        this.clean();
      }     
    }
    else{
      this.isError = true;
      return;
    }                
  }

  editClassroom(){
    if(this.selectedCourse !== 0 || this.selectedTeacher !== 0){
      let selectedCourseObject = this.courses.find(course=>course.id == this.selectedCourse);
      let selectedTeacherObject = this.teachers.find(teacher=>teacher.idTeacher == this.selectedTeacher);
      if (selectedCourseObject !== undefined || selectedTeacherObject !== undefined) {
        this.newClassroom.course = selectedCourseObject || new Course();
        this.newClassroom.teacher = selectedTeacherObject || new Teacher();
        this.service.editClassroom(this.newClassroom).subscribe(res => {
          this.getClassrooms();
          this.closeModal();  
          return;    
        },
        error => {
          if (error.status !== '200')
            this.isError = true; 
        });
        this.clean();
      }     
    }
    else{
      this.isError = true;
      return;
    }       
    this.clean();
  }

  deleteClassroom(classroom: Classroom){
    if(confirm("¿Desactivar salon " + classroom.id + "?")) {
      this.service.removeClassroom(classroom).subscribe(error => {
        if (error.status !== 200) alert("Salon no se ha eliminado correctamente.");       
      });
      this.getClassrooms();
    }    
  }

  retoreClassroom(){
    this.service.restoreClassroom(this.newClassroom).subscribe(res => {
      if (res.status !== 200)
        this.isError = true;       
      else {
        this.getClassrooms();
        this.closeModal();
      } 
    },
    error => {
      this.isError = true;
    });
    this.clean();   
  }

  clean(){
    this.newClassroom = new Classroom(); 
    this.selectedCourse = 0;
    this.selectedTeacher = 0;   
  }

  agregarModal(){
    this.modal = modalType.create;
    $('#modal').modal('show');
  }

  closeModal(){
    $('#modal').modal('hide');
    this.isError = false;
  }

  restore(classroom: Classroom){
    this.newClassroom = classroom;
    this.modal = modalType.restore;
    $('#modal').modal('show');
  }

  editarModal(classroom: Classroom){
    this.newClassroom = classroom;
    this.modal = modalType.edit;
    this.selectedCourse = classroom.course.id;
    this.selectedTeacher = classroom.teacher.idTeacher;
    $('#modal').modal('show');
  }

  public onValChange(status: boolean) {
    this.selectedButton = status;
    this.getClassrooms();
  }

}
