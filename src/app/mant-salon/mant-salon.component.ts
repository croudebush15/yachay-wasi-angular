import { Component, OnInit, ViewChild } from '@angular/core';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Classroom } from '../common/model/classroom';
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

  isLoading: boolean = false;
  isError: boolean = false;
  editModal: boolean = false;
  modalType: string = "create";
  headers = ["NRC", "Cantidad Alumnos","Día de Semana","Nombre Curso","Hora Inicio","Hora Fin","Editar","Eliminar"]; 
  classrooms: Classroom[] = [];
  newClassroom: Classroom = new Classroom();

  constructor(private service: MantSalonService) { }

  ngOnInit(): void {
    this.isLoading = true;
    window.scroll(0,0);
    this.getClassrooms();
  }

  getClassrooms(){
    this.isLoading = true;
    setTimeout(() => {
      this.service.getClassrooms().subscribe(res => {
        this.classrooms = res;
        this.isLoading = false;
      });
    }, 500);  
  }

  submit(){
    switch(this.modalType){
      case "create":
        this.createClassroom();
        break;
      case "edit":
        this.editClassroom();
        break;
      default:
        alert("Error: Tipo de formulario invalido.")
    }
  }

  createClassroom(){
    this.service.createClassrooms(this.newClassroom).subscribe(res => {
      this.getClassrooms();
      this.closeModal();      
    },
    error => {
      if (error.status !== '200')
        this.isError = true; 
    });
    this.newClassroom = new Classroom();
  }

  editClassroom(){
    this.service.editClassroom(this.newClassroom).subscribe(res => {
      this.getClassrooms();
      this.closeModal(); 
    },
    error => {
      if (error.status !== '200')
        this.isError = true; 
    });
    this.newClassroom = new Classroom();
  }

  deleteClassroom(classroom: Classroom){
    if(confirm("¿Eliminar salon " + classroom.name + "?")) {
      this.service.removeClassroom(classroom).subscribe(error => {
        if (error.status !== 200) alert("Salon no se ha eliminado correctamente.");       
      });
      this.getClassrooms();
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

  editarModal(classroom: Classroom){
    this.newClassroom = classroom;
    this.modalType = "edit";
    $('#modal').modal('show');
  }

}
