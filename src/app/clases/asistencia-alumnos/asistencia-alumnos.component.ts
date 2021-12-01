import { Component, Input, OnInit } from '@angular/core';
import { Student } from 'src/app/common/model/student';

@Component({
  selector: 'app-asistencia-alumnos',
  templateUrl: './asistencia-alumnos.component.html',
  styleUrls: ['./asistencia-alumnos.component.css']
})
export class AsistenciaAlumnosComponent implements OnInit {

  @Input() students: Student[] = [];
  @Input() session: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
