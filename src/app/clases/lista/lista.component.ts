import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  headers = ["Apellido","Nombre", "Número Documento", "Fecha de Nacimiento", "Teléfono", "Correo", "Dirección"];

  constructor() { }



  ngOnInit(): void {
  }

}
