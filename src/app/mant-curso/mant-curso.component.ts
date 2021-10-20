import { Component, OnInit, ViewChild } from '@angular/core';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../common/model/course';
import { MantCursoService } from './service/mant-curso.service';
declare var $:any; 

@Component({
  selector: 'app-mant-curso',
  templateUrl: './mant-curso.component.html',
  styleUrls: ['./mant-curso.component.css']
})
export class MantCursoComponent implements OnInit {

  @ViewChild('modal') myModal: any;

  faTimes = faTimes;
  faPen = faPen; 

  isLoading: boolean = false;
  isError: boolean = false;
  editModal: boolean = false;
  modalType: string = "create";
  headers = ["Nombre", "Descripción","Editar","Eliminar"]; 
  courses: Course[] = [];
  newCourse: Course = new Course();

  constructor(private service: MantCursoService) { }

  ngOnInit(): void {
    this.isLoading = true;
    window.scroll(0,0);
    this.getCourses();
  }

  getCourses(){
    this.isLoading = true;
    setTimeout(() => {
      this.service.getCourses().subscribe(res => {
        this.courses = res;
        this.isLoading = false;
      });
    }, 500);    
  }

  submit(){
    switch(this.modalType){
      case "create":
        this.createCourse();
        break;
      case "edit":
        this.editCourse();
        break;
      default:
        alert("Error: Tipo de formulario invalido.")
    }
  }

  createCourse(){
    this.service.createCourse(this.newCourse).subscribe(res => {
      this.getCourses();
      this.closeModal();      
    },
    error => {
      if (error.status !== '200')
        this.isError = true; 
    });
    this.newCourse = new Course();
  }

  editCourse(){
    this.service.editCourse(this.newCourse).subscribe(res => {
      this.getCourses();
      this.closeModal(); 
    },
    error => {
      if (error.status !== '200')
        this.isError = true; 
    });
    this.newCourse = new Course();
  }

  deleteCourse(course: Course){
    if(confirm("¿Eliminar curso " + course.name + "?")) {
      this.service.removeCourse(course).subscribe(res => {
        if (res.status !== 200) alert("Curso no se ha eliminado correctamente.");       
      });
      this.getCourses();
    }    
  }

  agregarModal(){
    this.modalType = "create";
    $('#modal').modal('show');
  }

  closeModal(){
    $('#modal').modal('hide');
    this.isError = false;
  }

  editarModal(course: Course){
    this.newCourse = course;
    this.modalType = "edit";
    $('#modal').modal('show');
  }

}
