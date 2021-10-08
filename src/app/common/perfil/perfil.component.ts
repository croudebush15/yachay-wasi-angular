import { Component, OnInit } from '@angular/core';
import { Teacher } from '../model/teacher';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  teacher: Teacher = new Teacher;

  constructor() { }

  ngOnInit(): void {
    this.teacher = JSON.parse(sessionStorage.getItem("user") || '{}') as Teacher;
  }

}
