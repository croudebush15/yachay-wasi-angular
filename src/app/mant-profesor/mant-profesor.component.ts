import { Component, OnInit } from '@angular/core';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { User } from '../common/model/user';
import { MantProfesorService } from './service/mant-profesor.service';
declare var $:any; 

@Component({
  selector: 'app-mant-profesor',
  templateUrl: './mant-profesor.component.html',
  styleUrls: ['./mant-profesor.component.css']
})
export class MantProfesorComponent implements OnInit {


  faTimes = faTimes;
  faPen = faPen; 

  headers = ["Nombre", "Apellido", "Usuario", "Rol", "Número Documento", "Fecha de Nacimiento", "Teléfono", "Correo", "Dirección"];
  users: User[] = [];


  constructor(private service: MantProfesorService) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.getClassroomInfo();
  }

  getClassroomInfo(){
    this.service.getClassrooms().subscribe(res => {
      console.log(res);
      this.users = res;
    });
  }

  seleccionar(){
    $("#formulario-actualizar").slideDown("slow");
  }

 cerrarActualizar(){
  $("#formulario-actualizar").slideUp("slow");
  }

  actualizar(){
    $("#formulario-actualizar").slideUp("slow");
  }

  eliminar(){
    
  }

}
