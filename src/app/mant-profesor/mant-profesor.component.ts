import { Component, OnInit } from '@angular/core';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
declare var $:any; 

@Component({
  selector: 'app-mant-profesor',
  templateUrl: './mant-profesor.component.html',
  styleUrls: ['./mant-profesor.component.css']
})
export class MantProfesorComponent implements OnInit {


  faTimes = faTimes;
  faPen = faPen; 

  constructor() { }

  ngOnInit(): void {
    window.scroll(0,0);
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
