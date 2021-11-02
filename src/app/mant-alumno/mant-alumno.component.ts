import { Component, OnInit, ViewChild } from '@angular/core';
import { faPen, faTimes, faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import { modalType } from '../common/model/modal';
import { Student } from '../common/model/student';
import { MantAlumnoService } from './service/mant-alumno.service';
declare var $:any; 

@Component({
  selector: 'app-mant-alumno',
  templateUrl: './mant-alumno.component.html',
  styleUrls: ['./mant-alumno.component.css']
})
export class MantAlumnoComponent implements OnInit {

  @ViewChild('modal') myModal: any;

  faTimes = faTimes;
  faPen = faPen; 
  faTrashRestore = faTrashRestore;

  isLoading: boolean = false;
  isError: boolean = false;
  editModal: boolean = false;
  modal: modalType = modalType.create;
  allModalTypes = modalType;
  headers = ["Nombre", "Apellido", "Número Documento", "Fecha de Nacimiento", "Teléfono", "Correo", "Dirección", "Editar"];
  students: Student[] = [];
  newStudent: Student = new Student();
  selectedButton: boolean = true;

  constructor(private service: MantAlumnoService) { }

  ngOnInit(): void {
    this.isLoading = true;
    window.scroll(0,0);
    this.getStudents();
  }

  getStudents(){
    this.isLoading = true;
    setTimeout(() => {
      this.service.getStudents(this.selectedButton).subscribe(res => {
        this.students = res;
        this.isLoading = false;
      });
    }, 500);    
  }

  submit(){
    switch(this.modal){
      case modalType.create:
        this.createStudent();
        break;
      case modalType.edit:
        this.editStudent();
        break;
      case modalType.restore:
        this.retoreStudent();
        break;
      default:
        alert("Error: Tipo de formulario invalido.");
    }
  }

  createStudent(){
    this.service.createStudent(this.newStudent).subscribe(res => {
      this.getStudents();
      this.closeModal();      
    },
    error => {
      if (error.status !== '200')
        this.isError = true; 
    });
    this.clean();
  }

  editStudent(){
    this.service.editStudent(this.newStudent).subscribe(res => {
      this.getStudents();
      this.closeModal(); 
    },
    error => {
      if (error.status !== '200')
        this.isError = true; 
    });
    this.clean();
  }

  deleteStudent(student: Student){
    if(confirm("¿Desactivar alumno " + student.firstName + " " + student.lastName + "?")) {
      this.service.removeStudent(student).subscribe(res => {
        if (res.status !== 200) alert("Alumno no se ha eliminado correctamente.");       
      });
      this.getStudents();
    }    
  }

  retoreStudent(){
    this.service.restoreStudent(this.newStudent).subscribe(res => {
      if (res.status !== 200)
        this.isError = true;       
      else {
        this.getStudents();
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

  restoreModal(student: Student){
    this.newStudent= student;
    this.modal = modalType.restore;
    $('#modal').modal('show');
  }

  editarModal(student: Student){
    this.newStudent = student;
    this.modal = modalType.edit;
    $('#modal').modal('show');
  }

  clean(){
    this.newStudent = new Student();
  }

  public onValChange(status: boolean) {
    this.selectedButton = status;
    this.getStudents();
  }


}
