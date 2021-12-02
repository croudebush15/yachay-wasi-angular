import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from 'src/app/common/model/lesson';
import { Student } from 'src/app/common/model/student';

@Component({
  selector: 'app-asistencia-alumnos',
  templateUrl: './asistencia-alumnos.component.html',
  styleUrls: ['./asistencia-alumnos.component.css']
})
export class AsistenciaAlumnosComponent implements OnInit {

  @Input() students: Student[] = [];
  @Input() session: Lesson = new Lesson();

  constructor() { }

  ngOnInit(): void {
  }

  checkState(event: any, el: any) {
    event.preventDefault();
      if (el.checked === true) {
        el.checked = false;
      } else {
        el.checked = true;
      }
    
  }


}
