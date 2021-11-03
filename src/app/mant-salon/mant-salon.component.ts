import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faGraduationCap, faPen, faTimes, faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Classroom } from '../common/model/classroom';
import { Course } from '../common/model/course';
import { modalType } from '../common/model/modal';
import { Student } from '../common/model/student';
import { Teacher } from '../common/model/teacher';
import { MantCursoService } from '../mant-curso/service/mant-curso.service';
import { MantSalonService } from './service/mant-salon.service';
import {map, startWith} from 'rxjs/operators';
import { MantAlumnoService } from '../mant-alumno/service/mant-alumno.service';
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
  faGraduationCap = faGraduationCap;

  isLoading: boolean = false;
  isError: boolean = false;
  editModal: boolean = false;
  modal: modalType = modalType.create;
  allModalTypes = modalType;
  headers = ["NRC","Día de Semana","Nombre Curso","Nombre Profesor","Hora Inicio","Hora Fin","Editar"];
  studentHeaders = ["Nombre", "Apellido", "Número Documento", "Fecha de Nacimiento", "Teléfono", "Correo", "Dirección"]; 
  scheduleInicio = ["7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"];
  schedulFin = ["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
  daysOfWeek = ["lun","mar","mie","jue","vie"];
  classrooms: Classroom[] = [];
  newClassroom: Classroom = new Classroom();
  courses: Course[] = [];
  teachers: Teacher[] = [];
  allStudents: Student[] = [];
  selectableStudents: Student[] = [];
  studentsInClassroom: Student[] = [];
  selectedCourse: number = 0;
  selectedTeacher: number = 0;
  selectedButton: boolean = true;

  myControl = new FormControl();
  filteredOptions!: Observable<Student[]>;

  constructor(private service: MantSalonService, 
              private courseService: MantCursoService,
              private studentService: MantAlumnoService) { }

  ngOnInit(): void {
    this.isLoading = true;
    window.scroll(0,0);
    this.getData(); 
    
    
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.allStudents.slice())
      );
  }

  displayFn(student: Student): string {
    return student && student.fullName ? student.fullName : '';
  }

  private _filter(name: string): Student[] {
    //this.selectableStudents = this.allStudents.filter(student => !this.studentsInClassroom.includes(student)); 
    const filterValue = name.toLowerCase();
    return this.allStudents.filter(student => student.fullName.toLowerCase().includes(filterValue));
  }

  getData(){
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
    this.studentService.getStudents(true).subscribe(res => {
      this.allStudents = res;
      this.allStudents.forEach(student=> {
        student.fullName = student.firstName + " " + student.lastName;
     });
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
          this.getData();
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
          this.getData();
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
      this.getData();
    }    
  }

  retoreClassroom(){
    this.service.restoreClassroom(this.newClassroom).subscribe(res => {
      if (res.status !== 200)
        this.isError = true;       
      else {
        this.getData();
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
    $('#modal-students').modal('hide');
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

  studentModal(classroom: Classroom){
    setTimeout(() => {
      this.service.getStudentsInClassroom(classroom).subscribe(res => {
        this.studentsInClassroom = res.body;
        
        this.studentsInClassroom.forEach(student=> {
          student.fullName = student.firstName + " " + student.lastName;
       });             
        $('#modal-students').modal('show');
      });
    }, 500);              
    this.newClassroom = classroom;           
  }

  public onValChange(status: boolean) {
    this.selectedButton = status;
    this.getData();
  }

  registerStudent(student: Student){
    this.isError = false;
    if(this.studentsInClassroom.find(s => s.id === student.id) === undefined){
      this.studentsInClassroom.push(student);
    }
    else this.isError = true;
  }

  removeStudentClassroom(student: Student){ 
    this.isError = false;   
    this.studentsInClassroom.forEach((value, index) => {
      if(value==student) this.studentsInClassroom.splice(index,1);
    });    
  }

}
