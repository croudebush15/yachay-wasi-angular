import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Classroom } from 'src/app/common/model/classroom';
import { Student } from 'src/app/common/model/student';
import { ListaAlumnosService } from '../service/lista-alumnos.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  isLoading: boolean = false;
  idClassroom: string = "";
  currentClassroom: Classroom = new Classroom();
  students: Student[] = [];
  headers = ["Apellido","Nombre", "Número Documento", "Fecha de Nacimiento", "Teléfono", "Correo", "Dirección","Asistencia"];

  constructor(private service: ListaAlumnosService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(){
    this.isLoading = true;
    this.idClassroom = this.route.snapshot.paramMap.get('id') || "";

    setTimeout(() => {
      this.service.getClassroom(this.idClassroom).pipe(
        switchMap((classroom) => this.service.getStudentsInClassroom(classroom.body))
      ).subscribe(res => {
        this.students = res.body;
        this.isLoading = false;
      });
    }, 500);        
  }

}
