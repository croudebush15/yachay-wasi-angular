import { Component, OnInit, ViewChild } from '@angular/core';
import { faPen, faTimes, faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../common/model/course';
import { modalType } from '../common/model/modal';
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
  faTrashRestore = faTrashRestore;

  isLoading: boolean = false;
  isError: boolean = false;
  editModal: boolean = false;
  modal: modalType = modalType.create;
  allModalTypes = modalType;
  headers = ["Nombre", "Descripción","Editar"]; 
  courses: Course[] = [];
  newCourse: Course = new Course();
  selectedButton: boolean = true;

  constructor(private service: MantCursoService) { }

  ngOnInit(): void {
    this.isLoading = true;
    window.scroll(0,0);
    this.getCourses();
  }

  getCourses(){
    this.isLoading = true;
    setTimeout(() => {
      this.service.getCourses(this.selectedButton).subscribe(res => {
        this.courses = res;
        this.isLoading = false;
      });
    }, 500);    
  }

  submit(){
    switch(this.modal){
      case modalType.create:
        this.createCourse();
        break;
      case modalType.edit:
        this.editCourse();
        break;
      case modalType.restore:
        this.retoreCourse();
        break;
      default:
        alert("Error: Tipo de formulario invalido.");
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
    this.clean();
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
    this.clean();
  }

  deleteCourse(course: Course){
    if(confirm("¿Desactivar curso " + course.name + "?")) {
      this.service.removeCourse(course).subscribe(res => {
        if (res.status !== 200) alert("Curso no se ha eliminado correctamente.");       
      });
      this.getCourses();
    }    
  }

  retoreCourse(){
    this.service.restoreCourse(this.newCourse).subscribe(res => {
      if (res.status !== 200)
        this.isError = true;       
      else {
        this.getCourses();
        this.closeModal();
      } 
    },
    error => {
      this.isError = true;
    });
    this.clean();   
  }

  agregarModal(){
    this.modal = modalType.create;
    $('#modal').modal('show');
  }

  closeModal(){
    $('#modal').modal('hide');
    this.isError = false;
  }

  restore(course: Course){
    this.newCourse= course;
    this.modal = modalType.restore;
    $('#modal').modal('show');
  }

  editarModal(course: Course){
    this.newCourse = course;
    this.modal = modalType.edit;
    $('#modal').modal('show');
  }

  clean(){
    this.newCourse = new Course();
  }

  public onValChange(status: boolean) {
    this.selectedButton = status;
    this.getCourses();
  }

}
